function showCurrencyName() {
  var selectCurrency = document.getElementById("toCurrency");
  var currencyName = selectCurrency.options[selectCurrency.selectedIndex].text;
  document.getElementById("currencyName").innerHTML = currencyName;
}

function showFromCurrencyName() {
  var selectFromCurrency = document.getElementById("fromCurrency");
  var fromCurrencyName = selectFromCurrency.options[selectFromCurrency.selectedIndex].text;
  document.getElementById("fromCurrencyName").innerHTML = fromCurrencyName;
}

const amountInput = document.querySelector('#amount2');
const fromCurrencySelect = document.querySelector('#fromCurrency');
const toCurrencySelect = document.querySelector('#toCurrency');
const convertButton = document.querySelector('#convert');
const resultParagraph = document.querySelector('#result');
const savedResultsListCrypto = document.getElementById('results-list-crypto');
const favoriteListCrypto = document.getElementById('favorite-list-crypto');
const saveButtonCrypto = document.querySelector('.save-crypto');
const favoriteButtonCrypto = document.querySelector('.favorit-crypto');
const trashBinButtonSaveCrypto = document.querySelector('.trash-bin-crypto');
const trashBinButtonFavoriteCrypto = document.querySelector('.trash-bin-favorite-crypto');
const selectAllSavedCheckboxCrypto = document.getElementById('select-all-saved-crypto');
const selectAllFavoriteCheckboxCrypto = document.getElementById('select-all-favorite-crypto');
const shareButtonCrypto = document.querySelector('.share-button-crypto');

convertButton.addEventListener('click', () => {
  const amount = amountInput.value;
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;
  const apiKey = "685419b6bedfb725bb6af07ed3dd6fef8f20a83f05c066d1eb20a10c563c7801";
  const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${toCurrency}&tsyms=${fromCurrency}&api_key=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const rate = data[fromCurrency];
      const result = amount / rate;
      resultParagraph.innerHTML = `${amount} ${fromCurrency} = ${result.toFixed(8)} ${toCurrency}`;
    })
    .catch(error => {
      resultParagraph.innerHTML = "Error: Unable to fetch exchange rate.";
      console.error(error);
    });
});

// Save conversion result
saveButtonCrypto.addEventListener('click', function () {
  const conversionResult = resultParagraph.textContent;
  // Implement logic to save conversionResult in savedResultsListCrypto
});

// Add to favorites
favoriteButtonCrypto.addEventListener('click', function () {
  // Implement logic to add selected conversion results to favoriteListCrypto
});

// Delete saved conversions
trashBinButtonSaveCrypto.addEventListener('click', function () {
  // Implement logic to delete selected conversion results from savedResultsListCrypto
});

// Delete favorite conversions
trashBinButtonFavoriteCrypto.addEventListener('click', function () {
  // Implement logic to delete selected conversion results from favoriteListCrypto
});

// Select all saved conversions
selectAllSavedCheckboxCrypto.addEventListener('change', function () {
  // Implement logic to select or deselect all checkboxes in savedResultsListCrypto
});

// Select all favorite conversions
selectAllFavoriteCheckboxCrypto.addEventListener('change', function () {
  // Implement logic to select or deselect all checkboxes in favoriteListCrypto
});

// Share conversion result
shareButtonCrypto.addEventListener('click', function () {
  // Implement logic to share conversionResult
});

// Load saved results on page load
window.addEventListener('load', function () {
  // Implement logic to load saved conversion results from storage
});
