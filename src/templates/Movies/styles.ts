import styled from 'styled-components'

export const ShowMore = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;

  border:0;
  background: none;

  color: #000;
  font-weight: bold;

  margin: 2rem auto 4rem;

  > svg {
    margin-top: 0.5rem;
    height: 1rem;
    width: 1rem;
  }

  transition: transform 0.2s ease-in;

  &:hover {
    transform: translateY(8px);
  }
  
`