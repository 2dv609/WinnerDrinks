import Player from '../../../model/Player'


// Mock GameProps
const addScoreMock = (p: Player, score: number) => {}
const makeWinnerAlertMock = (p: any) => {}
const chooseRandomNewGameMock = () => {}
const getPlayersMock = (amount: number, players: Player[]): Player[] => {
    const player1 = new Player('Mats')
    const player2 = new Player('Tom')
    return [player1, player2];
};

export const gamePropsMock = {
    players: [new Player('Mats'), new Player('Tom')],
    getPlayers: getPlayersMock, // Let the component decide how many players it needs. 
    addScore: addScoreMock, // Adds a score to a player
    makeWinnerAlert: makeWinnerAlertMock, // makes an Alert that corresponds to if there are one, multiple, or no winners
    chooseRandomNewGame: chooseRandomNewGameMock, // chooses a random new game
}

// Mock game event mock
/* export const questions = {
    _id: 111,
    category: '',
    question: 'This is a mock question',
    type: '',
    difficulty: '',
    correct_answer: '',
    incorrect_answers: [''],
    all_answers: ['']
} */
export const gameEventMock = {
    questions: [
        {
            _id: 111,
            category: '',
            type: '',
            difficulty: '',
            question: 'This is a party mock question {players[0]} {players[1]}',
            correct_answer: '',
            incorrect_answers: [''],
            all_answers: ['']
        }
    ]
}
