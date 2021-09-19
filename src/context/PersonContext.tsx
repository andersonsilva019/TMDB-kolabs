import { useCallback } from 'react'
import { Dispatch, SetStateAction, useState } from 'react'
import { createContext } from 'react'


type PersonContextType = {
  totalResultsPerson: number
  updateTotalResultsPerson: (length: number) => void
}

type PersonContexProvider = {
  children: React.ReactNode
}

export const PersonContext = createContext({} as PersonContextType)

export function PersonContexProvider({ children }: PersonContexProvider) {

  const [totalResultsPerson, setTotalResultsPerson] = useState(null)

  const updateTotalResultsPerson = useCallback((total: number) => {
    setTotalResultsPerson(total)
  }, [])

  return (
    <PersonContext.Provider value={{ totalResultsPerson, updateTotalResultsPerson }}>
      {children}
    </PersonContext.Provider>
  )
}