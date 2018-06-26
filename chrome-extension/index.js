function showIframe(iframeElement){
    console.log("iframeElement " + iframeElement);
	var x = document.getElementById(iframeElement);
    var xStyle = window.getComputedStyle(x, null);
	if (xStyle.visibility === "hidden") {
        x.style.visibility = "initial";
    } else {
        x.style.visibility = "hidden";
    }
}

function allButtonToggleListener(){
    var x = document.getElementsByClassName("toggleFrame");
    for (var i = 0; i < x.length; i++){
        console.log("add one");
        let item = x[i];
        item.addEventListener("click", ()=>{
            console.log("item.value " + item.value);
            showIframe(item.value);
        });
    }
}
allButtonToggleListener();