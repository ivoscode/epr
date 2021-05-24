import useCheckAccess from "../../components/hooks/useCheckAccess";
import Layout from "../../components/Layout";

export default function Referrals() {
  const { authorized } = useCheckAccess();

  if (!authorized) return null;
  return (
    <Layout>
      <div>
        <div>Referrals</div>
      </div>
    </Layout>
  );
}
