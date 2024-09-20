// const fs = require("node:fs");

// const day1 = fs.open("day1.csv");
// const day2 = fs.open("day2.csv");

const { open } = require("node:fs/promises");

//
//Store in map, [userId]=[page1:1,page512:2]
// userMap = []

output = [];

createMapFromFile = async (filename) => {
  const file = await open(filename);
  let userMap = new Map();
  for await (const line of file.readLines()) {
    let row = line.split(",");
    let username = row[0];
    let page = row[1];
    //Add to map if missing or update details
    if (!userMap.get(username)) {
      let newObj = {};
      newObj[page] = 1;
      userMap.set(username, newObj);
    } else {
      let currentUserDetails = userMap.get(username);
      //increment count if it exists, else set it
      let pageCount = currentUserDetails[page];
      if (pageCount) {
        currentUserDetails[page] += 1;
      } else {
        currentUserDetails[page] = 1;
      }
      userMap.set(username, currentUserDetails);
    }
  }
  return userMap;
};

(async () => {
  let d1 = await createMapFromFile("day1.csv");
  let d2 = await createMapFromFile("day2.csv");

  d1.forEach((element, key) => {
    let day2User = d2.get(key);
    let d1Instances = Object.keys(element).length;
    let d2Instances = day2User ? Object.keys(day2User).length : 0;
    let elligible = d1Instances > 1 && d2Instances > 1;
    if (elligible) output.push({ username: key, day1: d1Instances, d2Instances, elligible: elligible });
  });
  console.log("For a total of users on the last two days, " + d1.size + ", " + d2.size);
  //Print total number of uniques.
  console.log("Eligble Users: " + output.length);
})();
