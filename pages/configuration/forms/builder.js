import dynamic from "next/dynamic";
//import useCheckAccess from "../../../components/hooks/useCheckAccess";
import Layout from "../../../components/Layout";
const FormsBuilder = dynamic(
  () => import("../../../components/UI/configuration/forms/FormsBuilder"),
  {
    ssr: false,
  }
);

export default function Builder() {
  //adad
  //   const { authorized } = useCheckAccess();
  //   if (!authorized) return null;
  return (
    <Layout>
      <FormsBuilder />
    </Layout>
  );
}
