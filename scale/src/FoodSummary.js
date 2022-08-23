import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

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
      setServingsValid(true)
    }else if(event.target.value == ''){
        setServings("")
        setServingsValid(false)
    }
  };

  const renderServingForm = () => {
    return (
      <Form onSubmit={(event)=>{event.preventDefault();}}>
        <FloatingLabel label={"servings"}>
          <Form.Control
            value={servings}
            placeholder="meow"
            type="number"
            onChange={(event) => {
              validateFormData(event);
            }}
          />
        </FloatingLabel>
      </Form>
    );
  };

  const stats = calculateSumPoints();
  return (
    <div>
      <h1>FoodSummary</h1>
      <p>sum: {stats.sumPoints.toFixed(2)}</p>
      <p>average points per gram: {(stats.sumPoints / stats.sumWeight).toFixed(2)}</p>
      <div>
        if this is {renderServingForm()} servings, each serving is{" "}
        {servingsValid ? (stats.sumPoints / parseInt(servings)).toFixed(2) : "[error]"}{" "}
        points
      </div>
    </div>
  );
};
