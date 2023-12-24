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


  function toggleLanguage(language) {
    if (language === 'en') {
        $('.en-translation').show();
        $('.de-translation').hide();
        $('.convert').text('Calculate'); // Übersetzung für den Button in Englisch
        $('.exchange_rate').text('Getting exchange rate...')
        $('.save-currency').text('Add to list')
        $('.share-button-currency').text('Share on following platforms')
        $('.trash-bin-currency').text('Delete')
        $('.favorit-currency').text('Favorite')
        $('.trash-bin-favorite-currency').text('Delete')
        $('.future-value').text('Future Value: ')
        $('#calculate-button-present').text('Calculate')
        $('#result-present').text('Present Value: ')
        $(".save-present").text("Add to list");
        $('.share-button-present').text('Share on following platforms')
        $('.trash-bin-present').text('Delete')
        $('.favorit-present').text('Favorite')
        $('.trash-bin-favorite-present').text('Delete')
        /**/
    } else if (language === 'de') {
        $('.en-translation').hide();
        $('.de-translation').show();
        $('.convert').text('Berechnen'); // Übersetzung für den Button in Deutsch
        $('.exchange_rate').text('Wechselkurs wird geladen...')
        $('.save-currency').text('Zu liste hinzufügen')
        $('.share-button-currency').text('Auf folgenden Plattformen teilen')
        $('.trash-bin-currency').text('Löschen')
        $('.favorit-currency').text('Lieblings')
        $('.trash-bin-favorite-currency').text('Löschen')
        $('.future-value').text('Zukünftiger Wert: ')
        $('#calculate-button-present').text('Berechnen')
        $('#result-present').text('Gegenwartswert: ')
        $(".save-present").text("Zu liste hinzufügen")
        $('.share-button-present').text('Auf folgenden Plattformen teilen');
        $('.trash-bin-present').text('Löschen');
        $('.favorit-present').text('Lieblings');
        $('.trash-bin-favorite-present').text('Löschen');



    }
}

function translateCheckboxLabel(language) {
    const checkboxLabel = $('label[for="select-all-favorite-currency"]');
    if (language === 'en') {
        checkboxLabel.text('Select All');
    } else if (language === 'de') {
        checkboxLabel.text('Alles auswählen');
    }
    // Füge weitere Übersetzungen für andere Labels hinzu, falls erforderlich
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

