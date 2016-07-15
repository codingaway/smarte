/*This code receives data from 3 sensors, light, sound and
 * temperature. It is able to convert these values using a Python 
 * script through Serial.
 */


#include <Wire.h>
#include "rgb_lcd.h"

// give it a name:
int securityLED = 13;
int attendeeLED = 12;
int buttonState = 0;
int val = 0;

rgb_lcd lcd;

const int colorR = 100;
const int colorG = 0;
const int colorB = 100;

const int buttonPin = 3;

void setup()
{
  Serial.begin(9600);
  // initialize the digital pin as an input.
  pinMode(securityLED, OUTPUT);
  pinMode(attendeeLED, OUTPUT);
  pinMode(buttonPin, INPUT);

  // set up the LCDs number of columns and rows:
  lcd.begin(16, 2);
  lcd.setRGB(colorR, colorG, colorB);
  lcd.setCursor (0, 0);

}

// the loop routine runs over and over again forever:
void loop()
{
  int lightVal, soundVal, i;

  int val;
  int tempPin = 1;
  
  
  lightVal = analogRead(0); //connect grayscale sensor to Analog 0
  soundVal = analogRead(2);   //connect mic sensor to Analog 0
  buttonState = digitalRead(buttonPin); //read pushbutton value
  val = analogRead(tempPin);

  float mv = ( val / 1024.0) * 5000;
  float cel = (mv / 10) - 18; //tweaked
  
  val = buttonState;

  digitalWrite(securityLED, buttonState); //asign the same logic to the attendeeLED to connect them.

  int myArray[] = {lightVal, soundVal, cel};

  if ( buttonState == HIGH)
  {
    lcd.print( "Security Placed" );
    delay(700);
    digitalWrite(attendeeLED, val);
  }
  else
  {
    lcd.print( "Security Moving" );
    digitalWrite(attendeeLED, val);
    delay(700);

    for (i = 0; i < sizeof(myArray) / sizeof(int) ; i ++ )
    {
      Serial.print( myArray[i] );
      Serial.print(" ");
    }
    Serial.println();
  }
  lcd.clear();
}




