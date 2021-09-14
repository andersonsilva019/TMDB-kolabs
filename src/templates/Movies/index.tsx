import { Movie, MovieProps } from "../../components/Movie";
import { BaseTemplate } from "../Base";

export type MoviesTemplateProps = {
  movies: MovieProps[]
}


export function Movies({ movies }: MoviesTemplateProps) {
  return (
    <BaseTemplate>
      {movies.map(movie => (
        <Movie {...movie} />
      ))}
    </BaseTemplate>
  )
}