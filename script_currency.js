document.addEventListener("DOMContentLoaded", function () {
  /* Created by Tivotal */
  let dropList = document.querySelectorAll(".drop-list select");
  let fromCurrency = document.querySelector(".from select");
  let toCurrency = document.querySelector(".to select");
  let icon = document.querySelector(".reverse-convert");
  let exchangeTxt = document.querySelector(".exchange_rate");
  let getBtn = document.querySelector(".convert");



  //adding options tag

  for (let i = 0; i < dropList.length; i++) {
    for (let currency_code in country_list) {
      let selected =
        i == 0
          ? currency_code == "USD"
            ? "selected"
            : ""
          : currency_code == "INR"
          ? "selected"
          : "";

      let optionTag = `<option value="${currency_code}" ${selected}>
      ${currency_code}</option>`;

      dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }

    dropList[i].addEventListener("change", (e) => {
      loadFlag(e.target);
    });
  }

  function loadFlag(element) {
    for (let code in country_list) {
      if (code == element.value) {
        let imgTag = element.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${country_list[
          code
        ].toLowerCase()}.png`;
      }
    }
  }

  getBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeValue();
  });

  function getExchangeValue() {
    const amount = document.querySelector("#amount");
    let amountVal = amount.value;

    // Überprüfen, ob der Umrechnungs-Button geklickt wurde
    if (!getBtnClicked) {
      return;
    }

    if (amountVal === "" || isNaN(amountVal) || parseFloat(amountVal) <= 0) {
      alert("Please Enter a valid amount");
      return;
    }

    exchangeTxt.innerText = "Wechselkurs wird ermittelt...";

    let url = `https://v6.exchangerate-api.com/v6/6952d78d34e3cce8590cdec0/latest/${fromCurrency.value}`;
    
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let total = (amountVal * exchangeRate).toFixed(2);
        exchangeTxt.innerText = `${amountVal} ${fromCurrency.value} = ${total} ${toCurrency.value}`;
      })
      .catch(() => {
        exchangeTxt.innerText = "Something went wrong";
      });
  }

  // Hinzufügen eines Flags für den Umrechnungs-Button-Klick
  let getBtnClicked = false;
  getBtn.addEventListener("click", () => {
    getBtnClicked = true;
    getExchangeValue();
  });

  window.addEventListener("load", () => {
    // Initialer Text bei Seitenladung
    exchangeTxt.innerText = "Wechselkurs wird ermittelt...";
    // Führe die Umrechnung aus, wenn das Dokument geladen wird (optional)
    getExchangeValue();
  });


  icon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeValue();
  });


  // Marked Conversions
  const saveButtonCurrency = document.querySelector('.save-currency');
  const favoriteButtonCurrency = document.querySelector('.favorit-currency');
  const savedResultsListCurrency = document.getElementById('results-list-currency');
  const favoriteListCurrency = document.getElementById('favorite-list-currency');

  // Event listener for the Save button for currency values
  saveButtonCurrency.addEventListener('click', function () {
    const equationText = exchangeTxt.innerText;

    // Check if the result already exists in the saved list
    const existingResults = savedResultsListCurrency.querySelectorAll('.result-item');
    let isDuplicate = false;

    existingResults.forEach(function (existingResult) {
      const existingEquation = existingResult.querySelector('span').textContent;
      if (existingEquation === equationText) {
        isDuplicate = true;
        alert('This result is already saved.'); // Alert if the result is already in the list
      }
    });

    if (!isDuplicate && equationText !== 'result') {
      const newResultCurrency = document.createElement('li');
      newResultCurrency.classList.add('result-item'); // Add a class to the list item

      // Create a checkbox
      const checkboxCurrency = document.createElement('input');
      checkboxCurrency.type = 'checkbox';
      checkboxCurrency.addEventListener('click', function (event) {
        // Mark or unmark the list item when the checkbox is clicked
        if (event.target.checked) {
          newResultCurrency.classList.add('marked');
        } else {
          newResultCurrency.classList.remove('marked');
        }
        // Save the updated list to local storage when checkbox is clicked
        saveResultsLocallyCurrency(savedResultsListCurrency, 'savedResultsCurrency');
      });

      // Create a span to hold the resultText with the equation
      const resultTextCurrency = document.createElement('span');
      resultTextCurrency.textContent = equationText;

      // Append checkbox and resultText to the list item
      newResultCurrency.appendChild(checkboxCurrency);
      newResultCurrency.appendChild(resultTextCurrency);

      // Append the new list item to the results list for currency values
      savedResultsListCurrency.appendChild(newResultCurrency);

      // Save the updated list to local storage when a new result is added for currency values
      saveResultsLocallyCurrency(savedResultsListCurrency, 'savedResultsCurrency');
    } else if (equationText === 'result') {
      alert('Cannot save invalid or zero input.');
    }
  });


  // Save the updated list to local storage for currency values
  function saveResultsLocallyCurrency(savedResultsListCurrency, storageKey) {
      localStorage.setItem(storageKey, savedResultsListCurrency.innerHTML);
  }

  // Function to load saved results from local storage on page load for currency values
  window.addEventListener('load', function () {
      savedResultsListCurrency.innerHTML = localStorage.getItem('savedResultsCurrency') || '';
  });

  // Save the updated favorite list to local storage for present values
  function saveFavoritesLocallyCurrency(favoriteListCur, storageKey) {
      localStorage.setItem(storageKey, favoriteListCur.innerHTML);
  }

  // Function to load saved favorite items from local storage on page load for currency values
  window.addEventListener('load', function () {
    const savedFavoriteItems = localStorage.getItem('favoriteItemsCurrency');
    if (savedFavoriteItems) {
        favoriteListCurrency.innerHTML = savedFavoriteItems;
        // After setting innerHTML, reattach event listeners if necessary
        attachEventListenersToFavoriteItems();
    }
  });

  // Function to attach event listeners to favorite items after setting them in the DOM
  function attachEventListenersToFavoriteItems() {
    const favoriteCheckboxes = favoriteListCurrency.querySelectorAll('.favorite-checkbox');
    favoriteCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            // Handle the checkbox change event if needed
        });
    });
  }

  // Event listener for the Favorite button for currency values
  favoriteButtonCurrency.addEventListener('click', function () {
    const savedResultsCurrency = savedResultsListCurrency.querySelectorAll('li'); // Select all saved currency results

    // Get existing favorite items
    const existingFavoriteItems = favoriteListCurrency.querySelectorAll('.favorite-list-currency label');

    savedResultsCurrency.forEach(function(savedResultCurrency) {
        const checkboxCurrency = savedResultCurrency.querySelector('input[type="checkbox"]');
        const resultTextCurrency = savedResultCurrency.querySelector('span');
        const isDuplicate = Array.from(existingFavoriteItems).some(favoriteItem => favoriteItem.textContent === resultTextCurrency.textContent);
        
        if (checkboxCurrency.checked && !isDuplicate) {
            const newFavoriteCurrency = document.createElement('li');

            // Create a checkbox
            const checkboxFavoriteCurrency = document.createElement('input');
            checkboxFavoriteCurrency.type = 'checkbox';
            checkboxFavoriteCurrency.className = 'favorite-checkbox'; // Add a class for styling purposes
            checkboxFavoriteCurrency.addEventListener('change', function() {
                // Handle the checkbox change event if needed
            });
            newFavoriteCurrency.appendChild(checkboxFavoriteCurrency);

            // Create a label for the favorite item
            const label = document.createElement('label');
            label.textContent = resultTextCurrency.textContent;
            newFavoriteCurrency.appendChild(label);

            favoriteListCurrency.appendChild(newFavoriteCurrency);
        }
    });

    // Save the updated favorite list to local storage for currency values
    saveFavoritesLocallyCurrency(favoriteListCurrency, 'favoriteItemsCurrency');
  });



  // Event listener for the Trash Bin button for currency values
  const trashBinButtonSaveCurrency = document.querySelector('.trash-bin-currency');

  trashBinButtonSaveCurrency.addEventListener('click', function () {
    const savedResultsCurrency = savedResultsListCurrency.querySelectorAll('li');

    savedResultsCurrency.forEach(function(savedResultCurrency) {
        const checkboxSaveCurrency = savedResultCurrency.querySelector('input[type="checkbox"]');

        if (checkboxSaveCurrency.checked) {
            // Remove the selected result if the checkbox is checked
            savedResultCurrency.remove();
        }
    });

    // Save the updated list to local storage after deletion
    saveResultsLocallyCurrency(savedResultsListCurrency, 'savedResultsCurrency');
  });

  // Event listener for the Trash Bin button for favorite currency values
  const trashBinButtonFavoriteCurrency = document.querySelector('.trash-bin-favorite-currency');

  trashBinButtonFavoriteCurrency.addEventListener('click', function () {
    const favoriteResultsCurrency = favoriteListCurrency.querySelectorAll('li');

    favoriteResultsCurrency.forEach(function(favoriteResultCurrency) {
        const checkboxFavoriteCurrency = favoriteResultCurrency.querySelector('input[type="checkbox"]');

        if (checkboxFavoriteCurrency.checked) {
            // Remove the selected result if the checkbox is checked
            favoriteResultCurrency.remove();
        }
    });

    // Save the updated list to local storage after deletion
    saveFavoritesLocallyCurrency(favoriteListCurrency, 'favoriteItemsCurrency');
  });

  // Event listener for "Select All Saved" checkbox
  const selectAllSavedCheckboxCurrency = document.getElementById('select-all-saved-currency');
  selectAllSavedCheckboxCurrency.addEventListener('change', function () {
    const savedResultsListCurrency = document.getElementById('results-list-currency');
    const checkboxes = savedResultsListCurrency.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllSavedCheckboxCurrency.checked;
    });
  });

  // Event listener for individual checkboxes (if you need any other functionality)
  savedResultsListCurrency.addEventListener('change', function (event) {
    if (event.target.matches('input[type="checkbox"]')) {
        const checkboxes = savedResultsListCurrency.querySelectorAll('input[type="checkbox"]');
        const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
        selectAllSavedCheckboxCurrency.checked = allChecked;
    }
  });

  // Event listener for "Select All" checkbox in favorite results
  const selectAllFavoriteCheckboxCurrency = document.getElementById('select-all-favorite-currency');
  selectAllFavoriteCheckboxCurrency.addEventListener('change', function () {
    
    const favoriteCheckboxes = favoriteListCurrency.querySelectorAll('input[type="checkbox"]');
    favoriteCheckboxes.forEach(checkbox => {
        checkbox.checked = selectAllFavoriteCheckboxCurrency.checked;
    });
  });

  // Event listener for individual checkboxes in favorite results
  favoriteListCurrency.addEventListener('change', function (event) {
    if (event.target.matches('input[type="checkbox"]')) {
        const favoriteCheckboxes = favoriteListCurrency.querySelectorAll('input[type="checkbox"]');
        const allChecked = Array.from(favoriteCheckboxes).every(checkbox => checkbox.checked);
        selectAllFavoriteCheckboxCurrency.checked = allChecked;
    }
  });


  // make a share button 
  const shareButtonCurrency = document.querySelector('.share-button-currency');

  shareButtonCurrency.addEventListener('click', function (event) {
    const button = event.currentTarget;
    const container = button.nextElementSibling;

    
    let equationText = exchangeTxt.innerText;

    if (container.style.display === 'block') {
      // If container is already visible, hide it
      container.style.display = 'none';
    } else {
      container.innerHTML = '';

      const msg = encodeURIComponent(equationText);

      const currencyMedia = [
        { name: 'Facebook', icon: 'fab fa-facebook', url: `https://www.facebook.com/share.php?u=${msg}` },
        { name: 'Twitter', icon: 'fab fa-twitter', url: `http://twitter.com/share?&text=${msg}&hashtags=javascript,programming` },
        { name: 'LinkedIn', icon: 'fab fa-linkedin', url: `https://www.linkedin.com/sharing/share-offsite/?text=${msg}` },
        { name: 'Reddit', icon: 'fab fa-reddit', url: `http://www.reddit.com/submit?title=${msg}` },
        { name: 'WhatsApp', icon: 'fab fa-whatsapp', url: `https://api.whatsapp.com/send?text=${msg}` },
        { name: 'Telegram', icon: 'fab fa-telegram', url: `https://telegram.me/share/url?text=${msg}` },
    ];

    currencyMedia.forEach(function (platform) {
        const shareLink = document.createElement('a');
        shareLink.href = platform.url;
        shareLink.className = platform.name.toLowerCase();
        shareLink.target = '_blank';

        const icon = document.createElement('i');
        icon.className = platform.icon;
        icon.style.fontSize = '40px'; // Increase icon size

        shareLink.appendChild(icon);
        container.appendChild(shareLink);
    });

    // Show the popup
    container.style.display = 'block';
  }
  });
  


});


