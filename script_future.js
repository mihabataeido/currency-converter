//Future_Value
document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculate-button-future");
    const resultDiv = document.getElementById("result-future");

    calculateButton.addEventListener("click", function () {
        const initialInvestment = parseFloat(document.getElementById("initial-investment").value);
        const years = parseInt(document.getElementById("years").value);
        let annualInterestRateFuture;

        if (document.getElementById("manual-interest-rate").checked) {
            annualInterestRateFuture = parseFloat(document.getElementById("annual-interest-rate-manual-future").value);
        } else {
            // Handle automatic interest rate selection here
            annualInterestRateFuture = parseFloat(document.getElementById("automatic-interest-rate-select-future").value);
        }

        if (isNaN(initialInvestment) || isNaN(years) || isNaN(annualInterestRateFuture)) {
            resultDiv.textContent = "Invalid input";
        } else {
            const futureValue = calculateFutureValue(initialInvestment, annualInterestRateFuture, years);
            resultDiv.textContent = `Future Value: $${futureValue.toFixed(2)}`;
        }
    });

    function calculateFutureValue(initialInvestment, annualInterestRateFuture, years) {
        const monthlyInterestRate = annualInterestRateFuture / 12 / 100;
        const months = years * 12;
        return initialInvestment * Math.pow(1 + monthlyInterestRate, months);
    }
});
