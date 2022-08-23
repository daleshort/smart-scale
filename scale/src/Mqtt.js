import React, { useEffect } from "react";
import mqtt from "precompiled-mqtt";

const mqttURL = process.env.REACT_APP_MQTT_URL;
const mqttPort = process.env.REACT_APP_MQTT_PORT;
const mqttPassword = process.env.REACT_APP_MQTT_PASSWORD;
const mqttUser = process.env.REACT_APP_MQTT_USER;

export default function Mqtt({ setMessage }) {
  useEffect(() => {
    const url = mqttURL.toString()+':'+mqttPort.toString()
    const client = mqtt.connect(url, {
      username: mqttUser,
      password: mqttPassword,
    });

    client.on("connect", () => {
      client.subscribe("scale");
      console.log("subscribed to scale message");
    });

    client.on("message", (topic, payload, packet) => {
      setMessage(payload.toString());
    });
  }, []);

  return <div>Mqtt</div>;
}
