import dynamic from "next/dynamic";

const AdmissionsForm = dynamic(
  () =>
    import(
      "../../../../components/UI/hcp/bed-manager/admissions/AdmissionsForm"
    ),
  {
    ssr: false,
  }
);
export default function Admissions() {
  return <AdmissionsForm />;
}
