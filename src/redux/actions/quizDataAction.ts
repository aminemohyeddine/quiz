import { AllDataStructure } from "./../interfacesTypes/types";
import { dataConstants } from "./../constants/quizDataConst";
import { dataAction } from "./../interfacesTypes/types";
import { Dispatch } from "react";

export const addArticle = (allData: AllDataStructure[]) => {
  return (dispatch: Dispatch<dataAction>) => {
    dispatch({
      type: dataConstants.getAllData,
      payload: allData,
    });
  };
};
