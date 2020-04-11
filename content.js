chrome.runtime.onMessage.addListener(function(message) {
  if (message.msgName == "create-popup") {

    //popup black frame
    var popup = document.createElement("div");
    popup.id = "popup-fixed"
    popup.style.position = "fixed";
    popup.style.right = "25px";
    popup.style.top = "25px";
    popup.style.width = "356px";
    popup.style.height = "144px";
    popup.style.backgroundColor = "black";
    popup.style.borderRadius = "15px";

    //filename text
    var file_name = document.createElement("div");
    file_name.id = "txt-name"
    file_name.style.position = "absolute";
    file_name.style.left = "21px";
    file_name.style.top = "21px";
    file_name.style.width = "356px";
    file_name.style.height = "144px";
    file_name.style.color = "white";
    file_name.style.fontSize = "24px";
    file_name.innerHTML = message.fileName;
    popup.appendChild(file_name);

    //filesize text
    var file_size = document.createElement("div");
    file_size.id = "txt-name"
    file_size.style.position = "absolute";
    file_size.style.left = "21px";
    file_size.style.top = "50px";
    file_size.style.width = "356px";
    file_size.style.height = "144px";
    file_size.style.color = "white";
    file_size.style.fontSize = "18px";
    file_size.innerHTML = String(Math.round(message.fileSize / 1000)) + " kb";
    popup.appendChild(file_size);

    //save button
    var save = document.createElement("button");
    save.style.position = "absolute";
    save.style.width = "146px";
    save.style.height = "37px";
    save.style.left = "21px";
    save.style.top = "86px";
    save.style.color = "white";
    save.style.backgroundColor = "black";
    save.style.border = "2px solid #FFFFFF";
    save.style.boxSizing = "border-box";
    save.style.borderRadius = "15px";
    save.style.textAlign = "center";
    save.style.display = "inline-block";
    save.style.cursor = "pointer";
    save.style.fontSize = "22px";
    save.id = "button-save";
    save.onclick = function() {
      chrome.runtime.sendMessage({
        "name": "save-clicked"
      });
    }
    save.innerHTML = "save";
    popup.appendChild(save);

    //saveas button
    var save_as = document.createElement("button");
    save_as.style.position = "absolute";
    save_as.style.width = "146px";
    save_as.style.height = "37px";
    save_as.style.left = "189px";
    save_as.style.top = "86px";
    save_as.style.color = "white";
    save_as.style.backgroundColor = "black";
    save_as.style.border = "2px solid #FFFFFF";
    save_as.style.boxSizing = "border-box";
    save_as.style.borderRadius = "15px";
    save_as.style.textAlign = "center";
    save_as.style.display = "inline-block";
    save_as.style.cursor = "pointer";
    save_as.style.fontSize = "22px";
    save_as.id = "button-saveas";
    save_as.onclick = function() {
      chrome.runtime.sendMessage({
        "name": "saveas-clicked"
      });
    }
    save_as.innerHTML = "save as";
    popup.appendChild(save_as);

    //cancel button
    var cancel = document.createElement("button");
    cancel.style.position = "absolute";
    cancel.style.width = "17px";
    cancel.style.height = "17px";
    cancel.style.left = "310px";
    cancel.style.top = "21px";
    cancel.style.color = "white";
    cancel.style.backgroundColor = "black";
    cancel.style.border = "none";
    cancel.style.boxSizing = "border-box";
    cancel.style.borderRadius = "15px";
    cancel.style.textAlign = "center";
    cancel.style.display = "inline-block";
    cancel.style.fontSize = "22px";
    cancel.style.cursor = "pointer";
    cancel.style.padding = "0";
    cancel.id = "button-cancel";
    cancel.onclick = function() {
      var element = document.getElementById("popup-fixed");
      element.parentNode.removeChild(element);
      chrome.runtime.sendMessage({
        "msgName": "cancel-clicked"
      });
    }
    cancel.innerHTML = "x";
    popup.appendChild(cancel);

    //inject popup
    document.body.appendChild(popup);
    return;
  }

  if (message.msgName == "close-bar") {
    var element = document.getElementById("popup-fixed");
    element.parentNode.removeChild(element);
    return;
  }
});