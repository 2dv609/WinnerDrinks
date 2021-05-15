import React, { useState, useEffect } from 'react';
import { TextGameModuleProps } from '../GameModuleProps';


const Party: React.FC<TextGameModuleProps> = ({ gameService, gameEvent }) => {
    const [players, setPlayers] = useState(gameService.getPlayers(2, gameService.players));

    function addPlayerToGameEvent(): string {
        //const gameEvent: string = gameEvent.question
        return gameEvent.question.replace(/{p0}/g, `${players[0]}`).replace(/{p1}/g, `${players[1]}`)
    }

    useEffect(() => {
        return () => { // Return a function for code cleanup. This will set new players 
            setPlayers(gameService.getPlayers(2, gameService.players));
        }
    }, [gameService])

    return (
        <div className="card">
            <div className="card-content">
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
        </div>

    )
};

export default Party;