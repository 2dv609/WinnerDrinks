import Player from './Player'

export default class GameService {
    
    public addScore = (p: Player, score: number) => {
        p.addScore(score)
    }

    public makeWinnerAlert = (p: any) => {
        let str: string

        // If p is an array, display an alert for multiple players
        if (Array.isArray(p)) {
            str = 'The winners are: \n'
            p.forEach(element => {
                str = str + `${element.toString()} with a total score of: ${element.score} \n`
            });

            // If there is no param, display an alert for no points given
        } else if (p == null) {
            str = `No points awarded!`

            //If p is a single player object, display an alert for one winner
        } else if (p instanceof Player) {
            str = `The winner is ${p.toString()} with a total score of: ${p.score}`
        } else {
            str = ``
        }

        alert(str);
    }

    public chooseRandomNewGame = (currentGameIndex: number, gameModules: (React.FC<TextGameModuleProps> | React.FC<AnimationGameModuleProps>)[]): number => {
        let newIndex = currentGameIndex
        while (newIndex === currentGameIndex) { // Don't allow the same game twice in a row. 
            newIndex = Math.floor(Math.random() * gameModules.length)
        }
        return newIndex
    }

    public getPlayers = (nrOfPlayers: number, players: Player[]): Player[] => {
        const activePlayers: Player[] = [];
        
        for (let i = 0; i < players.length; i++) {
            activePlayers.push(players[i])
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
}