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
export const formatNhs = (num) => {
  //removes white space
  const n = num.replace(/\s/g, "");
  //formats
  const result = n.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
  return result;
};
////////////
export const formatName = (data) => {
  const result = `${data.last.toUpperCase()}, ${data.first} (${data.title})`;
  return result;
};
////Create GUID
export const generateGUID = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

////Default option text for a pick-list

export const getDefaultOption = () => {
  return {
    id: "",
    description: `Please Select`,
  };
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

///////validate NHS number/////////

export function isValidNhsNumber(num) {
  const txtNhsNumber = num?.replace(/\s/g, "");
  var isValid = false;

  if (txtNhsNumber?.length == 10) {
    var total = 0;

    var i = 0;
    for (i = 0; i <= 8; i++) {
      var digit = txtNhsNumber.substr(i, 1);
      var factor = 10 - i;
      total += digit * factor;
    }

    var checkDigit = 11 - (total % 11);

    if (checkDigit == 11) {
      checkDigit = 0;
    }

    if (checkDigit == txtNhsNumber.substr(9, 1)) {
      isValid = true;
    }
  }
  console.log("nhs number valid is", isValid);
  return isValid;
}
