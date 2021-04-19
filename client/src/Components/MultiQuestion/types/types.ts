export type Question = {
  category: string;
  question: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers: string[];
  type: string;
}
