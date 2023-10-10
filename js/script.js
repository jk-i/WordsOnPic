// Your key here!
const keyPexel = ``;
const keyGoogle = ``;

// Pexel
document.querySelector('#get-photo').addEventListener('click', getFetchPic);

function getFetchPic() {
    let searchQuery = document.querySelector('#search-topic').value || `background`;
    const url = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=1`;

    fetch(urlfetch(url, {
      headers: {
          Authorization: keyPexel;
      }
    })
    .then(res => res.json())
    .then(data => {
      const picLinkDOM = document.querySelector('#pic-link');
      const picAuthorDOM = document.querySelector('#pic-author');
      document.querySelector('#image-container').style.backgroundImage = `url("${data.photos[0].src.large});`;

      document.querySelector('#pic-link').href = data.photos[0].url;
      document.querySelector('#pic-link').textContent = data.photos[0].alt;

      document.querySelector('#pic-author').href = data.photos[0].photographer_url;
      document.querySelector('#pic-author').textContent = data.photos[0].photographer;
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

// Random Quotes
document.querySelector('#get-quote').addEventListener('click', getFetchQuote);

function getFetchQuote() {
  fetch(`https://api.quotable.io/quotes/random`)
    .then(res => res.json())
    .then(data => {
      document.querySelector('#image-container p').textContent = data[0].content;

      document.querySelector('#quote-author').textContent = `${data[0].author}.`;
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

// Google Fonts
document.querySelector('#get-font').addEventListener('click', getFetchFont);

function getFetchFont() {
  fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${keyGoogle}&sort=popularity`)
    .then(res => res.json())
    .then(data => {
      let x = randomChoice(data.items.length);
      let randomFont = data.items[x].family;
      WebFont.load({
        google: {
          families: [randomFont]
        }
      });

      document.querySelector('#image-container p').style.fontFamily = randomFont;
      document.querySelector('h1').style.fontFamily = randomFont;
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

function randomChoice(max) {
  return Math.floor(Math.random() * max);
}