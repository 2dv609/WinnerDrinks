import IUtilService from "./IUtilService"
import API from './API'
import LocalDB from "./LocalDB"

/**
 * Factory method that return an instance of a type IUtilservice.
 * 
 * @returns {Promis<IUtilservice>}
 */
export default async function getUtilService(): Promise<IUtilService> {    

    const api: API = new API()
    const localDB: LocalDB = new LocalDB()

    // If production and indexedDB is supported then first return an instance of
    // API else return an instance of instance of LocalDB. 
    if (window.indexedDB && process.env.NODE_ENV === 'production') { 
        if (await api.checkStatus()) { // If api avilable return data from api
            return api
            
        } else {
            await localDB.openLocalDB() // return data from indexed db
            return localDB    
        }
        
    // If indexedDB is NOT supported or NOT in production then return
    // instance of API.    
    } else {
        return api
    }
}
