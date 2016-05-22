
//so far it takes clipboard content
//next step is uploading it

var file;

function upload(i, file){
    var ext = i.slice(i.length-4);
    if(ext!=".png"||ext!="jpeg"||ext!=".jpg"||ext!=".gif")i+=".png"
    var url = "http://localhost:3000/?name="+i;
    var oReq = new XMLHttpRequest();
    oReq.open("POST", url, true);
    oReq.onload = function(oEvent){
        // loading....
    }
    oReq.onloadend = function(data){
        // loading done!
        console.log(oReq.response);
        var link = document.createElement("div");
        link.innerHTML = oReq.response;
        document.activeElement.appendChild(link);
        var range = document.createRange();
        range.selectNode(link);
        window.getSelection().addRange(range);
        document.execCommand('copy');
    }
    oReq.send(file);
}

window.addEventListener("paste", function (e) {
    for(var i=0;i<e.clipboardData.items.length;i++) {
        var item = e.clipboardData.items[i];
        //console.log(item);
        if(item.kind=="string" && item.type=="text/plain"){
            var text = item.getAsString(function(i){
                //console.log(i,file);
                if(file){
                    upload(i,file);
                }
                var div = document.createElement("div");
                div.innerHTML = i;
                document.activeElement.appendChild(div);
            });
        }
        else if(item.kind=="file"){
            file = item.getAsFile();
            var i = "a"+Date.now();
            upload(i,file);
            var URLObj = window.URL || window.webkitURL;
            var source = URLObj.createObjectURL(file);
            
            var pastedImage = new Image();
            pastedImage.onload = function() {
                //now have the image!
            }
            pastedImage.src = source;
            document.activeElement.appendChild(pastedImage);
        }
    }
});
document.addEventListener('DOMContentLoaded', function () {
    document.execCommand('paste');
    //console.log(getClipboardText());
});