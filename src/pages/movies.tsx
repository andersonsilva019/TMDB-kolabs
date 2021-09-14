import { GetStaticProps } from 'next'
import { Movies, MoviesTemplateProps } from '../templates/Movies'

import mock from '../components/Movie/mock'

export default function Index(props: MoviesTemplateProps) {
  return <Movies {...props} />
}


export const getStaticProps: GetStaticProps<MoviesTemplateProps> = async () => {
  return {
    props: {
      movies: mock
    }
  }
}