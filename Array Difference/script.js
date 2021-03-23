function arrayDiff(a, b) {
    if(a.length === 0  || b.length === 0) return a;
    return a.filter(curr => !b.includes(curr));
}


