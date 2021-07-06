export interface questionStructure {
  answerText: string;
  isCorrect: boolean;
}

export interface AllDataStructure {
  questionText: string;
  answerOptions: questionStructure[];
}

export interface AllQuestionsData {
  allQuestionsData: AllDataStructure[];
}

export type dataAction = {
  type: string;
  payload: AllDataStructure[];
};
