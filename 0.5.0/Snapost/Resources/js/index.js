$(function() {
  //The image selected by the user
  var theImage = null;
  var theImageDetails = null;
  
  //Display the selected image as a preview
  function stageImage() {
    $("#preview img").attr('src', theImage.url);
    $("#buttons").fadeOut(function() {
      $("#preview").fadeIn();
    });
  }
  
  //Unstage the current Image and reset UI
  function reset(callback) {
    theImage = null;
 	  theImageDetails = null;
    $("#preview").fadeOut(function() {
      $("#preview img").attr('src', '');
      $("#buttons").fadeIn();
    });
    callback.call();
  }
  
  //Make XHR request to post picture
	function postPic(pic) {
	  if (Titanium.Network.NETWORK_NONE) {
	    var a = Titanium.UI.createAlertDialog({
 	      title:'We\'re Sorry...',
 	      message:'Snapost cannot detect a network connection.  Are you connected to the internet?'
 	    });
	  }
	  else {
	    var query = 'https://twitpic.com/api/uploadAndPost';
      var xhr = Titanium.Network.createHTTPClient();
  		xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
          //Check the response to see if we're okay
          //TwitPic API reference: http://twitpic.com/api.do
          var parser = new DOMParser();
          var doc = parser.parseFromString(this.responseText, "text/xml");
          $(doc).find("rsp").each(function() {
            var stat = $(this).attr('stat'); //We only get this on an error
            if (stat == null || stat !== 'fail') {
              reset(function() {
                $("#posting").fadeOut(function() {
                  $("#success").fadeIn();
                });
                setTimeout(function() {
                  $("#success").fadeOut(function() {
                    $("#post-button").fadeIn();
                  });
                },4000);
              });
            }
            else {
              reset(function() {
                $(doc).find("err").each(function() {
                  $("#error-message").html($(this).attr('msg'));
                  $("#posting").fadeOut(function() {
                    $("#error").fadeIn();
                  });
                  setTimeout(function() {
                    $("#error").fadeOut(function() {
                      $("#post-button").fadeIn();
                    });
                  },8000);
                });
              });
            }
          });
        }
  		};
  		xhr.open('POST',query);
  		xhr.send({
  			media:pic,
  			username: Titanium.App.Properties.getString('username'),
  			password: Titanium.App.Properties.getString('password'),
  			message: message.value
  		});
	  }
	}
	
	//navigate to profile window
	function navProfile(animate) {
	  var win = Titanium.UI.createWindow();
		win.setURL('twitter.html');
		win.hideNavBar();
		win.open({animated:animate});
	}
  
  //Set up a native text field
  var message = Titanium.UI.createTextField({
		id:'message',
		value:'Just #snapost-ed this...',
		enableReturnKey:true,
		keyboardType:Titanium.UI.KEYBOARD_ASCII,
		autocorrect:false,
		hintText:'Describe this picture...',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		clearButtonMode:Titanium.UI.INPUT_BUTTONMODE_ALWAYS
	});
	
	message.addEventListener('change',function(e) {
	  message.value = e.value;
	});
	
	message.addEventListener('return', function(e) {
	  message.blur();
	});
	
	//Set up image buttons
	$("#albums").click(function() {
	  Titanium.Media.openPhotoGallery({
			success: function(image,details) {
				theImage = image;
				theImageDetails = details;
				stageImage();
			},
			error: function(e) {
				var a = Titanium.UI.createAlertDialog({title:'Whoops!',message:'There was a problem with your photo gallery.'});
    		a.show();
			},
			cancel: function() {
				//no op
			},
			allowImageEditing:true
		});
	}).mousedown(function() {
	  $(this).fadeTo("fast",0.33);
	}).mouseup(function() {
	  $(this).fadeTo("fast",1);
	});
	
	$("#camera").click(function() {
	  Titanium.Media.showCamera({
			success: function(image,details) {
				theImage = image;
				theImageDetails = details;
				stageImage();
			},
			error: function(e) {
				var a = Titanium.UI.createAlertDialog({title:'Whoops!',message:'There was a problem with your device camera.'});
    		a.show();
			},
			cancel: function() {
				//no op
			},
			allowImageEditing:true
		});
	}).mousedown(function() {
 	  $(this).fadeTo("fast",0.33);
 	}).mouseup(function() {
 	  $(this).fadeTo("fast",1);
 	});
 	
 	$("#post-button").click(function() {
 	  if (theImage !== null) {
 	    postPic(theImage);
 	    $(this).fadeOut(function() {
   	    $("#posting").fadeIn();
   	  });
 	  }
 	  else {
 	    var a = Titanium.UI.createAlertDialog({
 	      title:'Easy There Partner!',
 	      message:'We\'re excited too, but maybe you\'d like to select an image first?'
 	    });
  		a.show();
 	  }
	});
 	
 	//Set up cancel text
 	$("#cancel").click(function() {
 	  reset();
 	});
 	
 	//Set up navigation to Twitter profile page
 	$("#profile-button").click(function() {
 	  navProfile(true);
 	});
 	
 	//Initialize application
 	var u = Titanium.App.Properties.getString('username');
  var p = Titanium.App.Properties.getString('password');
  if (u === '' || u === null || p === '' || p === null) {
    navProfile(false);
  }
  else {
    $("#username").html(u);
  }
	
});