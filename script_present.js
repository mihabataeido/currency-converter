//Present Value Calculator
document.addEventListener("DOMContentLoaded", function () {
    const futureValueInput = document.getElementById("future-value");
    const annualInterestRateInput = document.getElementById("annual-interest-rate");
    const yearsInput = document.getElementById("years");
    const calculateButton = document.getElementById("calculate-button-present");
    const presentValueResult = document.getElementById("present-value-result");

    calculateButton.addEventListener("click", function () {
        const futureValue = parseFloat(futureValueInput.value);
        const annualInterestRate = parseFloat(annualInterestRateInput.value) / 100;
        const years = parseInt(yearsInput.value);

        if (isNaN(futureValue) || isNaN(annualInterestRate) || isNaN(years)) {
            presentValueResult.textContent = "Invalid input";
        } else {
            const presentValue = calculatePresentValue(futureValue, annualInterestRate, years);
            presentValueResult.textContent = presentValue.toFixed(2);
        }
    });

    function calculatePresentValue(futureValue, annualInterestRate, years) {
        return futureValue / Math.pow(1 + annualInterestRate, years);
    }
});