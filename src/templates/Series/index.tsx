import Head from 'next/head'
import { Serie, SerieProps } from "../../components/Serie";
import { useSeries } from "../../hooks/useSeries";
import { BaseTemplate } from "../Base";
import { SkeletronPage } from './SkeletronPage'

export type SeriesTemplateProps = {
  series: SerieProps[]
}

import * as S from './styles'

export function Series({ series }: SeriesTemplateProps) {

  const { isLoading } = useSeries()

  return (
    <>
      <Head>
        <title>TMDB | Séries Populares</title>
      </Head>
      <BaseTemplate>
        <S.Title>Séries Populares</S.Title>
        {
          isLoading
            ? (<SkeletronPage />)
            : series?.map(serie => (
              <Serie {...serie} key={serie.id} />
            ))
        }
      </BaseTemplate>
    </>
  )
}