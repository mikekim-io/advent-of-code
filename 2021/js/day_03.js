const fs = require('fs');

const path = '../inputs/aoc_21_day_03_input.txt';
const powers = fs
  .readFileSync(path, 'utf8')
  .replace(/\r/g, '') // windows-compatability
  .split('\n');

const aoc21Day3Part1 = (powers) => {
  let gamma = '';
  let epsilon = '';
  const count = [];
  powers.forEach((power) =>
    power.split('').forEach((v, i) => {
      if (i in count && v in count[i]) count[i][v]++;
      else if (i in count && !(v in count[i])) count[i][v] = 1;
      else if (!(i in count)) {
        count[i] = [0, 0];
        count[i][v]++;
      }
    })
  );
  count.forEach((reading) => {
    gamma += reading.indexOf(Math.max(reading[0], reading[1])).toString();
    epsilon += reading.indexOf(Math.min(reading[0], reading[1])).toString();
  });
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

const aoc21Day3Part2 = (powers) => {
  let oxygenCount = [0, 0];
  let co2Count = [0, 0];
  let [oxygen, co2] = [[...powers], [...powers]];

  let i = 0;
  while ((oxygen.length > 1 || co2.length > 1) && i < oxygen[0].length) {
    for (const o of oxygen) {
      oxygenCount[o[i]]++;
    }

    for (const c of co2) {
      co2Count[c[i]]++;
    }
    oxygenFilter =
      oxygenCount[0] === oxygenCount[1]
        ? '1'
        : oxygenCount
            .indexOf(Math.max(oxygenCount[0], oxygenCount[1]))
            .toString();
    co2Filter =
      co2Count[0] === co2Count[1]
        ? '0'
        : co2Count.indexOf(Math.min(co2Count[0], co2Count[1])).toString();
    oxygen =
      oxygen.length > 1 ? oxygen.filter((a) => a[i] === oxygenFilter) : oxygen;
    co2 = co2.length > 1 ? co2.filter((a) => a[i] === co2Filter) : co2;
    oxygenCount = [0, 0];
    co2Count = [0, 0];
    i++;
  }
  return parseInt(oxygen[0], 2) * parseInt(co2[0], 2);
};

const aoc21Day3Part2Recursive = (powers) => {
  let oxygen = filterReadings(0, [...powers], 'oxygen');
  let co2 = filterReadings(0, [...powers], 'co2');
  return oxygen * co2;
};

const filterReadings = (idx, arr, readingType) => {
  if (arr.length === 1) return parseInt(arr[0], 2);

  const count = [0, 0];
  for (const el of arr) {
    count[el[idx]]++;
  }

  let filterTerm =
    readingType === 'oxygen'
      ? count[0] !== count[1]
        ? count.indexOf(Math.max(count[0], count[1])).toString()
        : '1'
      : count[0] !== count[1]
      ? count.indexOf(Math.min(count[0], count[1])).toString()
      : '0';

  return filterReadings(
    idx + 1,
    arr.filter((a) => a[idx] === filterTerm),
    readingType
  );
};

console.log(aoc21Day3Part1(powers));
console.log(aoc21Day3Part2(powers));
console.log(aoc21Day3Part2Recursive(powers));
