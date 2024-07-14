import { StateProvider } from "@/context/StateContext";
import reducer, { initialState } from "@/context/StateReducers";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return(
  <StateProvider initialState={initialState} reducer={reducer}>
  {/* using the following head tag we changed the title from react to whatsapp */}
  <Head>
    <title>Whatsapp</title>
    <link rel="shortcut icon" href="/favicon.png" />
  </Head>
  <Component {...pageProps} />;
  </StateProvider>
  )
}
