import styled from 'styled-components'

export const Container = styled.div`
  background-color: #FFF;
  padding: 1.5rem;
  border-radius: 0.5rem;

  display: flex;
  gap: 1.5rem;
`

export const BoxImage = styled.div`
  height: 20rem;
  max-width: 15rem;
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-size: 80rem 14rem;
  animation: placeholderShimmer 1s linear infinite forwards;
  img {
    width: 12rem;
    height: 100%;
    object-fit: cover;
  }
  @keyframes placeholderShimmer {
    0% {
      background-position: -40rem 0;
    }
    100% {
      background-position: 40rem 0;
    }
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > strong {
    font-size: 1.5rem;
    margin-top: 1.5rem;
  }
`

export const Title = styled.h3`
  font-size: 2rem;
  color: #000;
`

export const Biography = styled.p`
  font-size: 1rem;
  color: #777;
`