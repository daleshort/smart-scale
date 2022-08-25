import React from "react";
import { useState, useEffect } from "react";
import FoodItem from "./FoodItem";
import { FoodSummary } from "./FoodSummary";
import MqttScale from "./MqttScale";
import {useFoodData} from "./context/FoodDataProvider" ;


function FoodScale() {
  const [foodList, setFoodList] = useState([
    { name: "", weight: null, isNew: true, id:null },
  ]);
  // const [foodList, setFoodList] = useState([
  //   { name: "apples", weight: 105 },
  //   { name: "chocolate", weight: 75 },
  //   { name: "", weight: null, isNew: true },
  // ]);

  const {foodData } = useFoodData();


  const [weight, setWeight] = useState(null);
  const [units, setUnits] = useState(null);

  useEffect(() => {
    setFoodList(
      foodList.map((item) => {
        if (item?.isNew == true) {
          item.weight = weight>=0?weight:0;
          
        }
        return item
      })
    );
  }, [weight]);

  const handleFoodChange = (id, value) => {
    updateFoodListById(id, value);
  };

  const updateFoodListById = (index, value) => {
    let updated_list = foodList.concat();
    updated_list[index].name = value;
    console.log("updated list in update:", updated_list)
    setFoodList(updated_list);
    
  };

  const matchFood = (name) => {
    if (foodData !=null){
    let foodMatch = foodData.find((element) => element.name == name);
    return [foodMatch?.id, foodMatch?.points_per_gram,foodMatch?.created_by ];
    }else{
        return [null,null,null]
    }
  };


const handleAddFood = (index) =>{
    let foodListCopy = foodList.concat()
    foodListCopy[index].isNew = false
    foodListCopy.push({ name: "", weight: null, id:null, isNew: true }
    )
    console.log("foodlist at end of add", foodListCopy)
    setFoodList(foodListCopy)
}

const handleRemove = (index) =>{
    let foodListCopy = foodList.concat()
    foodListCopy.splice(index,1)
    setFoodList(foodListCopy)
}
  return (
    <div className="flex-container">

      <div className="flex-item-side">
      <FoodSummary foodList={foodList} pointsPerGramList={foodList.map((food)=>matchFood(food.name)[1])}/>
      <MqttScale setWeight={setWeight} setUnits={setUnits} />
      </div>

      <div className="flex-item-main">
      {foodList.map((food, index) => {
        const [ id, pointsPerGram, created_by] = matchFood(food.name)
        return (
          <FoodItem
            foodName={food.name}
            foodWeight={food.weight}
            id = {id}
            pointsPerGram={pointsPerGram}
            index={index}
            changeCallback={handleFoodChange}
            isNew={food?.isNew}
            addCallback = {handleAddFood}
            removeCallback = {handleRemove}
            key={index}
            created_by = {created_by}
          />
        );
      })}
      </div>
    </div>
  );
}

export default FoodScale;
