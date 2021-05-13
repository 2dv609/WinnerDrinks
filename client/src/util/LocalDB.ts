import { openDB, IDBPDatabase, deleteDB } from 'idb'
import IUtilService from './IUtilService'
import { GameModuleName, enumKeys } from './GameModuleName'

/**
 * Class LocalDB containing utility methods to load indexedDb with remote database
 * and implements IUtilService to get game events data from indexedDB.
 */
export default class LocalDB implements IUtilService {

    private db: any
    private readonly dbName: string  = 'WinnerDrinks'
    private readonly dbVersion: number  = 1
    
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

    public async loadDB(): Promise<void> {
        const gameEventsPromises: Promise<void>[] = [] 

        for (const name of enumKeys(GameModuleName)) {
            gameEventsPromises.push(this.loadAndFetchGameEvents(GameModuleName[name]))
        }
     
        Promise.all(gameEventsPromises).catch(error => console.log('Load DB error:', error))
    }

    private async loadAndFetchGameEvents(gameModuleName: string): Promise<void> {
        try {
            const questions: IBackToBack[] = []
            const backToBackResponse: any = await fetch(`${process.env.PUBLIC_URL}/api/${gameModuleName}`)
            
            if (backToBackResponse) {
                const backToBackResponseJSON: any = await backToBackResponse.json()
                backToBackResponseJSON.questions.forEach((question: IBackToBack) => questions.push(question))    
            }

            this.loadTable(questions, gameModuleName)

        }  catch (error) {
            console.log('Load back-to-back error:', error)
        }
    }

    private async loadTable(questions: any[] | undefined, gameModuleName: string): Promise<void> { 
        try {
            if (questions) {
                const transaction = this.db.transaction(gameModuleName, 'readwrite');
                const store = transaction.objectStore(gameModuleName);
                
                for (const question of questions) {
                    await store.put(question);
                }
            }
        
        } catch (error) {
            console.log('Load table error:', error)
        }
    }   

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

    public async deleteLocalDB(): Promise<void> {
        await deleteDB(this.dbName)
    }
}