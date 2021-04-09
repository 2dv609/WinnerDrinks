import Player from '../Player';

interface GameProps {
    getPlayers: (amount: number) => Player[]; // Let the component decide how many players it needs. 
    done: (affected: Player, score: number)=> void; // A method that's passed from Game to call when the game turn is done. 
    doneTwoWinners: (affectedOne: Player, affectedTwo: Player, score: number)=> void; // Method to work with the Trivia component
    doneNoWinners: ()=> void; // Method to work with the Trivia component
}


export default GameProps;