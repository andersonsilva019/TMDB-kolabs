import { useEffect } from 'react'
import BounceLoader from "react-spinners/BounceLoader";
import { useQueryPersonDetails } from '../../hooks/query/useQueryPersonDetails';
import { PersonDetails } from '../PersonDetails'

import * as S from './styles'

type MovieModalProps = {
  personId: number
  isOpenModal: boolean
  closeModal: () => void
}

export function PersonModal({
  closeModal,
  isOpenModal,
  personId
}: MovieModalProps) {

  const { personDetails, getDetails, isLoading } = useQueryPersonDetails(personId)

  useEffect(() => {
    const handleKeyUp = ({ key }: KeyboardEvent) =>
      key === 'Escape' && closeModal()

    window.addEventListener('keyup', handleKeyUp)

    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [closeModal])


  useEffect(() => {
    isOpenModal && getDetails()
  }, [isOpenModal, personId])


  return (
    <S.Modal isOpen={isOpenModal} aria-label="modal" aria-hidden={!isOpenModal}>
      <S.Close
        role="button"
        onClick={closeModal}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </S.Close>

      <S.ContentModal>
        {isLoading ? (
          <S.SpinnerBox>
            <BounceLoader color="#01B4E4" loading={isLoading} size={80} />
          </S.SpinnerBox>
        ) : (<PersonDetails {...personDetails} />)}
      </S.ContentModal>
    </S.Modal>
  )
}