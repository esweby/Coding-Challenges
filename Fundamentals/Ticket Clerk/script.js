// The new "Avengers" movie has just been released! There are a lot of people at the cinema box office standing in a huge line. Each of them has a single 100, 50 or 25 dollar bill. An "Avengers" ticket costs 25 dollars.

// Vasya is currently working as a clerk. He wants to sell a ticket to every single person in this line.

// Can Vasya sell a ticket to every person and give change if he initially has no money and sells the tickets strictly in the order people queue?

// Return YES, if Vasya can sell a ticket to every person and give change with the bills he has at hand at that moment. Otherwise return NO.

function tickets(peopleInLine){
    const bills = {
        25: 0,
        50: 0,
        100: 0,
    }

    for(let bill of peopleInLine) { 
        bills[bill]++;
        if (bill === 50 && bills[25] > 0) {
            bills[25]--;
        } else if ( bill === 50 & bills[25] === 0) return 'NO';
        
        if (bill === 100 && bills[25] > 0 && bills[50] > 0) {
            bills[25]--;
            bills[50]--;
        } else if ( bill === 100 && bills[25] >= 3) {
            bills[25] -= 3;
        } else if ( bill === 100 && (bills[25] === 1 && bills[50] === 0 || bills[25] < 3)) return 'NO';
    }
    return 'YES';
}

console.log(tickets([25, 25, 50]));
console.log(tickets([25, 100]));
console.log(tickets([25, 25, 50, 50, 100]));
console.log(tickets([25,50,25,100,25,25,25,100,25,50,25,100]));