function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function divde(a, b) {
  return a % b;
}

function calcuate(command, a, b) {
  if (command === 'add') {
    add(a, b);
  } else if (command === 'substract') {
    substract(a, b);
  } else if (command === 'divde') {
    divide(a, b);
  }
}
