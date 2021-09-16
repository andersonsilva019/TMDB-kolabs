import { useCallback, useState } from 'react'
import { MovieModal } from '../MovieModal'
import * as S from './styles'

export type MovieProps = {
  id: number
  img: string
  title: string
  description: string
  releaseDate: string
}

export function Movie({
  id,
  img,
  title,
  description,
  releaseDate
}: MovieProps) {

  const [isOpenModal, setIsOpenModal] = useState(false)

  const openModal = useCallback(() => {
    setIsOpenModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpenModal(false)
  }, [])

  return (
    <>
      <S.Container onClick={openModal}>
        <S.Image src={img} alt={title} />
        <S.Content>
          <S.Title>{title}</S.Title>
          <S.ReleaseDate>{releaseDate}</S.ReleaseDate>
          <S.Description>{description}</S.Description>
        </S.Content>
      </S.Container >
      <MovieModal
        isOpenModal={isOpenModal}
        movieId={id}
        closeModal={closeModal}
      />
    </>
  )
}