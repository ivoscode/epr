import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../components/UI/navigation/navbar";
import { Provider } from "../context/index";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
