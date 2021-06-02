import useCheckAccess from "../../../components/hooks/useCheckAccess";
import Layout from "../../../components/Layout";
import NotesListContent from "../../../components/UI/client/notes/NotesListContent";

export default function NotesList() {
  const { authorized } = useCheckAccess();

  if (!authorized) {
    return null;
  }
  return (
    <Layout>
      <NotesListContent />
    </Layout>
  );
}
