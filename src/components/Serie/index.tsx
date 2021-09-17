import { useCallback, useState } from 'react'
import { formatDate } from '../../utils/formateDate'
import { SerieModal } from '../SerieModal'

import * as S from './styles'

export type SerieProps = {
  id: number
  img: string
  title: string
  description: string
  firstAirDate: string
}

export function Serie({
  id,
  img,
  title,
  description,
  firstAirDate
}: SerieProps) {

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
          <S.ReleaseDate>{formatDate(firstAirDate)}</S.ReleaseDate>
          <S.Description>{description}</S.Description>
        </S.Content>
      </S.Container >
      <SerieModal
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        serieId={id}
      />
    </>
  )
}