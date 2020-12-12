// // part 1
// const fs = require("fs");

// const fileName = process.argv[2];

// fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
//   if (err) {
//     console.error(err);
//   }

//   const passports = data.split("\n\n");

//   let validCount = 0;

//   passports.forEach((p) => {
//     const passportFieldsPresent = {
//       "byr:": false,
//       "iyr:": false,
//       "eyr:": false,
//       "hgt:": false,
//       "hcl:": false,
//       "ecl:": false,
//       "pid:": false,
//       "cid:": false,
//     };

//     const optionalFields = new Set(["cid:"]);

//     const passportFieldKeys = Object.keys(passportFieldsPresent);

//     for (let i = 0; i < p.length; i++) {
//       // if you can check next 4 characters
//       if (p[i + 3]) {
//         let next4 = `${p[i]}${p[i + 1]}${p[i + 2]}${p[i + 3]}`;
//         if (passportFieldKeys.includes(next4)) {
//           passportFieldsPresent[next4] = true;
//         }
//       }
//     }

//     // check that all mandatory fields have been set to true
//     for (let i = 0; i < passportFieldKeys.length; i++) {
//       const fieldKey = passportFieldKeys[i];
//       // ignore optional fields
//       if (!optionalFields.has(fieldKey)) {
//         if (!passportFieldsPresent[fieldKey]) {
//           return;
//         }
//       }
//     }

//     validCount++;
//   });

//   console.log(validCount);
// });

// part 2
const fs = require("fs");

const fileName = process.argv[2];

fs.readFile(`./${fileName}`, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const passports = data.split("\n\n");

  let validCount = 0;

  passports.forEach((p) => {
    const passportFields = {
      "byr:": {
        valid: false,
        validationFunction: (input) => {
          const asInt = parseInt(input);
          return input.length === 4 && asInt <= 2002 && asInt >= 1920;
        },
      },
      "iyr:": {
        valid: false,
        validationFunction: (input) => {
          const asInt = parseInt(input);
          return input.length === 4 && asInt <= 2020 && asInt >= 2010;
        },
      },
      "eyr:": {
        valid: false,
        validationFunction: (input) => {
          const asInt = parseInt(input);
          return input.length === 4 && asInt <= 2030 && asInt >= 2020;
        },
      },
      "hgt:": {
        valid: false,
        validationFunction: (input) => {
          const unit = input.substring(input.length - 2);
          if (unit === "in") {
            const amount = parseInt(input.replace("in", ""));
            return amount >= 59 && amount <= 76;
          }
          if (unit === "cm") {
            const amount = parseInt(input.replace("cm", ""));
            return amount >= 150 && amount <= 193;
          }
          return false;
        },
      },
      "hcl:": {
        valid: false,
        validationFunction: (input) => {
          if (input[0] !== "#") {
            return false;
          }
          if (input.length !== 7) {
            return false;
          }
          const alphanumeric = new RegExp(/^[a-z0-9]+$/i);
          return alphanumeric.test(input.substring(1));
        },
      },
      "ecl:": {
        valid: false,
        validationFunction: (input) => {
          const validColour = new Set([
            "amb",
            "blu",
            "brn",
            "gry",
            "grn",
            "hzl",
            "oth",
          ]);
          return validColour.has(input);
        },
      },
      "pid:": {
        valid: false,
        validationFunction: (input) => {
          const numeric = new RegExp(/^[0-9]+$/i);
          return input.length === 9 && numeric.test(input);
        },
      },
      "cid:": { valid: true, validationFunction: () => true },
    };

    const optionalFields = new Set(["cid:"]);

    let currentValue = "";
    let currentKey = "";
    for (let i = 0; i < p.length; i++) {
      let next4 = p[i + 3]
        ? `${p[i]}${p[i + 1]}${p[i + 2]}${p[i + 3]}`
        : "invalidKey";

      // we found a passport field
      if (passportFields[next4]) {
        if (currentKey && currentValue) {
          passportFields[currentKey].valid = passportFields[
            currentKey
          ].validationFunction(currentValue.trim());
        }
        currentKey = next4;
        currentValue = "";
        i += 3;
      } else {
        currentValue += p[i];
      }
    }

    if (currentValue) {
      passportFields[currentKey].valid = passportFields[
        currentKey
      ].validationFunction(currentValue.trim());
    }

    for (let key of Object.keys(passportFields)) {
      if (!optionalFields.has(key)) {
        if (!passportFields[key].valid) {
          return;
        }
      }
    }

    validCount++;
  });

  console.log(validCount);
});
