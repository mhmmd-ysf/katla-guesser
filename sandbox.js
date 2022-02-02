// Function that checks if a string contains all the given letters

function contains(str, letters) {
  return letters.every(letter => str.indexOf(letter) >= 0);
}

console.log(contains("hello", ["r"])); // true

function notContain(str, letters) {
  return letters.every(letter => str.indexOf(letter) < 0);
}

console.log(notContain("hello", ["r"])); // true