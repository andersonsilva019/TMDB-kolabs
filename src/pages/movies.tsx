import { GetStaticProps } from 'next'
import { Movies, MoviesTemplateProps } from '../templates/Movies'

type ResponseData = {
  results: Array<{
    id: number,
    poster_path: string
    title: string
    overview: string
    release_date: string
  }>
}

export default function Index(props: MoviesTemplateProps) {
  return <Movies {...props} />
}



export const getStaticProps: GetStaticProps<MoviesTemplateProps> = async () => {

  const language = 'pt-BR'

  const endpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=${language}`

  const response = await fetch(endpoint, { method: 'GET' })

  const data: ResponseData = await response.json()

  const movies = data.results.map((movie) => {
    return {
      id: movie.id,
      img: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      title: movie.title,
      description: movie.overview,
      releaseDate: movie.release_date
    }
  })

  return {
    props: {
      movies: movies
    }
  }
}