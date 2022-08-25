
/*
  Basic ESP8266 MQTT example
  This sketch demonstrates the capabilities of the pubsub library in combination
  with the ESP8266 board/library.
  It connects to an MQTT server then:
  - publishes "hello world" to the topic "outTopic" every two seconds
  - subscribes to the topic "inTopic", printing out any messages
    it receives. NB - it assumes the received payloads are strings not binary
  - If the first character of the topic "inTopic" is an 1, switch ON the ESP Led,
    else switch it off
  It will reconnect to the server if the connection is lost using a blocking
  reconnect function. See the 'mqtt_reconnect_nonblocking' example for how to
  achieve the same result without blocking the main loop.
  To install the ESP8266 board, (using Arduino 1.6.4+):
  - Add the following 3rd party board manager under "File -> Preferences -> Additional Boards Manager URLs":
       http://arduino.esp8266.com/stable/package_esp8266com_index.json
  - Open the "Tools -> Board -> Board Manager" and click install for the ESP8266"
  - Select your ESP8266 in "Tools -> Board"
*/

#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <string.h>
#include <Arduino.h>
#include<stdio.h>

#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <WebSerial.h>

#include "wifi_config.h"

// Update these with values suitable for your network.

AsyncWebServer server(80);
#define LED 2

#define generalUpdatePeriod 1000
unsigned long lastMsgGeneral = 0;

#define TOPIC "scale"

unsigned int incomingByte = 0; // for incoming serial data

char rec_bytes[20];
int rec_index = 0;

WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}


void callback(char* topic, byte * payload, unsigned int length) {

  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  // if ( strcmp(topic, FORCESOILUPDATETOPIC) == 0) {
  //   updateSoilMoisture();
  // }

}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str(), mqtt_user, mqtt_password)) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("outTopic", "hello world");
      // ... and resubscribe
      client.subscribe("inTopic");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {


  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  pinMode(LED, OUTPUT);
  digitalWrite(LED, LOW);

  Serial.begin(9600);

  Serial.swap();
}


void updateGeneral(void) {
  float trialNumber = 10.00;

  //client.publish(TOPIC, String(trialNumber).c_str());
  //Serial.println( String(trialNumber).c_str());

}


void loop() {

  if (!client.connected()) {
    reconnect();
    updateGeneral();
    Serial.swap();

    Serial.println("IP Address: ");
    Serial.println(WiFi.localIP());
    // WebSerial is accessible at "<IP Address>/webserial" in browser
   // WebSerial.begin(&server);
    //   WebSerial.msgCallback(recvMsg);
    server.begin();
    Serial.swap();

  }
  client.loop();
    while (Serial.available() > 0) {
      // read the incoming byte:
      //if the byte is a + and the index is not zero, set the index to zero
      if((Serial.peek() == '+' || Serial.peek() == '-') && rec_index !=0){
        rec_index = 0;
      }
      rec_bytes[rec_index] = Serial.read();
      rec_index++;

          if (rec_index >= 14) {

     //   delay(1000);
      //  WebSerial.println(intToAscii(rec_bytes[i]));
      //  client.publish(TOPIC, String(rec_bytes[i],DEC).c_str());
   //    client.publish(TOPIC, String(rec_bytes[i]).c_str());
    //   client.publish(TOPIC, String(rec_bytes[i],DEC).c_str());
     //  client.publish(TOPIC, String(rec_bytes[i],BIN).c_str());
       client.publish(TOPIC, String(rec_bytes).c_str());
     //  WebSerial.println(String(rec_bytes).c_str());
      
      rec_index = 0;
    }
  
    }
  







  unsigned long now = millis();
  if (now - lastMsgGeneral > generalUpdatePeriod) {
    lastMsgGeneral = now;
    updateGeneral();
    // WebSerial.println("Hello!");
  }

}

int intToAscii(int number) {
  return '0' + number;
}

void printBinary(byte inByte)
{
  for (int b = 7; b >= 0; b--)
  {
    WebSerial.print(bitRead(inByte, b));
  }
}

void recvMsg(uint8_t *data, size_t len) {
  WebSerial.println("Received Data...");
  String d = "";
  for (int i = 0; i < len; i++) {
    d += char(data[i]);
  }
  WebSerial.println(d);
  if (d == "ON") {
    digitalWrite(LED, LOW);
  }
  if (d == "OFF") {
    digitalWrite(LED, HIGH);
  }
}
