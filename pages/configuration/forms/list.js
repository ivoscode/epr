//import useCheckAccess from "../../../../components/hooks/useCheckAccess";
import Layout from "../../../components/Layout";
import FormsList from "../../../components/UI/configuration/FormsList";

export default function List() {
  // const { authorized } = useCheckAccess();

  // if (!authorized) {
  //   return null;
  // }
  return (
    <Layout>
      <FormsList />
    </Layout>
  );
}
