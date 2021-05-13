import API from './API'
import LocalDB from './LocalDB'
import IUtilService from './IUtilService'

export default class UtilService implements IUtilService {

  private api: API = new API()
  private db: LocalDB = new LocalDB()  

  public async getTrivia(): Promise<GameEventAPI | undefined> {
    await this.db.openLocalDB()
    return this.db.getTrivia() || this.api.getTrivia() 
  }

  public async getBackToBack(): Promise<GameEventAPI | undefined> {
    await this.db.openLocalDB()
    return this.db.getBackToBack() || this.api.getBackToBack() 
        
  }

  public async getParty(): Promise<GameEventAPI | undefined> {
    await this.db.openLocalDB()
    return this.db.getParty() || this.api.getParty() 
  }
}