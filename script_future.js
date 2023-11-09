//Future_Value
document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculate-button-future");
    const resultDiv = document.getElementById("result-future");

    calculateButton.addEventListener("click", function () {
        const initialInvestment = parseFloat(document.getElementById("initial-investment").value);
        const years = parseInt(document.getElementById("years").value);
        let annualInterestRate;

        if (document.getElementById("manual-interest-rate").checked) {
            annualInterestRate = parseFloat(document.getElementById("annual-interest-rate-manual").value);
        } else {
            // Handle automatic interest rate selection here
            annualInterestRate = parseFloat(document.getElementById("automatic-interest-rate-select").value);
        }

        if (isNaN(initialInvestment) || isNaN(years) || isNaN(annualInterestRate)) {
            resultDiv.textContent = "Invalid input";
        } else {
            const futureValue = calculateFutureValue(initialInvestment, annualInterestRate, years);
            resultDiv.textContent = `Future Value: $${futureValue.toFixed(2)}`;
        }
    });

    function calculateFutureValue(initialInvestment, annualInterestRate, years) {
        const monthlyInterestRate = annualInterestRate / 12 / 100;
        const months = years * 12;
        return initialInvestment * Math.pow(1 + monthlyInterestRate, months);
    }
});