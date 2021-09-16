import { useCallback } from 'react'
import { createContext, useReducer } from 'react'
import { SerieProps } from '../components/Serie'

type ResponseData = {
  results: Array<{
    id: number,
    poster_path: string
    name: string
    overview: string
    first_air_date: string
  }>
}

type SerieContextProviderProps = {
  children: React.ReactNode
}

type SerieContextType = {
  series: SerieProps[]
  error: string
  isLoading: boolean
  getAllSeries: () => Promise<void>
}

const REQUEST_STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected'
} as const

type PayloadType = {
  error?: string
  series?: SerieProps[]
}

type ReducerStateType = {
  series: SerieProps[]
  isLoading: boolean;
  error?: string;
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
}

type ReducerActionType = {
  type: 'idle' | 'pending' | 'resolved' | 'rejected';
  payload?: PayloadType
}

const initialState: ReducerStateType = {
  isLoading: false,
  error: '',
  status: 'idle',
  series: []
}


function reducer(state: ReducerStateType, action: ReducerActionType) {
  switch (action.type) {
    case REQUEST_STATUS.PENDING: {
      return {
        ...state,
        isLoading: true,
        status: REQUEST_STATUS.PENDING
      };
    }
    case REQUEST_STATUS.RESOLVED: {
      return {
        ...state,
        isLoading: false,
        status: REQUEST_STATUS.RESOLVED,
        series: action.payload?.series
      };
    }
    case REQUEST_STATUS.REJECTED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload?.error,
        status: REQUEST_STATUS.REJECTED
      }
    }
    default:
      return state;

  }
}

export const SerieContext = createContext({} as SerieContextType)

export function SerieContextProvider({ children }: SerieContextProviderProps) {

  const [state, dispatch] = useReducer(reducer, initialState)

  const { isLoading, error, series } = state

  const getAllSeries = useCallback(async () => {
    try {
      const endpoint = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=pt-BR`

      dispatch({ type: REQUEST_STATUS.PENDING })

      const response = await fetch(endpoint, { method: 'GET' })

      const data: ResponseData = await response.json()

      const series = data.results.map((serie) => {
        return {
          id: serie.id,
          img: `https://image.tmdb.org/t/p/w500/${serie.poster_path}`,
          title: serie.name,
          description: serie.overview,
          firstAirDate: serie.first_air_date
        }
      })

      dispatch({ type: REQUEST_STATUS.RESOLVED, payload: { series } })
    } catch (error) {
      dispatch({
        type: REQUEST_STATUS.RESOLVED,
        payload: {
          error: 'Ocorreu um erro ao buscar as séries!'
        }
      })
    }
  }, [])

  return (
    <SerieContext.Provider value={{ error, isLoading, series, getAllSeries }}>
      {children}
    </SerieContext.Provider>
  )
}