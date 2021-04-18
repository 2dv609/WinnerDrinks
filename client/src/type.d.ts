interface IMyQuestion {
  _id: string
  question: string
  answer: string
  status: boolean
  createdAt?: string
  updatedAt?: string
}

interface QuestionProps {
  question: IMyQuestion
}

type ApiDataType = {
  message: string
  status: string
  questions: IMyQuestion[]
  question?: IMyQuestion
}
