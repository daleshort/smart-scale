import React, { useState, useEffect } from "react";
import Mqtt from "./Mqtt";

function MqttScale({ setWeight, setUnits }) {
  const [message, setMessage] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    //  console.log("message rec:", message);
    // console.log("last message", lastMessage);
    if (message !== lastMessage) {
      //   console.log("message changed");
      getWeightFromMessage(message);
    }
    setLastMessage(message);
  }, [message]);

  const getWeightFromMessage = (mes) => {
    //  console.log("no units:", mes.slice(0, 9))
    //   console.log("units", mes.slice(9,-1).replace(/[^a-z0-9]/gi, ''))
    setWeight(parseFloat(mes.slice(0, 9).replace(/\s+/g, "")));
    setUnits(mes.slice(9, -1).replace(/[^a-z0-9]/gi, ""));
  };

  return (
    <>
      <Mqtt setMessage={setMessage} />{" "}
    </>
  );
}

export default MqttScale;
