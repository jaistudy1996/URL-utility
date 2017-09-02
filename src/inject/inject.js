/* jshint esversion:6 */
// Global variables
var selectedText = "";
var urlRegEx = /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/;


var port = chrome.runtime.connect({name: "redirect"});
window.onload = function(){
	console.log("doc loaded");
	document.onmouseup = function(){
		selectedText = window.getSelection().toString();
		sendReqToBackground(selectedText);
		// if(urlRegEx.test(selectedText)){
		// 	// send seleted text to background
		// 	port.postMessage({url: selectedText});
		// }
	};
	let anchorTags = document.getElementsByTagName('a');
	for(let i=0; i<anchorTags.length; i++){
		anchorTags[i].onmouseover = function(){
			sendReqToBackground(anchorTags[i].href);
		};
	}
};

port.onMessage.addListener(function(response){
	console.log(response);
	console.log(window.getSelection());
	window.getSelection().anchorNode.parentNode.onmouseover = function(e){
		console.log('testing');
		nhpup.popup("hello");
	};
});

function sendReqToBackground(text){
	if(urlRegEx.test(text)){
		port.postMessage({url: text});
	}
}
