import useCheckAccess from "../../components/hooks/useCheckAccess";
import Layout from "../../components/Layout";
import DashboardContent from "../../components/UI/client/dashboard/DashboardContent";
export default function Referrals() {
  const { authorized } = useCheckAccess();

  if (!authorized) return null;
  return (
    <Layout>
      <div>
        <DashboardContent />
      </div>
    </Layout>
  );
}
