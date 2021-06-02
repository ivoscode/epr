//import useCheckAccess from "../../../components/hooks/useCheckAccess";
import Layout from "../../../components/Layout";
import NotesEntryContent from "../../../components/UI/client/notes/NotesEntryContent";

export default function NotesEntry() {
  // const { authorized } = useCheckAccess();

  //if (!authorized) return null;
  return (
    <Layout>
      <NotesEntryContent />
    </Layout>
  );
}
