const fs = require("fs");

const fileName = process.argv[2];

// part 1
fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const groups = data.split("\n\n");

  let answered = 0;

  groups.forEach((group) => {
    const seen = new Array(26);

    const people = group.split("\n");
    people.forEach((personsAnswer) => {
      for (let answer of personsAnswer) {
        const answerIndex = answer.charCodeAt() - "a".charCodeAt();
        if (!seen[answerIndex]) {
          answered += 1;
        }
        seen[answerIndex] = true;
      }
    });
  });

  console.log(answered);
});

// part 2
fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const groups = data.split("\n\n");

  let answered = 0;

  groups.forEach((group) => {
    const seen = new Array(26);

    const people = group.split("\n");

    people.forEach((personsAnswer) => {
      for (let answer of personsAnswer) {
        const answerIndex = answer.charCodeAt() - "a".charCodeAt();
        if (!seen[answerIndex]) {
          seen[answerIndex] = 1;
        } else {
          seen[answerIndex] += 1;
        }
        if (seen[answerIndex] === people.length) {
          answered += 1;
        }
      }
    });
  });

  console.log(answered);
});
