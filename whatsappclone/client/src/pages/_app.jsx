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
  <Component {...pageProps} />
  </StateProvider>
  )
}


/*
This file is the entry point of the application. It wraps the entire app in the StateProvider component, ensuring that all components 
within the app have access to the global state and can dispatch actions to modify that state. The initialState and reducer from statereducers.js 
are passed to the StateProvider to initialize the state management.

The App component also sets up the HTML <head> tag, changing the title of the application to "Whatsapp" and including a favicon. 
This setup ensures that the necessary global styles (globals.css) are applied, and the specific page component (Component) along with its 
props (pageProps) are rendered within the state context.
*/