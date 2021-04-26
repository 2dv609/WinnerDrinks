// MultiQuestion types
interface IMultiQuestion {
  _id: string
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
  all_answers: string[]
  createdAt?: string
  updatedAt?: string
}
interface MultiQuestionProps {
  multiQuestion: IMultiQuestion
}

// Trivia types
interface ITrivia {
  _id: string
  question: string
  createdAt?: string
  updatedAt?: string
}
interface TriviaProps {
  trivia: ITrivia
}

// Party types
interface IParty {
  _id: string
  question: string
  createdAt?: string
  updatedAt?: string
}
interface PartyProps {
  party: IParty
}

// General type for game events
type GameEventAPI = {
  message: string
  status: string
  questions: ITrivia[] | IParty[] | IMultiQuestion[]
}
