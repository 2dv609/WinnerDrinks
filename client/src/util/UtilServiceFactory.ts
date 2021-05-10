import IUtilService from "./IUtilService"
import UtilService from "./UtilService"
import API from './API'
import LocalDB from "./LocalDB"

export default async function getUtilService(): Promise<IUtilService> {    

    const api: API = new API()

    if (window.indexedDB) {
        if (await api.checkStatus()) {
            return new UtilService()
            
        } else {
            return new LocalDB()    
        } 
    } else {
        return new API()
    }
}
