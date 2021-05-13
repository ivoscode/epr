import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import ClientSearchForm from "../../components/ClientSearchForm";
import Nav from "../../components/UI/Nav/Nav";
import { Context } from "../../context/index";

export default function ClientSearch() {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (state.username == null) {
      router.push("/");
    }
  }, [state.username]);
  return (
    <div>
      <Nav />
      <main className="bg-gray-100 p-10">
        <ClientSearchForm />
      </main>
    </div>
  );
}
