//Present Value 
document.addEventListener("DOMContentLoaded", function () {
    const futureValueInput = document.getElementById("future-value");
    const yearsInput = document.getElementById("period-present");
    const calculateButton = document.getElementById("calculate-button-present");
    const presentValueResult = document.getElementById("present-value-result");

    // Function to validate and allow only non-negative numbers
    function validateNonNegativeInput(inputElement) {
        inputElement.addEventListener('input', function () {
            let value = parseFloat(this.value);
            if (isNaN(value) || value < 0) {
                this.value = ''; // Clear the input if it's invalid
            }
        });
    }

    var apiUrl = 'https://www.statbureau.org/calculate-inflation-rate-jsonp?jsoncallback=?';
    const countries = ["belarus", "brazil", "canada", "european-union", "eurozone", "france", "germany", "greece", "india", "japan", "kazakhstan", "mexico", "russia", "spain", "turkey", "ukraine", "united-kingdom", "united-states"];

    $('#automatic-inflation-rate').on('click', function () {
        // Clear previous results before populating the dropdown
        $('#automatic-inflation-rate-select-present').empty();

        // Iterate through the countries array
        countries.forEach(function (country) {
            $.getJSON(apiUrl, {
                country: country,
                start: "2010/1/1",
                end: "2010/12/31",
                format: true
            })
            .done(function (data) {
                // Append country and inflation rate to the dropdown list
                $('#automatic-inflation-rate-select-present').append($('<option>', {
                    value: data,
                    text: country + ': ' + data
                }));
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Error fetching data for ' + country + ': ' + textStatus, errorThrown);
            });
        });
    });


    // Apply validation to futureValueInput and yearsInput
    validateNonNegativeInput(futureValueInput);
    validateNonNegativeInput(yearsInput);
    
    calculateButton.addEventListener("click", function () {
        const futureValue = parseFloat(futureValueInput.value);
        const period = parseInt(yearsInput.value);
        let periodicInterestRatePresent;

        if (document.getElementById("manual-inflation-rate").checked) {
            periodicInterestRatePresent = parseFloat(document.getElementById("periodic-inflation-rate-manual-present").value/100);
        } else {
            // Handle automatic interest rate selection here
            periodicInterestRatePresent = parseFloat(document.getElementById("automatic-inflation-rate-select-present").value/100);
        }

        if (isNaN(futureValue) || isNaN(periodicInterestRatePresent) || isNaN(period)) {
            presentValueResult.textContent = "Invalid input";
            alert("Invalid input. Please enter valid amount.");
        } else {
            const presentValue = calculatePresentValue(futureValue, periodicInterestRatePresent, period);
            presentValueResult.textContent = presentValue.toFixed(2);
        }
    });

    function calculatePresentValue(futureValue, periodicInterestRatePresent, period) {
        const compoundFrequency = parseFloat(document.getElementById("compound-frequency-present").value);
        return futureValue / Math.pow(1 + periodicInterestRatePresent/compoundFrequency, period*compoundFrequency);
    }


    // Marked Conversions
    const saveButton = document.querySelector('.save-present');
    const favoriteButton = document.querySelector('.favorit-present');
    const shareButton = document.querySelector('.share-present');

    // Event listener for the Save button
    saveButton.addEventListener('click', function () {
        // Save to local storage
    });

    // Event listener for the Favorite button
    favoriteButton.addEventListener('click', function () {
        // Add the result to the list of saved results
        const resultPresent = document.getElementById("result-present").textContent;
        if (resultPresent !== "Future Value: Invalid input") {
            const savedResultsList = document.getElementById("results-list-present");
            const newResult = document.createElement('li');
            newResult.textContent = resultPresent;
            savedResultsList.appendChild(newResult);
        } else {
            alert("Cannot save invalid input.");
        }
    });

    // Event listener for the Share button
    shareButton.addEventListener('click', function () {
        // Share to platforms
    });
});