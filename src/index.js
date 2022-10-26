import './css/styles.css';
import debounce from "lodash.debounce";
// import Notiflix, { Notify } from "notiflix";
import {Notify} from "notiflix/build/notiflix-notify-aio";
import {fetchCountries} from "./fetchCountries";

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector("#search-box");
const listCountry = document.querySelector(".country-list");
const infoCountry = document.querySelector(".country-info");
// infoCountry.addEventListener("click", showCountry);

//function clean
// function cleanMarkup(ref) {
//     ref.innerHTML = "";
// }

function formatCountPeople(num) {
    if (num >= 1000000000)
    return (num / 1000000000).toFixed(2) + " miliardów";
    
    if (num >= 1000000)
    return (num / 1000000).toFixed(2) + " milionów";
    
    if (num >= 1000)
    return (num / 1000).toFixed(2) + " tysięcy";

    return num;
}

//no function well, becouse 
//return: <  languages.map(lang => lang.name).join(", ");  >
//not a format with ", " with space entre two languages

// function formatLanguages(lang) {
//     languages.map(lang => lang.name).join(", ");
// };


//write letters of country
function onInputWrite(event) {
    const nameCountry = event.target.value.trim();
    cleanMarkup (!infoCountry);
        if (!nameCountry) {
            cleanMarkup(listCountry) && cleanMarkup(inputCountry);
        }


//fetch with array in https://restcountries.com/v3.1
//must change then-catch in to async/await witch try-catch

    fetchCountries(nameCountry)
    .then(data => {
        if (data.length > 10) {
            cleanMarkup(listCountry) && cleanMarkup(inputCountry);
            Notify.info(
                `Too many matches found. Please enter a more specific name.`
            );
            return false;
        } else {
            return renderMarkup(data);
        }
    });
}

//all countries array
function showCountries(array) {
    return array
    .map(
        ({name, flags}) => 
        `<li class="country-item" data-country="${name.common}"><img src="${flags.svg}"
        alt="${name.official}" width="32" height="20">
        <p class="country-text">${name.official}</p></li>`
    )
    .join("");
};


//countries list
// function renderMarkup(data) {
//     const selectCountry = document.querySelectorAll("li");
//     countries?.find(country => {
//         if (country.name === event.currentTarget.dataset.country) {
//             selectCountry.push(country);
//         }
//     });


// try with hint Kamil
// if (country === element.country.name) {
//     country.onclick = showCountry;
// }


//first function
//show list the countries

function renderMarkup(data) {
    if (data.length === 1) {
        cleanMarkup(listCountry);
        infoCountry.innerHTML = showCountry(data);
    }
    cleanMarkup(inputCountry);
    listCountry.innerHTML = showCountries(data);

    const selectCountryFromList = document.querySelectorAll("li");
    for (let country of selectCountryFromList) {
        country.addEventListener("click", event => {
            const findCountryByDatasetCountry = event.currentTarget.dataset.country;
            cleanMarkup(listCountry);

            const clickCountry = data.filter((single) => single.name.common === findCountryByDatasetCountry);
            infoCountry.innerHTML = showCountry(clickCountry);
        })
    }
}

//other attempt function click in "li"
// const country = document.getElementsByClassName("country-list");
// if (country === element.country.name) {
//     country.onclick = showCountry();
//     showCountry;
// }

// for(let country of countries) {
//     country.addEventListener("click", showCountry)
// };


//second attepmt function click in "li"
// function showCountry() {
//     const matchingCountries = [];
//     countries?.find(country => {
//         if(country.name === event.currentTarget.dataset.country) {
//             matchingCountries.push(country);
//         }
//     });
//     showCountry(matchingCountries);
// }



//return one card width countries
function showCountry(data) {
    const singleCountry = data[0];
    
    console.log(singleCountry);

    const {name, capital, population, flags, languages, subregion} = singleCountry;
       return `<div class="country-item" data-country="country"><img src="${flags.svg}" 
        alt="${"name.official"} width = "64" height = "40">
        <h1 class="country-text">Nazwa oficjalna: <span class="country-name">${name.official}</span></h1></div>
        <p class="country-text-info"><span>Stolica:</span> ${capital}</p>
        <p class="country-text-info"><span>Populacja:</span> ${formatCountPeople(population)}</p>
        <p class="country-text-info"><span>Język:</span> ${Object.values(languages)}</p>
        <p class="country-text-info"><span>Subregion:</span> ${subregion}</p>
        `
};

inputCountry.addEventListener("input", debounce(onInputWrite, DEBOUNCE_DELAY));


