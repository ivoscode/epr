import axios from "axios";

const getAddressApi = (query) => {
  //----------------GET-------------------

  console.log(
    `%c fetching from getAddressAPI ${query} `,
    "background: #00bfff; color: #f0ffff"
  );
  let promise = axios
    .get(
      `https://api.getAddress.io/find/${query}?expand=true&api-key=NrUSiR1nP0yg7g5koLsu9g31721

`
    )
    .catch((e) => {
      console.log("Get Address API", e.response);
    });

  return promise;
};
export default getAddressApi;
