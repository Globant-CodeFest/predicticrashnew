import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { withRouter } from 'next/router';

function App({ Component, pageProps, router }: AppProps) {

  

  return (
    <>
          <Component {...pageProps} />
    </>
  )
}

export default withRouter(App)