import Layout from "../../components/AppLayout";
import ClientSearchForm from "../../components/ClientSearchForm";
import useCheckAccess from "../../components/hooks/useCheckAccess";

export default function Search() {
  const { authorized } = useCheckAccess();
  // if (authorized) {
  //   console.log("all authorized, fetching some data");
  // } else {
  //   return <div>Access denied</div>;
  // }
  return (
    <Layout>
      <div>
        <main className="bg-gray-100 p-10">
          <ClientSearchForm />
        </main>
      </div>
    </Layout>
  );
}
