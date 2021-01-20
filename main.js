let doYouWantToPlay = confirm("Do you want to play a Game...?");
if (!doYouWantToPlay) {
    console.log("Lets play anyways...");
}
let shuffledDeck = createDealerDeck();
let unoGame = new Game(shuffledDeck);
unoGame.playGame();
