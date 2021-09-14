import * as S from './styles'

export type MovieProps = {
  img: string
  title: string
  description: string
  releaseDate: string
}

export function Movie({
  img,
  title,
  description,
  releaseDate
}: MovieProps) {
  return (
    <S.Container>
      <S.Image src={img} alt={title} />
      <S.Content>
        <S.Title>{title}</S.Title>
        <S.ReleaseDate>{releaseDate}</S.ReleaseDate>
        <S.Description>{description}</S.Description>
      </S.Content>
    </S.Container>
  )
}