chrome.runtime.onMessage.addListener(function(message) {
  if (message.msgName == "create-div") {
    console.log(message.iconUrl);
    var div = document.createElement("div");
    div.id = "div-fixed"
    div.style.position = "fixed";
    div.style.right = "25px";
    div.style.top = "25px";
    div.style.width = "356px";
    div.style.height = "144px";
    div.style.backgroundColor = "black";
    div.style.borderRadius = "15px";
    //div.style.color = "white";
    //div.style.textAlign = "center";

    var file_name = document.createElement("div");
    file_name.id = "txt-name"
    file_name.style.position = "absolute";
    file_name.style.left = "21px";
    file_name.style.top = "21px";
    file_name.style.width = "356px";
    file_name.style.height = "144px";
    //file_name.style.backgroundColor = "black";
    file_name.style.color = "white";
    //div.style.textAlign = "center";
    file_name.style.fontSize = "24px";
    file_name.innerHTML = message.fileName;
    div.appendChild(file_name);

    var file_size = document.createElement("div");
    file_size.id = "txt-name"
    file_size.style.position = "absolute";
    file_size.style.left = "21px";
    file_size.style.top = "50px";
    file_size.style.width = "356px";
    file_size.style.height = "144px";
    //file_name.style.backgroundColor = "black";
    file_size.style.color = "white";
    //div.style.textAlign = "center";
    file_size.style.fontSize = "18px";
    file_size.innerHTML = String(Math.round(message.fileSize / 1000)) + " kb";
    div.appendChild(file_size);

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
      console.log("save!");
      chrome.runtime.sendMessage({
        "name": "save-clicked"
      });
    }
    save.innerHTML = "save";
    div.appendChild(save);

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
      console.log("saveas!");
      chrome.runtime.sendMessage({
        "name": "saveas-clicked"
      });
    }
    save_as.innerHTML = "save as";
    div.appendChild(save_as);

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
    //cancel.style.backgroundImage = chrome.runtime.getURL("images/close.png");
    cancel.id = "button-cancel";
    cancel.onclick = function() {
      console.log("cancel!");
      var element = document.getElementById("div-fixed");
      element.parentNode.removeChild(element);
      chrome.runtime.sendMessage({
        "msgName": "cancel-clicked"
      });
    }
    cancel.innerHTML = "x";
    div.appendChild(cancel);

    document.body.appendChild(div);
  } else if (message.msgName == "close-bar") {
    console.log("close-bar!");
    var element = document.getElementById("div-fixed");
    element.parentNode.removeChild(element);
  }
});