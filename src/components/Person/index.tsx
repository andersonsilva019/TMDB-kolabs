export type PersonProps = {
  id: number;
  name: string;
  img: string | null;
}

import { useCallback, useState } from 'react';
import { PersonModal } from '../PersonModal';
import * as S from './styles';

export function Person({ id, img, name }: PersonProps) {

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
        <S.BoxImage>
          {img !== null && <img src={`https://image.tmdb.org/t/p/w500${img}`} alt={name} />}
          {img === null && <img src='/no-image.png' alt={name} />}
        </S.BoxImage>
        <S.Name>{name}</S.Name>
      </S.Container>
      <PersonModal
        closeModal={closeModal}
        isOpenModal={isOpenModal}
        personId={id}
      />
    </>
  );
}