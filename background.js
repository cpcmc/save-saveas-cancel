var current_url = "";
var run_clicked = false;
var save_clicked = false;
var cancel_clicked = false;
var bar_active = false;

chrome.downloads.onCreated.addListener(function(downloadItem) {
    if(!downloadItem.finalUrl.endsWith(".exe")) {
      chrome.downloads.setShelfEnabled(true);
      return;
    }

    if(!bar_active) {
      chrome.downloads.setShelfEnabled(false);
      chrome.downloads.cancel(downloadItem.id);
      current_url = downloadItem.url;
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {"name": "create-div"});
      });
      bar_active = true;
      return;
    }

    if(!run_clicked && !save_clicked) {
      chrome.downloads.setShelfEnabled(false);
      chrome.downloads.cancel(downloadItem.id);
      return;
    }

    //normal download
    run_clicked = false;
    save_clicked = false;
});

chrome.runtime.onMessage.addListener(function(message) {
  if (message.name == "run-clicked") {
    run_clicked = true;
    chrome.downloads.download({"url": current_url, "saveAs": false});
    return;
  }

  if (message.name == "save-clicked") {
    save_clicked = true;
    chrome.downloads.download({"url": current_url});
    return;
  }

  if (message.name == "cancel-clicked") {
    current_url = "";
    bar_active = false;
    return;
  }
});
