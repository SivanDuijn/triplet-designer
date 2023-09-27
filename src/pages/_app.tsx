import { AppProps } from "next/app";
import React from "react";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import { GridProvider } from "src/lib/GridContext";
import { MouseProvider } from "src/lib/MouseContext";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <MouseProvider>
            <GridProvider>
                <React.Fragment>
                    <Component {...pageProps} />
                    <Toaster />
                </React.Fragment>
            </GridProvider>
        </MouseProvider>
    );
}

export default MyApp;
