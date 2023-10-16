import './style.css'
import {setupClick} from './setupClick.js';

const languages = ['de', 'en', 'es', 'fr', 'ja', 'pt'];

let language = window.navigator.userLanguage || window.navigator.language;
language = language.slice(0, 2);
const url = new URL(window.location.href);
if (url.search.includes("?lang=")) {
    language = url.search.slice(6, 8);
}

let index = languages.indexOf(language, 0);

if (index === -1) {
    language = 'en'
}

const pricePerYear = '$39.99';
const pricePerWeekBestOffer = '$0.48';
const pricePerWeek = '$6.99';

fetch(`/lang/${language}.json`)
    .then(r => r.json())
    .then(data => {
        init(data)
    })
    .catch(e => console.error(e))

const init = (data) => {
    for (const key in data) {
        const priceValue =
            key === "Just {{price}} per year" ? pricePerYear
                : pricePerWeek
        if (data.hasOwnProperty(key)) {
            data[key] = data[key].replace("{{price}}", priceValue);
        }
    }

    const getString = (string, bestOffer = false) => {
        if (bestOffer) {
            let arr = string.split(language === 'ja' ? '/' : ' ')
            arr.shift()
            arr.unshift(pricePerWeekBestOffer)
            let newString = arr.join(language === 'ja' ? '/' : ' ');
            return newString.split('<br>').join('\n')
        }
        return string.split('<br>').join('\n')
    }

    const getStringWithoutBR = (string) => {
        if (language === 'fr') {
            const arr = string.split('');
            arr.splice(2, 8, ' ');
            return arr.join('').split('<br>').join('')
        }
        return string.split('<br>').join('')
    }

    document.getElementById("title").innerText = getString(data["Get Unlimited <br>Access"]);
    document.getElementById("feature-text-1").innerText = getString(data["Unlimited Art <br>Creation"]);
    document.getElementById("feature-text-2").innerText = getString(data["Exclusive <br>Styles"]);
    document.getElementById("feature-text-3").innerText = getStringWithoutBR(data["Magic Avatars <br>With 20% Off"]);
    document.getElementById("yearly-access").innerText = getString(data["YEARLY ACCESS"]);
    document.getElementById("best-offer").innerText = getString(data["BEST OFFER"]);
    document.getElementById("price-per-year").innerText = getString(data["Just {{price}} per year"]);
    document.getElementById("price-per-week-best-offer").innerText = getString(data["{{price}} <br>per week"], true);
    document.getElementById("weekly-access").innerText = getString(data["WEEKLY ACCESS"]);
    document.getElementById("price-per-week").innerText = getString(data["{{price}} <br>per week"]);
    document.getElementById("terms").innerText = getString(data["Terms of Use"]);
    document.getElementById("privacy-policy").innerText = getString(data["Privacy Policy"]);
    document.getElementById("restore").innerText = getString(data["Restore"]);
    document.getElementById("continue-btn").innerText = getString(data["Continue"]);

    if (language === 'de') {
        const elements = document.getElementsByClassName('button');

        elements.map(e => e.classList.add('button-de'))
    }

    if (language === 'fr') {
        document.getElementById("feature-text-3").classList.add('feature-text-fr')
    }
}

document.querySelector('#app').innerHTML = `
  <div class="app-wrapper">
    <div class="background"></div>
    <a href='#' class="close">
      <img src="/close.svg" alt="close icon" width="12px" height="12px">
    </a>
    <h1 id="title">Get Unlimited <br>Access</h1>
    <div class="features">
      <div class="feature">
        <picture>
          <source type="image/webp" srcset="/f1_8@1x.webp 1x, /f1_8@2x.webp 2x, /f1_8@3x.webp 3x" media="(max-height: 811px)"/>
          <source type="image/webp" srcset="/f1_8@1x.png 1x, /f1_8@2x.png 2x, /f1_8@3x.png 3x" media="(max-height: 811px)"/>
          <source type="image/webp" srcset="/f1_14@1x.webp 1x, /f1_14@2x.webp 2x, /f1_14@3x.webp 3x"/>
          <img src="/f1_14@1x.png" srcset="/f1_14@2x.png 2x, /f1_14@3x.png 3x" alt="feature #1">
        </picture>
        <p id="feature-text-1" class="feature-text">Unlimited Art <br>Creation</p>
      </div>
      <div class="feature">
        <picture>
          <source type="image/webp" srcset="/f2_8@1x.webp 1x, /f2_8@2x.webp 2x, /f2_8@3x.webp 3x" media="(max-height: 811px)"/>
          <source srcset="/f2_8@1x.png 1x, /f2_8@2x.png 2x, /f2_8@3x.png 3x" media="(max-height: 811px)"/>
          <source type="image/webp" srcset="/f2_14@1x.webp 1x, /f2_14@2x.webp 2x, /f2_14@3x.webp 3x"/>
          <img src="/f2_14@1x.png" srcset="/f2_14@2x.png 2x, /f2_14@3x.png 3x" alt="feature #2">
        </picture>
        <p id="feature-text-2" class="feature-text">Exclusive <br>Styles</p>
        </div>
      <div class="feature">
        <picture>
          <source type="image/webp" srcset="/f3_8@1x.webp 1x, /f3_8@2x.webp 2x, /f3_8@3x.webp 3x" media="(max-height: 811px)"/>
          <source type="image/webp" srcset="/f3_8@1x.png 1x, /f3_8@2x.png 2x, /f3_8@3x.png 3x" media="(max-height: 811px)"/>
          <source type="image/webp" srcset="/f3_14@1x.webp 1x, /f3_14@2x.webp 2x, /f3_14@3x.webp 3x"/>
          <img src="/f3_14@1x.png" srcset="/f3_14@2x.png 2x, /f3_14@3x.png 3x" alt="feature #3">
        </picture>
        <p id="feature-text-3" class="feature-text">Magic Avatars <br>With 20% Off</p>
      </div>
    </div>
    <div class="buttons">
      <label>
        <input type="radio" name="radio-btn" value="https://apple.com/" checked>
        <div class="button">
          <div id="best-offer" class="best-offer">best offer</div>
          <div class="label-text-block">
            <p id="yearly-access">Yearly access</p>
            <span id="price-per-year">Just $39.99 per year</span>
          </div>
          <div class="label-text-block">
            <span id="price-per-week-best-offer">$0.48 <br>per week</span>
          </div>
        </div>
      </label>
      <label>
        <input type="radio" name="radio-btn" value="https://google.com/">
        <div class="button">
          <div class="label-text-block">
            <p id="weekly-access">Weekly access</p>
          </div>
          <div class="label-text-block">
            <span id="price-per-week">$6.99 <br>per week</span>
          </div>
        </div>
      </label>
      <a id="continue-btn" class="continue-btn" target="_blanc" rel="nofollow noreferrer">Continue</a>
    </div>
    <footer class="footer">
      <a id="terms" href='#' class="footer-link" target="_blanc" rel="nofollow noreferrer">Terms of Use</a>
      <a id="privacy-policy" href='#' class="footer-link" target="_blanc" rel="nofollow noreferrer">Privacy Policy</a>
      <a id="restore" href='#' class="footer-link" target="_blanc" rel="nofollow noreferrer">Restore</a>
    </footer>
  </div>
`

let radios = document.querySelectorAll('input[type="radio"]');
let button = document.getElementById('continue-btn');

setupClick(button, radios);
