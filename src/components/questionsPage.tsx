import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { questions } from "./data";
import { getAllData } from "../redux/actions/quizDataAction";
import { useAppSelector } from "../redux/hooks";
import { AppDispatch, RootState } from "../redux/store";
import {
  AllDataStructure,
  AllQuestionsData,
} from "../redux/interfacesTypes/types";
import "./questionsPage.css";

interface Props {}

export const QuestionsPage: React.FC<Props> = () => {
  //states
  const [showRightAnswer, setShowRightAnswer] = useState(false);
  const [isRight, setIsRight] = useState<boolean>(false);
  const [wrongAnswer, setWrongAnswer] = useState<string>("");
  const [rightAnswer, setRightAnswer] = useState<string>("");
  const [totalTime, setTotalTime] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(30);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(1);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [buttonClassName, setButtonClassName] = useState<string>("");

  const timeCompleted = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(0);
      setShowScore(true);
    }
  };

  const answerHandler = (isCorrect: boolean) => {
    return (event: React.MouseEvent) => {
      if (isCorrect) {
        setScore(score + 1);
        setIsRight(true);
      } else {
        setIsRight(false);
      }
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setCurrentQuestion(0);
        setShowScore(true);
      }
      setSeconds(30);
    };
  };

  //timer
  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1000);
    return () => window.clearTimeout(timeoutID);
  }, [seconds]);

  //timeOut of question
  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      setSeconds(30);
      timeCompleted();
    }, 30000);
    return () => window.clearTimeout(timeoutID);
  }, [currentQuestion]);

  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      setTotalTime(totalTime + 1);
    }, 30000);
    return () => window.clearTimeout(timeoutID);
  }, [totalTime]);

  //isRightHandler useEffect
  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      setShowRightAnswer(true);
    }, 5000);
    return () => window.clearTimeout(timeoutID);
  }, [showRightAnswer]);

  return (
    <div>
      {showScore ? (
        <div className="scorePage">
          <div className="score">
            <h1 className="scoreText">your score is {score - 1}</h1>
          </div>
        </div>
      ) : (
        <>
          <div className="questionContainer">
            <div className="questions">
              <div className="question-section">
                <div className="question-count">
                  <div>Question {currentQuestion + 1}</div>
                </div>
                <h4 className="question-text">
                  00:{seconds}
                  <br></br>
                  {questions[currentQuestion].questionText}
                </h4>
              </div>
              <div className="answer-section">
                {questions[currentQuestion].answerOptions.map((answer) => (
                  <button
                    className="answersButton"
                    onClick={answerHandler(answer.isCorrect)}
                  >
                    {answer.answerText}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// {questions[currentQuestion].answerOptions.map((answer) =>
//   answer.isCorrect ? (
//     <button
//       className="answersButtonRight"
//       onClick={answerHandler(answer.isCorrect)}
//     >
//       {answer.answerText}
//     </button>
//   ) : (
//     <button
//       className="answersButtonWrong"
//       onClick={answerHandler(answer.isCorrect)}
//     >
//       {answer.answerText}
//     </button>
//   )
// )}