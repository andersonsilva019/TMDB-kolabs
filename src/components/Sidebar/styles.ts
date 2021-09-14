import styled, { css } from 'styled-components'

export const Container = styled.div`
  box-shadow: 0 2px 8px rgb(0, 0, 0, 0.1);
  background-color: #FFFFFF;
  max-width: 18rem;
  padding: 1rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  `

export const Header = styled.div`
  color: #FFF;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1rem;
  background-color: #01B4E4;
  max-width: 18rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  box-shadow: 0 2px 8px rgb(0, 0, 0, 0.1);
`

export const Quantity = styled.div`
  background-color: #eee;
  padding: 0.25rem 0.5rem;
  border-radius: 2rem;
`

type LinkProps = {
  active: boolean
}

const linkModifiers = {
  active: () => css`
    background-color: #eee;
    font-weight: bold;

    ${Quantity}{
      background-color: #FFF;
    }
  `
}

export const Link = styled.a<LinkProps>`
  ${({ active }) => css`

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0.5rem;
    cursor: pointer;
    border-radius: 0.5rem;
    
    &:hover {
      background-color: #eee;
    }
    
    ${active && linkModifiers.active()}
`}
`

export const Title = styled.span`
  font-weight: 500;
  color: #000;
  font-size: 1.125rem;
`

