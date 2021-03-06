import useCheckAccess from "../../../components/hooks/useCheckAccess";
import Layout from "../../../components/Layout";
import FormsListContent from "../../../components/UI/client/forms/FormsListContent";

export default function FormsList() {
  const { authorized } = useCheckAccess();

  if (!authorized) {
    return null;
  }
  return (
    <Layout>
      <FormsListContent />
    </Layout>
  );
}
