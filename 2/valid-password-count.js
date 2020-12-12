const fs = require("fs");

const fileName = process.argv[2];

// part 1
fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  let validCount = 0;

  data.split("\n").forEach((row) => {
    row.replace("\n", "");
    const [rule, password] = row.split(":");
    if (!rule) {
      return;
    }
    const [counts, ruleChar] = rule.split(" ");
    const [atLeast, atMost] = counts.split("-");

    let ruleCharCount = 0;

    for (let char of password.split("")) {
      if (char === ruleChar) {
        ruleCharCount += 1;
      }
      if (ruleCharCount > atMost) {
        return;
      }
    }
    if (ruleCharCount >= atLeast) {
      validCount += 1;
    }
  });

  console.log(validCount);
});

// part 2
fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  let validCount = 0;

  data.split("\n").forEach((row) => {
    row.replace("\n", "");
    const [rule, password] = row.split(":").map((s) => s.trim());
    const [positions, ruleChar] = rule.split(" ");
    let [position1, position2] = positions.split("-");

    // offset zero index
    position1 -= 1;
    position2 -= 1;

    if (
      (password[position1] === ruleChar || password[position2] === ruleChar) &&
      password[position1] !== password[position2]
    ) {
      validCount += 1;
    }
  });

  console.log(validCount);
});
