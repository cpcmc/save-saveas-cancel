chrome.runtime.onMessage.addListener(function(message) {
        if (message.name == "create-div") {
            var div = document.createElement("div");
            div.id = "div-fixed"
            div.style.position = "fixed";
            div.style.left = "0";
            div.style.bottom = "0";
            div.style.width = "100%";
            div.style.backgroundColor = "black";
            div.style.color = "white";
            div.style.textAlign = "center";
            div.style.width = "100%";
            div.style.height = "50px";

            var run = document.createElement("button");
            run.id = "button-run";
            run.onclick = function() {
              console.log("run!");
              chrome.runtime.sendMessage({"name": "run-clicked"});
            }
            run.innerHTML = "Run";
            div.appendChild(run);

            var save = document.createElement("button");
            save.id = "button-save";
            save.onclick = function() {
              console.log("save!");
              chrome.runtime.sendMessage({"name": "save-clicked"});
            }
            save.innerHTML = "Save";
            div.appendChild(save);

            var cancel = document.createElement("button");
            cancel.id = "button-cancel";
            cancel.onclick = function() {
              console.log("cancel!");
              var element = document.getElementById("div-fixed");
              element.parentNode.removeChild(element);
              chrome.runtime.sendMessage({"name": "cancel-clicked"});
            }
            cancel.innerHTML = "X";
            div.appendChild(cancel);

            document.body.appendChild(div);
        }
});
