/* Created by Tivotal */
let dropList = document.querySelectorAll("form select");
let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelector(".to select");
let icon = document.querySelector(".reverse-convert");
let exchangeTxt = document.querySelector(".exchange_rate");
let getBtn = document.querySelector(".convert");
const savedConversionsContainer = document.querySelector(".saved-conversions-container");
const savedConversionsList = document.querySelector(".saved-conversions-list");
const favoritButton = document.querySelector(".Favorit");




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
  const amount = document.querySelector("form input");
  let amountVal = amount.value;

  // Überprüfen, ob der Umrechnungs-Button geklickt wurde
  if (!getBtnClicked) {
    return;
  }

  if (amountVal === "" || isNaN(amountVal) || parseFloat(amountVal) <= 0) {
    alert("Please Enter a valid amount");
    return;
  }

  exchangeTxt.innerText = "Getting exchange rate...";

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
  exchangeTxt.innerText = "Getting exchange rate...";
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

// save result// Neue Funktion zum Anzeigen der gespeicherten Konvertierungen unter saved-conversions-container
function displaySavedConversions() {
    const savedConversions = JSON.parse(localStorage.getItem("savedConversions")) || [];

    // Leere die vorhandene Liste
    savedConversionsList.innerHTML = "";

    if (savedConversions.length > 0) {
        // Füge die Überschrift hinzu
        const heading = document.createElement("h3");
        heading.textContent = "Deine Gespeicherten Konvertierungen";
        savedConversionsList.appendChild(heading);

        // Iteriere über die gespeicherten Konvertierungen und füge sie zur Liste hinzu
        savedConversions.forEach(({ result, checked }) => {
            // create a checkbox element
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = checked; // Setze den Status basierend auf der gespeicherten Information

            // create a label element
            const label = document.createElement("label");
            label.appendChild(document.createTextNode(result));

            // create a list item element
            const listItem = document.createElement("li");
            listItem.appendChild(checkbox);
            listItem.appendChild(label);

            // append the list item to the saved conversions list
            savedConversionsList.appendChild(listItem);

            // handle checkbox click to update localStorage
            checkbox.addEventListener("click", () => {
                updateLocalStorage(savedConversionsList);
            });
        });

        // Anzeige der saved-conversions-container
        savedConversionsContainer.style.display = "block";
    } else {
        // Füge eine Überschrift hinzu, wenn die Liste leer ist
        const heading = document.createElement("h3");
        heading.textContent = "Dein Speicherliste ist leer";
        savedConversionsList.appendChild(heading);

        // Verstecke die saved-conversions-container, wenn es keine gespeicherten Elemente gibt
        savedConversionsContainer.style.display = "none";
    }
}

// Anzeige der gespeicherten Konvertierungen beim Laden der Seite
window.addEventListener("load", () => {
    displaySavedConversions();
});


// Neue Funktion zum Anzeigen der ausgewählten Elemente unter Favorit_conversions-container
favoritButton.addEventListener("click", () => {
    const savedConversions = JSON.parse(localStorage.getItem("savedConversions")) || [];
    const favoritList = document.querySelector(".Favorit_conversions-list");

    // Leere die vorhandene Liste
    favoritList.innerHTML = "";

    // Überprüfe, ob es ausgewählte Elemente gibt
    const selectedItems = savedConversions.filter(item => item.checked);

    if (selectedItems.length > 0) {
        // Füge die Überschrift hinzu
        const heading = document.createElement("h3");
        heading.textContent = "Deine Favoritenliste";
        favoritList.appendChild(heading);

        // Iteriere über die ausgewählten Elemente und füge sie zur Liste hinzu
        selectedItems.forEach(({ result }) => {
            // create a list item element
            const listItem = document.createElement("li");

            // create a label element
            const label = document.createElement("label");
            label.appendChild(document.createTextNode(result));

            // append the label to the list item
            listItem.appendChild(label);

            // append the list item to the Favorit_conversions-list
            favoritList.appendChild(listItem);
        });

        // Anzeige der Favorit_conversions-container
        document.querySelector(".Favorit_conversions-container").style.display = "block";
    } else {
        // Verstecke die Favoritenliste, wenn es keine ausgewählten Elemente gibt
        document.querySelector(".Favorit_conversions-container").style.display = "none";
    }
});


// function to update localStorage based on checkbox clicks
function updateLocalStorage(list) {
  const savedConversions = [];
  list.childNodes.forEach((item) => {
      const checkbox = item.querySelector("input[type='checkbox']");
      const label = item.querySelector("label");

      if (checkbox && label) {
          savedConversions.push({
              result: label.textContent,
              checked: checkbox.checked
          });
      }
  });

  localStorage.setItem("savedConversions", JSON.stringify(savedConversions));
}
