import { Menu } from "../../components/Menu";
import { Sidebar } from "../../components/Sidebar";
import { Wrapper } from "../../components/Wrapper";

import * as S from './styles'

type BaseTemplateProps = {
  children: React.ReactNode
}

export function BaseTemplate({ children }: BaseTemplateProps) {
  return (
    <S.Container>
      <Menu />
      <S.SectionMain>
        <Wrapper>
          <Sidebar />
          <S.Content>{children}</S.Content>
        </Wrapper>
      </S.SectionMain>
    </S.Container>
  )
}