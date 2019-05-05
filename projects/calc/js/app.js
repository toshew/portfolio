// Variables
const getTotal = document.getElementById('showTotal');
const btnReset = document.getElementById('reset');
const display1 = document.getElementById('display1');
const display = document.getElementById('display');
const plusMinus = document.getElementById('plus-minus');

// Event listeners
document.body.addEventListener("click", addOnDisplay1);

// Functions
function addOnDisplay1(e) {
  if (e.target.classList.contains('unos')) {
    display1.textContent += e.target.value;
    e.target.blur();
  }
}