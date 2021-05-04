// Trivia type
interface ITrivia {
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
interface TriviaProps {
  triviaQuestion: ITrivia
}

// BackToBack type
interface IBackToBack {
  _id: string
  question: string
  createdAt?: string
  updatedAt?: string
}
interface BackToBackProps {
  trivia: IBackToBack
}

// Party type
interface IParty {
  _id: string
  question: string
  createdAt?: string
  updatedAt?: string
}
interface PartyProps {
  party: IParty
}

type Question = IBackToBack | IParty | ITrivia 

// General type for game events
type GameEventAPI = {
  message?: string
  status?: string
  questions: IBackToBack[] | IParty[] | ITrivia[]
}
