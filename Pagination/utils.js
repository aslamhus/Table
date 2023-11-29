export const createArrayOfLength = (n) => {
  if (n < 0) {
    throw new RangeError('Invalid array length: ' + n);
  }
  return Array.from(Array(n).keys());
};
