import styled from 'styled-components'

export const Skeletron = styled.div`

  &:not(:last-child){
    margin-bottom: 2rem;
  }

  background: #f6f7f8;
  border-radius: 0.5rem;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  animation: placeholderShimmer 1s linear infinite forwards;
  @keyframes placeholderShimmer {
    0% {
      background-position: -40rem 0;
    }
    100% {
      background-position: 40rem 0;
    }
  }
`

export const Title = styled.h2`
  color: #000;
  margin-bottom: 1.5rem;
  font-size: 2rem;
`