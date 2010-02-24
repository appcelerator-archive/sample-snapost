var config = Titanium.UI.createView({
  width:320,
  height:420,
  visible:false
});

var configLabel = Ti.UI.createLabel({
  text: 'Twitter Credentials:',
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

config.add(configLabel);

var usernameVal = Titanium.App.Properties.getString("un");
var passwordVal = Titanium.App.Properties.getString("pw");

var unField = Titanium.UI.createTextField({
	color:'#787878',
	value:usernameVal,
	height:35,
	top:95,
	width:250,
	hintText:'Twitter Username',
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocorrect:false
});
unField.addEventListener('return', function() {
	unField.blur();
});
unField.addEventListener('change', function(e) {
	usernameVal = e.value;
});

config.add(unField);

var pwField = Titanium.UI.createTextField({
	color:'#787878',
	value:passwordVal,
	height:35,
	top:135,
	width:250,
	hintText:'Twitter Password',
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocorrect:false,
	passwordMask:true
});
pwField.addEventListener('return', function() {
	pwField.blur();
});
pwField.addEventListener('change', function(e) {
	passwordVal = e.value;
});

config.add(pwField);

var saveButton = Titanium.UI.createButton({
  top:175,
	backgroundImage:'images/save-button.png',
	width:145,
	height:53
});
config.add(saveButton);

saveButton.addEventListener("click", function(e) {
  username.text = usernameVal;
  Titanium.App.Properties.setString("un",usernameVal);
  Titanium.App.Properties.setString("pw",passwordVal);
  showChooser();
});

config.addEventListener("click", function(e) {
  unField.blur();
  pwField.blur();
});