import { NextRequest, NextResponse } from 'next/server'

const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjAyZGQwZmY1MGJkMzNjZTUyNjc3ODM4NmM4NzBmMCIsIm5iZiI6MTc1ODgyODMxMi4wNzcsInN1YiI6IjY4ZDU5NzE4MjM1MTgyYjIwYWM0ODAwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BFriK7F5jY1MpM4Dn60tXiK8HSqJpsOwIVlbuV2B7E4'
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')
    const page = searchParams.get('page') || '1'

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      )
    }

    // Search for movies using Bearer token
    const searchResponse = await fetch(
      `${TMDB_BASE_URL}/search/multi?query=${encodeURIComponent(query)}&page=${page}&language=ru-RU`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${TMDB_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text()
      console.error('TMDB API Error:', errorText)
      throw new Error(`TMDB API request failed: ${searchResponse.status}`)
    }

    const data = await searchResponse.json()

    // Transform the response to include only relevant data
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

    return NextResponse.json({
      results: transformedResults,
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
    })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}