//Present Value 
document.addEventListener("DOMContentLoaded", function () {
    const futureValueInput = document.getElementById("future-value");
    const yearsInput = document.getElementById("years-present");
    const calculateButton = document.getElementById("calculate-button-present");
    const presentValueResult = document.getElementById("present-value-result");

    calculateButton.addEventListener("click", function () {
        const futureValue = parseFloat(futureValueInput.value);
        const years = parseInt(yearsInput.value);
        let annualInterestRatePresent;

        if (document.getElementById("manual-interest-rate-present").checked) {
            annualInterestRatePresent = parseFloat(document.getElementById("annual-interest-rate-manual-present").value);
        } else {
            // Handle automatic interest rate selection here
            annualInterestRatePresent = parseFloat(document.getElementById("automatic-interest-rate-select-present").value);
        }

        if (isNaN(futureValue) || isNaN(annualInterestRatePresent) || isNaN(years)) {
            presentValueResult.textContent = "Invalid input";
        } else {
            const presentValue = calculatePresentValue(futureValue, annualInterestRatePresent, years);
            presentValueResult.textContent = presentValue.toFixed(2);
        }
    });

    function calculatePresentValue(futureValue, annualInterestRatePresent, years) {
        return futureValue / Math.pow(1 + annualInterestRatePresent, years);
    }

    // Access to elements for reversal and saving conversions
    const reverseConvertButton = document.getElementById("reverse-convert");
    const saveButton = document.getElementById("save");
    const savedConversionsList = document.getElementById("saved-conversions");
    
    // Access to elements for the like button
    const likeContainer = document.getElementById("like-container");
    const likedConversionsList = document.getElementById("liked-conversions");

    // Save button and saved conversions
    saveButton.addEventListener("click", function () {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const inputAmount = amount.value;
        
        // Finish the function if values are missing
        if (!from || !to || !inputAmount) {
            alert("Bitte wählen Sie Währungen aus und geben Sie einen Betrag ein.");
            return; 
        }
        
        // Get the converted amount
        const convertedAmount = result.textContent;

        // Create an object for the saved conversion
        const savedConversion = {
            from: from,
            to: to,
            inputAmount: inputAmount,
            convertedAmount: convertedAmount,
            checked: false 
        };

        // Add the conversion to the array
        savedConversions.push(savedConversion);

        // Zurücksetzen der Eingabefelder
        //fromCurrency.value = "";
        //toCurrency.value = "";
        //amount.value = "";
        //result.textContent = "";

        // Refresh the display of the stored conversions
        displaySavedConversions();        
    });

    // Function for displaying the stored conversions
        function displaySavedConversions() {
        savedConversionsList.innerHTML = ""; 

    // Create and display the saved conversions as checkboxes
        for (let i = 0; i < savedConversions.length; i++) {
            const conversion = savedConversions[i];
            const listItem = document.createElement("p");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `conversion-${i}`;
            checkbox.checked = conversion.checked; 

    // Create a heading once when saving a conversion for the first time
        if (savedConversionsList.children.length === 0) {
            const header = document.createElement("h3");
            header.textContent = "Gespeicherte Umrechnungen:";
            savedConversionsList.appendChild(header);
        }
        
        // Create a label for the conversion
        const label = document.createElement("label");
        label.setAttribute("for", `conversion-${i}`);
        label.innerHTML = `<svg height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g><path d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z"></path></g></g></svg>
        ${conversion.inputAmount} ${conversion.from} = ${conversion.convertedAmount} ${conversion.to} `;

        listItem.appendChild(checkbox);
        listItem.appendChild(label);

        savedConversionsList.appendChild(listItem);
    }

    // If there are no saved conversions, the list is hidden
    savedConversionsList.style.display = savedConversions.length > 0 ? "block" : "none";
}

// Call up the function for displaying the saved conversions to show them when the page is loaded
displaySavedConversions();
});