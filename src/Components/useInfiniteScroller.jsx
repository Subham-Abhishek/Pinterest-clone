import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [books, setBooks] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setBooks([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel;
    axios({
      method: 'GET',
      url: 'https://api.unsplash.com/search/photos',
      params: {
          page: pageNumber,
          query: query,
          client_id: "KnIdKmvxNCmKWEiC6BUzyQtUnIryKv1Cv53bbTc9ahU"
      },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(({data: {results}}) => {
      setBooks(prev => {
        return [...prev, ...results]
      })
      setHasMore(results.length > 0)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [query, pageNumber])

  return { loading, error, books, hasMore }
}