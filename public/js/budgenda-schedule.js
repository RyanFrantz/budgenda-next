/* Note to self: I'm focused on building agenda at the moment. Once a rough
 * cut of that support is ready, I'll want to add support for adding notes
 * to support tracking progress during a meeting. Notes will look similar to
 * agenda items but their markup will indicate the difference.
 */

// Prefix a number with 0 if it's less than 10.
function prefixZero(num) {
    return num < 10 ? `0${num}` : num;
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

function initializeDateAndTime() {
  const now = new Date();
  const agendaDate = document.querySelector("#agenda-date");
  agendaDate.value = getYmd(now);
  const agendaTime = document.querySelector("#agenda-time");
  agendaTime.value = getNiceTime(now);
}

