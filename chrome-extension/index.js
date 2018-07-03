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

chrome.storage.sync.get('guid', function(data) {
  console.log('your guid is: ' + JSON.stringify(data.guid));
  document.getElementById('iframe3').src =
    'http://localhost:3000/emailapp/' + data.guid;
  document.getElementById('iframe3').contentWindow.location.reload(true);
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
