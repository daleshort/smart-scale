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
              console.log("index", index);
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
        <button
          className="food-item-button"
          onClick={() => {
            console.log("index of add", index);
            addCallback(index);
          }}
          variant="secondary"
        >
          <div className="food-button-icon">
            <FontAwesomeIcon icon={solid("plus")} />
          </div>
        </button>
      );
    }
  }

  function renderDeleteButton() {
    if (!isNew) {
      return (
        <button
          className="food-item-button"
          variant="danger"
          onClick={() => {
            removeCallback(index);
          }}
        >
          <div className="food-button-icon">
            <FontAwesomeIcon icon={solid("delete-left")} />
          </div>
        </button>
      );
    }
  }
  return (
    <div className="food-item-border-wrap">
      <div key={index} className="food-item-box">
        <div className="food-item-top-row">
          {renderAddButton()} {renderDeleteButton()}
          <ModalUpdate
            foodName={foodName}
            id={id}
            pointsPerGram={pointsPerGram}
            created_by={created_by}
          />
          {foodNameForm()}
          <div className="food-item-data-box">
            <div className="data-icon">
              <FontAwesomeIcon icon={solid("scale-balanced")} />
            </div>
            <text className="data-text">{foodWeight}g</text>
          </div>
          <div className="food-item-data-box">
            <div className="data-icon">
              <FontAwesomeIcon icon={solid("utensils")} />
            </div>
            <text className="data-text">

                            {pointsPerGram && foodWeight !=null
          ? parseFloat((foodWeight * pointsPerGram).toFixed(2))
          : "?"}
            </text>
          </div>
          <div className="food-item-data-box">
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
            {pointsPerGram != null
                ? parseFloat(pointsPerGram.toFixed(4))
                : "?"}
            </text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
