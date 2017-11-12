$(function() {
  var $win = $(window);
  var $header = $('#header');
  var route = window.location.hash;

  if (route === '#/') {
    $win.scroll(function() {
      var top = $win.scrollTop();

      top > 0 ? $header.addClass('fixed') : $header.removeClass('fixed');
    });
  } else {
    $header.addClass('fixed');
  }

  $('#login').click(function(e) {
    if (e.target === this) {
      hideLogin();
    }
  });
});

function showLogin() {
  $('#login').fadeIn(300);
}

function hideLogin() {
  $('#login').fadeOut(300);
}