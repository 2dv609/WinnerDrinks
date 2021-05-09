import Player from '../Player';

interface GameProps {
    getPlayers: (amount: number) => Player[]; // Let the component decide how many players it needs. 
    addScore: (p: Player, score: number) => void; // Adds a score to a player
    makeWinnerAlert: (p: any, message?:string) => void; // makes an Alert that corresponds to if there are one, multiple, or no winners
    chooseRandomNewGame: () => void; // chooses a random new game
    updateScoreboard: () => void;
}

export default GameProps;