import { AppProps } from 'next/app'
import { MovieContextProvider } from '../context/MovieContext'
import GlobalStyles from '../styles/globalStyles'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MovieContextProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </MovieContextProvider>
  )
}

export default MyApp
