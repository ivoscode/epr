import useCheckAccess from "../../components/hooks/useCheckAccess";
import Layout from "../../components/Layout";
import DashboardContent from "../../components/UI/dashboard/DashboardContent";

export default function Dashboard() {
  const { authorized } = useCheckAccess();

  if (authorized === null) return null;
  return (
    <Layout>
      <div>
        <DashboardContent />
      </div>
    </Layout>
  );
}
