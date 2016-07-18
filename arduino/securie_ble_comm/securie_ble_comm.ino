#include <CurieBLE.h>

BLEPeripheral blePeripheral;
BLEService securieService("677dea24-7cb7-4410-90ac-ce70949e4951");

// Securie Characteristics - used custom 128-bit UUID
BLEUnsignedCharCharacteristic lightCharacteristic("ec0b987c-b977-40a8-9159-2f8ad07bdbb9", BLERead);
BLEUnsignedCharCharacteristic tempCharacteristic("1daac66b-b7f8-4b16-af70-6d9a9430a2da", BLERead);
BLEUnsignedCharCharacteristic soundCharacteristic("81b1d2c9-b75d-427c-bd35-24f63e618685", BLERead);

/* Analog sensors input pins */
const int aPinLight = 0;
const int aPinTemp = 1;
const int aPinSound = 2;


void setup() {
  Serial.begin(9600);

  // set advertised local name and service UUID:
  blePeripheral.setLocalName("Sec01");
  blePeripheral.setAdvertisedServiceUuid(securieService.uuid());

  // add service and characteristics:
  blePeripheral.addAttribute(securieService);
  blePeripheral.addAttribute(lightCharacteristic);
  blePeripheral.addAttribute(tempCharacteristic);
  blePeripheral.addAttribute(soundCharacteristic);

  // begin advertising BLE service:
  blePeripheral.begin();

  Serial.println("BLE Securie Peripheral");
}

void loop() {
  // listen for BLE peripherals to connect:
  BLECentral central = blePeripheral.central();

  // if a central is connected to peripheral:
  if (central) {
    Serial.print("Connected to central: ");
    // print the central's MAC address:
    Serial.println(central.address());
    
    // Only update values while the central is still connected
    while (central.connected()) {
        //update values from sensors
        lightCharacteristic.setValue(analogRead(aPinLight));
        tempCharacteristic.setValue(analogRead(aPinTemp));
        soundCharacteristic.setValue(analogRead(aPinSound));

        delay(500);
    }

    // when the central disconnects, print it out:
    Serial.print(F("Disconnected from central: "));
    Serial.println(central.address());
  }
}
