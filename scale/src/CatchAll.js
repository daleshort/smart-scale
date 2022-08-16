import React, { useState, useEffect } from "react";
import MqttScale from "./MqttScale";


function CatchAll() {

  const [weight, setWeight] = useState(null);
  const [units, setUnits] = useState(null);

  

  useEffect(() => {
    console.log("weight:" ,weight);
    console.log("units:" ,units);
  }, [weight]);

  return (
    <div>
      CatchAll <MqttScale setWeight={setWeight} setUnits = {setUnits}/>
    </div>
  );
}

export default CatchAll;
