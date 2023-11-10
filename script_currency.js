/* Created by Tivotal */
let dropList = document.querySelectorAll("form select");
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
  const amount = document.querySelector("form input");
  let amountVal = amount.value;
  if (amountVal == "" || amountVal == "0") {
    amount.value = "";
    amountVal = 0;
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
      exchangeTxt.innerText = "something went wrong";
    });
}

window.addEventListener("load", () => {
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







// ... bestehender JS-Code ...

// save result
const saveButton = document.querySelector(".save");
const savedConversionsList = document.querySelector(".saved-conversions-list");

saveButton.addEventListener("click", () => {
    const resultText = exchangeTxt.innerText;
    if (resultText !== "Getting exchange rate...") {
        // create a checkbox element
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = false; // Setze den Ausgangszustand auf nicht markiert

        // create a label element
        const label = document.createElement("label");
        label.appendChild(document.createTextNode(resultText));

        // create a list item element
        const listItem = document.createElement("li");
        listItem.appendChild(checkbox);
        listItem.appendChild(label);

        // append the list item to the saved conversions list
        savedConversionsList.appendChild(listItem);

        // save the result to localStorage with the initial checked status
        const savedConversions = JSON.parse(localStorage.getItem("savedConversions")) || [];
        savedConversions.push({ result: resultText, checked: checkbox.checked });
        localStorage.setItem("savedConversions", JSON.stringify(savedConversions));

        // clear the exchange rate text
        exchangeTxt.innerText = "Getting exchange rate...";
    }
});

// load saved conversions from localStorage on page load
window.addEventListener("load", () => {
    const savedConversions = JSON.parse(localStorage.getItem("savedConversions")) || [];
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
    });
});


