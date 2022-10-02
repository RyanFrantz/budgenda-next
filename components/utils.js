// Prefix a number with 0 if it's less than 10.
function prefixZero(num) {
    return num < 10 ? `0${num}` : num;
}

/*
 *  Given a date, return milliseconds since the epoch.
 * Sat Jul 17 2021 16:57:34 GMT-0400 (Eastern Daylight Time)
 * -to-
 *  1626555454000
 */
function epoch(date) {
  return Date.parse(date);
}

// Return the time in HH:MM format.
// If a Date argument is not present, finds the current date.
function getHhmm(date = new Date()) {
  const hour = prefixZero(date.getHours());
  const min  = prefixZero(date.getMinutes());
  return `${hour}:${min}`;
}

// Return a "nice" time. Nice is defined as the nearest half hour.
function getNiceTime(date = new Date()) {
  const increment = 1000 * 60 * 30; // 30-min increment
  const nearestHalfHour = new Date(Math.round(date.getTime() / increment) * increment);
  return getHhmm(nearestHalfHour);
}

// Return the date in YYYY-MM-DD format.
// If a Date argument is not present, finds the current date.
function getYmd(date = new Date()) {
  const year  = prefixZero(date.getFullYear());
  const month = prefixZero(date.getMonth() + 1);
  const day   = prefixZero(date.getDate());
  return `${year}-${month}-${day}`;
}

// Given a size value, return an array from 0 to that value.
// Useful for iterating with map(). Like when building time slots for agenda.
function range(size = 1) {
  return [...Array(size).keys()];
}

const addMinutes = (numMinutes, date = new Date()) => {
  // setMinutes returns ms since epoch; convert back to Date object.
  return new Date(date.setMinutes(date.getMinutes() + numMinutes));
};

export { getYmd, getNiceTime, range, addMinutes, getHhmm, epoch };
