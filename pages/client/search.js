import useCheckAccess from "../../components/hooks/useCheckAccess";
import Layout from "../../components/Layout";
import SearchContent from "../../components/UI/client/search/SearchContent";
export default function Search() {
  const { authorized } = useCheckAccess();

  if (!authorized) {
    return null;
  }
  return (
    <Layout>
      <SearchContent />
    </Layout>
  );
}
