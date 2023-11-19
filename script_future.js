//Future_Value
document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculate-button-future");
    const resultDiv = document.getElementById("result-future");

    calculateButton.addEventListener("click", function () {
        const initialInvestment = parseFloat(document.getElementById("initial-investment").value);
        const years = parseInt(document.getElementById("years").value);
        const periodic = parseInt(document.getElementById("periodic-deposit").value);
        let annualInterestRateFuture;
        let compoundPeriod;

        if (document.getElementById("manual-interest-rate").checked) {
            annualInterestRateFuture = parseFloat(document.getElementById("annual-interest-rate-manual-future").value);
        } else {
            // Handle automatic interest rate selection here
            annualInterestRateFuture = parseFloat(document.getElementById("automatic-interest-rate-select-future").value);
        }

        if (isNaN(initialInvestment) || isNaN(years) || isNaN(annualInterestRateFuture)) {
            resultDiv.textContent = "Invalid input";
        } else {
            const futureValue = calculateFutureValue(initialInvestment, annualInterestRateFuture, years, periodic);
            resultDiv.textContent = `Future Value: $${futureValue.toFixed(2)}`;
        }

        if (document.getElementById("beginning-of-period").checked){
            compoundPeriod = ;
        } elif (document.getElementById("end-of-period").checked) {
            compoundPeriod =  ;
        }
});

    });

    // FIX THE CALCULATION BETWEEN THE MANUAL AND AUTOMATIC ANNUAL INTEREST RATE
    function calculateFutureValue(initialInvestment, annualInterestRateFuture, years, periodic) {
        const monthlyInterestRate = annualInterestRateFuture / 12 / 100;
        const months = years * 12;
        
        // Calculate future value with periodic deposits
        let futureValue;
        if (periodic === 0) {
            futureValue = initialInvestment * Math.pow(1 + monthlyInterestRate, months);
        } else {
            futureValue = initialInvestment * Math.pow(1 + monthlyInterestRate, months) +
                periodic * ((Math.pow(1 + monthlyInterestRate, months) - 1) / monthlyInterestRate);
        }

        return futureValue;
    }
});
