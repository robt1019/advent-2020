// part 1
const fs = require("fs");

const fileName = process.argv[2];

fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const repeatingForest = data.split("\n");

  const forestDepth = repeatingForest.length;
  const forestWidth = repeatingForest[0].length;

  let currentRow = 0;
  let currentIndex = 0;

  let treesHit = 0;

  while (currentRow < forestDepth) {
    if (repeatingForest[currentRow][currentIndex % forestWidth] === "#") {
      treesHit += 1;
    }

    currentRow += 1;
    currentIndex += 3;
  }

  console.log(treesHit);
});

// part 2
fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const tactics = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  const repeatingForest = data.split("\n");

  const forestDepth = repeatingForest.length;
  const forestWidth = repeatingForest[0].length;

  const treesPerTactic = [];

  tactics.forEach(([stepsRight, stepsDown]) => {
    let currentRow = 0;
    let currentIndex = 0;

    let treesHit = 0;

    while (currentRow < forestDepth) {
      if (repeatingForest[currentRow][currentIndex % forestWidth] === "#") {
        treesHit += 1;
      }

      currentRow += stepsDown;
      currentIndex += stepsRight;
    }

    treesPerTactic.push(treesHit);
  });

  console.log(
    treesPerTactic.reduce((prev, curr) => {
      return prev * curr;
    }, 1)
  );
});
