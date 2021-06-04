import useCheckAccess from "../../../components/hooks/useCheckAccess";
import Layout from "../../../components/Layout";
import DiaryContent from "../../../components/UI/hcp/appointments/DiaryContent";

export default function Diary() {
  const { authorized } = useCheckAccess();

  if (!authorized) return null;
  return (
    <Layout>
      <DiaryContent />
    </Layout>
  );
}
