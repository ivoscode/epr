import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getApiData from "./getApiData";
//is doing 2 jobs, checking access and redirecting if needed

const useCheckAccess = () => {
  const [authorized, setAuthorized] = useState(false);

  const router = useRouter();

  const route = encodeURIComponent(router.asPath);
  useEffect(() => {
    console.log(
      `%c checkAccesss checking route ${router.asPath}`,
      "background: #222; color: #bada55"
    );

    getApiData("GET", `/api/session/check?url=${route}`).then((x) => {
      console.log(x);
      if (x?.status === 200) {
        setAuthorized(true);
        switch (x.data.missing) {
          case "client":
            sessionStorage.setItem(`search-back`, router.asPath);
            router.push("/client/search/");

          default:
        }
      }
    });
  }, []);

  return { authorized };
};
export default useCheckAccess;
