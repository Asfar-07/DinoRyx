// @ts-nocheck
function milliTOdate(milli) {
  let dateview;
  const date = new Date(milli);
  dateview =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return dateview;
}

function calculateAge(date) {
  const today = new Date();
  const birthDate = new Date(date);

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();


  if (days < 0) {
    months--;
    const previousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
    ).getDate();

    days += previousMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years > 0) {
    return years === 1 ? years + " Year" : years + " Years";
  }
  if (months > 0) {
    return months === 1 ? months + " Month" : months + " Months";
  } else {
    return days === 1 ? days + " Days" : days + " Day";
  }
}
export { milliTOdate, calculateAge };
