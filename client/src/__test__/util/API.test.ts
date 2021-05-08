import API from '../../util/API'


describe('API test of server', () => {

  let api: API

  beforeAll(() => {
    api = new API()
  })

  test('Party should contain 20 questions', async () => {
    const partyEvents: GameEventAPI | undefined = await api.getParty()
    expect(partyEvents).toBeDefined()

    if (!partyEvents) {
      return
    }

    const numberOfquestions = partyEvents.questions.length
    expect(numberOfquestions).toBe(5)
    
  })

  test('Party should contain unique events', async () => {
    const partyEvents: GameEventAPI | undefined  = await api.getParty()
    expect(partyEvents).toBeDefined()
    
    if (!partyEvents) {
      return
    }

    const uniqueEvents: boolean = isEventsUnique(partyEvents)
    expect(uniqueEvents).toBeTruthy()
  })

  test('Trivia should contain 20 questions', async () => {
    const triviaEvents: GameEventAPI | undefined = await api.getTrivia()
    expect(triviaEvents).toBeDefined()

    if (!triviaEvents) {
      return
    }

    const numberOfquestions = triviaEvents.questions.length
    expect(numberOfquestions).toBe(50)
    
  })

  test('Trivia should contain unique events', async () => {
    const triviaEvents: GameEventAPI | undefined  = await api.getTrivia()
    expect(triviaEvents).toBeDefined()

    if (!triviaEvents) {
      return
    }

    const uniqueEvents: boolean = isEventsUnique(triviaEvents)
    expect(uniqueEvents).toBeTruthy()
  })

  test('BackToBack should contain 20 questions', async () => {
    const backToBackEvents: GameEventAPI | undefined = await api.getBackToBack()
    expect(backToBackEvents).toBeDefined()

    if (!backToBackEvents) {
      return
    }

    const numberOfquestions = backToBackEvents.questions.length
    expect(numberOfquestions).toBe(5)
  })

  test('BackToBack should contain unique events', async () => {
    const backToBackEvents: GameEventAPI | undefined  = await api.getBackToBack()
    expect(backToBackEvents).toBeDefined()

    if (!backToBackEvents) {
      return
    }

    const uniqueEvents: boolean = isEventsUnique(backToBackEvents)
    expect(uniqueEvents).toBeTruthy()
  })
})

/* ------------------------------------------- */
/* ----------- Help functions ---------------- */
/* ------------------------------------------- */

function  isEventsUnique(gameEvents: GameEventAPI): boolean {
  const events: string[] = []

  gameEvents.questions.forEach((event: ITrivia | IParty | IBackToBack) => {
    events.push(event.question)
  }); 

  const numberOfUniqueQuestions = new Set(events).size
  const numberOfquestions = events.length

  return numberOfUniqueQuestions === numberOfquestions  
}