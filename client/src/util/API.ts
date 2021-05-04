import axios, { AxiosResponse } from 'axios'

export class API {

  private readonly baseUrl: string  = `${process.env.REACT_APP_SERVER_URL}/api/`

  public async getTrivia(): Promise<GameEventAPI | undefined> {
    try {
      const questions: AxiosResponse<GameEventAPI> = await axios.get(this.baseUrl + 'trivia')

      return questions.data
    
    } catch (error) {
      // throw new Error(error)
      console.log('error:', error)
    }    
  }

  public async getBackToBack(): Promise<GameEventAPI | undefined> {  
    try {
      const questions: AxiosResponse<GameEventAPI> = await axios.get(this.baseUrl + 'back-to-back')

      return questions.data
    
    } catch (error) {
      // throw new Error(error)
      console.log('error:', error)    
    }    
  }

  public async getParty(): Promise<GameEventAPI | undefined> {
    try{
      const questions: AxiosResponse<GameEventAPI> = await axios.get(this.baseUrl + 'party')

      return questions.data
    
    } catch (error) {
      // throw new Error(error)
      console.log('error:', error)    
    }    
  }
}