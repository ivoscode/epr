import dynamic from "next/dynamic";
//import useCheckAccess from "../../../components/hooks/useCheckAccess";
import Layout from "../../../components/Layout";
const FormBuilder = dynamic(
  () => import("../../../components/UI/configuration/FormBuilder"),
  {
    ssr: false,
  }
);

export default function Builder() {
  //   const { authorized } = useCheckAccess();
  //   if (!authorized) return null;
  return (
    <Layout>
      <FormBuilder />
    </Layout>
  );
}
