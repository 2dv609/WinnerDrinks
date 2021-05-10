import Player from '../model/Player';

interface GameModuleProps {
    players: Player[],
    getPlayers: (amount: number, players: Player[]) => Player[]; // Let the component decide how many players it needs. 
    addScore: (p: Player, score: number) => void; // Adds a score to a player
    makeWinnerAlert: (p: any) => void; // makes an Alert that corresponds to if there are one, multiple, or no winners
    chooseRandomNewGame: () => void; // chooses a random new game
}

export type TextGameModuleProps = {
    gameService: GameModuleProps,
    gameEvent: IBackToBack | IParty | ITrivia
}

export type AnimationGameModuleProps = {
gameService: GameModuleProps
}


//export default GameProps;