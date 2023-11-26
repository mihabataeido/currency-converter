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

    calculateButton.addEventListener("click", function () {
        const initialInvestment = parseFloat(initialInvestmentInput.value);
        const period = parseInt(periodInput.value);
        const periodicDeposit = parseInt(periodicDepositInput.value);
        let periodicInterestRateFuture; 

        if (document.getElementById("manual-interest-rate").checked) {
            periodicInterestRateFuture = parseFloat(document.getElementById("periodic-interest-rate-manual-future").value/100);
        } else {
            // Handle automatic interest rate selection here
            periodicInterestRateFuture = parseFloat(document.getElementById("automatic-interest-rate-select-future").value);
        }

        if (isNaN(initialInvestment) || isNaN(period) || isNaN(periodicInterestRateFuture)) {
            resultDiv.textContent = "Invalid input";
        } else {
            const futureValue = calculateFutureValue(initialInvestment, periodicInterestRateFuture, period, periodicDeposit);
            resultDiv.textContent = `Future Value: ${futureValue.toFixed(2)}`;
        }
});

    // FIX THE CALCULATION BETWEEN THE MANUAL AND AUTOMATIC periodic INTEREST RATE
    function calculateFutureValue(initialInvestment, periodicInterestRateFuture, period, periodicDeposit) {
        const compoundFrequency = parseFloat(document.getElementById("compound-frequency-present").value);
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
});







