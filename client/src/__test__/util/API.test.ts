import API from '../../util/API'

describe('API test of server', () => {

    let api: API

    beforeAll(() => {
        api = new API()
    })

    test('Api should contain path party', async () => {
        const partyEvents: GameEventAPI | undefined = await api.getGameEvents('party')
        expect(partyEvents).toBeDefined()
        
    })

    test('Api should contain path back-to-back', async () => {
        const partyEvents: GameEventAPI | undefined  = await api.getGameEvents('back-to-back')
        expect(partyEvents).toBeDefined()
    })

    test('Api should contain path trivia', async () => {
        const triviaEvents: GameEventAPI | undefined = await api.getGameEvents('trivia')
        expect(triviaEvents).toBeDefined()
    })
})
