import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "../store/store";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* <MantineProvider> */}
    
        <Component {...pageProps} />
      {/* </MantineProvider> */}
     </Provider>
  );
}
