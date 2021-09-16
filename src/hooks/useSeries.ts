import { useContext } from "react";
import { SerieContext } from "../context/SerieContext";

export function useSeries() {
  const context = useContext(SerieContext)

  if (!context) {
    throw new Error('useSeries must be used within a SerieContextProvider')
  }

  return context
}