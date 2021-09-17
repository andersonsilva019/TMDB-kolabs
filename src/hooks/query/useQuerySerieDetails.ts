import { useCallback, useReducer } from "react";
import { SerieDetailsProps } from "../../components/SerieDetails";

const REQUEST_STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected'
} as const

type PayloadType = {
  error?: string
  serieDetails?: SerieDetailsProps
}

type ReducerStateType = {
  serieDetails: SerieDetailsProps
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
  serieDetails: {} as SerieDetailsProps
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
        serieDetails: action.payload?.serieDetails
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

export function useQuerySerieDetails(serieId: number) {

  const [state, dispatch] = useReducer(reducer, initalState)

  const { isLoading, error, status, serieDetails } = state

  const getDetails = useCallback(async () => {

    try {
      dispatch({ type: REQUEST_STATUS.PENDING })

      const [responseSerieDetails, responseSerieCredits] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/tv/${serieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=pt-BR`),
        fetch(`https://api.themoviedb.org/3/tv/${serieId}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=pt-BR`),
      ])

      const dataSerieDetails = await responseSerieDetails.json()
      const dataSerieCredits = await responseSerieCredits.json()

      let genresOfMovie = []

      for (let i in dataSerieDetails.genres) {
        genresOfMovie.push(dataSerieDetails.genres[i].name)
      }

      const serieDetails: SerieDetailsProps = {
        img: `https://image.tmdb.org/t/p/w500${dataSerieDetails.poster_path}`,
        date: dataSerieDetails.first_air_date,
        crew: dataSerieCredits.crew.slice(0, 6),
        genres: genresOfMovie,
        sinopse: dataSerieDetails.overview,
        title: dataSerieDetails.name,
        numberOfSeasons: dataSerieDetails.number_of_seasons
      }

      dispatch({ type: REQUEST_STATUS.RESOLVED, payload: { serieDetails } })

    } catch (error) {
      dispatch({
        type: REQUEST_STATUS.RESOLVED,
        payload: {
          error: 'Ops...Ocorreu um errro ao buscar as informações desta série!'
        }
      })
    }
  }, [serieId])

  return {
    isLoading,
    error,
    serieDetails,
    getDetails,
    isSucess: status === REQUEST_STATUS.RESOLVED,
    isError: status === REQUEST_STATUS.REJECTED
  }
}