class Card {
    constructor(color, number) {
        this.color = color;
        this.number = number;
    }
    getColor() {
        return this.color;
    }
    getNumber() {
        return this.number;
    }
    getCardString() {
        return `${this.color} ${this.number}`;
    }
}

function shuffleDeck(unshuffledDeck) {
    let shuffledDeck = [];
    while (unshuffledDeck.length !== 0) {
        let randomIndex = Math.floor(Math.random() * unshuffledDeck.length);
        shuffledDeck.push(unshuffledDeck[randomIndex]);
        unshuffledDeck.splice(randomIndex, 1);
    }
    return shuffledDeck;
}

function createDealerDeck() {
    let unshuffledDealerDeck = [];
    let shuffledDealerDeck = [];

    function cardsofcolor(color) {
        const card0 = new Card(color, 0);
        unshuffledDealerDeck.push(card0);
        for (let i = 1; i <= 9; i++) {
            const card1 = new Card(color, i);
            unshuffledDealerDeck.push(card1);
            const card2 = new Card(color, i);
            unshuffledDealerDeck.push(card2);
        }
    }

    cardsofcolor("BLUE");
    cardsofcolor("GREEN");
    cardsofcolor("RED");
    cardsofcolor("YELLOW");

    shuffledDealerDeck = shuffleDeck(unshuffledDealerDeck);

    return shuffledDealerDeck;
}
