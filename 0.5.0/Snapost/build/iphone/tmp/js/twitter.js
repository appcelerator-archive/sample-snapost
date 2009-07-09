$(function() {
  //populate input fields from properties
  var u = Titanium.App.Properties.getString('username');
  var p = Titanium.App.Properties.getString('password');
  if (u !== '') {
    $("#username").val(u);
  }
  if (p !== '') {
    $("#password").val(p);
  }
  
	$("#save-button").click(function() {
	  var username = $("#username").val();
	  var password = $("#password").val();
	  if (username === '' || password === '') {
	    var a = Titanium.UI.createAlertDialog({
 	      title:'Easy There Partner!',
 	      message:'Please enter your Twitter username and password.'
 	    });
  		a.show();
	  }
	  else {
	    Titanium.App.Properties.setString('username',$("#username").val());
  	  Titanium.App.Properties.setString('password',$("#password").val());
  	  var win = Titanium.UI.createWindow();
  		win.setURL('index.html');
  		win.hideNavBar();
  		win.open({animated:true});
	  }
	});
});