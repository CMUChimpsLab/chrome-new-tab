let changeColor = document.getElementById('changeColor');
let button = document.getElementById('submit');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
  console.log('color changed!');
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
};
