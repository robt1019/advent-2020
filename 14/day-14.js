const fs = require("fs");

const fileName = process.argv[2];

// part 1
fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  let mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

  const memory = [];

  data.split("\n").forEach((instruction) => {
    const [command, arg] = instruction.split(" = ");

    if (command === "mask") {
      mask = arg;
    } else {
      let address = command.split("[")[1];
      address = address.substring(0, address.length - 1);
      memory[address] = binaryStringToDecimal(
        applyMask(decimalToBinaryString(parseInt(arg)), mask)
      );
    }
  });
  console.log(
    memory.reduce((prev, curr) => {
      if (curr) {
        return prev + curr;
      }
      return prev;
    }, 0)
  );
});

function applyMask(binaryString, mask) {
  return binaryString
    .split("")
    .map((item, index) => {
      if (mask[index] !== "X") {
        return mask[index];
      }
      return item;
    })
    .join("");
}

function decimalToBinaryString(number) {
  let binaryArray = [];
  let k = 35;
  while (k >= 0) {
    if (Math.pow(2, k) <= number) {
      number -= Math.pow(2, k);
      binaryArray[35 - k] = "1";
    } else {
      binaryArray[35 - k] = "0";
    }
    k -= 1;
  }
  return binaryArray.join("");
}

function binaryStringToDecimal(binaryString) {
  let k = 35;
  let decimal = 0;
  while (k >= 0) {
    if (binaryString[35 - k] === "1") {
      decimal += Math.pow(2, k);
    }
    k -= 1;
  }

  return decimal;
}

// part 2

let total = 0;

fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  let mask = "000000000000000000000000000000000000";

  const memory = [];

  data.split("\n").forEach((instruction) => {
    const [command, arg] = instruction.split(" = ");

    if (command === "mask") {
      mask = arg;
    } else {
      let address = command.split("[")[1];
      address = address.substring(0, address.length - 1);
      addresses = generateAddresses(address, mask);
      addresses.forEach((address) => {
        if (memory[address]) {
          total -= memory[address];
        }
        memory[address] = parseInt(arg);
        total += memory[address];
      });
    }
  });

  console.log(total);
});

function generateAddresses(initialAddress, mask) {
  const binaryAddressString = decimalToBinaryString(parseInt(initialAddress));
  let addresses = [binaryAddressString.split("")];
  mask.split("").forEach((item, index) => {
    if (item === "X") {
      const initialLength = addresses.length;
      for (let i = 0; i < initialLength; i++) {
        const clonedAddress = [...addresses[i]];
        clonedAddress[index] = clonedAddress[index] === "0" ? "1" : "0";
        addresses.push(clonedAddress);
      }
    } else if (item === "1") {
      addresses = addresses.map((a) => {
        a[index] = item;
        return a;
      });
    }
  });
  return addresses.map((a) => a.join("")).map((b) => binaryStringToDecimal(b));
}

function decimalToBinaryString(number) {
  let binaryArray = [];
  let k = 35;
  while (k >= 0) {
    if (Math.pow(2, k) <= number) {
      number -= Math.pow(2, k);
      binaryArray[35 - k] = "1";
    } else {
      binaryArray[35 - k] = "0";
    }
    k -= 1;
  }
  return binaryArray.join("");
}

function binaryStringToDecimal(binaryString) {
  let k = 35;
  let decimal = 0;
  while (k >= 0) {
    if (binaryString[35 - k] === "1") {
      decimal += Math.pow(2, k);
    }
    k -= 1;
  }

  return decimal;
}
