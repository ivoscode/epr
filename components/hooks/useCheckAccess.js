import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

//is doing 2 jobs, checking access and redirecting if needed

const useCheckAccess = () => {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const route = router.asPath;

  useEffect(() => {
    const user = localStorage.getItem("EprUser");
    const userToken = JSON.parse(user);
    const checkAccess = async () => {
      try {
        console.log("checkAccesss checking route", route);
        const response = await axios.get(
          `https://web2.ajbsoftware.co.uk:5000/api/session/check?url=${route}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: userToken.token,
            },
          }
        );
        console.log("useCheckAccess response", response);

        if (response.status === 200) {
          setAuthorized(true);
          switch (response.data.missing) {
            case "client":
              localStorage.setItem(`search-back`, router.pathname);
              router.push("/client/search/");
            // case "another":
            //   return router.push("/client/client-search");
            default:
            //setAuthorized(true);
          }
        }
      } catch (e) {
        console.log("useCheckAccess error", e.response);
      }
    };
    checkAccess();
  }, []);

  return { authorized, route };
};
export default useCheckAccess;