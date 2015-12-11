'use strict';

// attatches function to button/result pair
function hookUpButton(fn, day, part, halt) {
  var input = document.getElementById('input-day'+day);
  var button = document.getElementById('button-day'+day+'-part'+part);
  var result = document.getElementById('result-day'+day+'-part'+part);

  var getResult = function() {
    // run the function on the text in the input field
    // and put the result in the result input field
    result.value = fn(input.value);
  };

  // attach listener
  button.addEventListener('click', getResult);

  if (!halt) {
    // run it once
    getResult();
  }
}
