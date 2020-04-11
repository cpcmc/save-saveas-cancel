var current_url = "";
var save_clicked = false;
var saveas_clicked = false;
var cancel_clicked = false;
var popup_active = false;

chrome.downloads.onCreated.addListener(function(downloadItem) {
  //a certain link was clicked
  if (!popup_active) {
    //cancel download
    chrome.downloads.cancel(downloadItem.id);
    //send msg to draw popup
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
          "msgName": "create-popup",
          "fileName": filename,
          "fileSize": file_size
        });
      });
    });
    popup_active = true;
    return;
  }

  //a different link was clicked
  if (!save_clicked && !saveas_clicked) {
    //cancel download
    chrome.downloads.cancel(downloadItem.id);
    return;
  }

  //either save or saveas clicked
  if (save_clicked || saveas_clicked) {
    //allow download
    save_clicked = false;
    saveas_clicked = false;
  }
});

chrome.runtime.onMessage.addListener(function(message) {
  //save clicked
  if (message.name == "save-clicked") {
    save_clicked = true;
    //save download
    chrome.downloads.download({
      "url": current_url
    });
    return;
  }

  //saveas clicked
  if (message.name == "saveas-clicked") {
    saveas_clicked = true;
    //saveas download
    chrome.downloads.download({
      "url": current_url,
      "saveAs": true //force saveas dialog
    });
    return;
  }

  //cancel clicked
  if (message.name == "cancel-clicked") {
    current_url = "";
    popup_active = false;
    return;
  }
});

chrome.downloads.onChanged.addListener(function(downloadDelta) {
  //one or more properties of download changed
  if ("filename" in downloadDelta) { //save or saveas + save
    //send msg to delete popup
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        "msgName": "close-bar"
      });
    });
    current_url = "";
    popup_active = false;
  }
});