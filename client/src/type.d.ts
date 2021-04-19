// Trivia types
interface ITrivia {
  _id: string
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
  createdAt?: string
  updatedAt?: string
}
interface TriviaProps {
  trivia: ITrivia
}

// Nativ trivia types
interface INativeTrivia {
  _id: string
  question: string
  createdAt?: string
  updatedAt?: string
}
interface NativeTriviaProps {
  nativeTrivia: INativeTrivia
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

// General api type
type ApiDataType = {
  message: string
  status: string
  questions: ITrivia[]
}
