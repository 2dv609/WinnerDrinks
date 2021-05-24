import React from 'react';
import { TextGameModuleProps } from '../GameModuleProps';


const Party: React.FC<TextGameModuleProps> = ({ gameService, gameEvent, currentPlayers }) => {

    function addPlayerToGameEvent(): string {
        return gameEvent.question.replace(/{p0}/g, `${currentPlayers[0]}`).replace(/{p1}/g, `${currentPlayers[1]}`)
    }

    return (
        <div className="card block">
            <div className="card-content">
                <div className="content" data-testid="game-event">{addPlayerToGameEvent()}</div>
                <h3>Who won?</h3>
                <div className="columns">
                    <div className="column">
                        <button className="button" data-testid="button-1" onClick={() => {
                            gameService.addScore(currentPlayers[1])
                            gameService.makeWinnerAlert(currentPlayers[1])
                            gameService.chooseRandomNewGame()
                        }}>{currentPlayers[1].toString()}</button>
                    </div>
                    <div className="column">
                        <button className="button" data-testid="button-0" onClick={() => {
                            gameService.addScore(currentPlayers[0])
                            gameService.makeWinnerAlert(currentPlayers[0])
                            gameService.chooseRandomNewGame()
                        }}>{currentPlayers[0].toString()}</button>
                    </div>
                </div>




            </div>
        </div>

    )
};

export default Party;