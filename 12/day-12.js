const fs = require("fs");

const fileName = process.argv[2];

// part 1

const degreesToDirection = {
  0: "N",
  90: "E",
  180: "S",
  270: "W",
};

const directionToDegrees = {
  N: 0,
  E: 90,
  S: 180,
  W: 270,
};

let currentDirection = "E";
let northSouth = 0;
let eastWest = 0;

fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const instructions = data.split(`\n`);

  instructions.forEach((instruction) => {
    const command = instruction[0];
    const arg = parseInt(instruction.substr(1));

    if (command === "F") {
      move(currentDirection, arg);
    } else if (command === "R") {
      rotateWaypoint(arg);
    } else if (command === "L") {
      rotateWaypoint(-arg);
    } else {
      move(command, arg);
    }
  });

  console.log(Math.abs(northSouth) + Math.abs(eastWest));
});

function move(direction, amount) {
  if (direction === "N") {
    northSouth += amount;
  }
  if (direction === "S") {
    northSouth -= amount;
  }
  if (direction === "E") {
    eastWest += amount;
  }
  if (direction === "W") {
    eastWest -= amount;
  }
}

function rotateWaypoint(degrees) {
  currentDegrees = directionToDegrees[currentDirection];
  let newDegrees = currentDegrees + degrees;

  if (newDegrees < 0) {
    newDegrees = 360 - (-newDegrees % 360);
  } else {
    newDegrees = newDegrees % 360;
  }
  currentDirection = degreesToDirection[newDegrees];
}

// part 2

let waypoint = [1, 10];
let ship = [0, 0];

fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const instructions = data.split(`\n`);

  instructions.forEach((instruction) => {
    const command = instruction[0];
    const arg = parseInt(instruction.substr(1));

    if (command === "F") {
      moveShip(arg);
    } else if (command === "R") {
      rotateWaypoint(arg);
    } else if (command === "L") {
      rotateWaypoint(arg * -1);
    } else {
      moveWaypoint(command, arg);
    }
  });

  console.log(Math.abs(ship[0]) + Math.abs(ship[1]));
});

function moveShip(times) {
  for (let i = 0; i < times; i++) {
    ship[0] += waypoint[0];
    ship[1] += waypoint[1];
  }
}

function moveWaypoint(direction, amount) {
  if (direction === "N") {
    waypoint[0] += amount;
  }
  if (direction === "S") {
    waypoint[0] -= amount;
  }
  if (direction === "E") {
    waypoint[1] += amount;
  }
  if (direction === "W") {
    waypoint[1] -= amount;
  }
}

function rotateWaypoint(degrees) {
  if (degrees < 0) {
    for (let i = 0; i < Math.abs(degrees) / 90; i++) {
      ninetyLeft();
    }
  } else {
    for (let i = 0; i < degrees / 90; i++) {
      ninetyRight();
    }
  }
}

function ninetyRight() {
  const temp = waypoint[0];
  waypoint[0] = waypoint[1] * -1;
  waypoint[1] = temp;
}
function ninetyLeft() {
  const temp = waypoint[0];
  waypoint[0] = waypoint[1];
  waypoint[1] = temp * -1;
}
