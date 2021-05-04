import { openDB, IDBPDatabase } from 'idb'
import { API } from './API'


export class DB {

    private api: API = new API();
    private db: any
    readonly dbName: string  = 'WinnerDrinks'
    readonly triviaEvents: string = 'triviaEvents'
    readonly partyEvents: string = 'partyEvents'
    readonly backToBackEvents: string = 'backToBackEvents'

    public async createObjectStore(): Promise<void> {
        try {
            const tableNames = [this.triviaEvents, this.partyEvents, this.backToBackEvents]
            this.db = await openDB(this.dbName, 1, {
                upgrade(db: IDBPDatabase) {
                    for (const tableName of tableNames) {
                        if (db.objectStoreNames.contains(tableName)) {
                            continue;
                        }
                        db.createObjectStore(tableName, { keyPath: '_id' })
                    }
                },
            })

        } catch (error) {
            console.log('createOnjectStore error:', error)
        }
    }

    public async loadDB(): Promise<void> {
        const loadTrivia = this.loadTrivia()
        const loadParty = this.loadParty()
        const loadBackToBack = this.loadBackToBack()

        Promise.all([loadTrivia, loadParty, loadBackToBack]).catch(error => console.log('Load DB error:', error))
    }

    private async loadTrivia(): Promise<void> {
        try {
            const questions: ITrivia[] = []
            const triviaResponse: any = await fetch(`${process.env.PUBLIC_URL}/api/trivia`)
            const triviaResponseJSON: any = await triviaResponse.json()
        
            triviaResponseJSON.questions.forEach((question: ITrivia) => {
                if (questions) {
                questions.push(question)
                }

            })

            this.loadTable(questions, this.triviaEvents)

        }  catch (error) {
            console.log('Load table error:', error)
        }
    }

    private async loadParty(): Promise<void> {
        try {
            const questions: IParty[] = []
            const partyResponse: any = await fetch(`${process.env.PUBLIC_URL}/api/party`)
            const partyResponseJSON: any = await partyResponse.json()
        
            partyResponseJSON.questions.forEach((question: IParty) => {
                if (questions) {
                questions.push(question)
                }

            })

            this.loadTable(questions, this.partyEvents)

        }  catch (error) {
            console.log('Load table error:', error)
        }
    }

    private async loadBackToBack(): Promise<void> {
        try {
            const questions: IBackToBack[] = []
            const backToBackResponse: any = await fetch(`${process.env.PUBLIC_URL}/api/back-to-back`)
            const backToBackResponseJSON: any = await backToBackResponse.json()
        
            backToBackResponseJSON.questions.forEach((question: IBackToBack) => {
                if (questions) {
                    questions.push(question)
                }

            })

            this.loadTable(questions, this.backToBackEvents)

        }  catch (error) {
            console.log('Load table error:', error)
        }
    }

    private async loadTable(questions: any[] | undefined, tableName: string): Promise<void> { 
        try {
            if (questions) {
                const transaction = this.db.transaction(tableName, 'readwrite');
                const store = transaction.objectStore(tableName);
                
                for (const question of questions) {
                    await store.put(question);
                }
            }
        
        } catch (error) {
            console.log('Load table error:', error)
        }
    }   

    public async getTrivia(): Promise<GameEventAPI | undefined> {
        try {
            await this.openDB()
            const transaction = this.db.transaction(this.triviaEvents, 'readonly')
            const store = transaction.objectStore(this.triviaEvents)
            const questions = await store.getAll()
            // console.log('Get All Data', JSON.stringify(questions));
            return { questions: questions }
        
        } catch (error) {
            console.log('error:', error)
            // throw new Error(error)
        }
    }

    public async getBackToBack(): Promise<GameEventAPI | undefined> {
        try {
            await this.openDB()
            const transaction = this.db.transaction(this.backToBackEvents, 'readonly')
            const store = transaction.objectStore(this.backToBackEvents)
            const questions = await store.getAll()
            // console.log('Get All Data', JSON.stringify(questions));
            return { questions: questions }
        
        } catch (error) {
            console.log('error:', error)
            // throw new Error(error)
        }
    }

    public async getParty(): Promise<GameEventAPI  | undefined> {
        try {    
            await this.openDB()
            const transaction = this.db.transaction(this.partyEvents, 'readonly')
            const store = transaction.objectStore(this.partyEvents)
            const questions = await store.getAll()
            // console.log('Get All Data', JSON.stringify(questions));
            return { questions: questions }
        
        } catch (error) {
            console.log('error:', error)
            // throw new Error(error)
        }
    }

    private async openDB(): Promise<boolean> {
        try {
            this.db = await openDB(this.dbName, 1) // version == undefined gives current version https://github.com/jakearchibald/idb#opendb
            return true
        
        } catch (error) {
            console.log('error:', error)
            return false
        }
    }
}