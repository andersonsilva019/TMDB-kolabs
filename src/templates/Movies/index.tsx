import { useEffect } from 'react';
import { Movie, MovieProps } from "../../components/Movie";
import { useMovies } from '../../hooks/useMovies';
import { BaseTemplate } from "../Base";

export type MoviesTemplateProps = {
  movies: MovieProps[]
}

import * as S from './styles'

export function Movies({ movies }: MoviesTemplateProps) {

  const {
    setTotalResults,
    totalResults,
    nextPage
  } = useMovies()

  useEffect(() => {
    setTotalResults(movies)
  }, [])

  return (
    <BaseTemplate>
      {(totalResults || movies)?.map(movie => (
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