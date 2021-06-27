import React from "react";

interface Props {
  buttonClassName: string;
  showScore: boolean;
  score: number;
  currentQuestion: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setButtonClassName: React.Dispatch<React.SetStateAction<string>>;
  setShowScore: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
}

export const QuestionPage: React.FC<Props> = ({
  buttonClassName,
  showScore,
  score,
  currentQuestion,
  setScore,
  setButtonClassName,
  setShowScore,
  setCurrentQuestion,
}) => {
  return <div></div>;
};
