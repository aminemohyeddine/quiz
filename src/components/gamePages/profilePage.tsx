import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImageSlider } from "./imageSlider";
import "./profilePage.css";

export const ProfilePage = () => {
  //getting the current User Data

  const [totalGames, setTotalGames] = useState<number>(0);
  const [lastGameDate, setLastGameDate] = useState<string>("");
  const [firstGameHour, setFirstGameHour] = useState<string>("");
  const [lastGameHour, setLastGameHour] = useState<string>("");
  const [firstGameDate, setFirstGameDate] = useState<string>("");
  const [neverPlayedCategory, setNeverPlayedCategory] = useState<string>("");
  const [mostPlayedCategory, setMostPlayedCategory] = useState<string>("");
  const [percentageOfRightAnswers, setPercentageOfRightAnswers] =
    useState<number>(0);
  const [name, setName] = useState("");
  const [isUser, setIsUser] = useState(false);
  const JWT_TOKEN: string | null = JSON.parse(
    localStorage.getItem("userToken") || "{}"
  );

  const getUserData = async () => {
    let percentage = 0;
    let pythonTimes = 0;
    let javascriptTimes = 0;

    const data = await axios.post("http://localhost:3001/posts", {
      token: JWT_TOKEN,
    });

    let firstPlayTime = data.data.firstGame.substring(11, 19);
    setFirstGameHour(firstPlayTime);

    let lastPlayTime = data.data.lastGame.substring(11, 19);
    setLastGameHour(lastPlayTime);

    let firstPlayDate = data.data.firstGame.substring(0, 10);
    setFirstGameDate(firstPlayDate);

    let lastPlayDate = data.data.lastGame.substring(0, 10);
    setLastGameDate(lastPlayDate);

    data.data.allGames.forEach((a: any) => {
      if (a.categoryPlayed === "javascript") {
        javascriptTimes = javascriptTimes + 1;
      } else if (a.categoryPlayed === "python") {
        pythonTimes = pythonTimes + 1;
      }
      percentage = percentage + a.percOfGame;
      if (pythonTimes >= javascriptTimes) {
        setMostPlayedCategory("Python");
      } else {
        setMostPlayedCategory("JavaScript");
      }

      if (javascriptTimes === 0) {
        setNeverPlayedCategory("JavaScript");
      } else if (pythonTimes === 0) {
        setNeverPlayedCategory("Python");
      }
    });
    let realPercentage = percentage / data.data.allGames.length;
    let finalPercentage = parseInt(realPercentage.toFixed(2));
    setPercentageOfRightAnswers(finalPercentage);

    setTotalGames(data.data.allGames.length);
    setIsUser(true);
    setName(data.data.firstName);
  };

  useEffect(() => {
    getUserData();
  }, []);
  const [isCategory, setIsCategory] = useState(true);
  return (
    <div className="profilePageContainer">
      {name === undefined || name === "" ? (
        <div>loading...</div>
      ) : (
        <>
          {" "}
          <h1 className="welcomeMessage">welcome {name} !</h1>
          <div className="dataNewsContainer">
            <div className="dataButtonsContainer">
              <div className="dataContainer">
                <div className="dataMessage">your data :</div>
                <div className="gamesNumber">games : {totalGames}</div>
                <div className="profilePercentage">
                  percentage of correct values : {percentageOfRightAnswers}%
                </div>
                <div className="mostPlayedCategoryMessage">
                  you have played most of the times :
                  <span className="mostPlayedCategoryName">
                    {mostPlayedCategory}
                  </span>
                </div>
                <div className="neverPlayedCategoryMessage">
                  you can try this category for the first time :{" "}
                  <span className="neverPlayedCategoryName">
                    {neverPlayedCategory}
                  </span>
                </div>
                <div className="firstGame">
                  first Game Played :{firstGameDate} at {firstGameHour}
                </div>
                <div className="lastGame">
                  last Game Played :{lastGameDate} at {lastGameHour}
                </div>
              </div>
              <div className="categoriesMostPlayedContainer">
                <div className="buttonsContainer">
                  {isCategory ? (
                    <>
                      <div
                        className="categoriesButton active"
                        onClick={() => {
                          setIsCategory(true);
                        }}
                      >
                        Categories
                      </div>
                      <div
                        className="mostPlayedButton"
                        onClick={() => {
                          setIsCategory(false);
                        }}
                      >
                        MostPlayed
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="categoriesButton"
                        onClick={() => {
                          setIsCategory(true);
                        }}
                      >
                        Categories
                      </div>
                      <div
                        className="mostPlayedButton active"
                        onClick={() => {
                          setIsCategory(false);
                        }}
                      >
                        MostPlayed
                      </div>
                    </>
                  )}
                </div>
                {isCategory ? (
                  <>
                    <div className="contentContainer">
                      <ImageSlider />
                    </div>
                  </>
                ) : (
                  <div className="contentContainer">
                    most played category...
                  </div>
                )}
              </div>
            </div>

            <div className="news">News :</div>
          </div>{" "}
        </>
      )}
    </div>
  );
};
