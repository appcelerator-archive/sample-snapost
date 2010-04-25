var result = Titanium.UI.createView({
  width:320,
  height:420,
  visible:false
});

var warp = Titanium.Media.createSound({url:'warp.caf'});
var yay = Titanium.Media.createSound({url:'yay.caf'});

var resultLabel = Ti.UI.createLabel({
  text: 'Magically beaming image...',
  textAlign:'center',
  font:{
    fontSize:18,
    fontFamily:'Trebuchet MS',
    fontWeight:'bold',
    fontStyle:'italic'
  },
  height:'auto',
  width:'auto',
  color:'#fff',
  top:120
});
result.add(resultLabel);

var ind = Titanium.UI.createProgressBar({
	width:200,
	height:50,
	min:0,
	max:1,
	value:0,
	style:Titanium.UI.iPhone.ProgressBarStyle.BAR,
	top:150,
	message:'Upload Progress:',
	font:{fontSize:12, fontWeight:'bold'},
	color:'#fff'
});

result.add(ind);
ind.show();

//Listen for post event
Titanium.App.addEventListener("postClicked", function(e) {
  showResult();
	ind.show();
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onerror = function(e) {
	  ind.hide();
	  var a = Titanium.UI.createAlertDialog({ 
	    title:'Well, this is awkward...',
	    message: 'We had a problem posting your image - please try again'
	  });
		a.show();
		showChooser();
	};
	xhr.onload = function() {
	  ind.hide();
	  var doc = this.responseXML.documentElement;
	  
	  if (doc.getElementsByTagName("err") != null && doc.getElementsByTagName("err").length > 0) {
	    var a = Titanium.UI.createAlertDialog({ 
  	    title:'Well, this is awkward...',
  	    message: 'TwitPic error: '+doc.getElementsByTagName("err").item(0).getAttribute("msg")
  	  });
  		a.show();
	  }
	  else {
	    resultLabel.text = 'Upload Complete!';
  	  yay.play();
	  }
	  
	  ind.value = 0;
    setTimeout(function() {
      showChooser();
      resultLabel.text = 'Magically beaming image...';
    },2000);
	};
	xhr.onsendstream = function(e) {
		ind.value = e.progress;
	};
	xhr.open('POST','https://twitpic.com/api/uploadAndPost');
  xhr.send({
    media:theImage,
    username:Titanium.App.Properties.getString("un"),
    password:Titanium.App.Properties.getString("pw"),
    message:e.message
  });
  warp.play();
});