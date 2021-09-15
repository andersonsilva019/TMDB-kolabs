import * as S from './styles'

export type Crew = {
  id: number
  name: string
  job: string
}

export type MovieDetailsProps = {
  img: string
  title: string
  date: string
  genres: string[]
  sinopse: string
  crew: Crew[]
}

export function MovieDetails({
  title,
  img,
  sinopse,
  date,
  crew,
  genres
}: MovieDetailsProps) {

  const year = new Date(date)

  return (
    <S.Container>
      <S.BoxImage>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={title}
        />
      </S.BoxImage>
      <S.Content>
        <S.Title>{`${title} (${year.getFullYear()})`}</S.Title>
        <S.Genres>{genres?.join(', ')}</S.Genres>
        <strong>Sinopse</strong>
        <S.Sinopse>{sinopse}</S.Sinopse>
        <S.Grid>
          {crew?.slice(0, 6).map((item) => (
            <S.Box key={item.id}>
              <S.Label>{item.name}</S.Label>
              <S.Value>{item.job}</S.Value>
            </S.Box>
          ))}
        </S.Grid>
      </S.Content>
    </S.Container>
  )
}