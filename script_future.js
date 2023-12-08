//Future_Value
document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculate-button-future");
    const resultDiv = document.getElementById("result-future");
    const initialInvestmentInput = document.getElementById("initial-investment");
    const periodInput = document.getElementById("period");
    const periodicDepositInput = document.getElementById("periodic-deposit-input");
    const savedResultsListFuture = document.getElementById('results-list-future');
    const favoriteListFuture = document.querySelector('.favorite-list-future');

    // Function to validate and allow only non-negative numbers
    function validateNonNegativeInput(inputElement) {
        inputElement.addEventListener('input', function () {
            let value = parseFloat(this.value);
            if (isNaN(value) || value < 0) {
                this.value = ''; // Clear the input if it's invalid
            }
        });
    }

    // Apply validation to input fields
    validateNonNegativeInput(initialInvestmentInput);
    validateNonNegativeInput(periodInput);
    validateNonNegativeInput(periodicDepositInput);

    document.getElementById("compound-checkbox").addEventListener("change", ShowAndHide)
    function ShowAndHide() {
        var x = document.getElementById("periodic-deposit-section");
        var y = document.getElementById("compound-period");

        if (x.style.display === "none") {
            x.style.display = "block";
            y.style.display = "block";
        } else {
            x.style.display = "none";
            y.style.display = "none";
        }
    }

    calculateButton.addEventListener("click", function () {
        const initialInvestment = parseFloat(initialInvestmentInput.value);
        const period = parseInt(periodInput.value);
        const periodicDeposit = parseInt(periodicDepositInput.value);
        const periodicInterestRateFuture = parseFloat(document.getElementById("periodic-interest-rate-manual-future").value/100);

        if (isNaN(initialInvestment) || isNaN(period) || isNaN(periodicInterestRateFuture)) {
            resultDiv.textContent = "Future Value: Invalid input";
            alert("Invalid input. Please Enter a valid amount.");
        } else {
            const futureValue = calculateFutureValue(initialInvestment, periodicInterestRateFuture, period, periodicDeposit);
            resultDiv.textContent = `Future Value: ${futureValue.toFixed(2)}`;
        }
    });

    // FIX THE CALCULATION BETWEEN THE MANUAL AND AUTOMATIC periodic INTEREST RATE
    function calculateFutureValue(initialInvestment, periodicInterestRateFuture, period, periodicDeposit) {
        const compoundFrequency = parseFloat(document.getElementById("compound-frequency-future").value);
        const periodicInterestRate = periodicInterestRateFuture / compoundFrequency;
        const periodicTime = period * compoundFrequency;
        const decrementPeriodicDepositEnd = period - 1;
        
        // Calculate future value with periodic deposits
        let futureValue;
        if (document.getElementById("compound-checkbox").checked) {
            if (periodicDeposit > 0 && document.getElementById("beginning-of-period").checked) {
                futureValue = initialInvestment * Math.pow(1 + periodicInterestRate, periodicTime) + (periodicDeposit * (Math.pow(1 + periodicInterestRate, periodicTime) - 1)) / periodicInterestRate;
            } else if (periodicDeposit > 0 && document.getElementById("end-of-period").checked) {
                futureValue = initialInvestment * Math.pow(1 + periodicInterestRate, periodicTime) + (decrementPeriodicDepositEnd * (Math.pow(1 + periodicInterestRate, periodicTime) - 1)) / periodicInterestRate + periodicDeposit;
            } else if (periodicDeposit > 0) {
                futureValue = initialInvestment * Math.pow(1 + periodicInterestRate, periodicTime) + (periodicDeposit * (Math.pow(1 + periodicInterestRate, periodicTime) - 1)) / periodicInterestRate;
            } 
            else {
                futureValue = initialInvestment * Math.pow(1 + periodicInterestRate, periodicTime);
            }
        } else {
            futureValue = initialInvestment * Math.pow(1 + periodicInterestRate, periodicTime);
        }

        return futureValue;
    }

    // Marked Conversions
    const saveButtonFuture = document.querySelector('.save-future');
    const favoriteButtonFuture = document.querySelector('.favorit-future');
    const shareButtonFuture = document.querySelector('.share-future');


    function saveResultsLocallyFuture(savedResultsListFuture, storageKey) {
        localStorage.setItem(storageKey, savedResultsListFuture.innerHTML);
    }
    
    window.addEventListener('load', function () {
        const savedResultsListFuture = document.getElementById("results-list-future");
        savedResultsListFuture.innerHTML = localStorage.getItem('savedResultsFuture') || '';
    });
        

    saveButtonFuture.addEventListener('click', function () {
        const initialInvestment = parseFloat(initialInvestmentInput.value);
        const compoundFrequency = document.getElementById("compound-frequency-future").options[document.getElementById("compound-frequency-future").selectedIndex].textContent;
        const periodicInterestRate = parseFloat(document.getElementById("periodic-interest-rate-manual-future").value) / 100;
        const periods = parseInt(periodInput.value);
        const periodicDeposit = parseInt(periodicDepositInput.value);
        let equationText;
    
        const resultFuture = document.getElementById("result-future").textContent;
        const resultValue = parseFloat(resultFuture.replace("Future Value: ", ""));
        const savedResultsListFuture = document.getElementById("results-list-future");
    
        // Check if the result already exists in the saved list
        const existingResults = savedResultsListFuture.querySelectorAll('.result-item span');
        let isDuplicate = false;
        existingResults.forEach(function (existingResult) {
            if (existingResult.textContent === resultFuture) {
                isDuplicate = true;
            }
        });
    
        if (isNaN(resultValue) || resultValue <= 0) {
            alert("Cannot save invalid or zero input.");
        } else if (isDuplicate) {
            alert("Result already exists in the list.");
        } else {
            if (periodicDeposit > 0 && document.getElementById("beginning-of-period").checked){
                equationText = `Future Value: ${resultValue.toFixed(2)} ---- Initial Investment: ${initialInvestment.toFixed(2)}, Compounded ${compoundFrequency}, Periodic Interest Rate: ${(periodicInterestRate * 100).toFixed(2)}%, ${periods} Periods, Periodic Deposit: ${periodicDeposit.toFixed(2)} made at the beginning of each period`;
            } else if (periodicDeposit > 0 && document.getElementById("end-of-period").checked){
                equationText = `Future Value: ${resultValue.toFixed(2)} ---- Initial Investment: ${initialInvestment.toFixed(2)}, Compounded ${compoundFrequency}, Periodic Interest Rate: ${(periodicInterestRate * 100).toFixed(2)}%, ${periods} Periods, Periodic Deposit: ${periodicDeposit.toFixed(2)} made at the end of each period`;
            } else if (periodicDeposit > 0) {
                equationText = `Future Value: ${resultValue.toFixed(2)} ---- Initial Investment: ${initialInvestment.toFixed(2)}, Compounded ${compoundFrequency}, Periodic Interest Rate: ${(periodicInterestRate * 100).toFixed(2)}%, ${periods} Periods, Periodic Deposit: ${periodicDeposit.toFixed(2)} made at the beginning of each period`;
            } else {
                equationText = `Future Value: ${resultValue.toFixed(2)} ---- Initial Investment: ${initialInvestment.toFixed(2)}, Compounded ${compoundFrequency}, Periodic Interest Rate: ${(periodicInterestRate * 100).toFixed(2)}%, ${periods} Periods`;
            }

            const newResultFuture = document.createElement('li');
            newResultFuture.classList.add('result-item'); // Add a class to the list item
            
            // Create a checkbox
            const checkboxFuture = document.createElement('input');
            checkboxFuture.type = 'checkbox';
            checkboxFuture.addEventListener('click', function(event) {
                // Mark or unmark the list item when the checkbox is clicked
                if (event.target.checked) {
                    newResultFuture.classList.add('marked');
                } else {
                    newResultFuture.classList.remove('marked');
                }
                // Save the updated list to local storage when checkbox is clicked
                saveResultsLocallyFuture(savedResultsListFuture, 'savedResultsFuture');
            });
    
            // Create a span to hold the equation text
            const equationSpan = document.createElement('span');
            equationSpan.textContent = equationText;
    
            // Append checkbox and equationSpan to the list item
            newResultFuture.appendChild(checkboxFuture);
            newResultFuture.appendChild(equationSpan);
    
            // Append the new list item to the results list for future values
            savedResultsListFuture.appendChild(newResultFuture);
    
            // Save the updated list to local storage when new result is added for future values
            saveResultsLocallyFuture(savedResultsListFuture, 'savedResultsFuture');
        }
    });


    // Save the updated favorite list to local storage for future values
    function saveFavoritesLocallyFuture(favoriteListFut, storageKey) {
        localStorage.setItem(storageKey, favoriteListFut.innerHTML);
    }

    // Function to load saved favorite items from local storage on page load for future values
    window.addEventListener('load', function () {
        const savedFavoriteListFuture = document.querySelector('.favorite-list-future');
        savedFavoriteListFuture.innerHTML = localStorage.getItem('favoriteItemsFuture') || '';
    });

    // Event listener for the Favorite button for future values
    favoriteButtonFuture.addEventListener('click', function () {
        const savedResultsListFuture = document.getElementById("results-list-future");
        const savedResultsFuture = savedResultsListFuture.querySelectorAll('li'); // Select all saved future results
        
        const favoriteListFuture = document.querySelector(".favorite-list-future"); // Select by class

        // Get existing favorite items for future values
        const existingFavoriteItemsFuture = favoriteListFuture.querySelectorAll('label');

        savedResultsFuture.forEach(function(savedResultFuture) {
            const checkboxFuture = savedResultFuture.querySelector('input[type="checkbox"]');
            const resultTextFuture = savedResultFuture.querySelector('span');
            const isDuplicateFuture = Array.from(existingFavoriteItemsFuture).some(favoriteItem => favoriteItem.textContent === resultTextFuture.textContent);
            
            if (checkboxFuture.checked && !isDuplicateFuture) {
                const newFavoriteFuture = document.createElement('li');

                // Create a checkbox for future values
                const checkboxFavoriteFuture = document.createElement('input');
                checkboxFavoriteFuture.type = 'checkbox';
                checkboxFavoriteFuture.className = 'favorite-checkbox'; // Add a class for styling purposes
                checkboxFavoriteFuture.addEventListener('change', function() {
                    // Handle the checkbox change event if needed
                });
                newFavoriteFuture.appendChild(checkboxFavoriteFuture);

                // Create a label for the favorite item for future values
                const labelFuture = document.createElement('label');
                labelFuture.textContent = resultTextFuture.textContent;
                newFavoriteFuture.appendChild(labelFuture);

                favoriteListFuture.appendChild(newFavoriteFuture);
            }
        });

        // Save the updated favorite list to local storage for future values
        saveFavoritesLocallyFuture(favoriteListFuture, 'favoriteItemsFuture');
    });



    // Event listener for the Trash Bin button for future values
    const trashBinButtonSaveFuture = document.querySelector('.trash-bin-future');

    trashBinButtonSaveFuture.addEventListener('click', function () {
        const savedResultsListFuture = document.getElementById("results-list-future");
        const savedResultsFuture = savedResultsListFuture.querySelectorAll('li');

        savedResultsFuture.forEach(function(savedResultFuture) {
            const checkboxSaveFuture = savedResultFuture.querySelector('input[type="checkbox"]');

            if (checkboxSaveFuture.checked) {
                // Remove the selected result if the checkbox is checked
                savedResultFuture.remove();
            }
        });

        // Save the updated list to local storage after deletion
        saveResultsLocallyFuture(savedResultsListFuture, 'savedResultsFuture');
    });

    // Event listener for the Trash Bin button for future favorite values
    const trashBinButtonFavoriteFuture = document.querySelector('.trash-bin-favorite-future');

    trashBinButtonFavoriteFuture.addEventListener('click', function () {
        const favoriteListFuture = document.querySelector(".favorite-list-future");
        const favoriteResultsFuture = favoriteListFuture.querySelectorAll('li');

        favoriteResultsFuture.forEach(function(favoriteResultFuture) {
            const checkboxFavoriteFuture = favoriteResultFuture.querySelector('input[type="checkbox"]');

            if (checkboxFavoriteFuture.checked) {
                // Remove the selected result if the checkbox is checked
                favoriteResultFuture.remove();
            }
        });

        // Save the updated list to local storage after deletion
        saveFavoritesLocallyFuture(favoriteListFuture, 'favoriteItemsFuture');
    });

    // Event listener for "Select All Saved" checkbox
    const selectAllSavedCheckboxFuture = document.getElementById('select-all-saved-future');
    selectAllSavedCheckboxFuture.addEventListener('change', function () {
        const checkboxes = savedResultsListFuture.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAllSavedCheckboxFuture.checked;
        });
    });

    // Event listener for individual checkboxes (if you need any other functionality)
    savedResultsListFuture.addEventListener('change', function (event) {
        if (event.target.matches('input[type="checkbox"]')) {
            const checkboxes = savedResultsListFuture.querySelectorAll('input[type="checkbox"]');
            const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
            selectAllSavedCheckboxFuture.checked = allChecked;
        }
    });

    // Event listener for "Select All" checkbox in favorite results
    const selectAllFavoriteCheckboxFuture = document.getElementById('select-all-favorite-future');
    selectAllFavoriteCheckboxFuture.addEventListener('change', function () {
        
        const favoriteCheckboxes = favoriteListFuture.querySelectorAll('input[type="checkbox"]');
        favoriteCheckboxes.forEach(checkbox => {
            checkbox.checked = selectAllFavoriteCheckboxFuture.checked;
        });
    });

    // Event listener for individual checkboxes in favorite results
    
    favoriteListFuture.addEventListener('change', function (event) {
        if (event.target.matches('input[type="checkbox"]')) {
            const favoriteCheckboxes = favoriteListFuture.querySelectorAll('input[type="checkbox"]');
            const allChecked = Array.from(favoriteCheckboxes).every(checkbox => checkbox.checked);
            selectAllFavoriteCheckboxFuture.checked = allChecked;
        }
    });




    // Event listener for the Share button
    shareButtonFuture.addEventListener('click', function () {
        // Share to platforms
        const futureValue = document.getElementById("result-future").textContent;
        if (futureValue !== "Future Value: Invalid input") {
            const shareText = `Check out this future value I calculated using the Financial Calculator: ${futureValue}`;
            const shareUrl = 'https://financial-calculator-website.github.io/';
            const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
            const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
            const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=&summary=${shareText}&source=`;
            window.open(twitterUrl, '_blank');
            window.open(facebookUrl, '_blank');
            window.open(linkedinUrl, '_blank');
        } else {
            alert("Cannot share invalid input.");
        }
    });
});







