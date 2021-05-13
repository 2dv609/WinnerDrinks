import axios, { AxiosResponse } from 'axios'
import IUtilService from './IUtilService'

/**
 * Class API containing utility methods for api calls to the server.
 */
export default class API implements IUtilService {


  private readonly baseUrl: string = `${process.env.REACT_APP_SERVER_URL}/api/`

  /**
   * Utility methos that check server status.
   *  
   * @returns {Promise<boolean>} - True if api is aviailable else false. 
   */
  public async checkStatus(): Promise<boolean> {
    try {
      const response: AxiosResponse<connectionAPI> = await axios.get(this.baseUrl + 'status')

      return response.data.connectionAPI === 1

    } catch (error) {
      console.log('error:', error)
      return false
    }
  }

  /**
   * Utility method that return data for the requested api call.
   *  
   * @param {string} apiPath - The API path.
   * 
   * @returns {Promise<GameEventAPI | undefined>} 
   * - If api is available return the method return the requested data for the game event. 
   */
  public async getGameEvents(apiPath: string): Promise<GameEventAPI | undefined> {
    try {
      const response: AxiosResponse<GameEventAPI> = await axios.get(this.baseUrl + apiPath)

      return response.data

    } catch (error) {
      console.log('error:', error)
    }
  }
}