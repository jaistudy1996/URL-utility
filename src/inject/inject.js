/* jshint esversion:6 */
// Global variables
var selectedText = "";
var urlRegEx = /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/;


// var port = chrome.runtime.connect({name: "redirect"});
window.onload = function(){
	console.log("doc loaded");
	document.onmouseup = function(){
		selectedText = window.getSelection().toString();
		sendReqToBackground(selectedText);
	};
	let anchorTags = document.getElementsByTagName('a');
	for(let i=0; i<anchorTags.length; i++){
		sendReqToBackground(anchorTags[i].href, anchorTags[i]);
	}
};

function sendReqToBackground(text, node){
	if(urlRegEx.test(text)){
		chrome.runtime.sendMessage({url: text}, function(response) {
		  // console.log(response.responseURL);
			// console.log(node);
			node.onmouseover = function(){
				nhpup.popup(`${response.responseURL}`);
			};
		});
	}
}
