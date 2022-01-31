// Function that checks if a string contains all the given letters

function contains(str, letters) {
  return letters.every(letter => str.indexOf(letter) >= 0);
}

console.log(contains("hello", ["l", "e", "r"])); // true