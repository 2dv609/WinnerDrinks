import IUtilService from "../util/IUtilService"
import UtilService from "../util/UtilService"
import API from '../util/API'
import LocalDB from "../util/LocalDB"

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
 