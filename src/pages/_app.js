import '@/styles/globals.css'
import * as React from "react";
import SnackbarProvider from 'react-simple-snackbar'
// 1. import `NextUIProvider` component
import {NextUIProvider} from "@nextui-org/react";

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
       <SnackbarProvider>
        <Component {...pageProps} />
       </SnackbarProvider>
    </NextUIProvider>
  )
}
