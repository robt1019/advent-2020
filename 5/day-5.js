const fs = require("fs");

const fileName = process.argv[2];

// part 1

fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const seats = data.split("\n");

  let maxId = 0;

  seats.forEach((seat) => {
    const seatId = calculateId(seat);
    maxId = Math.max(seatId, maxId);
  });

  console.log(maxId);
});

function calculateId(seat) {
  let rowLeft = 0;
  let rowRight = 127;
  let colLeft = 0;
  let colRight = 7;
  for (let char of seat) {
    if (char === "F") {
      rowRight = rowLeft + Math.floor((rowRight - rowLeft) / 2);
    }
    if (char === "B") {
      rowLeft = rowLeft + Math.round((rowRight - rowLeft) / 2);
    }
    if (char === "L") {
      colRight = colLeft + Math.round((colRight - colLeft) / 2);
    }

    if (char === "R") {
      colLeft = colLeft + Math.round((colRight - colLeft) / 2);
    }
  }

  return rowLeft * 8 + colLeft;
}

// part 2
fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const seats = data.split("\n");

  let maxId = 0;

  const sorted = seats
    .map((seat) => {
      const seatId = calculateId(seat);
      maxId = Math.max(seatId, maxId);
      return { code: seat, id: seatId };
    })
    .sort((a, b) => a.id - b.id);

  const offset = sorted[0].id;

  for (let i = 0; i < sorted.length; i++) {
    // seat is out of order, so the missing boarding pass is the one before it
    if (sorted[i].id !== i + offset) {
      console.log(sorted[i].id - 1);
      return;
    }
  }
});

function calculateId(seat) {
  let rowLeft = 0;
  let rowRight = 127;
  let colLeft = 0;
  let colRight = 7;
  for (let char of seat) {
    if (char === "F") {
      rowRight = rowLeft + Math.floor((rowRight - rowLeft) / 2);
    }
    if (char === "B") {
      rowLeft = rowLeft + Math.round((rowRight - rowLeft) / 2);
    }
    if (char === "L") {
      colRight = colLeft + Math.round((colRight - colLeft) / 2);
    }

    if (char === "R") {
      colLeft = colLeft + Math.round((colRight - colLeft) / 2);
    }
  }

  return rowLeft * 8 + colLeft;
}
