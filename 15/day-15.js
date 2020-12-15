const fs = require("fs");

const fileName = process.argv[2];

// part 1
fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const lastHeard = data.split(",").reduce((prev, curr, index) => {
    return {
      ...prev,
      [curr]: [index + 1],
    };
  }, {});

  let lastSpoken = parseInt(
    Object.keys(lastHeard)[Object.keys(lastHeard).length - 1]
  );

  for (let i = Object.keys(lastHeard).length + 1; i <= 2020; i++) {
    let spoken;
    if (lastHeard[lastSpoken] && lastHeard[lastSpoken].length === 2) {
      const [twoPrev, prev] = lastHeard[lastSpoken];
      spoken = prev - twoPrev;
    } else {
      spoken = 0;
    }
    if (lastHeard[spoken]) {
      if (lastHeard[spoken].length === 2) {
        lastHeard[spoken] = [lastHeard[spoken][1], i];
      } else {
        lastHeard[spoken].push(i);
      }
    } else {
      lastHeard[spoken] = [i];
    }
    lastSpoken = spoken;
  }

  console.log(lastSpoken);
});

// part 2
fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  let lastSpoken;

  const lastHeard = data.split(",").reduce((prev, curr, index) => {
    prev.set(curr, [index + 1]);
    lastSpoken = parseInt(curr);
    return prev;
  }, new Map());

  for (let i = lastHeard.size + 1; i <= 30000000; i++) {
    let spoken;
    let previous = lastHeard.get(`${lastSpoken}`);

    if (previous && previous.length === 2) {
      const [twoPrev, prev] = previous;
      spoken = prev - twoPrev;
    } else {
      spoken = 0;
    }

    previous = lastHeard.get(`${spoken}`);
    if (previous) {
      if (previous.length === 2) {
        lastHeard.set(`${spoken}`, [previous[1], i]);
      } else {
        lastHeard.set(`${spoken}`, [previous[0], i]);
      }
    } else {
      lastHeard.set(`${spoken}`, [i]);
    }
    lastSpoken = spoken;
  }

  console.log(lastSpoken);
});
