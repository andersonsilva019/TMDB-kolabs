import styled, { css } from "styled-components";

type ModalProps = {
  isOpen: boolean
}

const modalModifiers = {
  open: () => css`
    opacity: 1;
  `,
  close: () => css`
    opacity: 0;
    pointer-events: none;
  `
}

export const Modal = styled.div<ModalProps>`
  ${({ isOpen }) => css`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    transition: opacity 0.2s ease-in-out;
    ${isOpen && modalModifiers.open()}
    ${!isOpen && modalModifiers.close()}
  `}
`
export const Close = styled.div`
  color: #FFF;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
  text-align: right;

  > svg {
    height: 2.5rem;
    width: 2.5rem;
  }
`
export const ContentModal = styled.div`
  max-width: 75rem;
  width: 100%;
  max-height: 50rem;
  z-index: 20;
  /* position: absolute; */
`