const fs = require('fs');

const path = '../inputs/aoc_23_day_01_input.txt';
const calibrations = fs
  .readFileSync(path, 'utf8')
  .replace(/\r/g, '') // windows-compatability
  .split('\n');

const aoc23Day1Part1 = (calibrations) => {
  return calibrations
    .map((calibration) => {
      let numString = calibration.match(/[1-9]{1}/g).join('');
      let [first, last] = [numString[0], numString[numString.length - 1]];
      return parseInt(`${first}${last}`);
    })
    .reduce((a, b) => a + b, 0);
};

const aoc23Day1Part2 = (calibrations) => {
  let digits = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  };

  return calibrations
    .map((calibration, i) => {
      let regExp = RegExp(
        `(?=(\[1-9]{1}|${Object.keys(digits).join('|')}))`,
        'g'
      );
      // matchAll returns RegExp Iterator
      let rawNums = [...calibration.matchAll(regExp)]
        // return matching groups arr
        .map((match) => match[1])
        .map((digit) => digits[digit] || digit);
      let numString = rawNums.join('');
      let [first, last] = [numString[0], numString[numString.length - 1]];
      return parseInt(`${first}${last}`);
    })
    .reduce((a, b) => a + b, 0);
};

console.log(aoc23Day1Part1(calibrations));
console.log(aoc23Day1Part2(calibrations));
