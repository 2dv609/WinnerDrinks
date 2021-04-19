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

interface IParty {
  _id: string
  question: string
  createdAt?: string
  updatedAt?: string
}

interface PartyProps {
  party: IParty
}

type ApiDataType = {
  message: string
  status: string
  questions: ITrivia[]
}
