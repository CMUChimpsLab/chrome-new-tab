console.log('HEyjdna');

function test() {
  alert('OMG IT WORKS!!!');
}

var div = document.createElement('div');
div.onclick = test;
div.id = 'test';
div.classList.add('gb_nb');
div.classList.add('gb_Pg');
div.classList.add('gb_R');
//div.classList.add('gb_Og');
div.classList.add('gb_T');
var button = document.createElement('button');
button.onclick = test;
button.innerText = 'Click me';
div.appendChild(button);
var gb = null;

// run some change when the style is mutated
// executed after page is refreshed
var loadingDiv = document.getElementById('loading');
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log('loading is gone!');
    gb = document.getElementById('gb');
    gb = gb.getElementsByClassName('gb_Qf gb_Pg');
    gb[0].appendChild(div);
    // test = document.getElementsByClassName('G-tF');
    // test[0].appendChild(div);
  });
});

observer.observe(loadingDiv, {
  attributes: true,
});

// runs when url changes
function checkHash() {
  console.log('hashchange!');
  console.log(window.location.hash);

  var test = document.getElementsByClassName('ha');

  if (gb) {
    console.log('gb defined!');

    if (window.location.hash !== '#inbox') {
      // gb[0].appendChild(div);
      //gb[0].getElementById('test').style.display = 'show';
    } else {
      //gb[0].getElementById('test').style.display = 'none';
    }

    // var div = document.createElement('div');
    // div.classList.add('G-Ni');
    // div.classList.add('J-J5-Ji');
    // div.innerText = 'test123213';
    //test[0].appendChild(div);
  } else {
    console.log('gb NOT defined');
  }
}
window.addEventListener('hashchange', checkHash);
checkHash();
