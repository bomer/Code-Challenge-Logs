const fs = require("node:fs");

const content = "Some content!";

//Create users on pages
//looks like user5123,page6
const createData = () => {
  let output = "";
  const maxUsers = 1000000;
  for (let i = 0; i < maxUsers; i++) {
    output += "User" + Math.ceil(Math.random() * maxUsers) + ",Page" + Math.ceil(Math.random() * 10) + "\n";
  }
  Math.random();
  return output;
};

try {
  fs.writeFileSync("day1.csv", createData());
  fs.writeFileSync("day2.csv", createData());
} catch (err) {
  console.error(err);
} // file written successfully]
console.log("Complete");
