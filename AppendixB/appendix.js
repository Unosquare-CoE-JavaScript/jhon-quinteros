/**
 * Practicing Comparisons
 */

const dayStart = "07:30";
const dayEnd = "17:45";

function scheduleMeeting(startTime, durationMinutes) {
  const startMeeting = +startTime.replace(":", ".");
  const dayStartTime = +dayStart.replace(":", ".");
  const dayEndtTime = +dayEnd.replace(":", ".");

  const endMeeting = addMinutes(startMeeting, durationMinutes);

  if (startMeeting < dayStartTime || endMeeting > dayEndtTime) {
    return false;
  }
  return true
}

function addMinutes(initialHour, durationMinutes) {
  const durationHours = Math.floor(durationMinutes / 60);
  const meetingMinutes = durationMinutes - (durationHours * 60);
  let endHour = initialHour + durationHours;
  const endMinutes = (endHour - Math.floor(endHour)) * 100;
  const totalMinutes = endMinutes + meetingMinutes;

  if(totalMinutes > 59) {
    endHour+=1;
    endHour = Math.floor(endHour) + (totalMinutes - 60) / 100;
  } else {
    endHour+= (meetingMinutes) / 100;
  }
  return endHour;
}

expect(scheduleMeeting("7:00",15), false);
expect(scheduleMeeting("07:15", 30), false);
expect(scheduleMeeting("7:30", 30), true); 
expect(scheduleMeeting("11:30", 60), true); 
expect(scheduleMeeting("17:00", 45), true); 
expect(scheduleMeeting("17:30", 30), false); 
expect(scheduleMeeting("18:00", 15), false);

function expect(value, expect) {
  if (value === expect) {
    console.log("\x1b[32m" , `Test passed: ${value}`);
  } else {
    console.log("\x1b[31m" , `Test failed: ${value}`);
  }
}