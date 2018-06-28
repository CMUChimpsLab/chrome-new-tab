let changeColor = document.getElementById('changeColor');
let button = document.getElementById('submit');

// chrome.browserAction.setBadgeText({ text: '' });

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
  console.log('color changed!');
});

chrome.storage.sync.get('guid', function(data) {
  console.log('your guid is: ' + JSON.stringify(data.guid));
});

changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: 'document.body.style.backgroundColor = "' + color + '";',
    });
  });
};

button.onclick = () => {
  const form = document.getElementById('form');

  const isValidElement = element => {
    return element.name && element.value;
  };

  const formToJSON = elements =>
    [].reduce.call(
      elements,
      (data, element) => {
        if (isValidElement(element)) {
          data[element.name] = element.value;
        }
        return data;
      },
      {},
    );

  const data = formToJSON(form.elements);

  chrome.storage.sync.get('guid', function(store) {
    data.guid = store.guid;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      console.log(this.readyState + ' ' + this.status);
      if (this.readyState == 4 && this.status === 201) {
        alert('Thanks for sharing this email!');
      }
    };

    xhttp.open('POST', 'http://localhost:3000/api/v1/resolutions', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(data));

    form.reset();
  });
};

// window.setInterval(function() {
chrome.pageAction.setIcon({ imageData: draw(10, 0), tabId: tabId });
// }, 1000);

function draw(starty, startx) {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var img = new Image();
  img.src = './images/get_started16.png';
  img.onload = function() {
    context.drawImage(img, 0, 2);
  };

  //context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'rgba(255,0,0,1)';
  context.fillRect(startx % 19, starty % 19, 10, 10);
  context.fillStyle = 'white';
  context.font = '11px Arial';
  context.fillText('3', 0, 19);
  return context.getImageData(0, 0, 19, 19);
}
