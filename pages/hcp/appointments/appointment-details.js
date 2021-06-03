//import useCheckAccess from "../../../components/hooks/useCheckAccess";
import Layout from "../../../components/Layout";
import AppointmentDetailsContent from "../../../components/UI/hcp/appointments/AppointmentDetailsContent";

export default function AppointmentDetails() {
  // const { authorized } = useCheckAccess();

  //if (!authorized) return null;
  return (
    <Layout>
      <AppointmentDetailsContent />
    </Layout>
  );
}
