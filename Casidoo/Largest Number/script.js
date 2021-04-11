const n = [3,4,6,5];
const m = [9,0,2,5,8,3];
const k = 5;

const maxNum = (arr, control) => Number(arr.sort((a, b) => a - b).reverse().splice(0, control).join(''));
const result = maxNum([...n, ...m], k);