import React from "react";
import { useState } from "react";
import FoodItem from "./FoodItem";

function FoodScale() {
  const [foodList, setFoodList] = useState([
    { name: "apples", weight: 105 },
    { name: "chocolate", weight: 75 },
  ]);

  const [foodData, setFoodData] = useState([
    { name: "apples", pointsPerGram: 101 },
    { name: "chocolate", pointsPerGram: 71 },
  ]);

  const handleFoodChange = (id, value) => {
    // console.log("id changed", id);
    // console.log("value", value);
    updateFoodListById(id, value);
  };

  const updateFoodListById = (id, value) => {
    let updated_list = foodList.concat();
    updated_list[id].name = value;

    setFoodList(updated_list);
  };

  const lookupPointsPerGram = (name) => {
    let foodMatch = foodData.find((element) => element.name == name);
    return foodMatch?.pointsPerGram;
  };

  return (
    <div>
      <div>FoodScale</div>
      {foodList.map((food, index) => {
        return (
          <FoodItem
            foodName={food.name}
            foodWeight={food.weight}
            pointsPerGram={lookupPointsPerGram(food.name)}
            index={index}
            changeCallback={handleFoodChange}
          />
        );
      })}
    </div>
  );
}

export default FoodScale;
