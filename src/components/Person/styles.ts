import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  box-shadow: 0 2px 8px rgb(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  flex-direction: column;
`

export const BoxImage = styled.div`
  height: 15rem;
  /* max-width: 15rem; */
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
    width: 10rem;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
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

export const Name = styled.strong`
  margin-top: 1.5rem;
  font-size: 1.125rem;
  font-weight: 600;
`