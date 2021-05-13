import API from './API'
import LocalDB from './LocalDB'
import IUtilService from './IUtilService'

export default class UtilService implements IUtilService {

  private api: API = new API()
  private db: LocalDB = new LocalDB()  

  public async getGameEvents(gameModule: string): Promise<GameEventAPI | undefined> {
    await this.db.openLocalDB()
    return await this.db.getGameEvents(gameModule) || await this.api.getGameEvents(gameModule)
  }
}