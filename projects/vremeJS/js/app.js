// setting the date
let currentDate = new Date();	
document.getElementById("date").innerHTML = stringDate(currentDate);
 
function stringDate(currentDate) {
  let mm = currentDate.getMonth()+1;
      mm = (mm < 10 ? `0${mm}` : mm);
  let dd = currentDate.getDate();
      dd = (dd < 10 ? `0${dd}`: dd);
  let hh = currentDate.getHours();
      hh = (hh < 10 ? `0${hh}` : hh);
  let min = currentDate.getMinutes();
  min = (min < 10 ? `0${min}` : min);
  return `${hh}:${min} | ${dd}/${mm}/${currentDate.getFullYear()}`;
}