const fs = require('fs');

const path = '../inputs/aoc_21_day_02_input.txt';
const directions = fs
  .readFileSync(path, 'utf8')
  .replace(/\r/g, '') // windows-compatability
  .split('\n')
  .map((direction) => {
    const [movement, qty] = direction.split(' ');
    return [movement, parseInt(qty)];
  });

const aoc21Day2Part1 = (directions) => {
  let depth = 0;
  let horizontal = 0;
  directions.forEach((direction) => {
    let [movement, qty] = [direction[0], direction[1]];
    if (movement == 'forward') horizontal += qty;
    else if (movement == 'down') depth += qty;
    else if (movement == 'up') depth -= qty;
  });
  return depth * horizontal;
};

const aoc21Day2Part2 = (directions) => {
  let depth = 0;
  let horizontal = 0;
  let aim = 0;
  directions.forEach((direction) => {
    let [movement, qty] = [direction[0], direction[1]];
    if (movement == 'forward') {
      horizontal += qty;
      depth += aim * qty;
    } else if (movement == 'down') aim += qty;
    else if (movement == 'up') aim -= qty;
  });
  return depth * horizontal;
};

console.log(aoc21Day2Part1(directions));
console.log(aoc21Day2Part2(directions));
