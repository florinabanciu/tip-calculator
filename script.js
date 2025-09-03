 // Selectare elemente
const tipButtons = document.querySelectorAll(".tip-button");
const customTipInput = document.querySelector("#custom-tip");
const form = document.querySelector(".calculator-form");

const billInput = document.querySelector("#bill");
const numberOfPeopleInput = document.querySelector("#number-of-people");

const billInputError = document.querySelector(".bill-input-error");
const customTipInputError = document.querySelector(".custom-tip-input-error");
const peopleInputError = document.querySelector(".people-input-error");

const tipPerPersonParagraph = document.querySelector(".tip-amount-person");
const totalPerPersonParagraph = document.querySelector(".total-amount-person");

const resetButton = document.querySelector(".reset-button");

// ------------------------ Select tip % ------------------------
tipButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // Șterge orice selecție anterioară
    tipButtons.forEach((btn) => btn.classList.remove("selected-tip"));
    e.target.classList.add("selected-tip");
    customTipInput.value = "";
  });
});

// Dacă userul tastează în câmpul de tip personalizat
customTipInput.addEventListener("input", () => {
  tipButtons.forEach((btn) => btn.classList.remove("selected-tip"));
});

// ------------------------ Formular ------------------------
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const bill = parseFloat(billInput.value);
  const numberOfPeople = parseInt(numberOfPeopleInput.value);
  const customTip = parseFloat(customTipInput.value);

  let hasError = false;

  // Validare BILL
  if (!bill || bill <= 0) {
    billInputError.classList.remove("hide");
    hasError = true;
  } else {
    billInputError.classList.add("hide");
  }

  // Validare NUMBER OF PEOPLE
  if (!numberOfPeople || numberOfPeople <= 0) {
    peopleInputError.classList.remove("hide");
    hasError = true;
  } else {
    peopleInputError.classList.add("hide");
  }

  // Validare CUSTOM TIP
  if (customTipInput.value !== "" && customTip < 0) {
    customTipInputError.classList.remove("hide");
    hasError = true;
  } else {
    customTipInputError.classList.add("hide");
  }

  if (hasError) return;

  // Calculare procent
  let tipPercent = 0;

  const selectedTipButton = document.querySelector(".selected-tip");
  if (selectedTipButton) {
    tipPercent = parseInt(selectedTipButton.textContent.replace("%", ""));
  } else if (customTip > 0) {
    tipPercent = customTip;
  }

  // Calculare rezultate
  const totalTip = bill * (tipPercent / 100);
  const tipPerPerson = totalTip / numberOfPeople;
  const totalPerPerson = (bill + totalTip) / numberOfPeople;

  // Afișare
  tipPerPersonParagraph.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalPerPersonParagraph.textContent = `$${totalPerPerson.toFixed(2)}`;
});

// ------------------------ RESET ------------------------
resetButton.addEventListener("click", () => {
  form.reset();
  tipButtons.forEach((btn) => btn.classList.remove("selected-tip"));

  tipPerPersonParagraph.textContent = "$0.00";
  totalPerPersonParagraph.textContent = "$0.00";

  billInputError.classList.add("hide");
  customTipInputError.classList.add("hide");
  peopleInputError.classList.add("hide");
});