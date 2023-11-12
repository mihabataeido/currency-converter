// Access to the HTML elements in the head area
const infoButton = document.getElementById("info-button");
const translationButton = document.getElementById("translation-button");
const languageSelector = document.getElementById("language");

// Access to info and translation sections
const infoSection = document.getElementById("info");
const translationSection = document.getElementById("translation");
const shareButton = document.getElementById("share");
const translatedInfo = document.getElementById("translated-info");

// Access to the Dark Mode Button
const darkModeButton = document.getElementById("dark.mode");
const lightModeButton = document.getElementById("light.mode");
const checkbox = document.getElementById("custom-switch"); 
const body_dark = document.getElementById("body.dark");
const header_dark = document.getElementById("header.dark");
const wrapper_dark = document.getElementById("wrapper.dark");


// Dark Mode Button 
checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        document.body.classList.add("dark");
        document.querySelector("header").classList.add("dark");
        document.getElementById("wrapper").classList.add("dark");

    } else {
        document.body.classList.remove("dark");
        document.querySelector("header").classList.remove("dark");
        document.getElementById("wrapper").classList.remove("dark");
    }

});