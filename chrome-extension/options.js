// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let page = document.getElementById('buttonDiv');
let guid = document.getElementById('guid');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({ color: item }, function() {
        console.log('color is ' + item);
      });
    });
    page.appendChild(button);
  }
}
constructOptions(kButtonColors);

chrome.storage.sync.get('guid', function(data) {
  guid.innerText = 'your guid is ' + JSON.stringify(data.guid);
});

let button = document.getElementById('submit');

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
    data.emails = []; //important!
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      console.log(this.readyState + ' ' + this.status);
      if (this.readyState == 4 && this.status === 201) {
        alert('Thanks for sharing this email!');
      }
    };

    xhttp.open('POST', 'http://localhost:3000/api/v1/chrome-users', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(data));

    form.reset();
  });
};
