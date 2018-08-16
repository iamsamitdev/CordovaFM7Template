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

// แสดงข้อมูลไปยังแถบด้านซ้าย
$$('#userFullname').html(localStorage.getItem('userFullname'));
$$('#userEmail').html(localStorage.getItem('userEmail'));

if(localStorage.getItem('userFullname') != null){
  $$('.registerbutton').hide(); // ซ่อนปุ่มลงทะเบียน
  $$('.logoutbutton').show(); // โชว์ปุ่ม logout
}else{
  $$('.registerbutton').show(); // โชว์ปุ่มลงทะเบียน
  $$('.logoutbutton').hide(); // ซ่อนปุ่ม logout
}


// Register Screen
$$('#my-register-screen .register-button').on('click', function () {
  var email = $$('#my-register-screen [name="email"]').val();
  var password = $$('#my-register-screen [name="password"]').val();
  var fullname = $$('#my-register-screen [name="fullname"]').val();
  var gender = $$('#my-register-screen [name="gender"]:checked').val();
  var address = $$('#my-register-screen [name="address"]').val();

  // Post to php api  
  if(email != "" && password != "" && fullname != "" && address != ""){
    app.request.post(
      'http://192.168.1.39/cordovaapi/register.php', 
      { 
          email:email,
          password:password,
          fullname:fullname,
          gender:gender,
          address:address 
      }, function (result) {
          // บันทึกข้อมูลชื่อผู้ใช้และอีเมล์ลง localstorage
          localStorage.setItem('userFullname',fullname);
          localStorage.setItem('userEmail',email);

          // แสดงข้อมูลไปยังแถบด้านซ้าย
          $$('#userFullname').html(localStorage.getItem('userFullname'));
          $$('#userEmail').html(localStorage.getItem('userEmail'));
          $$('.registerbutton').hide(); // ซ่อนปุ่มลงทะเบียน
          $$('.logoutbutton').show(); // โชว์ปุ่ม logout

          app.dialog.alert(result,"แจ้งเตือน");
          // Clear form
          $$('input').val('');
          $$('textarea').val('');
          // Close login screen
          app.loginScreen.close('#my-register-screen');
    }); 
  }else{
    app.dialog.alert("กรอกข้อมูลให้ครบก่อน","แจ้งเตือน");
  }
});

// Logout ออกจากระบบ
$$('.logoutbutton').click(function(){
    // Clear local storage ออก
    localStorage.removeItem('userFullname');
    localStorage.removeItem('userEmail');
    $$('.registerbutton').show(); // โชว์ปุ่มลงทะเบียน
    $$('.logoutbutton').hide(); // ซ่อนปุ่ม logout
});

// jQuery Start here...
$(function(){

  var urlapi  = "http://192.168.1.39/cordovaapi/feed_course.php";
  $.getJSON(urlapi,function(data){
      //console.log(data);
      var list = "";
      $.each(data, function(key,val){
        list += `<div class="card demo-card-header-pic">
                    <div style="background:url('http://192.168.1.39/cordovaapi/images/${val.images}')" width="100%" class="card-header align-items-flex-end">${val.name}</div>
                    <div class="card-content card-content-padding">
                      <p class="date">Posted on ${val.create_at}</p>
                      <p>${val.description}</p>
                    </div>
                    <div class="card-footer"><a href="#" class="link">Like</a><a href="#" class="link">Read more</a></div>
                  </div>`;
      });
      $("#resultlist").html(list);
  });

});
