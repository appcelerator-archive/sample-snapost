//Construct main app header
var headerView = Titanium.UI.createView({
  backgroundColor:'#252f30',
  top:0,
  left:0,
  height:60,
  width:320,
  opacity:0.85
});

var logo = Titanium.UI.createImageView({
	url:'images/snapost-small.png',
	width:109,
	height:50,
	left:10,
	bottom:5,
	opacity:1
});
headerView.add(logo);

var profile = Titanium.UI.createButton({
	backgroundImage:'images/profile-button.png',
	width:33,
	height:35,
	right:10,
	bottom:5,
	opacity:1
});
headerView.add(profile);

var username = Titanium.UI.createLabel({
	color:'#92c0c3',
	text:'',
	textAlign:'right',
	height:'auto',
	font:{fontSize:16,fontWeight:'bold'},
	right:45,
	bottom:10
});
headerView.add(username);

profile.addEventListener("click",function(e) {
  Titanium.App.fireEvent("profileClicked");
});