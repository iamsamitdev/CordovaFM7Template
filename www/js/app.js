// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },

  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },

  // App routes
  routes: routes,
});

// Init/Create views
var homeView = app.views.create('#view-home', {
  url: '/'
});
var courseView = app.views.create('#view-course', {
  url: '/course/'
});
var serviceView = app.views.create('#view-service', {
  url: '/service/'
});
var contactView = app.views.create('#view-contact', {
  url: '/contact/'
});
var settingsView = app.views.create('#view-settings', {
  url: '/settings/'
});


// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br>Password: ' + password);

});

// jQuery Start here...
$(function(){
  $('a[rel=showalert]').click(function(){
      //alert("OK");
      app.dialog.alert("OK");
  });
});
