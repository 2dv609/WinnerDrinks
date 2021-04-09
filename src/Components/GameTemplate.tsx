import { useState, useEffect } from 'react';
import GameProps from './GameProps';
import '/../App.css';

const NUM_OF_PLAYERS = 2;

function MyGame(props: any) {
    const gp: GameProps = props.gp;
    const [players, setPlayers] = useState(gp.getPlayers(NUM_OF_PLAYERS));
    

    useEffect(() => { 
        return () => { // Return a function for code cleanup. This will set new players 
            setPlayers(gp.getPlayers(NUM_OF_PLAYERS));
        }
    }, [gp])

    return (
        <div>
        </div>
    )
};

export default MyGame;