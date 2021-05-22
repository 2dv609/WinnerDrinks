import Player from './Player'
import { TextGameModuleProps, AnimationGameModuleProps } from '../Components/GameModuleProps'
import { IGameModuleSetting } from '../Components/Menu/Navbar'

/**
 * Class GameService containing commmon used methods for the Application   
 */
export default class GameService {

    /**
     * Add one point to a players score.
     * 
     * @param {Player} p - A player
     */
    public addScore = (p: Player): void => {
        p.addScore(1)
    }

    /**
     * 
     * @param {number} currentGameIndex - The current game index 
     * @param {(React.FC<TextGameModuleProps> | React.FC<AnimationGameModuleProps>)[]} gameModules - An array of game modules 
     * @param {Player} activeGames - 
     * @returns {number} 
     */
    public getNewGameIndex = (currentGameIndex: number, gameModules: (React.FC<TextGameModuleProps> | React.FC<AnimationGameModuleProps>)[], activeGames: IGameModuleSetting[]): number => {
        let newIndex: number = currentGameIndex
        while (newIndex === currentGameIndex || !activeGames[newIndex].active) { // Don't allow the same game twice in a row. 
          newIndex = Math.floor(Math.random() * gameModules.length)
        }
        return newIndex
    }
    /**
     * 
     * @param nrOfPlayers The amount of players you need for the component
     * @param players An array of players that the function will fetch from. 
     * @returns A sublist from your array that contains the requested amount of active players. 
     */
    public getPlayers = (nrOfPlayers: number, players: Player[]): Player[] => {
        const activePlayers: Player[] = [];
        
        for (let i = 0; i < players.length; i++) {
            if (players[i].isActive) {
                activePlayers.push(players[i])
            }
            
        }

        this.shuffle(activePlayers);
        
        return activePlayers.slice(0, nrOfPlayers);
    }

    private shuffle(array: Player[]) {
        var m = array.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }

    public getRandomGameEvent = (gameEventAPI: GameEventAPI): IBackToBack | IParty | ITrivia => {
        return gameEventAPI.questions[Math.floor(Math.random() * gameEventAPI.questions.length)]
    }

    public getNumActivePlayers = (players: Player[]): number => {
        let numOfActivePlayers = 0

        players.forEach(player => {
            if(player.isActive) numOfActivePlayers++  
        })

        return numOfActivePlayers
      }
}