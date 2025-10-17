'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, Film, Tv, Star, Calendar, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjFkZjFlM2Q4ZjI5YzA3NzUxN2Q5MjE5ZmQ0NzRkMyIsIm5iZiI6MTczMDA2NzI5MC4yNTc4NzYsInN1YiI6IjY3MWI0MjQzZDQ3ZGU0Y2E3YzNjZDk5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WXkIq7i_E1p2HpR2tS_A7yT2Zi3tVQIq3jTbL1V5A3M'
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

interface MovieResult {
  id: number
  title: string
  originalTitle: string
  overview: string
  posterPath: string | null
  backdropPath: string | null
  releaseDate: string
  voteAverage: number
  voteCount: number
  mediaType: 'movie' | 'tv'
  genreIds: number[]
}

export function MovieSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<MovieResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<MovieResult | null>(null)

  const searchMovies = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      setHasSearched(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchQuery)}&language=ru-RU`
      )
      
      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data = await response.json()
      
      const transformedResults = data.results.map((item: any) => ({
        id: item.id,
        title: item.title || item.name,
        originalTitle: item.original_title || item.original_name,
        overview: item.overview,
        posterPath: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
        backdropPath: item.backdrop_path ? `https://image.tmdb.org/t/p/w1280${item.backdrop_path}` : null,
        releaseDate: item.release_date || item.first_air_date,
        voteAverage: item.vote_average,
        voteCount: item.vote_count,
        mediaType: item.media_type,
        genreIds: item.genre_ids,
      }))

      setResults(transformedResults)
      setHasSearched(true)
    } catch (err) {
      setError('Не удалось выполнить поиск. Попробуйте еще раз.')
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        searchMovies(query)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [query, searchMovies])

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Дата неизвестна'
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getMediaTypeIcon = (mediaType: string) => {
    return mediaType === 'movie' ? 
      <Film className="w-4 h-4" /> : 
      <Tv className="w-4 h-4" />
  }

  const getMediaTypeText = (mediaType: string) => {
    return mediaType === 'movie' ? 'Фильм' : 'Сериал'
  }

  const handleSelectMovie = (movie: MovieResult) => {
    setSelectedMovie(movie)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Поиск фильмов и сериалов..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4 py-3 text-lg"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-spin" />
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Search Results */}
      {hasSearched && !loading && (
        <div className="space-y-4">
          {results.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Film className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Ничего не найдено</p>
              <p className="text-sm mt-2">Попробуйте изменить поисковый запрос</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  Найдено: {results.length} {results.length === 1 ? 'результат' : 
                    results.length < 5 ? 'результата' : 'результатов'}
                </h3>
              </div>

              <ScrollArea className="h-96 w-full rounded-lg border">
                <div className="p-4 space-y-4">
                  {results.map((movie) => (
                    <Card 
                      key={movie.id} 
                      className="cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
                      onClick={() => handleSelectMovie(movie)}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          {/* Poster */}
                          <div className="flex-shrink-0">
                            {movie.posterPath ? (
                              <img
                                src={movie.posterPath}
                                alt={movie.title}
                                className="w-20 h-28 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-20 h-28 bg-gray-200 rounded-lg flex items-center justify-center">
                                <Film className="w-8 h-8 text-gray-400" />
                              </div>
                            )}
                          </div>

                          {/* Movie Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-lg truncate">
                                  {movie.title}
                                </h4>
                                {movie.originalTitle !== movie.title && (
                                  <p className="text-sm text-gray-500 truncate">
                                    {movie.originalTitle}
                                  </p>
                                )}
                              </div>
                              <Badge variant="secondary" className="flex items-center gap-1">
                                {getMediaTypeIcon(movie.mediaType)}
                                {getMediaTypeText(movie.mediaType)}
                              </Badge>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(movie.releaseDate)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                {movie.voteAverage.toFixed(1)}
                                <span className="text-gray-400">
                                  ({movie.voteCount})
                                </span>
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 line-clamp-2">
                              {movie.overview || 'Описание отсутствует'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </>
          )}
        </div>
      )}

      {/* Selected Movie Details */}
      {selectedMovie && (
        <Card className="mt-6 border-2 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Выбранный фильм</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedMovie(null)}
              >
                Снять выбор
              </Button>
            </div>
            
            <div className="flex gap-6">
              {selectedMovie.posterPath ? (
                <img
                  src={selectedMovie.posterPath}
                  alt={selectedMovie.title}
                  className="w-32 h-44 object-cover rounded-lg"
                />
              ) : (
                <div className="w-32 h-44 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-400" />
                </div>
              )}
              
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-2">{selectedMovie.title}</h4>
                <p className="text-gray-600 mb-4">{selectedMovie.overview}</p>
                
                <div className="flex items-center gap-4">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Создать комнату просмотра
                  </Button>
                  <Badge variant="outline">
                    {getMediaTypeText(selectedMovie.mediaType)}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}