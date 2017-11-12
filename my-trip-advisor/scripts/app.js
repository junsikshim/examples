
$(function() {
  var app = Sammy('#body', function() {
    this.use('Template', 'html');

    this.get('#/', function() {
      this.load('scripts/partials/header.html').replace('#header');

      this.partial('scripts/partials/main.html');
    });

    this.get('#/register', function() {
      this.load('scripts/partials/header.html').replace('#header');

      this.partial('scripts/partials/register.html');
    });
  });

  app.run('#/');
});