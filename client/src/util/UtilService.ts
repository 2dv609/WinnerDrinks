import { API } from './API'
import { LocalDB } from './LocalDB'

export class UtilService {

  private api: API = new API()// API(`${process.env.REACT_APP_SERVER_URL}/api/`) // = `${process.env.REACT_APP_SERVER_URL}/api/`
  private db: LocalDB = new LocalDB() // DB('WinnerDrinks', 'triviaEvents', 'partyEvents', 'backToBackEvents')  

  public async getTrivia(): Promise<GameEventAPI | undefined> {
    if (window.indexedDB && await this.db.getTrivia()) { 
        return this.db.getTrivia()
    
    } else if (await this.api.getTrivia()) {
        return this.api.getTrivia()  
    }
  }

  public async getBackToBack(): Promise<GameEventAPI | undefined> {  
    if (window.indexedDB && await this.db.getBackToBack()) { 
        return this.db.getBackToBack()
    
    } else if (await this.api.getBackToBack()) {
        return this.api.getBackToBack()  
    }    
  }

  public async getParty(): Promise<GameEventAPI | undefined> {
    if (window.indexedDB && await this.db.getParty()) { 
        return this.db.getParty()
    
    } else if (await this.api.getParty()) {
        return this.api.getParty()  
    }    
  }
}