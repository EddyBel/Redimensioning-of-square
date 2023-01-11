/**
 * Generates a random number between a range
 * @param {number} min - minimum value of the range
 * @param {number} max - maximum value of the range
 * @return {number} - random number between min and max
 */
export const randomNumberBetween = (min, max) =>
  Math.random() * (max - min) + min;

/**
 * Returns a random element from an array
 * @param {Array} arr - array to get random element from
 * @return {*} - random element from array
 */
export const randomArrayElement = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

/**
 * Function that creates an id
 * @returns {number} - returns an id number
 */
export const createId = () => Math.floor(Math.random() * Date.now());
