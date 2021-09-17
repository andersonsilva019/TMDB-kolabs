import { GetStaticProps } from "next";
import { Persons, PersonsTemplateProps } from "../templates/Persons";

type ResponseData = {
  results: Array<{
    id: number
    name: string
    profile_path: string
  }>
}

export default function Index(props: PersonsTemplateProps) {
  return <Persons {...props} />
}

export const getStaticProps: GetStaticProps<PersonsTemplateProps> = async () => {

  const endpoint = `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_API_KEY}&language=pt-BR`

  const response = await fetch(endpoint, { method: 'GET' })

  const data: ResponseData = await response.json()

  const persons = data.results.map(person => ({
    id: person.id,
    name: person.name,
    img: person.profile_path
  }))
  return {
    props: {
      persons
    }
  }
}