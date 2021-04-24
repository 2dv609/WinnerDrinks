import React, { useState, useEffect } from 'react';
import GameProps from '../GameProps';
import { getParty } from '../../API'
 

function Party(props: any) {
    const gp: GameProps = props.gp;
    const [players, setPlayers] = useState(gp.getPlayers(2));
    const [task, setTask] = useState('');

    useEffect(() => {
        fetchParty()
      },[])
    
    const fetchParty = (): void => {
      getParty()
      .then(({ data }: IParty[] | any) => setTask(getNewTask(data.questions)))
      .catch((err: Error) => console.log(err))
    }

    function getNewTask(party: IParty[]): string {
        const rand = Math.floor(Math.random() * party.length)
        const taskRaw = party[rand].question
        return taskRaw.replace('{players[0]}', `${players[0]}`).replace('{players[1]}', `${players[1]}`)
    }

    useEffect(() => { 
        return () => { // Return a function for code cleanup. This will set new players 
            setPlayers(gp.getPlayers(2));
        }
    }, [gp])

    return (
        <div className="box">
            <div className="content">{task}</div>
            <h3>Who won?</h3>

            <button className="button" onClick={() => {
                gp.addScore(players[0], 1)
                gp.makeWinnerAlert(players[0])
                gp.chooseRandomNewGame()
            }}>{players[0].toString()}</button>

            <button className="button" onClick={() => {
                gp.addScore(players[1], 1)
                gp.makeWinnerAlert(players[1])
                gp.chooseRandomNewGame()
            }}>{players[1].toString()}</button>

        </div>
    )
};

export default Party;