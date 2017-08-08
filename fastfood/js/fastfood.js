var curPage = 1;

$(function() {
    $(".btn-search").click(function() {
        var searchKeyword = $("#txt-search").val();
        search(curPage, undefined, searchKeyword);
    });

    $("#txt-search").on("keypress", function(e) {
        if (e.keyCode === 13) {
            $(".btn-search").trigger("click");
        }
    });

    $("#txt-search").focus();
});

function search(page, perPage, searchKeyword) {
    if (!page)
        page = 1;

    if (!perPage)
        perPage = 10;

    $.get("//localhost:5000/fastfood", {
        page: page,
        perPage: perPage,
        searchKeyword: searchKeyword
    }, function(data) {
        var list = data.list;
        var total = data.total;

        curPage = page;

        $(".div-total").html("총 " + total + "개의 패스트푸드점을 찾았습니다.");

        var divList = $(".div-list").empty();

        for (var i = 0; i < list.length; i++) {
            var item = list[i];

            var elem = $("#item-template").clone()
                .removeAttr("id")
                .addClass("div-item")
                .show();

            var no = (page - 1) * perPage + i + 1;

            elem.find(".item-no").html(no);
            elem.find(".item-name").html(item.bplcNm);
            elem.find(".item-addr").html(item.siteWhlAddr);

            divList.append(elem);
        }

        showPaging(page, perPage, searchKeyword, total);
    });
}

function showPaging(page, perPage, searchKeyword, total) {
    var divPaging = $(".paging").empty();
    var numPages = 5;
    var pageStart = Math.floor((curPage - 1) / numPages) * numPages + 1;
    var pageEnd = pageStart + numPages - 1;
    var totalPages = Math.floor(total / perPage) + 1;

    if (pageEnd > totalPages)
        pageEnd = totalPages;

    var prevPage = pageStart - 1;

    if (prevPage < 1)
        prevPage = 1;

    var nextPage = pageEnd + 1;

    if (nextPage > totalPages)
        nextPage = totalPages;

    var prevElem = $('<a href="javascript:search(' + prevPage + ',' + perPage + ',\'' + searchKeyword + '\')">이전</a>');
    prevElem.addClass("prev")
    divPaging.append(prevElem);

    for (var i = pageStart; i <= pageEnd; i++) {
        var elem = $('<a href="javascript:search(' + i + ',' + perPage + ',\'' + searchKeyword + '\')">' + i + '</a>');

        if (i === curPage) {
            elem.addClass("current");
        }

        divPaging.append(elem);
    }

    var nextElem = $('<a href="javascript:search(' + nextPage + ',' + perPage + ',\'' + searchKeyword + '\')">다음</a>');
    nextElem.addClass("next");
    divPaging.append(nextElem);
}