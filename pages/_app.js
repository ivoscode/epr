import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
import Navbar from "../components/UI/navigation/navbar";
import { Provider } from "../context/index";
import "../node_modules/react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdn.form.io/formiojs/formio.full.min.css"
        ></link>
      </Head>
      <Provider>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
