const messages = {
    A: "\n Welcome are you ready to play Uno?!", //(Y,N)
    A1: "\nAwesome!  Let's get started!", //(Y)
    C1: "\nWhat's your name?",
    C2: "Is that it?",
    D1:
        "Whoops! Looks like there is no valid card in your hand! We automatically added a card to your hand and moved to the next player",
    E1: (player) => `\n${player.getName()}`,
    F:
        "Which card from your hand would you like to play? (0 based index))\n*Type 'auto' to automate the rest of the game*\n",
    G: "Game Over! Thanks for playing! Reload to play a new game!",
    H: "Oh no! The card you selected is invalid. Please choose a valid card",
    W: (player) => `\n${player.getName()}, you won!\n`,
    M:
        "\nWould you like to automate the game? Y to Automate, N to Continue Playing",
};
