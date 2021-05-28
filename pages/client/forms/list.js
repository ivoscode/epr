import useCheckAccess from "../../../components/hooks/useCheckAccess";
import Layout from "../../../components/Layout";
import ListContent from "../../../components/UI/client/forms/ListContent";

export default function List() {
  const { authorized } = useCheckAccess();

  if (!authorized) {
    return null;
  }
  return (
    <Layout>
      <ListContent />
    </Layout>
  );
}
