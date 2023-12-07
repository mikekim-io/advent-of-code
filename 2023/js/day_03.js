const fs = require('fs');

const path = '../inputs/aoc_23_day_03_input.txt';
// const path = '../inputs/test.txt';
let data = fs
  .readFileSync(path, 'utf8')
  .replace(/\r/g, '') // windows-compatability
  .split('\n');

const aoc23Day3Part1 = (data) => {
  const schematic = data.map((line) => line.split('').map((l) => l));
  const validParts = [];
  let [maxRow, maxCol] = [schematic.length, schematic[0].length];
  const numRe = /[0-9]/i;

  const checkSurroundingIsNum = (currentRowIdx, currentColIdx) => {
    for (let i = currentRowIdx - 1; i < currentRowIdx + 2; i++) {
      if (i > maxRow - 1 || i < 0) {
        continue;
      }
      for (let j = currentColIdx - 1; j < currentColIdx + 2; j++) {
        if (j < 0 || j > maxCol - 1) {
          continue;
        }
        if (numRe.test(schematic[i][j])) {
          findNumBoundary(i, j);
          schematic[i][j] = '.';
        }
      }
    }
  };

  const findNumBoundary = (numRowIdx, numColIdx) => {
    let currentNum = [schematic[numRowIdx][numColIdx]];
    let [left, right] = [numColIdx - 1, numColIdx + 1];
    // check number left
    while (
      left > -1 &&
      schematic[numRowIdx][left] !== '.' &&
      numRe.test(schematic[numRowIdx][left])
    ) {
      currentNum.unshift(schematic[numRowIdx][left]);
      schematic[numRowIdx][left] = '.';
      left--;
    }
    // check number right
    while (
      right < maxCol &&
      schematic[numRowIdx][right] !== '.' &&
      numRe.test(schematic[numRowIdx][right])
    ) {
      currentNum.push(schematic[numRowIdx][right]);
      schematic[numRowIdx][right] = '.';
      right++;
    }
    let validPart = parseInt(currentNum.join(''));
    validParts.push(validPart);
  };

  for (let rowIdx = 0; rowIdx < schematic.length; rowIdx++) {
    for (let colIdx = 0; colIdx < schematic[rowIdx].length; colIdx++) {
      const re = /[^0-9a-z.]/i;
      let l = schematic[rowIdx][colIdx];
      if (l === '.') {
        continue;
      }

      if (re.test(l)) {
        schematic[rowIdx][colIdx] = '.';
        checkSurroundingIsNum(rowIdx, colIdx);
      }
    }
  }
  return validParts.reduce((a, b) => a + b, 0);
};

const aoc23Day3Part2 = (data) => {
  const schematic = data.map((line) => line.split('').map((l) => l));
  const validParts = [];
  let tempNums = [];
  let [maxRow, maxCol] = [schematic.length, schematic[0].length];
  const numRe = /[0-9]/i;

  const checkSurroundingIsNum = (currentRowIdx, currentColIdx) => {
    for (let i = currentRowIdx - 1; i < currentRowIdx + 2; i++) {
      if (i > maxRow - 1 || i < 0) {
        continue;
      }
      for (let j = currentColIdx - 1; j < currentColIdx + 2; j++) {
        if (j < 0 || j > maxCol - 1) {
          continue;
        }
        if (numRe.test(schematic[i][j])) {
          findNumBoundary(i, j);
          schematic[i][j] = '.';
        }
      }
    }
    if (tempNums.length === 2) {
      validParts.push(tempNums.reduce((a, b) => a * b, 1));
    }
    tempNums = [];
  };

  const findNumBoundary = (numRowIdx, numColIdx) => {
    let currentNum = [schematic[numRowIdx][numColIdx]];
    let [left, right] = [numColIdx - 1, numColIdx + 1];
    // check number left
    while (
      left > -1 &&
      schematic[numRowIdx][left] !== '.' &&
      numRe.test(schematic[numRowIdx][left])
    ) {
      currentNum.unshift(schematic[numRowIdx][left]);
      schematic[numRowIdx][left] = '.';
      left--;
    }
    // check number right
    while (
      right < maxCol &&
      schematic[numRowIdx][right] !== '.' &&
      numRe.test(schematic[numRowIdx][right])
    ) {
      currentNum.push(schematic[numRowIdx][right]);
      schematic[numRowIdx][right] = '.';
      right++;
    }
    let validPart = parseInt(currentNum.join(''));
    tempNums.push(validPart);
  };

  for (let rowIdx = 0; rowIdx < schematic.length; rowIdx++) {
    for (let colIdx = 0; colIdx < schematic[rowIdx].length; colIdx++) {
      const re = /\*/i;
      let l = schematic[rowIdx][colIdx];
      if (l === '.') {
        continue;
      }

      if (re.test(l)) {
        schematic[rowIdx][colIdx] = '.';
        checkSurroundingIsNum(rowIdx, colIdx);
      }
    }
  }
  return validParts.reduce((a, b) => a + b, 0);
};

console.log(aoc23Day3Part1(data));
console.log(aoc23Day3Part2(data));
