import { AppProps } from 'next/app'
import { MovieContextProvider } from '../context/MovieContext'
import { SerieContextProvider } from '../context/SerieContext'
import GlobalStyles from '../styles/globalStyles'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MovieContextProvider>
      <SerieContextProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </SerieContextProvider>
    </MovieContextProvider>
  )
}

export default MyApp
