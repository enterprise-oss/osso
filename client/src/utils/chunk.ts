/* eslint-disable @typescript-eslint/no-explicit-any */
export default function chunk<T>(
  arr: Array<T>,
  chunkSize: number,
): Array<Array<T>> {
  return arr.reduce(
    (prevVal: any, _currVal: any, currIndx: number, array: Array<T>) =>
      !(currIndx % chunkSize)
        ? prevVal.concat([array.slice(currIndx, currIndx + chunkSize)])
        : prevVal,
    [],
  );
}
