/* Created by Tivotal */
let dropList = document.querySelectorAll("form select");
let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelector(".to select");
let icon = document.querySelector(".reverse-convert");
let exchangeTxt = document.querySelector(".result");
let getBtn = document.getElementById("convert");

// Access to elements for reversal and saving conversions
const saveButton = document.getElementById("save");
const savedConversionsList = document.getElementById("saved-conversions");


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
