import styled from 'styled-components'

import * as WrapperStyles from '../../components/Wrapper'

export const Container = styled.main``

export const Content = styled.div`
  margin-top: 4rem;
`

export const SectionMain = styled.section`
  margin-top: 2rem;

  ${WrapperStyles.Wrapper}{
    display: grid;
    grid-template-columns: 18rem 1fr;
    gap: 2rem;
    align-items: flex-start;
  }
  
`