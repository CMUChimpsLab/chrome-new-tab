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
  console.log('ufnsd jnfjsdn fjsdn sf');
};

console.log('OMG!');
