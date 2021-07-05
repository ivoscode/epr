//import useCheckAccess from "../../../../components/hooks/useCheckAccess";
import Layout from "../../../components/Layout";
import MenusList from "../../../components/UI/configuration/menus/MenusList";

export default function List() {
  // const { authorized } = useCheckAccess();

  // if (!authorized) {
  //   return null;
  // }
  return (
    <Layout>
      <MenusList />
    </Layout>
  );
}
