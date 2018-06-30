// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
}

// chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
// chrome.browserAction.setBadgeText({ text: 'Hey!' });

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ color: '#3aa757', guid: guid() }, function() {
    chrome.storage.sync.get('guid', function(store) {
      let user = {
        guid: store.guid,
        emails: [],
      };

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        console.log(this.readyState + ' ' + this.status);
        if (this.status >= 200 && this.status < 300 && this.readyState === 4) {
          console.log('Thanks for sharing this email!');
        }
      };

      xhttp.open('POST', 'http://localhost:3000/api/v1/chrome-users', true);
      xhttp.setRequestHeader('Content-Type', 'application/json');
      xhttp.send(JSON.stringify(user));
    });
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'mail.google.com' },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });

  chrome.contextMenus.create({
    id: 'phishy',
    title: 'Check if this subject is phishy',
    type: 'normal',
    contexts: ['selection'],
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
  if (request.action == 'xhttp') {
    var xhttp = new XMLHttpRequest();
    var method = request.method ? request.method.toUpperCase() : 'GET';

    xhttp.onload = function() {
      callback(xhttp.responseText);
    };

    xhttp.onerror = function() {
      // Do whatever you want on error. Don't forget to invoke the
      // callback to clean up the communication port.
      callback();
    };

    xhttp.open(method, request.url, true);
    if (method == 'POST') {
      xhttp.setRequestHeader(
        'Content-Type',
        'application/x-www-form-urlencoded',
      );
    }
    xhttp.send(request.data);
    return true; // prevents the callback from being called too early on return
  }
  // if (request.action == 'xhttp') {
  // var xhttp = new XMLHttpRequest();
  // var method = request.method ? request.method.toUpperCase() : 'GET';

  // xhttp.onload = function() {
  //   callback(xhttp.responseText);
  // };

  // xhttp.onerror = function() {
  //   // Do whatever you want on error. Don't forget to invoke the
  //   // callback to clean up the communication port.
  //   callback('YEah!');
  // };

  // xhttp.onreadystatechange = function() {
  //   if (this.readyState == 4 && this.status == 201) {
  //     callback('success!');
  //   }
  // };

  // xhttp.open(method, request.url, true);

  // if (method == 'POST') {
  //   xhttp.setRequestHeader('Content-Type', 'application/json');
  // }

  // xhttp.send(request.data);
  // callback('hey');
  // return true; // prevents the callback from being called too early on return
  //}
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  alert('heyy!');
  const data = {
    text: info.selectionText,
    createdAt: new Date(),
  };

  chrome.runtime.sendMessage(
    {
      method: 'POST',
      action: 'xhttp',
      url: 'http://localhost:3000/api/v1/test',
      data: 'hi there',
    },
    function(response) {
      alert(response);
      console.log('lolol!');
    },
  );
});
