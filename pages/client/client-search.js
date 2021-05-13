import ClientSearchForm from "../../components/ClientSearchForm";
import Layout from "../../components/layout";

export default function ClientSearch() {
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
