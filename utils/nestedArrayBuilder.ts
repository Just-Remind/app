// create array of arrays
// example input: [a, b, c, d]
// example output: [ [a, b], [c, d] ]
const nestedArraysBuilder = <T>(array: T[], perArray: number): T[][] =>
  new Array(Math.ceil(array.length / perArray))
    .fill("")
    .map((_, i) => array.slice(i * perArray, (i + 1) * perArray));

export default nestedArraysBuilder;
