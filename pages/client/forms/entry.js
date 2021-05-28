import dynamic from "next/dynamic";
import useCheckAccess from "../../../components/hooks/useCheckAccess";
import Layout from "../../../components/Layout";
const EntryContent = dynamic(
  () => import("../../../components/UI/client/forms/EntryContent"),
  {
    ssr: false,
  }
);

export default function Entry() {
  const { authorized } = useCheckAccess();

  if (!authorized) return null;
  return (
    <Layout>
      <EntryContent />
    </Layout>
  );
}
