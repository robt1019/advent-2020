const filePath = process.argv[2];

const input = require(`./${filePath}`);

const target = 2020;

for (let i = 0; i < input.length; i++) {
  for (let j = i; j < input.length; j++) {
    for (let k = j; k < input.length; k++) {
      if (input[i] + input[j] + input[k] === target) {
        console.log(input[i] * input[j] * input[k]);
      }
    }
  }
}
