import Player from '../Player';

interface GameProps {
    getPlayers: (amount: number) => Player[]; // Let the component decide how many players it needs. 
    done: (affected: Player, score: number)=> void; // A method that's passed from Game to call when the game turn is done. 
}


export default GameProps;