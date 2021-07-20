import React from "react";
import "./leftBar.css";
import { Link } from "react-router-dom";

interface Props {
  isEditedClass: boolean;
  setIsEditedClass: React.Dispatch<React.SetStateAction<any>>;
}
export const LeftBar: React.FC<Props> = ({
  isEditedClass,
  setIsEditedClass,
}) => {
  return (
    <>
      {isEditedClass ? (
        <div className="sideBarContainer">
          <div className="sideBarInfos">
            <Link
              onClick={() => {
                setIsEditedClass(false);
              }}
              className="sideBar rules"
              to="/rules"
            >
              <p>How to play</p>
            </Link>

            <Link
              onClick={() => {
                setIsEditedClass(false);
              }}
              className="sideBar login"
              to="/login"
            >
              <p>Login</p>
            </Link>

            <Link
              onClick={() => {
                setIsEditedClass(false);
              }}
              className="sideBar register"
              to="/register"
            >
              <p>Register</p>
            </Link>

            <Link
              onClick={() => {
                setIsEditedClass(false);
              }}
              className="sideBar contact"
              to="/contact"
            >
              <p>Contact</p>
            </Link>
            <Link
              onClick={() => {
                setIsEditedClass(false);
              }}
              className="sideBar aabout"
              to="/about"
            >
              <p>About</p>
            </Link>
          </div>
        </div>
      ) : null}{" "}
    </>
  );
};
