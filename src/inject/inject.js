/* jshint esversion:6 */
// Global variables
var selectedText = "";
var urlRegEx = /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/;


var port = chrome.runtime.connect({name: "redirect"});
window.onload = function(){
	console.log("doc loaded");
	document.onmouseup = function(){
		selectedText = window.getSelection().toString();
		if(urlRegEx.test(selectedText)){
			// send seleted text to background
			port.postMessage({url: selectedText});
		}
	};
};

port.onMessage.addListener(function(response){
	console.log(response);
	console.log(window.getSelection());
	window.getSelection().anchorNode.parentNode.onmouseover = function(e){
		console.log('testing');
		nhpup.popup("hello");
	};
});
