// Access to the HTML elements in the header area
const translationButton = document.getElementById("translation-button");
const languageSelector = document.getElementById("language");

// Access to info and translation sections
const infoSection = document.getElementById("info");
const translationSection = document.getElementById("translation");
const translatedInfo = document.getElementById("translated-info");

// Access to the Dark Mode Button
const darkModeButton = document.getElementById("dark-mode");
const lightModeButton = document.getElementById("light-mode");
const checkbox = document.getElementById("custom-switch");
const body_dark = document.body;
const header_dark = document.querySelector("header");
const wrapper_dark = document.getElementById("wrapper");

// Dark Mode Button
checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        body_dark.classList.add("dark");
        header_dark.classList.add("dark");
        wrapper_dark.classList.add("dark");
    } else {
        body_dark.classList.remove("dark");
        header_dark.classList.remove("dark");
        wrapper_dark.classList.remove("dark");
    }
});

function toggleLanguage(language) {
    if (language === 'en') {
        $('.en-translation').show();
        $('.de-translation').hide();
    } else if (language === 'de') {
        $('.en-translation').hide();
        $('.de-translation').show();
    }
}

function saveLanguagePreference(language) {
    localStorage.setItem('preferredLanguage', language);
}

function changeLanguage(language) {
    const languageSelected = document.querySelector('.language-selected');
  
    // Remove existing flag classes
    languageSelected.classList.remove('change-en', 'change-de');
  
    if (language === 'en') {
      languageSelected.classList.add('change-en');
      // Update other translations for English if needed
    } else if (language === 'de') {
      languageSelected.classList.add('change-de');
      // Update other translations for German if needed
    }
  }  

$(document).ready(function() {
    let preferredLanguage = localStorage.getItem('preferredLanguage');

    // Hide .en-translation initially
    $('.en-translation').hide();

    // Initialize language preference
    if (!preferredLanguage || preferredLanguage === 'de') {
        preferredLanguage = 'de';
        saveLanguagePreference('de');
        changeLanguage('de');
        toggleLanguage('de');
    } else if (preferredLanguage === 'en') {
        saveLanguagePreference('en');
        changeLanguage('en');
        toggleLanguage('en');
    }

    // Ensure event handlers are attached only once
    $(".de, .en").off('click');

    $(".de").click(function(event) {
        event.preventDefault();
        saveLanguagePreference('de');
        $('#language-selected').text('de').addClass('dn').removeClass('en');
        toggleLanguage('de');
        changeLanguage('de');
        $('.language-selected').text('de');
    });

    $(".en").click(function(event) {
        event.preventDefault();
        saveLanguagePreference('en');
        $('#language-selected').text('en').addClass('en').removeClass('de');
        toggleLanguage('en');
        changeLanguage('en');
        $('.language-selected').text('en');
    });
});



// HOME SECTION
function scrollToSection(sectionId, targetIndex) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const scrollTargets = targetSection.querySelectorAll('.scroll-target');
        if (scrollTargets.length > targetIndex) {
            scrollTargets[targetIndex].scrollIntoView({ behavior: 'smooth' });
        }
    }
}