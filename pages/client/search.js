import ClientSearchForm from "../../components/ClientSearchForm";
//import useCheckAccess from "../../components/hooks/useCheckAccess";
import Layout from "../../components/Layout";

export default function Search() {
  // const { authorized } = useCheckAccess();

  // if (!authorized) {
  //   return null;
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
