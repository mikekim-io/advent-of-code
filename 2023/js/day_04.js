const fs = require('fs');

const path = '../inputs/aoc_23_day_04_input.txt';
const rawData = fs
  .readFileSync(path, 'utf8')
  .replace(/\r/g, '') // windows-compatability
  .split('\n');

let games = [];
rawData.forEach((line) => {
  let gamesAndData = line.split(': ');
  let cardIdData = gamesAndData[0].split(' ');
  let id = parseInt(cardIdData[cardIdData.length - 1]);

  let data = gamesAndData[1].split(' | ');
  let card = data[0]
    .split(' ')
    .filter((x) => x !== '')
    .map((x) => parseInt(x));
  let winningNumbers = data[1]
    .split(' ')
    .filter((x) => x !== '')
    .map((x) => parseInt(x));
  games.push({ id, card, winningNumbers });
});
console.log(games);

const aoc23Day4Part1 = (games) => {
  let totalPoints = [];
  games.forEach((game) => {
    let points = 0;
    for (const num of game.card) {
      for (const winningNum of game.winningNumbers) {
        if (num === winningNum) {
          points = points === 0 ? 1 : points * 2;
        }
      }
    }
    totalPoints.push(points);
  });

  return totalPoints.reduce((a, b) => a + b, 0);
};

// const aoc23Day4Part2 = (games) => {};

console.log(aoc23Day4Part1(games));
console.log(aoc23Day4Part2(games));
