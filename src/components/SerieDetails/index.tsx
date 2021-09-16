import * as S from './styles'

export type Crew = {
  id: number
  name: string
  job: string
}

export type SerieDetailsProps = {
  img: string
  title: string
  date: string
  genres: string[]
  sinopse: string
  crew: Crew[]
  numberOfSeasons: number
}

export function SerieDetails({
  title,
  img,
  sinopse,
  date,
  crew,
  genres,
  numberOfSeasons
}: SerieDetailsProps) {

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
        <S.Title>
          {`${title} (${year.getFullYear()}) - ${numberOfSeasons} temporada${numberOfSeasons > 1 ? 's' : ''}`}
        </S.Title>
        <S.Genres>{genres?.join(', ')}</S.Genres>
        <strong>Sinopse</strong>
        <S.Sinopse>{sinopse}</S.Sinopse>
        <S.Grid>
          {crew?.map((item) => (
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