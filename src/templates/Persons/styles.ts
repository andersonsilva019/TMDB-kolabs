import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 1rem;
  margin-bottom: 4rem;
`

export const Title = styled.h2`
  color: #000;
  margin-bottom: 1.5rem;
  font-size: 2rem;
`