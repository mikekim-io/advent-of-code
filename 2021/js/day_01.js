const fs = require('fs');

const path = '../inputs/aoc_21_day_01_input.txt';
const depths = fs
  .readFileSync(path, 'utf8')
  .replace(/\r/g, '') // windows-compatability
  .split('\n')
  .map((depth) => parseInt(depth));

const aoc21Day1Part1 = (depths) => {
  let count = 0;
  depths.forEach((m, i) => i > 0 && depths[i] > depths[i - 1] && count++);
  return count;
};

const aoc21Day1Part2 = (depths) => {
  let count = 0;
  depths.forEach(
    (m, i) =>
      i > 2 &&
      depths[i] + depths[i - 1] + depths[i - 2] >
        depths[i - 1] + depths[i - 2] + depths[i - 3] &&
      count++
  );
  return count;
};

console.log(aoc21Day1Part1(depths));
console.log(aoc21Day1Part2(depths));
