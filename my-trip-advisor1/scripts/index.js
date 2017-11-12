//
//$(function() {
//  var $win = $(window);
//  var $header = $('#header');
//
//  $win.scroll(function() {
//    var top = $win.scrollTop();
//
//    top > 0 ? $header.addClass('inverted') : $header.removeClass('inverted');
//  });
//});


$(function() {
  $(window).scroll(function() {
    var top = $(window).scrollTop();

    if (top > 0)
      $('#header').addClass('inverted');
    else
      $('#header').removeClass('inverted');
  });

  $('#calendar').datepicker();
  $('#city').autocomplete({
    source: ['서울', '부산', '인천', '대구', '대전', '광주', '수원', '울산', '창원', '고양'],
    focus: function() {
      return false;
    }
  });

  $(window).trigger("scroll");

  $('#form-search').submit(function(e) {
    e.preventDefault();

    var date = $('#calendar').datepicker('option', 'dateFormat', 'yy-mm-dd').val();
    var city = $('#city').val();

    search(date, city);
  });
});

function showLogin() {
  $('#login').fadeIn(300, function() {
    $('#login input[name="email"]').focus();
  });

  $('#login').click(function(e) {
    if (e.target === this) {
      hideLogin();
    }
  });
}

function hideLogin() {
  $('#login').fadeOut(300);
}

function search(date, city) {
  var url = 'https://javascript-basic.appspot.com/searchLocation';

  $.getJSON(url, {
    date: date,
    city: city
  }).then(function(r) {
    console.log(r);
  });
}