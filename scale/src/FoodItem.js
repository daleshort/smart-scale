import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import ModalUpdate from "./ModalUpdate";
import { Typeahead } from "react-bootstrap-typeahead";
import { useFoodData } from "./context/FoodDataProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";

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
  created_by = null,
}) => {
  const { foodNames } = useFoodData();

  useEffect(() => {
    console.log("food name changed:", foodName);
  }, [foodName]);

  function foodNameForm() {
    return (
      <Form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Typeahead
          id={index}
          options={foodNames}
          allowNew
          newSelectionPrefix="Add a new food: "
          placeholder={"Add A Food"}
          onChange={(selection) => {
            console.log("selection", selection);
            if (selection.length == 0) {
              console.log("array is empty");
              changeCallback(index, "");
            } else {
              changeCallback(index, selection[0].label);
            }
          }}
        />
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
          variant="secondary"
        >
          <div className="food-button-icon">
            <FontAwesomeIcon icon={solid("plus")} />
          </div>
        </Button>
      );
    }
  }

  function renderDeleteButton() {
    if (!isNew) {
      return (
        <Button
          variant="danger"
          onClick={() => {
            removeCallback(index);
          }}
        >
          <div className="food-button-icon">
            <FontAwesomeIcon icon={solid("delete-left")} />
          </div>
        </Button>
      );
    }
  }
  return (
    <div className="food-item-border-wrap">
      <div key={index} className="food-item-box">
        <div className="food-item-top-row">
          {foodNameForm()} {renderAddButton()} {renderDeleteButton()}
          <ModalUpdate
            foodName={foodName}
            id={id}
            pointsPerGram={pointsPerGram}
            created_by={created_by}
          />
        </div>
        : {foodWeight}g | points per gram:{" "}
        {pointsPerGram != null ? parseFloat(pointsPerGram.toFixed(4)) : "undef"}{" "}
        | total points:{" "}
        {pointsPerGram && foodWeight
          ? parseFloat((foodWeight * pointsPerGram).toFixed(2))
          : "undef"}
      </div>
    </div>
  );
};

export default FoodItem;
