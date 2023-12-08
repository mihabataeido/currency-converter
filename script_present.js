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
        let periodicInflationRate;

        if (document.getElementById("manual-inflation-rate").checked) {
            periodicInflationRate = parseFloat(document.getElementById("periodic-inflation-rate-manual-present").value/100);
        } else {
            // Handle automatic interest rate selection here
            periodicInflationRate = parseFloat(document.getElementById("automatic-inflation-rate-select-present").value/100);
        }

        if (isNaN(futureValue) || isNaN(periodicInflationRate) || isNaN(period)) {
            presentValueResult.textContent = "Invalid input";
            alert("Invalid input. Please enter valid amount.");
        } else {
            const presentValue = calculatePresentValue(futureValue, periodicInflationRate, period);
            presentValueResult.textContent = presentValue.toFixed(2);
        }
    });

    function calculatePresentValue(futureValue, periodicInflationRate, period) {
        const compoundFrequency = parseFloat(document.getElementById("compound-frequency-present").value);
        return futureValue / Math.pow(1 + periodicInflationRate/compoundFrequency, period*compoundFrequency);
    }


    // Marked Conversions
    const saveButtonPresent = document.querySelector('.save-present');
    const favoriteButtonPresent = document.querySelector('.favorit-present');
    const shareButtonPresent = document.querySelector('.share-present');

    // Event listener for the Save button for present values
    saveButtonPresent.addEventListener('click', function () {
        const futureValue = parseFloat(futureValueInput.value);
        const period = parseInt(yearsInput.value);
        const resultPresent = document.getElementById("result-present").textContent;
        const resultValue = parseFloat(resultPresent.replace("Present Value: ", ""));
        const savedResultsListPresent = document.getElementById("results-list-present");
        const compoundFrequency = document.getElementById("compound-frequency-present").options[document.getElementById("compound-frequency-present").selectedIndex].textContent;
        let periodicInflationRate;

        if (document.getElementById("manual-inflation-rate").checked) {
            periodicInflationRate = parseFloat(document.getElementById("periodic-inflation-rate-manual-present").value / 100);
        } else {
            // Handle automatic interest rate selection here
            periodicInflationRate = parseFloat(document.getElementById("automatic-inflation-rate-select-present").value / 100);
        }

        if (isNaN(futureValue) || isNaN(periodicInflationRate) || isNaN(period)) {
            presentValueResult.textContent = "Invalid input";
            alert("Invalid input. Please enter a valid amount.");
        } else {
            const presentValue = calculatePresentValue(futureValue, periodicInflationRate, period);
            const equationText = `Present Value: ${presentValue.toFixed(2)} ---- Future Value: ${futureValue.toFixed(2)}, Compounded ${compoundFrequency}, Inflation Rate: ${(periodicInflationRate * 100).toFixed(2)}%, ${period} Periods`;

            // Check if the result already exists in the saved list
            const existingResults = savedResultsListPresent.querySelectorAll('.result-item');
            let isDuplicate = false;
            existingResults.forEach(function (existingResult) {
                const existingEquation = existingResult.querySelector('span').textContent;
                if (existingEquation === equationText) {
                    isDuplicate = true;
                }
            });

            if (isNaN(resultValue) || resultValue <= 0 || isDuplicate) {
                if (isNaN(resultValue) || resultValue <= 0) {
                    alert("Cannot save invalid or zero input.");
                } else if (isDuplicate) {
                    alert("Result already exists in the list.");
                }
            } else {
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

                // Create a span to hold the resultText with the equation
                const resultTextPresent = document.createElement('span');
                resultTextPresent.textContent = equationText;

                // Append checkbox and resultText to the list item
                newResultPresent.appendChild(checkboxPresent);
                newResultPresent.appendChild(resultTextPresent);

                // Append the new list item to the results list for present values
                savedResultsListPresent.appendChild(newResultPresent);

                // Save the updated list to local storage when new result is added for present values
                saveResultsLocallyPresent(savedResultsListPresent, 'savedResultsPresent');
            }
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

        // Get existing favorite items
        const existingFavoriteItems = favoriteListPresent.querySelectorAll('label');

        savedResultsPresent.forEach(function(savedResultPresent) {
            const checkboxPresent = savedResultPresent.querySelector('input[type="checkbox"]');
            const resultTextPresent = savedResultPresent.querySelector('span');
            const isDuplicate = Array.from(existingFavoriteItems).some(favoriteItem => favoriteItem.textContent === resultTextPresent.textContent);
            
            if (checkboxPresent.checked && !isDuplicate) {
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

    // Select All button for saved results list for present values
    const selectAllSavedPresent = document.querySelector('.select-all-saved-present');
    selectAllSavedPresent.addEventListener('click', function () {
        const savedResultsPresent = document.querySelectorAll('#results-list-present .result-item input[type="checkbox"]');
        savedResultsPresent.forEach(function (checkbox) {
            checkbox.checked = true;
        });
    });

    // Deselect All button for saved results list for present values
    const deselectAllSavedPresent = document.querySelector('.deselect-all-saved-present');
    deselectAllSavedPresent.addEventListener('click', function () {
        const savedResultsPresent = document.querySelectorAll('#results-list-present .result-item input[type="checkbox"]');
        savedResultsPresent.forEach(function (checkbox) {
            checkbox.checked = false;
        });
    });

    // Select All button for favorite result list for present values
    const selectAllFavoritePresent = document.querySelector('.select-all-favorite-present');
    selectAllFavoritePresent.addEventListener('click', function () {
        const favoriteResultsPresent = document.querySelectorAll('.favorite-list-present .favorite-checkbox');
        favoriteResultsPresent.forEach(function (checkbox) {
            checkbox.checked = true;
        });
    });

    // Deselect All button for favorite result list for present values
    const deselectAllFavoritePresent = document.querySelector('.deselect-all-favorite-present');
    deselectAllFavoritePresent.addEventListener('click', function () {
        const favoriteResultsPresent = document.querySelectorAll('.favorite-list-present .favorite-checkbox');
        favoriteResultsPresent.forEach(function (checkbox) {
            checkbox.checked = false;
        });
    });



    
    // Event listener for the Share button
    shareButtonPresent.addEventListener('click', function () {
        // Share to platforms
    });
});