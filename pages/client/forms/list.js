import useCheckAccess from "../../../components/hooks/useCheckAccess";
import Layout from "../../../components/Layout";
import ClientFormsList from "../../../components/UI/client/comp/ClientFormsList";

export default function List() {
  const { authorized } = useCheckAccess();

  if (!authorized) {
    return null;
  }
  return (
    <Layout>
      <div>
        <ClientFormsList />
      </div>
    </Layout>
  );
}
