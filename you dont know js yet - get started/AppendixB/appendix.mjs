import{ expect, expectObj } from "./assert.mjs";
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

/**
 * Practicing Closures
 */

function range(start, end) {
  if (end === null || end === undefined) {
    return function(end) {
      return getRange(start, end);
    }
  } else {
    return getRange(start, end);
  }
  
}

function getRange(start, end) {
  if (start > end) {
    return [];
  } else {
    let res = [];
    for (let count = start; count <= end; count++) {
      res.push(count);
    }
    return res;
  }
}


expectObj(range(3,3), [3]);
expectObj(range(3,8), [3,4,5,6,7,8]);
expectObj(range(3,0), []);

var start3 = range(3);
var start4 = range(4);

expectObj(start3(3), [3]);
expectObj(start3(8), [3,4,5,6,7,8]);
expectObj(start3(0), []);
expectObj(start4(6), [4,5,6]);

/**
 * Practicing Prototype
 */

function randMax(max) {
  return Math.trunc(1E9 * Math.random()) % max;
}

var reel = {
  symbols: ["X","Y","Z","W","$","*","<","@"],
  spin() {
    if (this.position == null) {
      this.position = randMax(this.symbols.length - 1);
    }
    this.position = (this.position + 100 + randMax(100) ) % this.symbols.length;
  },
  display() {
    if (this.position == null) {
      this.position = randMax(this.symbols.length - 1);
    }
    return this.symbols[this.position];
  }
};

var slotMachine = {
  reels: [
    Object.create(reel),
    Object.create(reel),
    Object.create(reel)
  ],
  spin() {
    this.reels.forEach(function spinReel(reel) {
      reel.spin();
    });
  },
  display() {
    let row = [[], [], []];
    
    //Modular arithmetic
    this.reels.forEach((reel, index) => {
      const pos = reel.position - 1;
      reel.position = this.getSidePosition(pos);
      row[index].push(reel.display());
      reel.position = this.getSidePosition(pos + 1);
      row[index].push(reel.display());
      reel.position = this.getSidePosition(pos + 2);
      row[index].push(reel.display());
      
    });
    for(let index = 0; index < 3; index ++) {
      console.log(`${row[index][0]} | ${row[index][1]} | ${row[index][2]}`);
    }
  },
  getSidePosition(pos) {
    const simbols = 8;
    return (pos % simbols + simbols) % simbols;
  }
};

slotMachine.spin();
slotMachine.display();