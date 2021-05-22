import Player from '../../model/Player'

describe('Test suite for class model/Player.ts', () => {

    test('An empty player name should throw error', () => {
        expect(() => { new Player(' ')}).toThrow('Name cannot be empty.')
    })
    
    test('A player name that exceed 10 or have no characters should throw error', () => {
        expect(() => { new Player(createPlayerName(11))}).toThrow('Name must be at least 1 characters and not exceed 10.')
        expect(() => { new Player(createPlayerName(0))}).toThrow('Name must be at least 1 characters and not exceed 10.')
    })

    test('A player name that have length 1 <= name.length <= 10 should set name', () => {
        const playerNameMock = createPlayerName(4)
        const player: Player = new Player(playerNameMock)
        expect(player.name === playerNameMock).toBeTruthy()
    })

    test('A player name that have length 1 <= name.length <= 10 should set player to active', () => {
        const playerNameMock = createPlayerName(1)
        const player: Player = new Player(playerNameMock)
        expect(player.isActive).toBeTruthy()
    })

    test('A player name that have length 1 <= name.length <= 10 should set player\'s score to 0', () => {
        const playerNameMock = createPlayerName(10)
        const player: Player = new Player(playerNameMock)
        expect(player.score === 0).toBeTruthy()
    })

    test('Method addScoore should add parameters value to player\'s score', () => {
        const playerNameMock = createPlayerName(10)
        const player: Player = new Player(playerNameMock)
        player.addScore(10)
        expect(player.score === 10).toBeTruthy()
    })
})

/* --------------------------------- */
/* ----- Test help functions ------- */
/* --------------------------------- */

const createPlayerName = (lengthName: number): string => {
    return Math.random().toString(36).substring(0, lengthName)
}
