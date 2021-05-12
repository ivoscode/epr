import ClientSearchForm from "../components/client-search-form";
import NoServer from "../components/no-server";

export default function Home() {
  return (
    <div>
      <main className="bg-gray-100 p-10">
        <NoServer>
          <ClientSearchForm />
        </NoServer>
      </main>
    </div>
  );
}
