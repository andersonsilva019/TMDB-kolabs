import { useCallback, useReducer } from "react";
import { MovieDetailsProps } from "../../components/MovieDetails";
import { PersonDetailsProps } from "../../components/PersonDetails";

const REQUEST_STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected'
} as const

type PayloadType = {
  error?: string
  personDetails?: PersonDetailsProps
}

type ReducerStateType = {
  personDetails: PersonDetailsProps
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
  personDetails: {} as PersonDetailsProps
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
        personDetails: action.payload?.personDetails
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

export function useQueryPersonDetails(personId: number) {

  const [state, dispatch] = useReducer(reducer, initalState)

  const { isLoading, error, status, personDetails } = state

  const getDetails = useCallback(async () => {

    try {
      dispatch({ type: REQUEST_STATUS.PENDING })

      const endpoint = `https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=pt-BR`

      const response = await fetch(endpoint, { method: 'GET' })

      const data = await response.json()

      const personDetails = {
        id: data.id,
        name: data.name,
        biography: data.biography,
        img: data.profile_path
      }

      dispatch({ type: REQUEST_STATUS.RESOLVED, payload: { personDetails } })

    } catch (error) {
      dispatch({
        type: REQUEST_STATUS.RESOLVED,
        payload: {
          error: 'Ops...Ocorreu um errro ao buscar as informações da pessoa!'
        }
      })
    }
  }, [personId])

  return {
    isLoading,
    error,
    personDetails,
    getDetails,
    isSucess: status === REQUEST_STATUS.RESOLVED,
    isError: status === REQUEST_STATUS.REJECTED
  }
}