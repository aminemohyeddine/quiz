import React, { useState } from "react";
import { questions } from ".././components/data";

interface Props {}

export const HomePage: React.FC<Props> = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(1);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [buttonClassName, setButtonClassName] = useState<string>("");
  const answerHandler = (isCorrect: boolean) => {
    return (event: React.MouseEvent) => {
      if (isCorrect) {
        setScore(score + 1);
        console.log(score + " correct");
      } else {
        console.log("wrong");
      }
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setCurrentQuestion(0);
        setShowScore(true);
      }
    };
  };
  return (
    <div>
      {showScore ? (
        <div className="scorePage">your score is {score - 1}</div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map((answer) => (
              <button onClick={answerHandler(answer.isCorrect)}>
                {answer.answerText}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
