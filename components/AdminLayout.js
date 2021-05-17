import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function AdminLayout(props) {
  const router = useRouter();
  const route = router.asPath;

  useEffect(() => {
    console.log("admin layout running to route", route);
    const user = localStorage.getItem("EprUser");
    const userToken = JSON.parse(user);
    const checkAccess = async () => {
      try {
        console.log(route);
        const response = await axios.get(
          `https://web2.ajbsoftware.co.uk:5000/api/session/check?url=${route}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: userToken.token,
            },
          }
        );
        console.log("admin layout response", response);
        if (response.status === 200) {
          switch (response.data.missing) {
            case "client":
              return router.push("/client/search/");
            // case "another":
            //   return router.push("/client/client-search");
            default:
              return;
          }
        }
      } catch (e) {
        console.log("admin layout error", e.response);
      }
    };
    checkAccess();
  }, []);

  return <>{props.children}</>;
}
