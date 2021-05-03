import axios, { AxiosResponse } from 'axios'

const baseUrl: string = `${process.env.REACT_APP_SERVER_URL}/api/`
console.log(baseUrl)

export const getMultiQuestion = async(): Promise<AxiosResponse<GameEventAPI>> => {
  try {
    const questions : AxiosResponse<GameEventAPI> = await axios.get(baseUrl + 'trivia')

    return questions
  } catch (error)
  {
    throw new Error(error)    
  }    
}

export const getTrivia = async(): Promise<AxiosResponse<GameEventAPI>> => {  
  try {
    const questions : AxiosResponse<GameEventAPI> = await axios.get(baseUrl + 'back-to-back')

    return questions
  } catch (error)
  {
    throw new Error(error)    
  }    
}

export const getParty = async(): Promise<AxiosResponse<GameEventAPI>> => {
  try{
    const questions : AxiosResponse<GameEventAPI> = await axios.get(baseUrl + 'party')

    return questions
  } catch (error)
  {
    throw new Error(error)    
  }    
}