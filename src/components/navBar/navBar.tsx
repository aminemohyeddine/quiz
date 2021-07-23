import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./navBar.css";
interface Props {
  isMobile: boolean;
  isEditedClass: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<any>>;
  setIsEditedClass: React.Dispatch<React.SetStateAction<any>>;
}

export const NavBar: React.FC<Props> = ({
  isMobile,
  isEditedClass,
  setIsEditedClass,
}) => {
  const [name, setName] = useState("");
  const [isUser, setIsUser] = useState(false);
  const JWT_TOKEN: string | null = JSON.parse(
    localStorage.getItem("userToken") || "{}"
  );

  const getUserData = async () => {
    const data = await axios.post("http://localhost:3001/posts", {
      token: JWT_TOKEN,
    });
    console.log(data);
    setIsUser(true);
    setName(data.data.userName);
    console.log(name);
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {isMobile ? (
        <div className="navBar">
          <div className="logo">Fill Your Mind</div>

          <div className="navBarInfosMobile">
            <div
              onClick={() => {
                setIsEditedClass(!isEditedClass);
              }}
              className={`${isEditedClass ? "menuBtnOpen" : "menuBtn"}`}
            >
              <div className="menu-btn_burger"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="navBar">
          <div className="logo">Fill Your Mind</div>
          <div className="navBarInfos">
            {/* <Link className="navInfo rules" to="/rules">
              <p>How to play</p>
            </Link> */}

            <Link className="navInfo login" to="/login">
              <p>Login</p>
            </Link>

            <Link className="navInfo register" to="/register">
              <p>Register</p>
            </Link>

            {/* <Link className="navInfo contact" to="/contact">
              <p>Contact</p>
            </Link> */}
            <Link className="about" to="/about">
              <p>About</p>
            </Link>
            {isUser ? <div>{name}</div> : null}
          </div>
        </div>
      )}
    </>
  );
};
