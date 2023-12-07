//Future_Value
document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculate-button-future");
    const resultDiv = document.getElementById("result-future");
    const initialInvestmentInput = document.getElementById("initial-investment");
    const periodInput = document.getElementById("period");
    const periodicDepositInput = document.getElementById("periodic-deposit-input");

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
})
;

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
    const saveButton = document.querySelector('.save-future');
    const favoriteButton = document.querySelector('.favorit-future');
    const shareButton = document.querySelector('.share-future');

    // Event listener for the Save button
    saveButton.addEventListener('click', function () {
        // Add the result to the list of saved results
        const futureValue = document.getElementById("result-future").textContent;
        if (futureValue !== "Future Value: Invalid input") {
            const savedResultsList = document.getElementById("results-list-future");
            const newResult = document.createElement('li');
            newResult.classList.add('result-item'); // Add a class to the list item
            
            // Create a checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('click', function(event) {
                // Mark or unmark the list item when the checkbox is clicked
                if (event.target.checked) {
                    newResult.classList.add('marked');
                } else {
                    newResult.classList.remove('marked');
                }
                // Save the updated list to local storage when checkbox is clicked
                saveResultsLocally(savedResultsList);
            });

            // Create a span to hold the futureValue text
            const resultText = document.createElement('span');
            resultText.textContent = futureValue;

            // Append checkbox and resultText to the list item
            newResult.appendChild(checkbox);
            newResult.appendChild(resultText);

            // Append the new list item to the results list
            savedResultsList.appendChild(newResult);

            // Save the updated list to local storage when new result is added
            saveResultsLocally(savedResultsList);
        } else {
            alert("Cannot save invalid input.");
        }
    });

    // Function to save the results list to local storage
    function saveResultsLocally(resultsList) {
        // Get the HTML content of the results list and store it in local storage
        localStorage.setItem('savedResults', resultsList.innerHTML);
    }

    // Function to load saved results from local storage on page load
    window.addEventListener('load', function () {
        const savedResultsList = document.getElementById('results-list-future');
        // Get saved results from local storage and populate the results list
        savedResultsList.innerHTML = localStorage.getItem('savedResults') || '';
    });
       
    // Event listener for the Favorite button for future values
    favoriteButton.addEventListener('click', function () {
        const savedResultsList = document.getElementById("results-list-future");
        const savedResults = savedResultsList.querySelectorAll('li'); // Select all saved future results
        
        const favoriteList = document.querySelector(".favorite-list-future"); // Select by class

        savedResults.forEach(function(savedResult) {
            const checkbox = savedResult.querySelector('input[type="checkbox"]');
            const resultText = savedResult.querySelector('span');
            
            if (checkbox.checked) {
                const newFavorite = document.createElement('li');

                // Create a checkbox
                const checkboxFavorite = document.createElement('input');
                checkboxFavorite.type = 'checkbox';
                checkboxFavorite.className = 'favorite-checkbox'; // Add a class for styling purposes
                checkboxFavorite.addEventListener('change', function() {
                    // Handle the checkbox change event if needed
                });
                newFavorite.appendChild(checkboxFavorite);

                // Create a label for the favorite item
                const label = document.createElement('label');
                label.textContent = resultText.textContent;
                newFavorite.appendChild(label);

                favoriteList.appendChild(newFavorite);
            }
        });

        // Save the updated favorite list to local storage for future values
        saveFavoritesLocally(favoriteItems, 'favoriteItemsFuture');
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
        saveResultsLocally(savedResultsListFuture, 'savedResultsFuture');
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
        saveResultsLocally(favoriteListFuture, 'favoriteItemsFuture');
    });




    // Event listener for the Share button
    shareButton.addEventListener('click', function () {
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







