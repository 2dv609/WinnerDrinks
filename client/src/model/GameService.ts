import Player from './Player'
import { TextGameModuleProps, AnimationGameModuleProps } from '../Components/GameModuleProps'

export default class GameService {

    public addScore = (p: Player, score: number) => {
        p.addScore(score)
    }

    public getNewGameIndex = (currentGameIndex: number, gameModules: (React.FC<TextGameModuleProps> | React.FC<AnimationGameModuleProps>)[], activeGames: any[]): number => {
        let newIndex = currentGameIndex
        while (newIndex === currentGameIndex || !activeGames[newIndex].active) { // Don't allow the same game twice in a row. 
          console.log('while')
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