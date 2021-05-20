import Player from '../model/Player';

interface GameModuleProps {
    players: Player[]
    getPlayers: (amount: number, players: Player[]) => Player[]; // Let the component decide how many players it needs. 
    addScore: (p: Player) => void; // Adds a score to a player
    makeWinnerAlert: (p: Player | Player[] | null, message?: string) => void; // makes an Alert that corresponds to if there are one, multiple, or no winners
    chooseRandomNewGame: () => void; // chooses a random new game
    removeGameEvent: (gameEventId: string, gameEvents: GameEventAPI) => void
}

export type TextGameModuleProps = {
    gameService: GameModuleProps,
    gameEvent: any,
    currentPlayers: Player[]
}

export type AnimationGameModuleProps = {
    gameService: GameModuleProps,
    currentPlayers: Player[]
}
