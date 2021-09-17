export type PersonDetailsProps = {
  name: string;
  img: string | null;
  biography: string;
}

import * as S from './styles'

export function PersonDetails({ biography, img, name }: PersonDetailsProps) {
  return (
    <S.Container>
      <S.BoxImage>
        {/* eslint-disable-next-line */}
        {img !== null ? <img
          src={`https://image.tmdb.org/t/p/w500${img}`}
          alt={name}
        /> : <img src='/no-image.png' alt={name} />}
      </S.BoxImage>
      <S.Content>
        <S.Title>{name}</S.Title>
        <strong>Biografia</strong>
        <S.Biography>{biography}</S.Biography>
      </S.Content>
    </S.Container>
  )
}