/* jshint esversion:6*/

// get active tab and connect to port named redirect and set up

chrome.runtime.onConnect.addListener(function(port){
  port.onMessage.addListener(function(response){
    console.log(response);

  });
});

chrome.webRequest.onHeadersReceived.addListener(
    function(info) {
      console.log(info);
      var headers = info.responseHeaders;
      var index = headers.findIndex(x=>x.name.toLowerCase() == "x-frame-options");
      if (index !=-1) {
        headers.splice(index, 1);
      }
      return {responseHeaders: headers};
    },
    {
        urls: ['<all_urls>'], //
        types: ['sub_frame']
    },
    ['blocking', 'responseHeaders']
);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'text';
  xhr.onreadystatechange = function(){
    console.log(this);
    if(this.readyState == 4 && this.status == 200){
        let xhrImage = new XMLHttpRequest();
        let imageURL;
        imageURL = xhr.responseURL.search("https://") != -1 ? xhr.responseURL.replace("https://", "") : xhr.responseURL.replace("http://", "");
        xhrImage.responseType = 'text';
        xhrImage.onreadystatechange = function(){
          if(this.readyState == 4 && this.status == 200){
            console.log(this);
            sendResponse({responseURL: xhr.responseURL, responseWebpage: xhrImage.responseURL});
          }
        };
        xhrImage.open('GET', 'http://www.jayantarora.com/api/screenshot/'+imageURL, true);
        xhrImage.send();
        console.log(xhr.responseURL);
    }
  };
  xhr.open("GET", request.url, true);
  xhr.send();
  return true; // needed to use sendResponse asynchronously
});
