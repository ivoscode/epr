import AdminLayout from "../../components/AdminLayout";
import Layout from "../../components/AppLayout";

export default function Demographics() {
  return (
    <Layout>
      <AdminLayout>
        <div>
          <main className=" text-6xl m-40 bg-gray-200 text-blue-600 p-40">
            Demographics
          </main>
        </div>
      </AdminLayout>
    </Layout>
  );
}
