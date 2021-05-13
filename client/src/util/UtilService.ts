import API from './API'
import LocalDB from './LocalDB'
import IUtilService from './IUtilService'

export default class UtilService implements IUtilService {

  private api: API = new API()
  private db: LocalDB = new LocalDB()  

  public async getTrivia(): Promise<GameEventAPI | undefined> {
    await this.db.openLocalDB()
    return await this.db.getTrivia() || await this.api.getTrivia() 
  }

  public async getBackToBack(): Promise<GameEventAPI | undefined> {
    await this.db.openLocalDB()
    return await  this.db.getBackToBack() || await this.api.getBackToBack() 
        
  }

  public async getParty(): Promise<GameEventAPI | undefined> {
    await this.db.openLocalDB()
    return await  this.db.getParty() || await this.api.getParty() 
  }
}