const fs = require('fs');

const path = '../inputs/aoc_23_day_02_input.txt';
const rawData = fs
  .readFileSync(path, 'utf8')
  .replace(/\r/g, '') // windows-compatability
  .split('\n');

let games = [];
rawData.forEach((line) => {
  let gamesAndData = line.split(': ');
  let id = parseInt(gamesAndData[0].split(' ')[1]);

  let data = gamesAndData[1].split('; ').map((game) => {
    let reveals = {};
    game.split(', ').map((pull) => {
      let colorAndCount = pull.split(' ');
      reveals[colorAndCount[1]] = parseInt(colorAndCount[0]);
    });
    return reveals;
  });
  games.push({ id, data });
});

const aoc23Day2Part1 = (games) => {
  const validGame = {
    blue: 14,
    green: 13,
    red: 12,
  };

  // return only ids where all games are valid
  let filtered = games.filter(({ data }) => {
    // reduce to only maxes
    let maxPull = data.reduce((acc, game) => {
      let maxes = { ...acc };
      let colors = Object.keys(game);
      colors.forEach((color) => {
        if (maxes.hasOwnProperty(color)) {
          maxes[color] =
            game[color] > maxes[color] ? game[color] : maxes[color];
        } else {
          maxes[color] = game[color];
        }
      });
      return maxes;
    }, {});
    // compare maxes
    let [blue, green, red] = [
      maxPull.blue ? maxPull.blue <= validGame.blue : true,
      maxPull.green ? maxPull.green <= validGame.green : true,
      maxPull.red ? maxPull.red <= validGame.red : true,
    ];
    return blue && green && red;
  });
  return filtered.reduce((a, b) => {
    return a + b.id;
  }, 0);
};

const aoc23Day2Part2 = (games) => {
  // return powers
  let powers = games.map(({ data }) => {
    // reduce to only maxes
    let maxPull = data.reduce((acc, game) => {
      let maxes = { ...acc };
      let colors = Object.keys(game);
      colors.forEach((color) => {
        if (maxes.hasOwnProperty(color)) {
          maxes[color] =
            game[color] > maxes[color] ? game[color] : maxes[color];
        } else {
          maxes[color] = game[color];
        }
      });
      return maxes;
    }, {});
    let [blue, green, red] = [
      maxPull.blue ? maxPull.blue : 1,
      maxPull.green ? maxPull.green : 1,
      maxPull.red ? maxPull.red : 1,
    ];
    return blue * green * red;
  });
  return powers.reduce((a, b) => {
    return a + b;
  }, 0);
};

console.log(aoc23Day2Part1(games));
console.log(aoc23Day2Part2(games));
