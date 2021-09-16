import { useCallback, useEffect, useReducer } from "react";
import { MovieDetailsProps } from "../../components/MovieDetails";

const REQUEST_STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected'
} as const

type PayloadType = {
  error?: string
  movieDetails?: MovieDetailsProps
}

type ReducerStateType = {
  movieDetails: MovieDetailsProps
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
  movieDetails: {} as MovieDetailsProps
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
        movieDetails: action.payload?.movieDetails
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

export function useQueryMovieDetails(movieId: number) {

  const [state, dispatch] = useReducer(reducer, initalState)

  const { isLoading, error, status, movieDetails } = state

  const getDetails = useCallback(async () => {

    try {
      dispatch({ type: REQUEST_STATUS.PENDING })

      const [responseMovieDetails, responseMovieCredits] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=pt-BR`),
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=pt-BR`),
      ])

      const dataMovieDetails = await responseMovieDetails.json()
      const dataMovieCredits = await responseMovieCredits.json()

      let genresOfMovie = []

      for (let i in dataMovieDetails.genres) {
        genresOfMovie.push(dataMovieDetails.genres[i].name)
      }

      const movieInfo: MovieDetailsProps = {
        img: `https://image.tmdb.org/t/p/w500${dataMovieDetails.poster_path}`,
        date: dataMovieDetails.release_date,
        crew: dataMovieCredits.crew,
        genres: genresOfMovie,
        sinopse: dataMovieDetails.overview,
        title: dataMovieDetails.title
      }

      dispatch({ type: REQUEST_STATUS.RESOLVED, payload: { movieDetails: movieInfo } })

    } catch (error) {
      dispatch({
        type: REQUEST_STATUS.RESOLVED,
        payload: {
          error: 'Ops...Ocorreu um errro ao buscar as informações deste filme!'
        }
      })
    }
  }, [movieId])

  return {
    isLoading,
    error,
    movieDetails,
    getDetails,
    isSucess: status === REQUEST_STATUS.RESOLVED,
    isError: status === REQUEST_STATUS.REJECTED
  }
}