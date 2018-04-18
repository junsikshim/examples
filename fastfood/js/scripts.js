var API_URL = 'https://floating-harbor-78336.herokuapp.com/fastfood';

//var curPage = 1;

$(function() {
  $('.btn-search').click(function() {
    var searchKeyword = $('#txt-search').val();
    search(1, null, searchKeyword);
  });

  $('#txt-search').on('keypress', function(e) {
    if (e.keyCode === 13) {
      $('.btn-search').trigger('click');
    }
  });

  $('#txt-search').focus();
});

function search(page, perPage, searchKeyword) {
  if (typeof page !== 'number' || page < 1)
    page = 1;

  if (typeof perPage !== 'number' || perPage <= 0)
    perPage = 10;

  $.get(API_URL, {
  //$.get('http://localhost:5000/fastfood', {
    page: page,
    perPage: perPage,
    searchKeyword: searchKeyword
  }, function(data) {
    var list = data.list;
    var total = data.total;

    //curPage = page;

    $('.total').html('총 ' + total + '개의 패스트푸드점을 찾았습니다.');

    var $list = $('.list').empty();

    for (var i = 0; i < list.length; i++) {
      // 목록의 항목 하나하나마다 DOM 객체를 만들어서 $list에 추가한다
      var item = list[i];
      // 1. 템플릿을 복제한다.
      // 2. 복제한 템플릿에 데이터를 세팅한다.
      // 3. 목록에 복제한 템플릿을 추가한다.
      var $elem = $('#item-template')
        .clone()
        .removeAttr('id');

      var no = (page - 1) * perPage + i + 1;

      $elem.find('.item-no').html(no);
      $elem.find('.item-name').html(item.name);
      $elem.find('.item-addr').html(item.addr);

      $list.append($elem);
    }

    showPaging(page, perPage, total, searchKeyword);
  });
}

function showPaging(page, perPage, total, searchKeyword) {
  var $paging = $('.paging').empty();
  var numPages = 5;
  var pageStart = Math.floor((page - 1) / numPages) * numPages + 1;
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

  var $prevElem = $('<a href="javascript:search(' + prevPage + ',' + perPage + ',\'' + searchKeyword + '\')">이전</a>');
  $prevElem.addClass('prev');
  $paging.append($prevElem);

  for (var i = pageStart; i <= pageEnd; i++) {
    var $elem = $('<a href="javascript:search(' + i + ',' + perPage + ',\'' + searchKeyword + '\')">' + i + '</a>');

    if (i === page) {
      $elem.addClass('current');
    }

    $paging.append($elem);
  }

  var $nextElem = $('<a href="javascript:search(' + nextPage + ',' + perPage + ',\'' + searchKeyword + '\')">다음</a>');
  $nextElem.addClass('next');
  $paging.append($nextElem);
}
