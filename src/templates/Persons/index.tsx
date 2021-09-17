import Head from 'next/head'
import { BaseTemplate } from "../Base";
import { Person, PersonProps } from "../../components/Person";

import * as S from './styles';

export type PersonsTemplateProps = {
  persons: PersonProps[]
}

export function Persons({ persons }: PersonsTemplateProps) {
  return (
    <>
      <Head>
        <title>TMDB | Pessoas famosas</title>
      </Head>
      <BaseTemplate>
        <S.Title>Pessoas famosas</S.Title>
        <S.Grid>
          {persons.map(person => (
            <Person key={person.id} {...person} />
          ))}
        </S.Grid>
      </BaseTemplate>
    </>
  )
}