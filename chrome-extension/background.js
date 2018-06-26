// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ color: '#3aa757' }, function() {
    console.log('The color is green.');
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

  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    console.log(info);
    console.log(tab);
    console.log('POST');
    alert('POST the server and wait for response...');
  });
});
