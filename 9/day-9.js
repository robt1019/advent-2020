const fs = require("fs");

const fileName = process.argv[2];

// part 1
fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const code = data.split(`\n`);

  let left = 0;
  let right = 25;
  let previous = code.slice(left, right);

  for (let i = 25; i < code.length; i++) {
    if (!canMakeSum(code[i], previous)) {
      console.log(code[i]);
      return false;
    }
    left += 1;
    right += 1;
    previous = code.slice(left, right);
  }
});

function canMakeSum(targetSum, numbers) {
  const seen = {};
  for (let num of numbers) {
    seen[targetSum - num] = true;
  }

  for (let num of numbers) {
    if (seen[num]) {
      return true;
    }
  }
  return false;
}

// part 2

const weakPoint = 26134589;

fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const code = data.split(`\n`);

  for (let i = 0; i < code.length; i++) {
    const weakRange = weakPointRange(i, code);
    if (weakRange) {
      const [smallest, largest] = weakRange;
      console.log(smallest + largest);
      return;
    }
  }
});

function weakPointRange(index, numbers) {
  let total = 0;
  let smallest = Number.MAX_SAFE_INTEGER;
  let largest = Number.MIN_SAFE_INTEGER;
  for (let i = index; i < numbers.length; i++) {
    const value = parseInt(numbers[i]);

    if (value < smallest) {
      smallest = value;
    }

    if (value > largest) {
      largest = value;
    }
    total += value;

    if (total > weakPoint) {
      return false;
    }

    if (total === weakPoint) {
      return [smallest, largest];
    }
  }

  return false;
}
