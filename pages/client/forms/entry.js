import dynamic from "next/dynamic";
import useCheckAccess from "../../../components/hooks/useCheckAccess";
import Layout from "../../../components/Layout";
const FormsEntryContent = dynamic(
  () => import("../../../components/UI/client/forms/FormsEntryContent"),
  {
    ssr: false,
  }
);

export default function FormsEntry() {
  const { authorized } = useCheckAccess();

  if (!authorized) return null;
  return (
    <Layout>
      <FormsEntryContent />
    </Layout>
  );
}
