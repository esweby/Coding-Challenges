// You will be given an array of numbers. You have to sort the odd numbers in ascending order while leaving the even numbers at their original positions.

// Examples
// [7, 1]  =>  [1, 7]
// [5, 8, 6, 3, 4]  =>  [3, 8, 6, 5, 4]
// [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]  =>  [1, 8, 3, 6, 5, 4, 7, 2, 9, 0]


function sortArray(array) {
    if ( array.length === 0 ) return [];
    const arrOfOdds = array.filter(cur => cur % 2 !== 0).sort((a, b) => a - b);
    let counter = 0;
    const sortedArray = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] % 2 === 0) sortedArray.push(array[i]);
        if (array[i] % 2 !== 0) {
            sortedArray.push(arrOfOdds[counter]);
            counter++;
        }        
    }
    // could replace everything from let to here with:
    // return array.map((x) => x % 2 ? odd.shift() : x);
    return sortedArray;
}

console.log(sortArray([7, 1]));
console.log(sortArray([5, 8, 6, 3, 4]));
console.log(sortArray([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]));
console.log(sortArray([5, 3, 2, 8, 1, 4]));
console.log(sortArray([5, 3, 1, 8, 0]));
console.log(sortArray([]));
