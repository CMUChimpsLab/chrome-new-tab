function showIframe(iframeElement) {
  console.log("iframeElement " + iframeElement);
  var x = document.getElementById(iframeElement);
  var xStyle = window.getComputedStyle(x, null);
  if (xStyle.visibility === "hidden") {
    x.style.visibility = "initial";
  } else {
    x.style.visibility = "hidden";
  }
}

// chrome.storage.sync.get('guid', function(data) {
//   console.log('your guid is: ' + JSON.stringify(data.guid));
//   document.getElementById('gus').innerHTML =
//     '<iframe style="visibility: initial" id="iframe3" src="https://chrome-new-tab.herokuapp.com/emailapp/' +
//     data.guid +
//     '"></iframe>';
// });

function allButtonToggleListener() {
  var x = document.getElementsByClassName("toggleFrame");
  for (var i = 0; i < x.length; i++) {
    console.log("add one");
    let item = x[i];
    item.addEventListener("click", () => {
      console.log("item.value " + item.value);
      showIframe(item.value);
    });
  }
}
allButtonToggleListener();
