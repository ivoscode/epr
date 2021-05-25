//import useCheckAccess from "../../components/hooks/useCheckAccess";
//import Layout from "../../components/Layout";
import dynamic from "next/dynamic";
const Formio = dynamic(() => import("../../components/UI/forms/Formio"), {
  ssr: false,
});

export default function Forms() {
  //const { authorized } = useCheckAccess();

  //if (!authorized) return null;
  return (
    <div className="m-20">
      <div>
        <Formio />
      </div>
    </div>
  );
}
