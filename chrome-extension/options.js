'use strict';

const SERVER_URL= 'http://localhost:3000';
// const SERVER_URL = 'https://chrome-new-tab.herokuapp.com/';


function setCookieCatcher() {
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
}

function clearCookies() {
  chrome.permissions.remove({
    permissions: ['cookies']
  }, function(removed) {
    if (removed) {
      // The permissions have been removed.
      console.log('Permission removed.')
    } else {
      // The permissions have not been removed (e.g., you tried to remove
      // required permissions).
    }
  });
  
  // get user guid
  chrome.storage.sync.get('guid', function(store) {

    const cookieData = {
      data: null
    };

    // send it to server
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.status >= 200 && this.status < 300 && this.readyState === 4) {
        console.log('Cookies cleared!!!');
        alert('Cookies cleared. You\'re all set! :)')
      }
    };

    xhttp.open('POST', SERVER_URL + '/api/v1/cookies/' + store.guid, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(cookieData));

  });

}

function setCookiesPermission() {
  // request permission
  chrome.permissions.request({
    permissions: ['cookies'],
    origins: ['https://www.facebook.com/']
  }, function(granted) {

    // The callback argument will be true if the user granted the permissions.
    if (granted) {

      // set up cookie listener
      setCookieCatcher();

      // open facebook
      window.open('https://facebook.com', '_blank');

      // change action in button
      document.getElementById('accept-cookies').innerText = 'Clear cookies';
      document.getElementById('accept-cookies').classList.add('clearCookies');
      document.getElementById('accept-cookies').removeEventListener('click', setCookiesPermission);
      document.getElementById('accept-cookies').addEventListener('click', clearCookies);

    } else {
      console.log("Oh No :/")
    }
  });
}

document.getElementById('accept-cookies').addEventListener('click', setCookiesPermission);



chrome.storage.sync.get('guid', (store) => {
  document.getElementById('subject-id').innerHTML = "<b>Subject ID</b>: " + store.guid;
});




// let page = document.getElementById('buttonDiv');
// let guid = document.getElementById('guid');
// const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
// function constructOptions(kButtonColors) {
//   for (let item of kButtonColors) {
//     let button = document.createElement('button');
//     button.style.backgroundColor = item;
//     button.addEventListener('click', function() {
//       chrome.storage.sync.set({ color: item }, function() {
//         console.log('color is ' + item);
//       });
//     });
//     page.appendChild(button);
//   }
// }
// constructOptions(kButtonColors);

// chrome.storage.sync.get('guid', function(data) {
//   guid.innerText = 'your guid is ' + JSON.stringify(data.guid);
// });

// let button = document.getElementById('submit');

// button.onclick = () => {
//   const form = document.getElementById('form');

//   const isValidElement = element => {
//     return element.name && element.value;
//   };

//   const formToJSON = elements =>
//     [].reduce.call(
//       elements,
//       (data, element) => {
//         if (isValidElement(element)) {
//           data[element.name] = element.value;
//         }
//         return data;
//       },
//       {},
//     );

//   const data = formToJSON(form.elements);

//   chrome.storage.sync.get('guid', function(store) {
//     data.guid = store.guid;
//     data.emails = []; //important!
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//       console.log(this.readyState + ' ' + this.status);
//       if (this.readyState == 4 && this.status === 201) {
//         alert('Thanks for sharing this email!');
//       }
//     };

//     xhttp.open('POST', 'http://localhost:3000/api/v1/chrome-users', true);
//     xhttp.setRequestHeader('Content-Type', 'application/json');
//     xhttp.send(JSON.stringify(data));

//     form.reset();
//   });
// };