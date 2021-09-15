import { useEffect, useState } from 'react'
import { MovieDetails, MovieDetailsProps } from '../MovieDetails'

import * as S from './styles'

type MovieModalProps = {
  movieId: number
  isOpenModal: boolean
  closeModal: () => void
}

export function MovieModal({ closeModal, isOpenModal, movieId }: MovieModalProps) {

  const [movieDetails, setMovieDetails] = useState<MovieDetailsProps>()

  useEffect(() => {
    const handleKeyUp = ({ key }: KeyboardEvent) =>
      key === 'Escape' && closeModal()

    window.addEventListener('keyup', handleKeyUp)

    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [closeModal])


  useEffect(() => {
    const getDetails = async () => {
      const [responseMovieDetails, responseMovieCredits] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=pt-BR`),
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=pt-BR`),
      ])

      const dataMovieDetails = await responseMovieDetails.json()
      const dataMovieCredits = await responseMovieCredits.json()

      let genresOfMovie = []

      for (let i in dataMovieDetails.genres) {
        genresOfMovie.push(dataMovieDetails.genres[i].name)
      }

      const movieInfo: MovieDetailsProps = {
        img: `https://image.tmdb.org/t/p/w500${dataMovieDetails.poster_path}`,
        date: dataMovieDetails.release_date,
        crew: dataMovieCredits.crew,
        genres: genresOfMovie,
        sinopse: dataMovieDetails.overview,
        title: dataMovieDetails.title
      }

      setMovieDetails(movieInfo)
    }

    isOpenModal && getDetails()
  }, [isOpenModal, movieId])


  return (
    <S.Modal isOpen={isOpenModal} aria-label="modal" aria-hidden={!isOpenModal}>
      <S.Close
        role="button"
        onClick={closeModal}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </S.Close>
      <S.ContentModal>
        <MovieDetails {...movieDetails} />
      </S.ContentModal>
    </S.Modal>
  )
}