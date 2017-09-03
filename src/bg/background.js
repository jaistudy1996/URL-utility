/* jshint esversion:6*/

// get active tab and connect to port named redirect and set up

chrome.runtime.onConnect.addListener(function(port){
  port.onMessage.addListener(function(response){
    console.log(response);

  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.onreadystatechange = function(){
    console.log(this);
    if(this.readyState == 4 && this.status == 200){
        sendResponse({responseURL: xhr.responseURL});
        console.log(xhr.responseURL);
    }
  };
  xhr.open("GET", request.url, true);
  xhr.send();
  return true; // needed to use sendResponse asynchronously
});
