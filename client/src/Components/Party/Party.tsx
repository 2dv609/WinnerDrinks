import React, { useState, useEffect } from 'react';
//import GameProps from '../GameProps';

const Party: React.FC<TextGameModuleProps> = ({ gameService, gameEvent }) => {
    // const gp: GameProps = props.gp;
    const [players, setPlayers] = useState(gameService.getPlayers(2, gameService.players));
    
    function addPlayerToGameEvent(): string {
        //const gameEvent: string = gameEvent.question
        return gameEvent.question.replace('{players[0]}', `${players[0]}`).replace('{players[1]}', `${players[1]}`)
    }

    useEffect(() => { 
        return () => { // Return a function for code cleanup. This will set new players 
            setPlayers(gameService.getPlayers(2, gameService.players));
        }
    }, [gameService])

    return (
        <div className="box">
            <div data-testid="game-event" className="content">{addPlayerToGameEvent()}</div>
            <h3>Who won?</h3>

            <button className="button" onClick={() => {
                gameService.addScore(players[0], 1)
                gameService.makeWinnerAlert(players[0])
                gameService.chooseRandomNewGame()
            }}>{players[0].toString()}</button>

            <button className="button" onClick={() => {
                gameService.addScore(players[1], 1)
                gameService.makeWinnerAlert(players[1])
                gameService.chooseRandomNewGame()
            }}>{players[1].toString()}</button>

        </div>
    )
};

export default Party;