import React, { useContext, useState, useEffect } from "react";
import useAxiosAuth0 from "../hooks/useAxiosAuth0";
import { default as axiosPublic } from "../api/axios";
import { useAuth0 } from "@auth0/auth0-react";


const FoodDataContext = React.createContext();

export function useFoodData() {
  return useContext(FoodDataContext);
}

export default function FoodDataProvider({ children }) {
  //const [text, setText] = useState("meow");

  const { user, isAuthenticated } = useAuth0();
  const axios = useAxiosAuth0();

  const [foodData, setFoodData] = useState();
  const [foodNames, setFoodNames] = useState();
  const [isAdmin, setIsAdmin] = useState();

  const getServerData = async (useAuth = false) => {
    try {
      let response = null;
      if (useAuth) {
        console.log("using authenticated get");
        console.log("user sub", user.sub);

        response = await axios.get("/api/foodsUser/");
      } else {
        response = await axiosPublic.get("/api/foods/");
      }
      console.log("foods are:", response.data);
      setFoodData(response.data);

      
      setFoodNames(response.data.map( (food)=>{return {label: food.name} }) )
    } catch (error) {
      if (!error?.response) {
        console.error("no server response");
      } else {
        console.error("get food list failed");
      }
    }
  };

  const updateData = async (data, isAdmin) => {
    try {
      console.log("data to be update", data);
      if (data.id != null) {
        if (isAdmin) {
          data.created_by = "admin";
          const response = await axios.put(
            "/api/foodsAdmin/" + data.id.toString() + "/",
            data
          );
        } else {
          const response = await axios.put(
            "/api/foodsUser/" + data.id.toString() + "/",
            data
          );
        }
      } else {
        delete data.id;
        if (isAdmin) {
          data.created_by = "admin";
          const response = await axios.post("/api/foodsAdmin/", data);
        } else {
          const response = await axios.post("/api/foodsUser/", data);
        }
      }
      console.log("foods updated");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async (id, isAdmin) => {
    try {
      if (isAdmin) {
        const response = await axios.delete(
          "/api/foodsAdmin/" + id.toString() + "/"
        );
      } else {
        const response = await axios.delete(
          "/api/foodsUser/" + id.toString() + "/"
        );
      }
      console.log("food deleted");
    } catch (error) {
      console.error(error);
    }
  };

  const testToken = async () => {
    try {
      console.log("testing token");
      const response = await axios.get("/api/foodTest/");
      console.log(response);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("using authenticated food list");
      console.log("is authenticaed", isAuthenticated);
      getServerData(true);
      setIsAdmin(testToken());
    } else {
    console.log("getting no authentication list")
      getServerData(false);
    }
  }, [isAuthenticated]);

  return (
    <FoodDataContext.Provider value={ {foodData, updateData, getServerData, deleteData, isAdmin, foodNames }}>{children}</FoodDataContext.Provider>
  );
}
