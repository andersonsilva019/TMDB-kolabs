import { useReducer } from "react";
import { SerieProps } from "../../components/Serie";

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

const initalState: ReducerStateType = {
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

export function useQueryAllSeries() {

  const [state, dispatch] = useReducer(reducer, initalState)

  const { isLoading, error, status, series } = state


  const getAllSeries = async () => {
    try {
      const endpoint = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=pt-BR`

      dispatch({ type: REQUEST_STATUS.PENDING })

      const response = await fetch(endpoint, { method: 'GET' })

      const data = await response.json()

      const movies = data.results.map((movie) => {
        return {
          id: movie.id,
          img: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          title: movie.name,
          description: movie.overview,
          releaseDate: movie.first_air_date
        }
      })

      dispatch({ type: REQUEST_STATUS.RESOLVED, payload: { series: movies } })
    } catch (error) {
      dispatch({
        type: REQUEST_STATUS.RESOLVED,
        payload: {
          error: 'Ocorreu um erro ao buscar as séries!'
        }
      })
    }
  }

  return {
    isLoading,
    error,
    series,
    getAllSeries,
    isSucess: status === REQUEST_STATUS.RESOLVED,
    isError: status === REQUEST_STATUS.REJECTED
  }
}