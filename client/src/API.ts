import axios, { AxiosResponse } from "axios"

const baseUrl: string = "http://localhost:4000/"

export const getTrivia = async(): Promise<AxiosResponse<ApiDataType>> => {
  
  try{
    const questions : AxiosResponse<ApiDataType> = await axios.get(baseUrl + 'trivia')

    return questions
  } catch (error)
  {
    throw new Error(error)    
  }    
}
