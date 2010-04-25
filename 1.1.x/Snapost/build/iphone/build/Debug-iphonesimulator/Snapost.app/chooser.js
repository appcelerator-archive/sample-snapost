var chooser = Titanium.UI.createView({
  top:60,
  width:320,
  height:420,
  opacity:1
});

var chooserLabel = Ti.UI.createLabel({
  text: 'Choose an image:',
  textAlign:'center',
  font:{
    fontSize:24,
    fontFamily:'Trebuchet MS',
    fontWeight:'bold',
    fontStyle:'italic'
  },
  height:'auto',
  width:'auto',
  color:'#fff',
  top:5
});

chooser.add(chooserLabel);

//Add image upload/capture buttons
var imageControls = Titanium.UI.createView({
  top:70,
  height:90,
  width:230
});

var ind = Titanium.UI.createProgressBar({
	width:200,
	height:50,
	min:0,
	max:1,
	value:0,
	bottom:10,
	message:'Uploading Image',
	font:{fontSize:14},
	color:'#fff',
	style:Titanium.UI.iPhone.ProgressBarStyle.BAR
});

chooser.add(ind);

var gallery = Titanium.UI.createButton({
	backgroundImage:'images/albums-button.png',
	top:0,
	width:229,
	height:42
});

imageControls.add(gallery);

var camera = Titanium.UI.createButton({
	backgroundImage:'images/camera-button.png',
	width:229,
	height:46,
	top:43
});

imageControls.add(camera);

chooser.add(imageControls);

function handleImageEvent(event) {
  theImage = event.media;
  theThumbnail = event.thumbnail;
  Titanium.App.fireEvent("photoChosen");
  showConfirmation();
}

gallery.addEventListener("click", function(e) {
  Titanium.Media.openPhotoGallery({
  	success:function(event) {
  	  handleImageEvent(event);
  	},
  	cancel:function() {},
  	error:function(error){
  	  var a = Titanium.UI.createAlertDialog({ 
  	    title:'Uh Oh...',
  	    message: 'We had a problem reading from your photo gallery - please try again'
  	  });
  		a.show();
  	},
  	allowImageEditing:true
  });
});

camera.addEventListener("click", function(e) {
  Titanium.Media.showCamera({
  	success:function(event) {
  	  handleImageEvent(event);
  	},
  	cancel:function() {},
  	error:function(error) {
  		var a = Titanium.UI.createAlertDialog({ title:'Uh Oh...'});
  		if (error.code == Titanium.Media.NO_CAMERA) {
  			a.setMessage('Sorry, this device does not have a camera - you knew that, right?');
  		}
  		else {
  			a.setMessage('Unexpected error: ' + error.code);
  		}
  		a.show();
  	},
  	allowImageEditing:true
  });
});