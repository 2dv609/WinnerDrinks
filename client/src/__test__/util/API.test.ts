import API from '../../util/API'
import GameModule from '../../model/GameModule'

describe('API test of server', () => {

    let api: API
    const gameModule = new GameModule()

    beforeAll(() => {
        api = new API()
    })

    test('Api should contain path party', async () => {
        const partyEvents: GameEventAPI | undefined = await api.getGameEvents(gameModule.PARTY)
        expect(partyEvents).toBeDefined()
    })

    test('Api should contain path back-to-back', async () => {
        const partyEvents: GameEventAPI | undefined  = await api.getGameEvents(gameModule.BACK_TO_BACK)
        expect(partyEvents).toBeDefined()
    })

    test('Api should contain path trivia', async () => {
        const triviaEvents: GameEventAPI | undefined = await api.getGameEvents(gameModule.TRIVIA)
        expect(triviaEvents).toBeDefined()
    })
})
