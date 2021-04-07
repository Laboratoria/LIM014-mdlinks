const {pathRelative} = require('../API/methods.js');

const statsTotal = (arr) => arr.length;

const statsUnique = (arr) => {
  const uniques = [...new Set(arr.map((a) => a.href))];
  return uniques.length;
};

const statsBroken = (arr) => {
  const broken = [...new Set(arr.filter((a) => a.message === 'Fail'))];
  return broken.length;
};

const showStats = (arr, boolean) => {
  const uniques = statsUnique(arr);
  const total = statsTotal(arr);
  if (boolean) {
    const broken = statsBroken(arr);
    return console.log(`Total: ${total} \nUniques: ${uniques} \nBroken: ${broken}`);
  }
  return console.log(`Total: ${total} \nUniques: ${uniques}`);
};

const showResult = (arr) => {
  const result = [];
  arr.forEach((obj) => {
    const linksArray = {
      path: pathRelative(process.cwd(), obj.path),
      text: obj.text,
      href: obj.href,
    };
    if (obj.status) {
      linksArray.message = obj.message;
      linksArray.status = obj.status;
    }
    result.push(linksArray);
  });
  return result;
};

module.exports = {
  showStats,
  showResult,
  statsTotal,
  statsUnique,
  statsBroken,
};
