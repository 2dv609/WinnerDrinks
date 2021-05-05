import axios, { AxiosResponse } from 'axios'
import IUtilService from './IUtilService'

export default class API implements IUtilService {

  private readonly baseUrl: string = `${process.env.REACT_APP_SERVER_URL}/api/`

  public async checkStatus(): Promise<any> {
    try {
      const response: AxiosResponse<connectionAPI> = await axios.get(this.baseUrl + 'status')

      return response.data.connectionAPI === 1

    } catch (error) {
      console.log('error:', error)
      return false
    }
  }

  public async getTrivia(): Promise<GameEventAPI | undefined> {
    try {
      const response: AxiosResponse<GameEventAPI> = await axios.get(this.baseUrl + 'trivia')

      return response.data

    } catch (error) {
      console.log('error:', error)
    }
  }

  public async getBackToBack(): Promise<GameEventAPI | undefined> {
    try {
      const response: AxiosResponse<GameEventAPI> = await axios.get(this.baseUrl + 'back-to-back')

      return response.data

    } catch (error) {
      console.log('error:', error)
    }
  }

  public async getParty(): Promise<GameEventAPI | undefined> {
    try {
      const response: AxiosResponse<GameEventAPI> = await axios.get(this.baseUrl + 'party')

      return response.data

    } catch (error) {
      console.log('error:', error)
    }
  }
}