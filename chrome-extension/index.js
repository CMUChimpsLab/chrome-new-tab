// const SERVER_URL = 'https://chrome-new-tab.herokuapp.com';
const SERVER_URL = 'http://localhost:3000';


function showIframe(iframeElement) {
  console.log('iframeElement ' + iframeElement);
  var x = document.getElementById(iframeElement);
  var xStyle = window.getComputedStyle(x, null);
  if (xStyle.visibility === 'hidden') {
    x.style.visibility = 'initial';
  } else {
    x.style.visibility = 'hidden';
  }
}

// TODO: Focus on input on window load
// window.addEventListener('load', () => {
//   document.getElementById("input").focus();
// } , false );


chrome.storage.sync.get('guid', function(data) {
  document.getElementById('facebook-app').innerHTML =
    '<div class="section-iframe"><iframe style="visibility: initial " iframeBorder="0" src="'+SERVER_URL+'/facebookapp/' +
    data.guid +
    '"></iframe></div>';
});

function allButtonToggleListener() {
  var x = document.getElementsByClassName('toggleFrame');
  for (var i = 0; i < x.length; i++) {
    console.log('add one');
    let item = x[i];
    item.addEventListener('click', () => {
      console.log('item.value ' + item.value);
      showIframe(item.value);
    });
  }
}
allButtonToggleListener();
