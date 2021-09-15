import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react'

import { MovieProps } from '../components/Movie'

type ResponseData = {
  results: Array<{
    id: number,
    poster_path: string
    title: string
    overview: string
    release_date: string
  }>
}

type MovieContextProviderProps = {
  children: React.ReactNode
}

type MovieContextType = {
  totalResults: MovieProps[]
  setTotalResults: Dispatch<SetStateAction<MovieProps[]>>
  nextPage: () => void
}

export const MovieContext = createContext({} as MovieContextType)

export function MovieContextProvider({ children }: MovieContextProviderProps) {

  const [currentPage, setCurrentPage] = useState(1)

  const [totalResults, setTotalResults] = useState<MovieProps[]>()

  const getMoviesByPage = async () => {

    if (currentPage === 1) {
      return
    }

    const language = 'pt-BR'

    const endpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&page=${currentPage}`

    const response = await fetch(endpoint, { method: 'GET' })

    const data: ResponseData = await response.json()

    const results = data.results.map((movie) => {
      return {
        id: movie.id,
        img: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        title: movie.title,
        description: movie.overview,
        releaseDate: movie.release_date
      }
    })

    setTotalResults([...totalResults, ...results])
  }

  const nextPage = () => {
    setCurrentPage(prev => prev + 1)
  }

  useEffect(() => {
    getMoviesByPage()
  }, [currentPage])


  return (
    <MovieContext.Provider value={{ totalResults, setTotalResults, nextPage }}>
      {children}
    </MovieContext.Provider>
  )
}