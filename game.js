/********************* GAME CLASS *********************/

/* make Game into class if we have time */
class Game {
    // assumes deck is shuffled
    constructor(deck) {
        this.drawPile = deck; // array of card objects
        this.discardPile = []; // array of played card objects
        this.players = []; // array of Player Objects
        this.gameIsOver = false;
        this.lastCardPlayed; // Card Object
        this.whosTurn = 0; // store the index of the player whos turn it is
        this.automate = false;
    }

    // ******* MUTATOR FUNCTIONS *******
    winnerWasFound() {
        this.gameIsOver = true;
    }

    cardPlayed(card) {
        this.lastCardPlayed = card;
        this.discardPile.push(card); // last card played will always be at the end of the discard pile
    }

    // return Card object at the front of the deck
    drawCard() {
        if (this.drawPile.length === 0)
            // if deck is empty
            this.drawPile = shuffleDeck(this.discardPile); // reshuffle discarded pile and assign to deck
        return this.drawPile.shift(); // return first card object
    }

    updateTurn() {
        if (this.whosTurn === this.players.length - 1) this.whosTurn = 0;
        else this.whosTurn++;
    }

    // ************ METHODS ************

    // implements game prompts and runs through events of the game
    playGame() {
        console.log(messages.A1);
        let isThatIt;
        do {
            let playerName = prompt(messages.C1);
            this.players.push(new Player(playerName));
            isThatIt = confirm(messages.C2);
        } while (!isThatIt);

        // deal 7 cards to each player
        this.dealHands();
        // set up the first card of the game
        this.cardPlayed(this.drawCard());

        this.automate = confirm(messages.M);

        // run through game until over
        while (!this.gameIsOver) {
            while (!this.hasValidCard(this.players[this.whosTurn])) {
                this.updateTurn();
            }
            this.playerTurn(this.players[this.whosTurn], this.automate); // whosTurn as index of players array
            this.checkForUno(this.players[this.whosTurn]); // to print "UNO" if they have 1 card left
            this.checkForWinner(this.players[this.whosTurn]);
            if (!this.gameIsOver) this.updateTurn();
        }
        // end of the game logic: messages.G
        console.log(messages.W(this.players[this.whosTurn]) + messages.G);
    }

    // deal 7 cards to each player
    dealHands() {
        for (let i = 0; i < 7; i++) {
            this.players.forEach((player) => {
                player.addCard(this.drawCard());
            });
        }
    }

    // checks if player has a valid card to play - boolean
    hasValidCard(player) {
        let playerHand = player.getHand();
        for (let i = 0; i < playerHand.length; i++) {
            if (
                playerHand[i].getColor() === this.lastCardPlayed.getColor() ||
                playerHand[i].getNumber() === this.lastCardPlayed.getNumber()
            )
                return true;
        }
        console.log(messages.E1(player) + "! " + messages.D1);
        player.addCard(this.drawCard()); // if player does not have a valid card
        return false;
    }

    // invokes current Players turn - promting for card until valid card chosen
    playerTurn(player, automate) {
        let playerHand = player.getHand();
        console.log("Last card played: " + this.lastCardPlayed.getCardString());
        console.log(messages.E1(player));
        console.log(player.printHand()); // changed to print index of cards using printHand method in Player class

        if (!this.automate) {
            var index = prompt(messages.F);
            // run until player picks a valid card
            if (index === "auto") {
                this.automate = true;
            } else {
                while (!this.testCard(index, playerHand))
                    index = prompt(messages.H);
            }
        }
        if (this.automate) {
            var index;
            for (let i = 0; i < playerHand.length; i++)
                if (this.testCard(i, playerHand)) index = i;
        }
        // removes card and reassigns last card played
        this.cardPlayed(player.removeCard(index));
    }

    // checks if current player has 1 card left
    checkForUno(player) {
        if (player.getCardsLeft() === 1) console.log("\nUNO!\n");
    }

    // checks if current player has no cards left
    checkForWinner(player) {
        if (player.getCardsLeft() === 0) this.gameIsOver = true;
    }

    // returns true if card is valid to play; false if not
    testCard(i, hand) {
        if (i >= hand.length || i < 0) return false;
        let card = hand[i];
        return (
            card.getColor() === this.lastCardPlayed.getColor() ||
            card.getNumber() === this.lastCardPlayed.getNumber()
        );
    }
}
