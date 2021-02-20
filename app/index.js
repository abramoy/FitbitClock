import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { HeartRateSensor } from "heart-rate"; // import HR reading from sensor (seel line 18)
import { BodyPresenceSensor } from "body-presence";
import { display } from "display";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
const heartRate = document.getElementById("heartRate");
const dateDisplay = document.getElementById("dateDisplay");

//The following block read the heart rate from your watch
const hrm = new HeartRateSensor();

hrm.onreading = function() {
  heartRate.text = `${hrm.heartRate}`; // the measured HR is being sent to the heartrateHandle set at line 16
}
display.addEventListener("change", () => {
    // Automatically stop the sensor when the screen is off to conserve battery
    console.log(display.on);
    if(!display.on){
      heartRate.text = "--";
    }
  display.on ? hrm.start() : hrm.stop();
  });
  hrm.start();
//Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let displayDate = today.toString().split(' ').slice(0, 4).join(' ');
  
  
  dateDisplay.text = `${displayDate}`;
  console.log(displayDate);
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
}
