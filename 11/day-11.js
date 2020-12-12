const fs = require("fs");

const fileName = process.argv[2];

// // part 1
// fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
//   if (err) {
//     console.error(err);
//   }

//   let room = data.split(`\n`).map((i) => i.split(""));

//   let prevRoom;

//   do {
//     prevRoom = JSON.stringify(room);
//     setNextIteration(room);
//     nextRoom = JSON.stringify(room);
//   } while (nextRoom !== prevRoom);

//   console.log(countOccupiedSeats(room));
// });

// function setNextIteration(room) {
//   const occupiedInNext = [];
//   const emptyInNext = [];

//   for (let row = 0; row < room.length; row++) {
//     for (let col = 0; col < room[row].length; col++) {
//       const seat = [row, col];

//       if (isFloor(room, seat)) {
//         continue;
//       }

//       if (isEmpty(room, seat)) {
//         if (sightLineSeatsOccupied(room, seat) === 0) {
//           occupiedInNext.push(seat);
//         }
//       }

//       if (isOccupied(room, seat)) {
//         if (sightLineSeatsOccupied(room, seat) >= 4) {
//           emptyInNext.push(seat);
//         }
//       }
//     }
//   }

//   occupiedInNext.forEach((seat) => {
//     const [row, col] = seat;
//     room[row][col] = "#";
//   });

//   emptyInNext.forEach((seat) => {
//     const [row, col] = seat;
//     room[row][col] = "L";
//   });
// }

// function countOccupiedSeats(room) {
//   let count = 0;
//   for (let row = 0; row < room.length; row++) {
//     for (let col = 0; col < room[row].length; col++) {
//       if (isOccupied(room, [row, col])) {
//         count += 1;
//       }
//     }
//   }

//   return count;
// }

// function isEmpty(room, seat) {
//   const [row, col] = seat;
//   return room[row][col] === "L";
// }

// function isOccupied(room, seat) {
//   const [row, col] = seat;
//   return room[row][col] === "#";
// }

// function isFloor(room, seat) {
//   const [row, col] = seat;
//   return room[row][col] === ".";
// }

// function sightLineSeatsOccupied(room, seat) {
//   let occupiedCount = 0;
//   const [row, col] = seat;

//   if (room[row - 1]) {
//     if (room[row - 1][col] === "#") {
//       occupiedCount += 1;
//     }
//     if (room[row - 1][col - 1] === "#") {
//       occupiedCount += 1;
//     }
//     if (room[row - 1][col + 1] === "#") {
//       occupiedCount += 1;
//     }
//   }
//   if (room[row][col - 1] === "#") {
//     occupiedCount += 1;
//   }
//   if (room[row][col + 1] === "#") {
//     occupiedCount += 1;
//   }
//   if (room[row + 1]) {
//     if (room[row + 1][col] === "#") {
//       occupiedCount += 1;
//     }
//     if (room[row + 1][col - 1] === "#") {
//       occupiedCount += 1;
//     }
//     if (room[row + 1][col + 1] === "#") {
//       occupiedCount += 1;
//     }
//   }

//   return occupiedCount;
// }

// function printRoom(room) {
//   for (let row = 0; row < room.length; row++) {
//     console.log(room[row].join(""));
//   }
//   console.log();
// }

// part 2
fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  let room = data.split(`\n`).map((i) => i.split(""));

  let prevRoom;

  do {
    prevRoom = JSON.stringify(room);
    setNextIteration(room);
    nextRoom = JSON.stringify(room);
  } while (nextRoom !== prevRoom);

  console.log(countOccupiedSeats(room));
});

function setNextIteration(room) {
  const occupiedInNext = [];
  const emptyInNext = [];

  for (let row = 0; row < room.length; row++) {
    for (let col = 0; col < room[row].length; col++) {
      const seat = [row, col];

      if (isFloor(room, seat)) {
        continue;
      }

      if (isEmpty(room, seat)) {
        if (sightLineSeatsOccupied(room, seat) === 0) {
          occupiedInNext.push(seat);
        }
      }

      if (isOccupied(room, seat)) {
        if (sightLineSeatsOccupied(room, seat) >= 5) {
          emptyInNext.push(seat);
        }
      }
    }
  }

  occupiedInNext.forEach((seat) => {
    const [row, col] = seat;
    room[row][col] = "#";
  });

  emptyInNext.forEach((seat) => {
    const [row, col] = seat;
    room[row][col] = "L";
  });
}

function countOccupiedSeats(room) {
  let count = 0;
  for (let row = 0; row < room.length; row++) {
    for (let col = 0; col < room[row].length; col++) {
      if (isOccupied(room, [row, col])) {
        count += 1;
      }
    }
  }

  return count;
}

function isEmpty(room, seat) {
  const [row, col] = seat;
  return room[row][col] === "L";
}

function isOccupied(room, seat) {
  const [row, col] = seat;
  return room[row][col] === "#";
}

function isFloor(room, seat) {
  const [row, col] = seat;
  return room[row][col] === ".";
}

function sightLineOccupied(room, seat, transformation) {
  let [row, col] = transformation(seat);
  while (room[row] && room[row][col] !== undefined) {
    if (isEmpty(room, [row, col])) {
      return false;
    }
    if (isOccupied(room, [row, col])) {
      return true;
    }
    [row, col] = transformation([row, col]);
  }
  return false;
}

const sightLineTransformers = [
  [1, -1],
  [1, 0],
  [1, +1],
  [0, -1],
  [0, +1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
].map((transform) => {
  return (seat) => {
    let [row, col] = seat;
    const [rowTransform, colTransform] = transform;
    row += rowTransform;
    col += colTransform;
    return [row, col];
  };
});

function sightLineSeatsOccupied(room, seat) {
  let occupiedCount = 0;
  sightLineTransformers.forEach((transformer) => {
    if (sightLineOccupied(room, seat, transformer)) {
      occupiedCount += 1;
    }
  });
  return occupiedCount;
}

function printRoom(room) {
  for (let row = 0; row < room.length; row++) {
    console.log(room[row].join(""));
  }
  console.log();
}
