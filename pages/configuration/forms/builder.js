import dynamic from "next/dynamic";
//import useCheckAccess from "../../../components/hooks/useCheckAccess";
import Layout from "../../../components/Layout";
const FormsBuilder = dynamic(
  () => import("../../../components/UI/configuration/FormsBuilder"),
  {
    ssr: false,
  }
);

export default function Builder() {
  //   const { authorized } = useCheckAccess();
  //   if (!authorized) return null;
  return (
    <Layout>
      <FormsBuilder />
    </Layout>
  );
}
