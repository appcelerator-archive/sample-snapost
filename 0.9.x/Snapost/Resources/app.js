Titanium.UI.setBackgroundColor('#000');

//The image we will upload to TwitPic
var theImage = null;
var theThumbnail = null;

//Include app header
Titanium.include('header.js');

//Construct main content views
Titanium.include('chooser.js'); // Creates a 'chooser' view we manipulate in the main app
Titanium.include('config.js'); // Creates a 'config' view we manipulate in the main app
Titanium.include('result.js'); // Creates a 'result' view we manipulate in the main app
Titanium.include('confirm.js'); // Creates a 'confirm' view we manipulate in the main app

//Create view container (allows us to do nice transitions)
var viewContainer = Titanium.UI.createView({
  top:60,
  width:320,
  height:420
});

//Add main content views to container
viewContainer.add(chooser);
viewContainer.add(config);
viewContainer.add(result);
viewContainer.add(confirmation);

//modify view visibility for navigation
function showConfig() {
  viewContainer.animate({view:config,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
  chooser.visible = false;
  config.visible = true;
  result.visible = false;
  confirmation.visible = false;
}

function showChooser() {
  viewContainer.animate({view:chooser,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
  chooser.visible = true;
  config.visible = false;
  result.visible = false;
  confirmation.visible = false;
}

function showResult() {
  viewContainer.animate({view:result,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
  chooser.visible = false;
  config.visible = false;
  result.visible = true;
  confirmation.visible = false;
}

function showConfirmation() {
  viewContainer.animate({view:confirmation,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
  chooser.visible = false;
  config.visible = false;
  result.visible = false;
  confirmation.visible = true;
}

//Handle navigation events
Titanium.App.addEventListener("profileClicked", function(e) {
  if (!config.visible) {
    showConfig();
  }
  else {
    showChooser();
  }
});

//Create main app window
var app = Ti.UI.createWindow({
  backgroundImage:'images/bg.png'
});
app.add(headerView);
app.add(viewContainer);
app.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});

//Check if we have saved Twitter info - auto-nav to credentials page if not
var storedUsername = Titanium.App.Properties.getString("un");
if (storedUsername == null || storedUsername == '') {
  showConfig();
}
else {
  username.text = storedUsername;
}

if (!Titanium.Network.online) {
  var a = Titanium.UI.createAlertDialog({ 
    title:'Network Connection Required',
    message: 'Snapost requires an internet connection to, you know, upload stuff to the internet.  Check your network connection and try again.'
  });
	a.show();
}