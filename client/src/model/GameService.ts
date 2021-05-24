import Player from './Player'
import { TextGameModuleProps, AnimationGameModuleProps } from '../Components/GameModuleProps'
import { IGameModuleSetting } from './GameModule'

/**
 * Class GameService containing commmon logic for the Application.
 */
export default class GameService {

    /**
     * Add one point to a players total score.
     * 
     * @param {Player} p - A player
     */
    public addScore = (p: Player): void => {
        p.addScore(1)
    }

    /**
     * Return a new game index that can not be the same as the last. 
     * 
     * @param {number} currentGameIndex - The current game index 
     * @param {(React.FC<TextGameModuleProps> | React.FC<AnimationGameModuleProps>)[]} gameModules - An array of game modules 
     * @param {IGameModuleSetting[]} gameModuleSettings - An array of game module settings 
     * @returns {number} 
     */
    public getNewGameIndex = (currentGameIndex: number, gameModules: (React.FC<TextGameModuleProps> | React.FC<AnimationGameModuleProps>)[], gameModuleSettings: IGameModuleSetting[]): number => {
        let newIndex: number = currentGameIndex
        while (newIndex === currentGameIndex || !gameModuleSettings[newIndex].active) { // Don't allow the same game twice in a row. 
          newIndex = Math.floor(Math.random() * gameModules.length)
        }
        return newIndex
    }
    /**
     * Get the players for a game event.
     * 
     * @param nrOfPlayers The amount of players you need for the component.
     * @param players An array of players that the function will fetch from. 
     * @returns A sublist from your array that contains the requested amount of active players.
     */
    public getPlayers = (nrOfPlayers: number, players: Player[]): Player[] => {
        const activePlayers: Player[] = []

        for (let i = 0; i < players.length; i++) {
            if (players[i].isActive) {
                activePlayers.push(players[i])
            }
            
        }
        const shuffledActivePlayers = this.shuffle(activePlayers)
        
        return shuffledActivePlayers.slice(0, nrOfPlayers)
    }

    /**
     * Shuffle an array of players.
     *  
     * @param {Player[]} players - An array of players.
     * @returns {Player[]} - An shuffled array of players.
     */
    private shuffle(players: Player[]): Player[] {
        var m = players.length, t, i
        while (m) {
            i = Math.floor(Math.random() * m--)
            t = players[m]
            players[m] = players[i]
            players[i] = t
        }
        return players
    }

    /**
     * Get a random game event.
     * 
     * @param {GameEventAPI} gameEventAPI - A object of type GameEventApi 
     * @returns {IBackToBack | IParty | ITrivia} - A random game event. 
     */
    public getRandomGameEvent = (gameEventAPI: GameEventAPI): IBackToBack | IParty | ITrivia => {
        return gameEventAPI.questions[Math.floor(Math.random() * gameEventAPI.questions.length)]
    }

    /**
     * Get the number of active players.
     *  
     * @param {Player[]} players - An array of players.
     * @returns {number} - The nuber of active players.
     */
    public getNumActivePlayers = (players: Player[]): number => {
        let numOfActivePlayers = 0

        players.forEach(player => {
            if(player.isActive) numOfActivePlayers++  
        })

        return numOfActivePlayers
    }
}
