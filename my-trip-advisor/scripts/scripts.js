
$(function() {
  $(window).scroll(function() {
    var top = $(window).scrollTop();

    if (top > 0)
      $('#header').addClass('inverted');
    else
      $('#header').removeClass('inverted');
  });

  $(window).trigger('scroll');

  var dpFrom = $('#from').datepicker({
    dateFormat: 'yy-mm-dd',
    minDate: 0,
    onSelect: function() {
      dpTo.datepicker('option', 'minDate', dpFrom.datepicker('getDate'));
    }
  });

  dpFrom.datepicker('setDate', new Date());

  var dpTo = $('#to').datepicker({
    dateFormat: 'yy-mm-dd',
    minDate: 0
  });

  dpTo.datepicker('setDate', 4);

  $('#form-search').submit(function(e) {
    e.preventDefault();

    var from = $('#from').datepicker().val();
    var to = $('#to').datepicker().val();

    search(from, to);
  });
});

function search(from, to) {
  var url = 'https://javascript-basic.appspot.com/searchLocation';

  $.getJSON(url, {
    from: from,
    to: to
  }, function(r) {
    var arr = [];

    for (var key in r) {

      if (r.hasOwnProperty(key)) {
        var obj = r[key];
        obj.id = Number(key);

        arr.push(obj);
      }
    }

    r = arr;

    var $list = $('#list-panel');

    for (var i = 0; i < r.length; i++) {
      var data = r[i];

      var $item = createListItem(data);

      $list.append($item);
    }

    $('#list-bg').show();
  });
}

function createListItem(data) {
  var $tmpl = $('#list-item-template').clone().removeAttr('id');

  $tmpl.find('.list-item-image').attr('src', data.titleImageUrl);
  $tmpl.find('.list-item-name').html(data.name);
  $tmpl.find('.list-item-city-name').html(data.cityName);

  $tmpl.click(function(e) {
    var url = 'detail.html?id=' + data.id;

    window.location = url;
  });

  return $tmpl;
}
