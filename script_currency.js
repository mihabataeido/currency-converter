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
function createCheckbox(i, isVisible) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `conversion-${i}`;
  checkbox.style.display = isVisible ? "block" : "none"; // Setze die Anzeige basierend auf dem isVisible-Parameter

  const label = document.createElement("label");
  label.setAttribute("for", `conversion-${i}`);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("height", "24px");
  svg.setAttribute("width", "24px");
  svg.setAttribute("viewBox", "0 0 24 24");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z");

  svg.appendChild(path);
  label.appendChild(svg);

  return { checkbox, label };
}


function displaySavedConversions() {
  const savedConversions = JSON.parse(localStorage.getItem("savedConversions")) || [];
  savedConversionsList.innerHTML = ""; // Leere die vorhandene Liste

  if (savedConversions.length > 0) {
      const heading = document.createElement("h3");
      heading.textContent = "Deine Gespeicherten Konvertierungen";
      savedConversionsList.appendChild(heading);

      savedConversions.forEach((conversion, i) => {
          const { checkbox, label } = createCheckbox(i);

          label.innerHTML += `${conversion.inputAmount} ${conversion.from} = ${conversion.convertedAmount} ${conversion.to}`;

          const listItem = document.createElement("li");
          listItem.appendChild(checkbox);
          listItem.appendChild(label);
          savedConversionsList.appendChild(listItem);

          checkbox.checked = conversion.checked; // Setze den Status basierend auf der gespeicherten Information

          checkbox.addEventListener("click", () => {
              updateLocalStorage(savedConversionsList);
          });
      });

      savedConversionsList.style.display = "block";
  } else {
      const heading = document.createElement("h3");
      heading.textContent = "Dein Speicherliste ist leer";
      savedConversionsList.appendChild(heading);

      savedConversionsList.style.display = "none";
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
  const favoritList = document.querySelector(".Favorit_conversions-list");

  list.childNodes.forEach((item) => {
      const checkbox = item.querySelector("input[type='checkbox']");
      const label = item.querySelector("label");

      if (checkbox && label) {
          savedConversions.push({
              result: label.textContent,
              checked: checkbox.checked
          });

          // Überprüfe, ob das Element ausgewählt ist und nicht bereits in der Favoritenliste vorhanden ist
          if (checkbox.checked && !isInFavoritList(label.textContent)) {
              const favoritItem = document.createElement("li");
              const favoritLabel = document.createElement("label");
              favoritLabel.appendChild(document.createTextNode(label.textContent));
              favoritItem.appendChild(favoritLabel);
              favoritList.appendChild(favoritItem);
          } else if (!checkbox.checked && isInFavoritList(label.textContent)) {
              // Wenn das Element nicht ausgewählt ist und in der Favoritenliste vorhanden ist, entferne es
              removeItemFromFavoritList(label.textContent);
          }
      }
  });

  localStorage.setItem("savedConversions", JSON.stringify(savedConversions));
}

// Überprüfe, ob das Element bereits in der Favoritenliste vorhanden ist
function isInFavoritList(result) {
  const favoritList = document.querySelector(".Favorit_conversions-list");
  const favoritLabels = favoritList.querySelectorAll("label");

  for (const favoritLabel of favoritLabels) {
      if (favoritLabel.textContent === result) {
          return true;
      }
  }

  return false;
}

// Entferne das Element aus der Favoritenliste
function removeItemFromFavoritList(result) {
  const favoritList = document.querySelector(".Favorit_conversions-list");
  const favoritLabels = favoritList.querySelectorAll("label");

  for (const favoritLabel of favoritLabels) {
      if (favoritLabel.textContent === result) {
          favoritList.removeChild(favoritLabel.parentElement);
          break;
      }
  }
}