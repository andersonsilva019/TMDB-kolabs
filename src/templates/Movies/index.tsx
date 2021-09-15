import { useEffect, useState } from 'react';
import { Movie, MovieProps } from "../../components/Movie";
import { BaseTemplate } from "../Base";

export type MoviesTemplateProps = {
  movies: MovieProps[]
}

type ResponseData = {
  results: Array<{
    id: number,
    poster_path: string
    title: string
    overview: string
    release_date: string
  }>
}

import * as S from './styles'


export function Movies({ movies }: MoviesTemplateProps) {

  const [currentPage, setCurrentPage] = useState(1)

  const [totalResults, setTotalResults] = useState<MovieProps[]>(movies)

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

  useEffect(() => {
    getMoviesByPage()
  }, [currentPage])

  const nextPage = () => {
    setCurrentPage(prev => prev + 1)
  }

  return (
    <BaseTemplate>
      {totalResults.map(movie => (
        <Movie {...movie} key={movie.id} />
      ))}
      <S.ShowMore onClick={nextPage}>
        Ver mais
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </S.ShowMore>
    </BaseTemplate>
  )
}