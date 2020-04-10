var current_url = "";
var save_clicked = false;
var saveas_clicked = false;
var cancel_clicked = false;
var bar_active = false;

chrome.downloads.onCreated.addListener(function(downloadItem) {
  console.log(downloadItem); //FIXME

  //not an executable file
  if (!downloadItem.finalUrl.endsWith(".exe")) {
    chrome.downloads.setShelfEnabled(true);
    return;
  }

  //a certain link was clicked
  if (!bar_active) {
    chrome.downloads.setShelfEnabled(false);
    chrome.downloads.cancel(downloadItem.id);
    current_url = downloadItem.url;
    var filename_list = downloadItem.url.split("/")
    var filename = filename_list[filename_list.length - 1];
    var file_size = downloadItem.fileSize;
    chrome.downloads.getFileIcon(downloadItem.id, function(iconURL) {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          "msgName": "create-div",
          "fileName": filename,
          "fileSize": file_size,
          "iconUrl": iconURL
        });
      });
    });
    bar_active = true;
    return;
  }

  //another link was clicked
  if (!save_clicked && !saveas_clicked) {
    //chrome.downloads.setShelfEnabled(false);
    chrome.downloads.cancel(downloadItem.id);
    return;
  }

  //normal download
  console.log("normal download")
  chrome.downloads.setShelfEnabled(true);
  save_clicked = false;
  saveas_clicked = false;
});

chrome.runtime.onMessage.addListener(function(message) {
  if (message.name == "save-clicked") {
    save_clicked = true;
    chrome.downloads.download({
      "url": current_url
    });
    return;
  }

  if (message.name == "saveas-clicked") {
    saveas_clicked = true;
    chrome.downloads.download({
      "url": current_url,
      "saveAs": true
    });
    return;
  }

  if (message.name == "cancel-clicked") {
    current_url = "";
    bar_active = false;
    return;
  }
});

chrome.downloads.onChanged.addListener(function(downloadDelta) {
  console.log(downloadDelta);
  if ("filename" in downloadDelta) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        "msgName": "close-bar"
      });
    });
    current_url = "";
    bar_active = false;
  }
});