// Given the triangle of consecutive odd numbers:

//              1                 - 0 + 1 = 1
//           3     5              - 1 + 2 = 3
//        7     9    11           - 2 + 3 = 7
//    13    15    17    19        - 
// 21    23    25    27    29
// ...
// Calculate the row sums of this triangle from the row index (starting at index 1) e.g.:

function rowSumOddNumbers(n) {
	const arr = [];
    let counter = -1;
    for(let i = 0; i < n; i++) {
        arr.push([]); 
        for(let j = 0; j < i + 1; j++) {
            counter += 2;
            arr[i].push(counter);
        }
    }
    return arr[n - 1].reduce((acc, cur) => acc + cur, 0);
}

// Can also be done with n * n * n - I suck at maths lol

console.log(rowSumOddNumbers(1));
console.log(rowSumOddNumbers(2))
console.log(rowSumOddNumbers(42));
console.log(rowSumOddNumbers(100));