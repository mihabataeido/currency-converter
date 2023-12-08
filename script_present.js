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
    const saveButtonPresent = document.querySelector('.save-present');
    const favoriteButtonPresent = document.querySelector('.favorit-present');
    const shareButtonPresent = document.querySelector('.share-present');

    // Event listener for the Save button for present values
    saveButtonPresent.addEventListener('click', function () {
        // Add the result to the list of saved present results
        const resultPresent = document.getElementById("result-present").textContent;
        if (resultPresent !== "Present Value: Invalid input") {
            const savedResultsListPresent = document.getElementById("results-list-present");
            const newResultPresent = document.createElement('li');
            newResultPresent.classList.add('result-item'); // Add a class to the list item
            
            // Create a checkbox
            const checkboxPresent = document.createElement('input');
            checkboxPresent.type = 'checkbox';
            checkboxPresent.addEventListener('click', function(event) {
                // Mark or unmark the list item when the checkbox is clicked
                if (event.target.checked) {
                    newResultPresent.classList.add('marked');
                } else {
                    newResultPresent.classList.remove('marked');
                }
                // Save the updated list to local storage when checkbox is clicked
                saveResultsLocallyPresent(savedResultsListPresent, 'savedResultsPresent');
            });

            // Create a span to hold the resultPresent text
            const resultTextPresent = document.createElement('span');
            resultTextPresent.textContent = resultPresent;

            // Append checkbox and resultText to the list item
            newResultPresent.appendChild(checkboxPresent);
            newResultPresent.appendChild(resultTextPresent);

            // Append the new list item to the results list for present values
            savedResultsListPresent.appendChild(newResultPresent);

            // Save the updated list to local storage when new result is added for present values
            saveResultsLocallyPresent(savedResultsListPresent, 'savedResultsPresent');
        } else {
            alert("Cannot save invalid input.");
        }
    });

    // Save the updated list to local storage for present values
    function saveResultsLocallyPresent(savedResultsListPresent, storageKey) {
        localStorage.setItem(storageKey, savedResultsListPresent.innerHTML);
    }

    // Function to load saved results from local storage on page load for present values
    window.addEventListener('load', function () {
        const savedResultsListPresent = document.getElementById("results-list-present");
        savedResultsListPresent.innerHTML = localStorage.getItem('savedResultsPresent') || '';
    });

    // Save the updated favorite list to local storage for present values
    function saveFavoritesLocallyPresent(favoriteListPre, storageKey) {
        localStorage.setItem(storageKey, favoriteListPre.innerHTML);
    }

    // Function to load saved favorite items from local storage on page load for present values
    window.addEventListener('load', function () {
        const savedFavoriteListPresent = document.querySelector('.favorite-list-present');
        savedFavoriteListPresent.innerHTML = localStorage.getItem('favoriteItemsPresent') || '';
    });

    // Event listener for the Favorite button for present values
    favoriteButtonPresent.addEventListener('click', function () {
        const savedResultsListPresent = document.getElementById("results-list-present");
        const savedResultsPresent = savedResultsListPresent.querySelectorAll('li'); // Select all saved present results
        
        const favoriteListPresent = document.querySelector(".favorite-list-present"); // Select by class

        savedResultsPresent.forEach(function(savedResultPresent) {
            const checkboxPresent = savedResultPresent.querySelector('input[type="checkbox"]');
            const resultTextPresent = savedResultPresent.querySelector('span');
            
            if (checkboxPresent.checked) {
                const newFavoritePresent = document.createElement('li');

                // Create a checkbox
                const checkboxFavoritePresent = document.createElement('input');
                checkboxFavoritePresent.type = 'checkbox';
                checkboxFavoritePresent.className = 'favorite-checkbox'; // Add a class for styling purposes
                checkboxFavoritePresent.addEventListener('change', function() {
                    // Handle the checkbox change event if needed
                });
                newFavoritePresent.appendChild(checkboxFavoritePresent);

                // Create a label for the favorite item
                const label = document.createElement('label');
                label.textContent = resultTextPresent.textContent;
                newFavoritePresent.appendChild(label);

                favoriteListPresent.appendChild(newFavoritePresent);
            }
        });

        // Save the updated favorite list to local storage for present values
        saveFavoritesLocallyPresent(favoriteListPresent, 'favoriteItemsPresent');
    });


    // Event listener for the Trash Bin button for present values
    const trashBinButtonSavePresent = document.querySelector('.trash-bin-present');

    trashBinButtonSavePresent.addEventListener('click', function () {
        const savedResultsListPresent = document.getElementById("results-list-present");
        const savedResultsPresent = savedResultsListPresent.querySelectorAll('li');

        savedResultsPresent.forEach(function(savedResultPresent) {
            const checkboxSavePresent = savedResultPresent.querySelector('input[type="checkbox"]');

            if (checkboxSavePresent.checked) {
                // Remove the selected result if the checkbox is checked
                savedResultPresent.remove();
            }
        });

        // Save the updated list to local storage after deletion
        saveResultsLocallyPresent(savedResultsListPresent, 'savedResultsPresent');
    });

    // Event listener for the Trash Bin button for present favorite values
    const trashBinButtonFavoritePresent = document.querySelector('.trash-bin-favorite-present');

    trashBinButtonFavoritePresent.addEventListener('click', function () {
        const favoriteListPresent = document.querySelector(".favorite-list-present");
        const favoriteResultsPresent = favoriteListPresent.querySelectorAll('li');

        favoriteResultsPresent.forEach(function(favoriteResultPresent) {
            const checkboxFavoritePresent = favoriteResultPresent.querySelector('input[type="checkbox"]');

            if (checkboxFavoritePresent.checked) {
                // Remove the selected result if the checkbox is checked
                favoriteResultPresent.remove();
            }
        });

        // Save the updated list to local storage after deletion
        saveFavoritesLocallyPresent(favoriteListPresent, 'favoriteItemsPresent');
    });


    
    // Event listener for the Share button
    shareButtonPresent.addEventListener('click', function () {
        // Share to platforms
    });
});