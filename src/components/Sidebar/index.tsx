import { useRouter } from 'next/router'
import Link from 'next/link'
import { useMovies } from '../../hooks/useMovies'
import { useSeries } from '../../hooks/useSeries'
import * as S from './styles'

export function Sidebar() {

  const { asPath } = useRouter()

  const { totalResults: totalResultMovies } = useMovies()

  const { series } = useSeries()

  return (
    <div style={{ width: '100%' }}>
      <S.Header>Realize sua busca</S.Header>
      <S.Container>
        <Link href="/movies" passHref>
          <S.Link active={asPath === '/movies'}>
            <S.Title>Filmes</S.Title>
            <S.Quantity>{totalResultMovies?.length ?? 0}</S.Quantity>
          </S.Link>
        </Link>

        <Link href="/series" passHref>
          <S.Link active={asPath === '/series'}>
            <S.Title>Séries</S.Title>
            <S.Quantity>{series.length ?? 0}</S.Quantity>
          </S.Link>
        </Link>

        <Link href="/persons" passHref>
          <S.Link active={asPath === '/persons'}>
            <S.Title>Pessoas</S.Title>
            <S.Quantity>20</S.Quantity>
          </S.Link>
        </Link>

      </S.Container>
    </div>
  )
}