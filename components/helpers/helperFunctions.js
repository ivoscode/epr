/////returns date only
export const formatDate = (data) => {
  const date = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(data));
  return date;
};
//////returns time and date
export const formatTime = (data) => {
  const time = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(data));

  return time;
};

//////
export const calcAge = (date) => {
  const parts = date.split("T")[0];
  const parts2 = parts.split("-");
  var year = Number(parts2[0]);
  var month = Number(parts2[1] - 1);
  var day = Number(parts2[2]);
  var today = new Date();
  var age = today.getFullYear() - year;
  if (
    today.getMonth() < month ||
    (today.getMonth() == month && today.getDate() < day)
  ) {
    age--;
  }
  return age;
};

//////////
export const formatNhs = (n) => {
  const result = n.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
  return result;
};
////////////
export const formatName = (data) => {
  const result = `${data.last.toUpperCase()}, ${data.first} (${data.title})`;
  return result;
};
///////////checking local storage space/////////
export const sessionStorageSpace = function () {
  var data = "";

  console.log("Current session storage: ");

  for (var key in window.sessionStorage) {
    if (window.sessionStorage.hasOwnProperty(key)) {
      data += window.sessionStorage[key];
      console.log(
        key +
          " = " +
          ((window.sessionStorage[key].length * 16) / (8 * 1024)).toFixed(2) +
          " KB"
      );
    }
  }

  console.log(
    data
      ? "\n" +
          "Total space used: " +
          ((data.length * 16) / (8 * 1024)).toFixed(2) +
          " KB"
      : "Empty (0 KB)"
  );
  console.log(
    data
      ? "Approx. space remaining: " +
          (5120 - ((data.length * 16) / (8 * 1024)).toFixed(2)) +
          " KB"
      : "5 MB"
  );
};
