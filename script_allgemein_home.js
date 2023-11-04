// Access to the HTML elements in the head area
const infoButton = document.getElementById("info-button");
const translationButton = document.getElementById("translation-button");
const darkModeButton = document.getElementById("dark-mode");
const lightModeButton = document.getElementById("light-mode");
const languageSelector = document.getElementById("language");

// Access to the HTML elements in the body area
const fromCurrency = document.getElementById("from-currency-input");
const toCurrency = document.getElementById("to-currency-input");
const amount = document.getElementById("amount");
const convertButton = document.getElementById("convert");
const result = document.getElementById("result");

// Access to info and translation sections
const infoSection = document.getElementById("info");
const translationSection = document.getElementById("translation");
const shareButton = document.getElementById("share");
const translatedInfo = document.getElementById("translated-info");

// Access to the Dark Mode Button
const checkbox = document.getElementById("custom-switch"); 
const body_dark = document.getElementById("body.dark");
const header_dark = document.getElementById("header.dark");

// Access to elements for reversal and saving conversions
const reverseConvertButton = document.getElementById("reverse-convert");
const saveButton = document.getElementById("save");
const savedConversionsList = document.getElementById("saved-conversions");

// Access to elements for the like button
const likeContainer = document.getElementById("like-container");
const likedConversionsList = document.getElementById("liked-conversions");

// Dark Mode Button 
checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        document.body.classList.add("dark");
        document.querySelector("header").classList.add("dark");

    } else {
        document.body.classList.remove("dark");
        document.querySelector("header").classList.remove("dark");
    }

});