import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/index";

//is doing 2 jobs, checking access and redirecting if needed

const useCheckAccess = () => {
  const [authorized, setAuthorized] = useState(false);
  const { state, dispatch } = useContext(Context);
  const router = useRouter();

  const route = encodeURIComponent(router.asPath);
  useEffect(() => {
    const user = localStorage.getItem("EprUser");
    const userToken = JSON.parse(user);
    const checkAccess = async () => {
      try {
        console.log(
          `%c checkAccesss checking route ${router.asPath}`,
          "background: #222; color: #bada55"
        );
        const response = await axios.get(
          `https://web2.ajbsoftware.co.uk:5000/api/session/check?url=${route}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: userToken.token,
            },
          }
        );
        //console.log("useCheckAccess navigation directions", response.data);

        if (response.status === 200) {
          setAuthorized(true);
          switch (response.data.missing) {
            case "client":
              localStorage.setItem(`search-back`, router.asPath);
              router.push("/client/search/");

            default:
          }
        }
      } catch (e) {
        console.log("useCheckAccess error", e.response);
        if (e.response.status === 401) {
          setAuthorized(false);
          dispatch({ type: "LOGOUT" });
        }
      }
    };
    checkAccess();
  }, []);

  return { authorized, route };
};
export default useCheckAccess;
