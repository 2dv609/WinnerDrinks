/**
 * A player class for keeping track of the player names, 
 * their score and whether they are currently active in the game or not. 
 * @author Delfi Sehidic
 */

class Player {
    name: string; // The name of the player as registered in the input
    isActive: boolean; // Is the player currently playing or paused for e.g. a bathroom visit?
    score: number;

    /**
     * Constructs a new player object. 
     * @param name Must be at least 3 characters long and not exceed 10.
     */
    constructor(name: string) {
        if (name.length < 3 || name.length > 10) {
            throw Error("Name must be at least 3 characters and not exceed 10.");
        };
        if (name && !name.trim()) {
            throw Error("Name cannot be empty.");
        };
        this.name = name;
        this.isActive = true;
        this.score = 0;
    }
    /**
     * Overwrites the old score of the player and sets it to newScore. 
     * @param newScore 
     */
    setScore(newScore: number) {
        this.score = newScore;
    };
    /**
     * Updates the score. For example, if the score is 10 and points is 1, the score will now be 11. 
     * 
     * @param points Added to the existing score. Can be negative. 
     */
    addScore(points: number) {
        this.score += points;
    };
}

export default Player;