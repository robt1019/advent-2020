const fs = require("fs");

const fileName = process.argv[2];

// // part 1
// fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
//   if (err) {
//     console.error(err);
//   }

//   const [leaveTime, rawBuses] = data.split('\n');

//   let closestBusAmount = Number.MAX_VALUE;
//   let closestBusIndex;

//   const buses = rawBuses.split(',');

//   buses.forEach((bus, key) => {
//     if (bus !== 'x') {
//       const busTime = parseInt(bus);
//       const minutesToWait = busTime - parseInt(leaveTime) % busTime;
//       if (minutesToWait < closestBusAmount) {
//         closestBusAmount = minutesToWait;
//         closestBusIndex = key;
//       }
//     }
//   });

//   console.log(buses[closestBusIndex] * closestBusAmount);

// });

// part 2

let increment = 1;

fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const rawBuses = data.split("\n")[1];

  const buses = rawBuses.split(",");

  const busOffsets = {};

  buses.forEach((b, key) => {
    if (b !== "x") {
      busOffsets[key] = parseInt(b);
    }
  });

  let validTimeFound = false;
  let time = 0;

  while (!validTimeFound) {
    validTimeFound = isValidTime(time, busOffsets);
    if (validTimeFound) {
      break;
    }
    time += increment;
  }

  console.log(time);
});

function isValidTime(time, busOffsets) {
  const offsets = Object.keys(busOffsets);
  const foundInOrder = [];
  offsets.forEach((offset, index) => {
    if ((time + parseInt(offset)) % busOffsets[offset] === 0) {
      if (foundInOrder.length === index) {
        foundInOrder.push(busOffsets[offset]);
      }
    }
  });

  increment = foundInOrder.reduce((prev, curr) => {
    return prev * curr;
  }, 1);

  return foundInOrder.length === offsets.length;
}
