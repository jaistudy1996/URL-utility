/* jshint esversion:6*/

// get active tab and connect to port named redirect and set up

chrome.runtime.onConnect.addListener(function(port){
  port.onMessage.addListener(function(response){
    console.log(response);
    let xhr = new XMLHttpRequest();
  	xhr.responseType = 'json';
  	xhr.onreadystatechange = function(){
      console.log(this);
  		if(this.readyState == 4 && this.status == 200){
          port.postMessage(xhr.responseURL);
  				console.log(xhr.responseURL);
  		}
  	};
    xhr.open("GET", response.url, true);
    xhr.send();
  });
});
