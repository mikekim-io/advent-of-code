const fs = require('fs');

const path = '../inputs/aoc_22_day_01_input.txt';
const elves = fs
  .readFileSync(path, 'utf8')
  .replace(/\r/g, '') // windows-compatability
  .trim()
  .split('\n\n');

const aoc22Day1Part1 = (elfArr) =>
  elfArr
    .map((elf) =>
      elf
        .split('\n')
        .map((calorie) => parseInt(calorie))
        .reduce((a, b) => a + b, 0)
    )
    .sort((a, b) => b - a)[0];

const aoc22Day1Part2 = (elfArr) =>
  elfArr
    .map((elf) =>
      elf
        .split('\n')
        .map((calorie) => parseInt(calorie))
        .reduce((a, b) => a + b, 0)
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b, 0);

console.log(aoc22Day1Part1(elves));
console.log(aoc22Day1Part2(elves));
