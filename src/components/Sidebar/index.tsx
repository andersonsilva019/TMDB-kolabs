import { useRouter } from 'next/router'
import Link from 'next/link'
import { useMovies } from '../../hooks/useMovies'
import { useSeries } from '../../hooks/useSeries'
import * as S from './styles'
import { useContext } from 'react'
import { PersonContext } from '../../context/PersonContext'

export function Sidebar() {

  const { asPath } = useRouter()
  const { totalResultsPerson } = useContext(PersonContext)

  const { totalResults: totalResultsMovies } = useMovies()

  const { series } = useSeries()

  return (
    <div style={{ width: '100%' }}>
      <S.Header>Realize sua busca</S.Header>
      <S.Container>
        <Link href="/movies" passHref>
          <S.Link active={asPath === '/movies'}>
            <S.Title>Filmes</S.Title>
            {totalResultsMovies?.length > 0 && <S.Quantity>{totalResultsMovies.length}</S.Quantity>}
          </S.Link>
        </Link>

        <Link href="/series" passHref>
          <S.Link active={asPath === '/series'}>
            <S.Title>Séries</S.Title>
            {series.length > 0 && <S.Quantity>{series.length}</S.Quantity>}
          </S.Link>
        </Link>

        <Link href="/persons" passHref>
          <S.Link active={asPath === '/persons'}>
            <S.Title>Pessoas</S.Title>
            {totalResultsPerson && <S.Quantity>{totalResultsPerson}</S.Quantity>}
          </S.Link>
        </Link>

      </S.Container>
    </div>
  )
}