export interface questionStructure {
  answerText: string;
  isCorrect: boolean;
}

export interface AllDataStructure {
  questionText: string;
  answerOptions: questionStructure[];
}

export type dataAction = {
  type: string;
  payload: AllDataStructure[];
};
