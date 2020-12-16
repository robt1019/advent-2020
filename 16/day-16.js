const fs = require("fs");

const fileName = process.argv[2];

// part 1
fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const [rules, myTicket, tickets] = data.split("\n\n");

  const validValues = [];

  rules.split("\n").forEach((rule) => {
    const [range1, range2] = rule
      .split(":")[1]
      .split("or")
      .map((m) => m.trim());

    let [small1, big1] = range1.split("-").map((r) => parseInt(r));
    let [small2, big2] = range2.split("-").map((r) => parseInt(r));

    for (let i = small1; i <= big1; i++) {
      validValues[i] = true;
    }

    for (let i = small2; i <= big2; i++) {
      validValues[i] = true;
    }
  });

  let errorRate = 0;

  tickets
    .split("\n")
    .slice(1)
    .forEach((ticket) => {
      ticket.split(",").forEach((val) => {
        if (!validValues[val]) {
          errorRate += parseInt(val);
        }
      });
    });

  console.log(errorRate);
});

// part 2
fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const [rules, myTicket, tickets] = data.split("\n\n");

  const validValues = [];

  const validators = {};

  rules.split("\n").forEach((rule) => {
    const key = rule.split(":")[0];

    const [range1, range2] = rule
      .split(":")[1]
      .split("or")
      .map((m) => m.trim());

    let [small1, big1] = range1.split("-").map((r) => parseInt(r));
    let [small2, big2] = range2.split("-").map((r) => parseInt(r));

    validators[key] = {};
    validators[key] = (val) =>
      (val >= small1 && val <= big1) || (val >= small2 && val <= big2);

    for (let i = small1; i <= big1; i++) {
      validValues[i] = true;
    }

    for (let i = small2; i <= big2; i++) {
      validValues[i] = true;
    }
  });

  const validTickets = tickets
    .split("\n")
    .slice(1)
    .filter((ticket) => {
      for (let val of ticket.split(",")) {
        if (!validValues[val]) {
          return false;
        }
      }
      return true;
    });

  const possibleIndexes = Object.keys(validators).reduce((prev, curr) => {
    prev[curr] = [];
    return prev;
  }, {});

  validTickets.forEach((ticket, ticketIndex) => {
    ticket.split(",").forEach((val, index) => {
      Object.keys(validators).forEach((v) => {
        if (validators[v](val)) {
          if (ticketIndex === 0 || possibleIndexes[v][index] !== "x") {
            possibleIndexes[v][index] = "-";
          }
        } else {
          possibleIndexes[v][index] = "x";
        }
      });
    });
  });

  const sorted = Object.keys(possibleIndexes).sort(
    (a, b) =>
      possibleIndexes[a].filter((i) => i === "-").length -
      possibleIndexes[b].filter((i) => i === "-").length
  );

  const takenIndexes = [];

  const indexes = {};

  sorted.forEach((key) => {
    possibleIndexes[key].forEach((item, i) => {
      if (item === "-") {
        if (!takenIndexes[i]) {
          indexes[i] = key;
          takenIndexes[i] = true;
        }
      }
    });
  });

  console.log(
    myTicket
      .split("\n")[1]
      .split(",")
      .reduce((prev, curr, index) => {
        const fieldName = indexes[index];
        if (fieldName.includes("departure")) {
          return prev * parseInt(curr);
        }
        return prev;
      }, 1)
  );
});
