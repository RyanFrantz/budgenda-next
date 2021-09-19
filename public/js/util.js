// TODO: Move dateToTime() in here.

// Given a date string, parse it, and return a simpler datetime string like
// 2021-08-30 07:42:19
function simpleDatetime(date) {
  let d = new Date(Date.parse(date))
  let year = d.getFullYear();
  let month = prefix_zero(d.getMonth() + 1);
  let day = prefix_zero(d.getDate());
  let hours = prefix_zero(d.getHours());
  let minutes = prefix_zero(d.getMinutes());
  let seconds = prefix_zero(d.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
