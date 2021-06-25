import useCheckAccess from "../../components/hooks/useCheckAccess";
import Layout from "../../components/Layout";
import DemographicsContent from "../../components/UI/client/demographics/DemographicsContents";

export default function Demographics() {
  const { authorized } = useCheckAccess();

  if (!authorized) return null;
  return (
    <Layout>
      <DemographicsContent />
    </Layout>
  );
}
