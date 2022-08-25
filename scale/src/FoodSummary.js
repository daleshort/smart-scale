import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

export const FoodSummary = ({ foodList = [], pointsPerGramList = [] }) => {
  const [servings, setServings] = useState("1");
  const [servingsValid, setServingsValid] = useState(true);

  const calculateSumPoints = () => {
    let sumPoints = 0;
    let sumWeight = 0;
    foodList.map((food, index) => {
      if (pointsPerGramList[index] != undefined) {
        sumPoints += food.weight * pointsPerGramList[index];
        sumWeight += food.weight;
      }
    });
    //return sumPoints;
    return { sumPoints, sumWeight };
  };

  const validateFormData = (event) => {
    if (parseInt(event.target.value)) {
      setServings(parseInt(event.target.value).toString());
      setServingsValid(true);
    } else if (event.target.value == "") {
      setServings("");
      setServingsValid(false);
    }
  };

  const renderServingForm = () => {
    return (
      <Form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <FloatingLabel label={"Servings"} id="servings-floating">
          <Form.Control
            value={servings}
            placeholder="meow"
            type="number"
            onChange={(event) => {
              validateFormData(event);
            }}
            id="servings-control"
          />
        </FloatingLabel>
      </Form>
    );
  };

  const stats = calculateSumPoints();
  return [
    <div className="side-container">
      <div className="data-box-border-wrap">
      <div className="data-box">
        <div className="data-icon">
          <FontAwesomeIcon icon={solid("utensils")} />
        </div>
        <div className="data-text">{stats.sumPoints.toFixed(2)}</div>
      </div>
      </div>
      <div className="data-box-border-wrap">
      <div className="data-box">
        <div className="icon-group">
          <div className="data-icon">
            <FontAwesomeIcon icon={solid("utensils")} />
          </div>
          <text className="slash-icon">/</text>
          <div className="data-icon">
            <FontAwesomeIcon icon={solid("scale-balanced")} />
          </div>
        </div>
        <text className="data-text">
          {(stats.sumPoints / stats.sumWeight).toFixed(2)}
        </text>
      </div>
      </div>
    </div>,
    <div className="side-container">
      <div className="data-box-border-wrap">
      {renderServingForm()}
      </div>
      <div className="data-box-border-wrap">
      <div className="data-box">
        <div className="icon-group">
          <div className="data-icon">
            <FontAwesomeIcon icon={solid("utensils")} />
          </div>
          <text className="slash-icon">/</text>
          <div className="data-icon">
            <FontAwesomeIcon icon={solid("bowl-food")} />
          </div>
        </div>
        <div className="data-text">
          {servingsValid
            ? (stats.sumPoints / parseInt(servings)).toFixed(2)
            : "[error]"}
        </div>
      </div>
      </div>
    </div>,
  ];
};
