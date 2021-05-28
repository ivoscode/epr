import useCheckAccess from "../../components/hooks/useCheckAccess";
import Layout from "../../components/Layout";

export default function Demographics() {
  const { authorized } = useCheckAccess();

  if (!authorized) return null;
  return (
    <Layout>
      <div>demographics</div>
    </Layout>
  );
}
