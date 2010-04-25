var confirmation = Titanium.UI.createView({
  width:320,
  height:420,
  visible:false
});

var confirmationLabel = Ti.UI.createLabel({
  text: 'Add a message:',
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
  top:60
});

confirmation.add(confirmationLabel);

var commentText = 'Just uploaded this from #Snapost';
var comment = Titanium.UI.createTextField({
	value:commentText,
	height:'35px',
	width:'300px',
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	top:95,
	clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ALWAYS
});
confirmation.add(comment);

comment.addEventListener("change", function(e) {
  commentText = e.value;
});

var thumbnailView = Titanium.UI.createImageView({
  image:theImage,
  top:150,
  height:150,
  width:150
});
confirmation.add(thumbnailView);

//Listen for event that photo has been chosen
Titanium.App.addEventListener("photoChosen", function(e) {
  thumbnailView.image = theImage;
});

var backLabel = Ti.UI.createLabel({
  text: '<< Go Back',
  textAlign:'center',
  font:{
    fontSize:14,
    fontWeight:'bold'
  },
  height:'auto',
  width:'auto',
  color:'#fff',
  top:305
});
confirmation.add(backLabel);
backLabel.addEventListener("click", function(e) {
  showChooser();
});

var post = Titanium.UI.createButton({
	backgroundImage:'images/post-button.png',
	width:148,
	height:46,
	bottom:40
});
confirmation.add(post);

post.addEventListener("click", function(e) {
  Titanium.App.fireEvent("postClicked", {
    message: commentText
  });
});