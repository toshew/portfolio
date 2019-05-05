// Variables
const getTotal = document.getElementById('showTotal');
const btnReset = document.getElementById('reset');
const display1 = document.getElementById('display1');
const display = document.getElementById('display');
const plusMinus = document.getElementById('plus-minus');

// Event listeners
document.body.addEventListener("click", addOnDisplay1);
showTotal.addEventListener("click", showResult);
plusMinus.addEventListener("click", changeSign);
btnReset.addEventListener("click", clearDisplay); 

// Functions
function addOnDisplay1(e) {
  if (e.target.classList.contains('unos')) {
    display1.textContent += e.target.value;
    e.target.blur();
  }
}

function showResult(e) {
  if (display1.textContent.includes('%')) {
    let percent = display1.textContent.replace('%', '*(1/100)');
    display.textContent = eval(percent);
    e.target.blur();
  } else {
    display.textContent = eval(display1.textContent);
    e.target.blur();
  }        
}

function changeSign(e) {
  let num = parseFloat(display1.textContent);
  display.textContent = -num;
  e.target.blur();
}

function clearDisplay(e) {
  display.textContent = '';
  display1.textContent = '';
    e.target.blur();
}