


// message handler between background script
chrome.extension.sendMessage({test: "test"}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		console.log(response);
		// ----------------------------------------------------------

	}
	}, 10);
});
