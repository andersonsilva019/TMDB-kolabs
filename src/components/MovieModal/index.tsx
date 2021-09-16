import { useEffect } from 'react'
import { useQueryMovieDetails } from '../../hooks/query/useQueryMovieDetails'
import { MovieDetails } from '../MovieDetails'

import BounceLoader from "react-spinners/BounceLoader";

import * as S from './styles'

type MovieModalProps = {
  movieId: number
  isOpenModal: boolean
  closeModal: () => void
}

export function MovieModal({
  closeModal,
  isOpenModal,
  movieId
}: MovieModalProps) {

  const { movieDetails, getDetails, isLoading } = useQueryMovieDetails(movieId)

  useEffect(() => {
    const handleKeyUp = ({ key }: KeyboardEvent) =>
      key === 'Escape' && closeModal()

    window.addEventListener('keyup', handleKeyUp)

    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [closeModal])


  useEffect(() => {
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
        {isLoading ? (
          <S.SpinnerBox>
            <BounceLoader color="#01B4E4" loading={isLoading} size={80} />
          </S.SpinnerBox>
        ) : (<MovieDetails {...movieDetails} />)}
      </S.ContentModal>
    </S.Modal>
  )
}