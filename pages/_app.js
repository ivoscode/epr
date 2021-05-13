import { Provider } from "../context/index";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
