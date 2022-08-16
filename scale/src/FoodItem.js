import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const FoodItem = ({
  foodName = "apples",
  foodWeight = 100,
  pointsPerGram = null,
  index = null,
  changeCallback = null,
}) => {
  function foodNameForm() {
    return (
      <Form>
        <FloatingLabel label="Name">
          <Form.Control
            value={foodName}
            onChange={(event) => {
              changeCallback(index,event.target.value );
            }}
          />
        </FloatingLabel>
      </Form>
    );
  }

  return (
    <ul key={index}>
      {foodNameForm()} : {foodWeight}g | points per gram: {pointsPerGram} | total points: {foodWeight * pointsPerGram}
    </ul>
  );
};

export default FoodItem;
