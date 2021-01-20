class Player {
    constructor(name) {
        this.name = name;
        this.hand = []; // store array of Card Objects
        this.cardsLeft = 0;
    }

    // ****** GETTER FUNCTIONS ******
    getName() {
        return this.name;
    }
    getHand() {
        return this.hand;
    }
    getCardsLeft() {
        return this.cardsLeft;
    }

    // ******* MUTATOR FUNCTIONS *******

    // removes card at index location
    removeCard(idx) {
        this.cardsLeft--;
        let card = this.hand[idx];
        this.hand.splice(idx, 1);
        return card;
    }

    // adds card at the end of hand array
    addCard(card) {
        this.hand.push(card);
        this.cardsLeft++;
    }

    printHand() {
        let output = "(index) COLOR  #\n";
        for (let i = 0; i < this.hand.length; i++) {
            output += `(${i}) ${this.hand[i].getCardString()}\n`;
        }
        return output;
    }
}
