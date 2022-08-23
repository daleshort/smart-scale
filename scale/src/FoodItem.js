import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import ModalUpdate from "./ModalUpdate";

const FoodItem = ({
  foodName = "",
  foodWeight = 100,
  pointsPerGram = null,
  index = null,
  changeCallback = null,
  isNew = false,
  addCallback,
  removeCallback,
  id = null,
  updateCallback = null,
  created_by=null,
  isAdmin=false,
}) => {
  function foodNameForm() {
    return (
      <Form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <FloatingLabel label={foodName ? "Name" : "Add a food"}>
          <Form.Control
            value={foodName}
            placeholder="meow"
            onChange={(event) => {
              changeCallback(index, event.target.value);
            }}
          />
        </FloatingLabel>
      </Form>
    );
  }

  function renderAddButton() {
    if (isNew) {
      return (
        <Button
          onClick={() => {
            addCallback(index);
          }}
        >
          Add
        </Button>
      );
    }
  }

  function renderDeleteButton() {
    return (
      <Button
        variant="danger"
        onClick={() => {
          removeCallback(index);
        }}
      >
        Delete
      </Button>
    );
  }
  return (
    <ul key={index}>
      {foodNameForm()} {renderAddButton()} {renderDeleteButton()}{" "}
      <ModalUpdate
        foodName={foodName}
        id={id}
        pointsPerGram={pointsPerGram}
        updateCallback={updateCallback}
        created_by = {created_by}
        isAdmin = {isAdmin}
      />
      : {foodWeight}g | points per gram:{" "}
      {pointsPerGram != null ? parseFloat(pointsPerGram.toFixed(4)) : "undef"} |
      total points:{" "}
      {pointsPerGram && foodWeight
        ? parseFloat((foodWeight * pointsPerGram).toFixed(2))
        : "undef"}
    </ul>
  );
};

export default FoodItem;
