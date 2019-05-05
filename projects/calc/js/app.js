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
document.body.addEventListener("keypress", keyboardInput);

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

// Keyboard input
function keyboardInput(key) {
  if ((key.which < 0 || key.which > 57) && (key.which !== 13)) {
    return false;
  } else {
    key.preventDefault();
    if (key.which === 48) {
      display1.textContent += '0';
    } else if (key.which === 49) {
      display1.textContent += "1";
    } else if (key.which === 50) {
      display1.textContent +="2";
    } else if (key.which === 51) {
      display1.textContent += "3";
    } else if (key.which === 52) {
      display1.textContent += "4";
    } else if (key.which === 53) {
      display1.textContent += "5"
    } else if (key.which === 54) {
      display1.textContent += "6";
    } else if (key.which === 55) {
      display1.textContent += "7";
    } else if (key.which === 56) {
      display1.textContent += "8";
    } else if (key.which === 57) {
      display1.textContent += "9";
    } else if (key.which === 46) {
      display1.textContent += ".";
    } else if (key.which === 40) {
      display1.textContent += "(";
    } else if (key.which === 41) {
      display1.textContent += ")";
    } else if (key.which === 42) {
      display1.textContent += "*";
    } else if (key.which === 47) {
      display1.textContent += "/";
    } else if (key.which === 43) {
      display1.textContent += "+";
    } else if (key.which === 45) {
      display1.textContent +="-";
    } else if (key.which === 13) {
      showResult(key);
    } else {
      display1.textContent = display1.textContent;
    }
    return true;
  }
}