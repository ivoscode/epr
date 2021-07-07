//import useCheckAccess from "../../../components/hooks/useCheckAccess";
import Layout from "../../../components/Layout";
import MenusBuilder from "../../../components/UI/configuration/menus/MenusBuilder";

export default function Builder() {
  //   const { authorized } = useCheckAccess();
  //   if (!authorized) return null;
  return (
    <Layout>
      <MenusBuilder />
    </Layout>
  );
}
