import { useEffect } from 'react'
import { useSeries } from '../hooks/useSeries'
import { Series } from '../templates/Series'

export default function Index() {

  const { getAllSeries, series } = useSeries()

  useEffect(() => {
    getAllSeries()
  }, [])

  return <Series series={series} />
}