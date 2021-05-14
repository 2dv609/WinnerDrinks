import { openDB, IDBPDatabase, deleteDB } from 'idb'
import IUtilService from './IUtilService'
import { GameModuleName, enumKeys } from './GameModuleName'

/**
 * Class LocalDB containing utility methods for indexedDB. 
 * 
 * @implements {IUtilService}
 */
export default class LocalDB implements IUtilService {

    private db: any
    private readonly dbName: string  = 'WinnerDrinks'
    private readonly dbVersion: number  = 1
    
    /**
     * Open the database and upgrades it if needed.
     * 
     * @return {Promise<void>}
     */
    public async openLocalDB(): Promise<void> {
        try {

            this.db = await openDB(this.dbName, this.dbVersion, { // use undefined for current version https://github.com/jakearchibald/idb#opendb 
                upgrade(db: IDBPDatabase, oldVersion, newVersion, transaction) {

                    for (const name of enumKeys(GameModuleName)) {

                        if (db.objectStoreNames.contains(GameModuleName[name])) {
                            continue;
                        }
                        db.createObjectStore(GameModuleName[name], { keyPath: '_id' })
                    }
                },
                blocked() {
                    console.log('blocked')
                },
                blocking() {
                    console.log('blocking')
                },
                terminated() {
                    console.log('terminated')
                },
            })

        } catch (error) {
            console.log('createObjectStores error:', error)
        }
    }

    /**
     * Load the database using game module names as table names.
     * 
     * @return {Promise<void>}
     */
    public async loadDB(): Promise<void> {
        const gameEventsPromises: Promise<void>[] = [] 

        for (const name of enumKeys(GameModuleName)) {
            gameEventsPromises.push(this.loadAndFetchGameEvents(GameModuleName[name]))
        }
     
        Promise.all(gameEventsPromises).catch(error => console.log('Load DB error:', error))
    }

    /**
     * Fetch the data using game module name as api paths.
     * 
     * @return {Promise<void>}
     */
    private async loadAndFetchGameEvents(gameModuleName: string): Promise<void> {
        try {
            const gameEvents: (IBackToBack | ITrivia | IParty)[] = []
            const response: any = await fetch(`${process.env.PUBLIC_URL}/api/${gameModuleName}`)
            
            if (response) {
                const responseJSON: any = await response.json()
                responseJSON.questions.forEach((question: IBackToBack) => gameEvents.push(question))    
            }

            this.loadTable(gameEvents, gameModuleName)

        }  catch (error) {
            console.log(`Error when loading game events for game module ${gameModuleName}:`, error)
        }
    }

    /**
     * Load the database using game module names as table names.
     * 
     * @return {Promise<void>}
     */
    private async loadTable(gameEvents: (IBackToBack | ITrivia | IParty)[], gameModuleName: string): Promise<void> { 
        try {
            const transaction = this.db.transaction(gameModuleName, 'readwrite');
            const store = transaction.objectStore(gameModuleName);
            
            for (const question of gameEvents) {
                await store.put(question);
            }
        
        } catch (error) {
            console.log(`Error when loading indexedDB table for game module ${gameModuleName}:`, error)
        }
    }   

    /**
     * Get data from indexedDB using.
     *
     * @param  {string} gameModuleName - name of a game module. 
     * @return {Promise<GameEventAPI | undefined>} - The game events for the game module or undefined if error. 
     */
    public async getGameEvents(gameModuleName: string): Promise<GameEventAPI | undefined> {
        try {
            const transaction = this.db.transaction(gameModuleName, 'readonly')
            const store = transaction.objectStore(gameModuleName)
            const questions = await store.getAll()
            return { questions: questions }
        
        } catch (error) {
            console.log('error:', error)
        }
    }

    /**
     * Delete the database.
     * 
     * @return {Promise<void>}
     */
    public async deleteLocalDB(): Promise<void> {
        await deleteDB(this.dbName)
    }
}