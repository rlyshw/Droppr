
//so far it takes clipboard content
//next step is uploading it

window.addEventListener("paste", function (e) {
    for(var i=0;i<e.clipboardData.items.length;i++) {
        var item = e.clipboardData.items[i];
        console.log(item);
        if(item.kind=="string" && item.type=="text/plain"){
            var text = item.getAsString(function(i){
                var div = document.createElement("div");
                div.innerHTML = i;
                document.activeElement.appendChild(div);
            });
        }
        else if(item.kind=="file"){
            var file = item.getAsFile();
            console.log(file);
            var URLObj = window.URL || window.webkitURL;
            var source = URLObj.createObjectURL(file);
            
            var pastedImage = new Image();
            pastedImage.onload = function() {
                //now have the image!
            }
            pastedImage.src = source;
            console.log(pastedImage);
            document.activeElement.appendChild(pastedImage);
        }
    }
});
document.addEventListener('DOMContentLoaded', function () {
    document.execCommand('paste');
    //console.log(getClipboardText());
});