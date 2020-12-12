const fs = require("fs");

const fileName = process.argv[2];

// // part 1
// let accumulator = 0;

// const instructions = {
//   nop: (counter) => {
//     return counter + 1;
//   },
//   acc: (counter, argument) => {
//     accumulator += argument;
//     return counter + 1;
//   },
//   jmp: (counter, argument) => {
//     return counter + argument;
//   },
// };
// fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
//   if (err) {
//     console.error(err);
//   }

//   const program = data.split("\n");

//   let programCounter = 0;

//   let alreadyProcessedInstruction = [];

//   while (programCounter < program.length) {
//     let [instruction, argument] = program[programCounter].split(" ");
//     if (argument[0] === "-") {
//       argument = parseInt(argument.substr(1)) * -1;
//     } else {
//       argument = parseInt(argument.substring(1));
//     }

//     const prevAccumulator = accumulator;

//     programCounter = instructions[instruction](programCounter, argument);

//     if (alreadyProcessedInstruction[programCounter]) {
//       console.log(prevAccumulator);
//       return;
//     }

//     alreadyProcessedInstruction[programCounter] = true;
//   }
// });

// part 2
let accumulator = 0;

const instructions = {
  nop: (counter) => {
    return counter + 1;
  },
  acc: (counter, argument) => {
    accumulator += argument;
    return counter + 1;
  },
  jmp: (counter, argument) => {
    return counter + argument;
  },
};

fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const program = data.split("\n");

  for (let index of getSwappableIndexes(program)) {
    toggleInstruction(program, index);
    if (!containsLoop(program)) {
      console.log(accumulator);
      return;
    }
    toggleInstruction(program, index);
  }
});

function toggleInstruction(program, index) {
  const [instruction] = program[index].split(" ");
  if (instruction === "jmp") {
    program[index] = program[index].replace("jmp", "nop");
  } else {
    program[index] = program[index].replace("nop", "jmp");
  }
}

function containsLoop(program) {
  accumulator = 0;

  let programCounter = 0;

  const alreadyProcessedInstruction = [];

  while (programCounter < program.length) {
    let [instruction, argument] = program[programCounter].split(" ");
    if (argument[0] === "-") {
      argument = parseInt(argument.substr(1)) * -1;
    } else {
      argument = parseInt(argument.substring(1));
    }

    programCounter = instructions[instruction](programCounter, argument);

    if (alreadyProcessedInstruction[programCounter]) {
      return true;
    }

    alreadyProcessedInstruction[programCounter] = true;
  }

  return false;
}

function getSwappableIndexes(program) {
  let swappable = [];

  for (let i = 0; i < program.length; i++) {
    let [instruction] = program[i].split(" ");

    if (instruction === "nop" || instruction === "jmp") {
      swappable.push(i);
    }
  }

  return swappable;
}
