import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { questions } from ".././components/data";
import { getAllData } from "../redux/actions/quizDataAction";
import { useAppSelector } from "../redux/hooks";
import { AppDispatch, RootState } from "../redux/store";
import "./HomePage.css";

interface Props {}

export const HomePage: React.FC<Props> = () => {
  //states

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(1);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [buttonClassName, setButtonClassName] = useState<string>("");

  const useAppDispatch = () => useDispatch<AppDispatch>();
  const dispatch = useDispatch();
  const allData = useAppSelector((state) => state.getAllQuestionsReducer);

  // const count = useAppSelector((state) => state.getAllQuestionsReducer);

  const initializeState = () => {
    dispatch(getAllData(questions));
  };

  useEffect(() => {
    initializeState();
  }, []);

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
                  <h1>Question {currentQuestion + 1}</h1>
                </div>
                <h4 className="question-text">
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
          <button
            onClick={() => {
              console.log(allData);
            }}
            className="z"
          >
            hi
          </button>
        </>
      )}
    </div>
  );
};
