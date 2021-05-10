
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

// General type for game events
type GameEventAPI = {
  message?: string
  status?: string
  questions: IBackToBack[] | IParty[] | ITrivia[]
}

// Type for checking API status
type connectionAPI = {
  connectionAPI: number
}

// GameModule props
/* interface GameModuleProps {
  players: Player[],
  getPlayers: (amount: number, players: Player[]) => Player[]; // Let the component decide how many players it needs. 
  addScore: (p: Player, score: number) => void; // Adds a score to a player
  makeWinnerAlert: (p: any) => void; // makes an Alert that corresponds to if there are one, multiple, or no winners
  chooseRandomNewGame: () => void; // chooses a random new game
}
type TextGameModuleProps = {
  gameService: GameModuleProps,
  gameEvent: IBackToBack | IParty | ITrivia
}
type AnimationGameModuleProps = {
  gameService: GameModuleProps
} */
