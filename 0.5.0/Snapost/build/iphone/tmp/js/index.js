$(function() {
  //Make XHR request to post picture
	function postPic(pic) {
	  var query = 'https://twitpic.com/api/uploadAndPost';
    var xhr = Titanium.Network.createHTTPClient();
		xhr.onreadystatechange = function() {
      if (this.readyState == 4) {
        var a = Titanium.UI.createAlertDialog({title:'Snaposted!',message:'Your picture is on Twitter, yo!'});
    		a.show();
      }
		};
		xhr.open('POST',query);
		xhr.send({
			media:pic,
			username: 'kevinwhinnery',
			password: 'rogue10',
			message: message.value
		});
	}
  
  //Set up a native text field
  var message = Titanium.UI.createTextField({
		id:'message',
		value:'Just #snapost \'ed this...',
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
				postPic(image);
			},
			error: function(e) {
				notify(e.message);
			},
			cancel: function() {
				//no op
			},
			allowImageEditing:true
		});
	});
	
});