import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/AppLayout";
import useCheckAccess from "../../components/hooks/useCheckAccess";
import DashboardContent from "../../components/UI/dashboard/DashboardContent";

export default function Dashboard() {
  const router = useRouter();
  const { authorized } = useCheckAccess();
  const [data, setData] = useState("Initial state");

  console.log("authorization status inside dashboard", authorized);

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

  return (
    <Layout>
      <div className="">
        <div>{`client ID ${router.query.clientid}`}</div>
        <div>{`rendering ${data}`}</div>
        <DashboardContent />
      </div>
    </Layout>
  );
}
