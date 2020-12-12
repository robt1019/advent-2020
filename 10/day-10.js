const fs = require("fs");

const fileName = process.argv[2];

// part 1
fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const sorted = data
    .split("\n")
    .map((n) => parseInt(n))
    .sort((a, b) => a - b);
  sorted.push(sorted[sorted.length - 1] + 3);

  let oneJumps = 0;
  let threeJummps = 0;

  let prev = 0;
  for (let i = 0; i < sorted.length; i++) {
    const curr = sorted[i];

    if (curr - prev === 3) {
      threeJummps += 1;
    }

    if (curr - prev === 1) {
      oneJumps += 1;
    }
    prev = curr;
  }

  console.log(oneJumps * threeJummps);
});

// part 2
fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const sorted = data
    .split("\n")
    .map((n) => parseInt(n))
    .sort((a, b) => a - b);

  // put 0 at start of array to represent the root
  sorted.unshift(0);

  const target = sorted[sorted.length - 1] + 3;

  console.log(validPathCount(target, 0, sorted, {}));
});

function validPathCount(target, index, adapters, memo) {
  if (index === adapters.length - 1) {
    return adapters[index] + 3 === target ? 1 : 0;
  }

  if (memo[adapters[index]]) {
    return memo[adapters[index]];
  }

  memo[adapters[index]] = [
    adapters[index + 1],
    adapters[index + 2],
    adapters[index + 3],
  ].reduce((prev, curr, key) => {
    if (curr - adapters[index] <= 3) {
      return prev + validPathCount(target, index + key + 1, adapters, memo);
    }
    return prev;
  }, 0);

  return memo[adapters[index]];
}
