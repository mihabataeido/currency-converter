//Future_Value
document.addEventListener("DOMContentLoaded", function () {
    const calculatorForm = document.getElementById("calculator-future");
    const calculateButton = document.getElementById("calculate-button-future");
    const resultDiv = document.getElementById("result-future");    

    calculateButton.addEventListener("click", function () {
        const initialInvestment = parseFloat(document.getElementById("initial-investment").value);
        const annualInterestRate = parseFloat(document.getElementById("annual-interest-rate").value);
        const years = parseInt(document.getElementById("years").value);

        const futureValue = calculateFutureValue(initialInvestment, annualInterestRate, years);
        resultDiv.textContent = `Future Value: $${futureValue.toFixed(2)}`;
    });

    function calculateFutureValue(initialInvestment, annualInterestRate, years) {
        const monthlyInterestRate = annualInterestRate / 12 / 100;
        const months = years * 12;
        return initialInvestment * Math.pow(1 + monthlyInterestRate, months);
    }
});