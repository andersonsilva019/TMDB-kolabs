import { AppProps } from 'next/app'
import { MovieContextProvider } from '../context/MovieContext'
import { PersonContexProvider } from '../context/PersonContext'
import { SerieContextProvider } from '../context/SerieContext'
import GlobalStyles from '../styles/globalStyles'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MovieContextProvider>
      <SerieContextProvider>
        <PersonContexProvider>
          <GlobalStyles />
          <Component {...pageProps} />
        </PersonContexProvider>
      </SerieContextProvider>
    </MovieContextProvider>
  )
}

export default MyApp
