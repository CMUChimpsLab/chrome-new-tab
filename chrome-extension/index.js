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

function compare(a,b) {
  if (a.visitCount < b.visitCount)
    return 1;
  if (a.visitCount > b.visitCount)
    return -1;
  return 0;
}

function uniqueTitle(a) {
  var seen = {};
  return a.filter(function(obj) {
    return seen.hasOwnProperty(obj.title) ? false : (seen[obj.title] = true);
  });
}

function cropTitle(title) {
  if (title.length > 15) {
    return title.substring(0,13) + '...';
  } else {
    return title;
  }
}

function populateMvs() {

  // reset history
  document.getElementById('history').innerHTML = "";

  // mv stores [{id: 0, title: "", url: ""}, {...}]
  chrome.storage.sync.get('userFavs', function(data) {

    if (!data.userFavs) {
      chrome.storage.sync.set({'userFavs': []}, function() {
        console.log('userFavs set to []');
      });
    }

    // chrome.storage.sync.set({'userFavs': []}, function() {
    //   console.log('userFavs set to []');
    // });

    const userFavs = data.userFavs || [];
    console.log(userFavs);

    userFavs.map((uObj, index) => {
      if (index >= 9) return;
      const title = cropTitle(uObj.title);
      document.getElementById('history').innerHTML += '<a title="'+uObj.title+'" class="hObj button" href="'+uObj.url+'"><div>'+ title + '</div><span class="remove" title="CLICK@">&#10005;</span></a>';
    });
    

    // fill rest with most visited from history
    chrome.history.search({text: ''}, result => {
      console.log(result);

      // filter unique results by title
      result = uniqueTitle(result);

      // sort by most visited
      result.sort(compare);

      // insert
      result.map((hObj, index) => {
        if (index >= 9 - userFavs.length) return;
        let title = cropTitle(hObj.title);
        document.getElementById('history').innerHTML += '<a title="'+hObj.title+'" class="hObj button" href="'+hObj.url+'"><div>'+ title + '</div></a>';
      });
      document.getElementById('history').innerHTML += '<button title="Add shortcut" id="add-link" class="hObj" href="#"><div>' + '+' + '</div></button>';
    
      let addDialog = document.getElementById('addbox');
      let addButton = document.getElementById('add-link');
    
      // add listener
      addButton.addEventListener('click', function() {
        addDialog.showModal();
      });
    });
    }
  );
}

populateMvs();

document.getElementById("doneBtn").addEventListener("click", function(event) {
    event.preventDefault();
    const formTitle = document.getElementById("formTitle").value;
    const formUrl = document.getElementById("formUrl").value;
    console.log(formTitle, formUrl);
    chrome.storage.sync.get('userFavs', function(data) {
      console.log(data);
      if (Object.keys(data).length === 0) {
        chrome.storage.sync.set({'userFavs': [{title:formTitle, url:formUrl}]}, function() {
          console.log('New favs set!');
          document.getElementById('addbox').close();
        });
      } else {
        const newFavs = data.userFavs;
        newFavs.push({title:formTitle, url:formUrl});
        chrome.storage.sync.set({'userFavs': newFavs}, function() {
          console.log('New favs set!');
          document.getElementById('addbox').close();
          populateMvs();
        });
      }      
    });
});

document.getElementById("cancelBtn").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById('addbox').close();
});

// let removes = document.getElementsByClassName("remove");

// TODO: add eventListener to click on span elems
// remove parent elem by ID from userFavs in store!
