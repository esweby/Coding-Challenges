// The maximum sum subarray problem consists in finding the maximum sum of a contiguous subsequence in an array or list of integers:

// maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])
// // should be 6: [4, -1, 2, 1]
// Easy case is when the list is made up of only positive numbers and the maximum sum is the sum of the whole array. If the list is made up of only negative numbers, return 0 instead.

// Empty list is considered to have zero greatest sum. Note that the empty list or array is also a valid sublist/subarray.

var maxSequence = function(arr){
    if ( arr.every(curr => curr <= 0)) return 0;
    const results = [];

    for (let i = 0; i < arr.length; i++) {
        results.push({soFar: 0, top: 0});
        results.forEach(curr => {
            curr.soFar += arr[i];
            if( curr.soFar >= curr.top ) curr.top = curr.soFar;
        });
    }
    return results.map(curr => curr.top).sort((a, b) => b - a)[0];

    // const positiveIndexes = [], sequentialList = [], results = [];

    // arr.forEach((curr, i) => {
    //     if(curr > 0 && (curr + arr[i + 1] > 0)) {
    //         positiveIndexes.push(i);
    //         positiveIndexes.push(i + 1);
    //     }
    // });

    // let seqCounter = 0;
    // positiveIndexes.forEach((curr, i) => {
    //     if( seqCounter === sequentialList.length ) sequentialList.push([ curr ]);
    //     if( curr + 1 === positiveIndexes[i + 1] ) sequentialList[seqCounter].push(positiveIndexes[i + 1]);
    //     if( curr + 1 !== positiveIndexes[i + 1] ) seqCounter++;
    // });
    
    
    // sequentialList.forEach(curr => {
    //     let result = 0;
    //     curr.forEach(num => result += arr[num]);
    //     results.push(result);
    // });

    // results.sort((a, b) => a - b);
    // return results[results.length - 1];
}

console.log(maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4]));