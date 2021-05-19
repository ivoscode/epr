import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useCheckAccess from "../../components/hooks/useCheckAccess";
import Layout from "../../components/Layout";

export default function Demographics() {
  const router = useRouter();
  const { authorized } = useCheckAccess();
  const [data, setData] = useState();

  console.log("authorization status inside demographics", authorized);

  useEffect(() => {
    if (authorized) {
      console.log("user authorized, fetching some data");

      // fetch goes here
      setData("when authorized goes fetch anp puts result here");
      console.log(data);
    } else {
      return <div>Access denied</div>;
    }
  }, [authorized]);

  return !data ? null : (
    <Layout>
      <div className="text-6xl m-40 bg-gray-200 text-blue-600 p-40">
        <div>Demographics page</div>
        <div>{`client ID ${router.query.clientid}`}</div>
        <div>{`rendering ${data}`}</div>
      </div>
    </Layout>
  );
}
