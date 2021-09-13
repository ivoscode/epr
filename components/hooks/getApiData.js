import axios from "axios";
import useAxiosCache from "./useAxiosCache";

const getApiData = (method, url, params) => {
  const { getCache, putCache } = useAxiosCache();

  if (params) {
    console.log(
      "%c params getApiData POST",
      "background: #8a2be2; color: #f0ffff",
      params
    );
  }
  //---------Logic for caching data------------
  const cachedData = getCache(url);
  if (cachedData) {
    console.log(
      `%c fetching cached data for ${url} `,
      "background: #2ce28a; color: #f0ffff"
    );

    return {
      then: (func) => {
        func(cachedData.data);
      },
    };
  }

  const user = sessionStorage.getItem("EprUser");
  const userToken = JSON.parse(user);
  if (!userToken?.token) {
    window.sessionStorage.clear();
    window.location.replace("/");
    return;
  }
  const headers = {
    "Content-Type": "application/json",
    Authorization: userToken.token,
  };
  //----------------GET-------------------
  if (method === `GET`) {
    // console.log(
    //   `%c fetching data for ${url} `,
    //   "background: #0000ff; color: #f0ffff"
    // );
    let promise = axios
      .get(`https://web2.ajbsoftware.co.uk:5000${url}`, {
        params: params,
        headers: headers,
      })

      .catch((e) => {
        console.log(e);
        switch (e.response.status) {
          case 401:
            console.log(
              `%c Error 401 ${url} `,
              "background: #dc143c; color: #f0ffff",
              e.response.data.Message
            );
            window.sessionStorage.clear();
            window.location.replace("/");
          case 500:
            console.log(
              `%c Internal server error 500 ${url} `,
              "background: #dc143c; color: #f0ffff",
              e.response.data.Message
            );

          default:
        }
      });

    promise.then((x) => putCache(x, url));

    return promise;
  }
  //----------------POST------------------------
  let promise = axios
    .post(
      `https://web2.ajbsoftware.co.uk:5000${url}`,
      { ...params },
      { headers }
    )
    .catch((e) => {
      switch (e.response.status) {
        case 500:
          console.log(
            `%c Internal server error 500 ${url} `,
            "background: #dc143c; color: #f0ffff",
            e.response.data.Message
          );

        default:
      }
    });
  promise.then((x) => putCache(x, url));
  return promise;
};
export default getApiData;
