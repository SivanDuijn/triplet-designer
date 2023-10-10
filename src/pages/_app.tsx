import { AppProps } from "next/app";
import React from "react";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import { GridProvider } from "src/lib/GridContext";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <GridProvider>
            <React.Fragment>
                <Component {...pageProps} />
                <Toaster />
            </React.Fragment>
        </GridProvider>
    );
}

export default MyApp;
