import React from "react";
import mqtt from "precompiled-mqtt";

const mqttURL = "mqtt://test.mosquitto.org:1883";

//<Connector brokerUrl= options={{ username: "mqtt-user", password: "kittens" }}>

function CatchAll() {
  const client = mqtt.connect(mqttURL);
  //   const client = mqtt.connect(mqttURL, {
  //     username: "mqtt-user",
  //     password: "kittens",
  //   });

  client.on("connect", () => {
    console.log("CONNECTED to broker");
  });

  return <div>CatchAll</div>;
}

export default CatchAll;
