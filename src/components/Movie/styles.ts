import styled from 'styled-components'

export const Container = styled.li`
  display: flex;
  box-shadow: 0 2px 8px rgb(0, 0, 0, 0.1);
  border-radius: 0.5rem;

  &:not(:last-child){
    margin-bottom: 1.5rem;
  }
`

export const Image = styled.img`
  height: 10rem;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
`

export const Content = styled.div`
  padding: 1rem;

  display: flex;
  flex-direction: column;
`

export const Title = styled.span`
  color: #000;
  font-weight: 700;
  font-size: 1.125rem;
`

export const ReleaseDate = styled.time`
  color: #999;
  font-weight: 600;
`

export const Description = styled.p`
  margin-top: 1.5rem;
  color: #000;
  font-weight: 400;

  display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`