import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import Script from "next/script";
import Head from "next/head";
const gaTraceId = "G-0B04M0J7Z2";
function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <>
            <Script
                async
                id="google tag manager"
                src={`https://www.googletagmanager.com/gtag/js?id=${gaTraceId}`}
            ></Script>
            <Script id="google analytics">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gaTraceId}');
                `}
            </Script>
            <Head>
                <title>제 20대 대선 실시간 개표 현황</title>
            </Head>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </>
    );
}

export default MyApp;
