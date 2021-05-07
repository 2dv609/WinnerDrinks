import Player from '../../../Player'


// Mock GameProps
const addScoreMock = (p: Player, score: number) => {}
const makeWinnerAlertMock = (p: any) => {}
const chooseRandomNewGameMock = () => {}
const getPlayersMock = (amount: number): Player[] => {
    const player1 = new Player('Mats')
    const player2 = new Player('Tom')
    return [player1, player2];
};

export const gamePropsMock = {
    getPlayers: getPlayersMock, // Let the component decide how many players it needs. 
    addScore: addScoreMock, // Adds a score to a player
    makeWinnerAlert: makeWinnerAlertMock, // makes an Alert that corresponds to if there are one, multiple, or no winners
    chooseRandomNewGame: chooseRandomNewGameMock, // chooses a random new game
}

// Mock game event mock
export const gameEventMock = {
    _id: 111,
    question: 'This is a mock question'
}