
//so far it takes clipboard content
//next step is uploading it

var file;

function upload_file(i, file){
    console.log("uploading file");
    var ext = i.slice(i.length-4);
    //if(ext!=".png"||ext!="jpeg"||ext!=".jpg"||ext!=".gif"||ext[0]!=".")i+=".png"
    if(ext[0]!=".")i+=".png";
    var url = "http://localhost:1281/?name="+i;
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
function upload_text(i){
    console.log("uploading text")
    var url = "http://128.4.12.128:1281/?name="+Date.now()+".txt";
    var oReq = new XMLHttpRequest();
    oReq.open("POST",url,true);
    oReq.onloadend = function(data){
        console.log(oReq.response);
        var link = document.createElement("div");
        link.innerHTML = oReq.response;
        document.activeElement.appendChild(link);
        var range = document.createRange();
        range.selectNode(link);
        window.getSelection().addRange(range);
        document.execCommand('copy');
    }
    var formData = new FormData();
    formData.append("text",i);
    oReq.send(i);
}

window.addEventListener("paste", function (e) {
    for(var i=0;i<e.clipboardData.items.length;i++) {
        var item = e.clipboardData.items[i];
        //console.log(item);
        if(item.kind=="string" && item.type=="text/plain"){
            var text = item.getAsString(function(i){
                //console.log(i,file);
                if(file){
                    console.log(file.size);
                    upload_file(i.replace(/ /g,''),file);
                }
                else if(!file){
                    upload_text(i);
                }
                var div = document.createElement("div");
                div.innerHTML = i;
                document.activeElement.appendChild(div);
            });
        }
        else if(item.kind=="file"){
            file = item.getAsFile(function(f){
                console.log(f);
            });
            var i = "a"+Date.now();
            if(e.clipboardData.items.length==1)upload_file(i,file);
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
