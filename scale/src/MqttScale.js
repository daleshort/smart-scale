import React, { useState, useEffect } from "react";
import Mqtt from "./Mqtt";
import { useFoodData } from "./context/FoodDataProvider";

function MqttScale({ setWeight, setUnits }) {
  const [message, setMessage] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const{ isAdmin } = useFoodData();
  const [resolvedAdmin, setResolvedAdmin] = useState(null);
  const [myInterval, setMyInterval] = useState(null);


  useEffect(() => {

    if(resolvedAdmin){
    getWeightFromMessage(message);
    }
    console.log("message", message)

  }, [message]);

  const getWeightFromMessage = (mes) => {
    if (mes !== null) {
      //  console.log("no units:", mes.slice(0, 9))
      //   console.log("units", mes.slice(9,-1).replace(/[^a-z0-9]/gi, ''))
      setWeight(parseFloat(mes.slice(0, 9).replace(/\s+/g, "")));
      setUnits(mes.slice(9, -1).replace(/[^a-z0-9]/gi, ""));
    }
  };



  useEffect(()=>{
    const getResolvedAdmin = async () =>{
      const resolvedStatus = await isAdmin;
      console.log('resolved status', resolvedStatus);
      if(resolvedStatus == true){
      setResolvedAdmin(resolvedStatus);
      }else{
        setResolvedAdmin(false);
      }
    }
  
    getResolvedAdmin();
  },[isAdmin])

  useEffect(() => {
    clearInterval(myInterval);
    const newInterval = setInterval(()=>{
      if(resolvedAdmin==false){
       setWeight(Math.floor(Math.random() * 400));
      }

    }, 3000);
    setMyInterval(newInterval);

  }, [resolvedAdmin])
  
  

  return (
    <>
      <Mqtt setMessage={setMessage} />
    </>
  );
}

export default MqttScale;
