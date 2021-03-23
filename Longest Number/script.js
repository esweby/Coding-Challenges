function duplicateCount(text){
    if(text.length === 0) return 0;
    let duplicateCounter = 0
    const uniqueList = [];
    const arr = text.toLowerCase().split('');
    for(let i = 0; i < text.length; i++) {
        const curr = arr[i];
        if(arr.slice(i + 1, arr.length).indexOf(curr) >= 0 && uniqueList.indexOf(curr) < 0) {
            uniqueList.push(curr);
            duplicateCounter++;
        }
    }
    return duplicateCounter;
}

