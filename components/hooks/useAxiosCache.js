import addMinutes from "date-fns/addMinutes";
import format from "date-fns/format";
import isAfter from "date-fns/isAfter";
import parseISO from "date-fns/parseISO";
//import { sessionStorageSpace } from "../../components/helpers/helperFunctions";
export default function useAxiosCache() {
  const key = "AxiosCache";
  const cacheableUrls = [
    { url: "/api/clientdashboard/clientdetails/?clientid=41", expiry: 30 },
    { url: "/api/clientdashboard/tiles/", expiry: 30 },
  ];

  const getCache = (url) => {
    //return data only if cache  url is on the list and stored in the session already,
    // and if there is a cache  check if it is not expired
    if (cacheableUrls.filter((x) => x.url === url).length === 0) {
      return null;
    }

    const cache = JSON.parse(window.sessionStorage.getItem(key + "-" + url));
    if (!cache) {
      return;
    }

    const timeNow = format(new Date(), "yyyy-MM-dd'T'HH:mm");

    if (isAfter(parseISO(timeNow), parseISO(cache.expiry))) {
      console.log(
        `%c expired cache ${url} `,
        "background: #bdb76b; color: #000000"
      );
      return;
    }

    return cache;
  };
  ///-------------------------------------------------------

  const putCache = (response, url) => {
    const cacheableUrl = cacheableUrls.filter((x) => x.url === url);

    if (cacheableUrl.length === 1) {
      const cache = {
        data: response,
        expiry: format(
          addMinutes(new Date(), cacheableUrl[0].expiry),
          "yyyy-MM-dd'T'HH:mm"
        ), // time now + cacheableUrl.expiry
      };
      //sessionStorageSpace();
      sessionStorage.setItem(key + "-" + url, JSON.stringify(cache));
    }
  };
  return { getCache, putCache };
}
