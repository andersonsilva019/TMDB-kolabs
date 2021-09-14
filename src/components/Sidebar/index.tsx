import * as S from './styles'


export function Sidebar() {
  return (
    <>
      <S.Header>Realize sua busca</S.Header>
      <S.Container>
        <S.Link active={false}>
          <S.Title>Filmes</S.Title>
          <S.Quantity>20</S.Quantity>
        </S.Link>
        <S.Link active={false}>
          <S.Title>Séries</S.Title>
          <S.Quantity>20</S.Quantity>
        </S.Link>
        <S.Link active={false}>
          <S.Title>Pessoas</S.Title>
          <S.Quantity>20</S.Quantity>
        </S.Link>
      </S.Container>
    </>
  )
}