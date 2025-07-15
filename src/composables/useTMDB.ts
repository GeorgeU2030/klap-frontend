import { ref } from 'vue'
import type { Movie, TMDBResponse } from '@/types/movie'
import { TMDB_API_KEY, TMDB_BASE_URL } from '@/constants/tmdb'

export const useTMDB = () => {
    const loading = ref(true)
    const error = ref<string | null>(null)

    const fetchTMDBData = async (endpoint: string): Promise<Movie[]> => {
        try {
            const response = await fetch(`${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=en-US`)
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`)
            }
            const data: TMDBResponse = await response.json()
            return data.results || []
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error'
            throw err
        }
    }

    const getPopularMovies = (limit = 5) => fetchTMDBData('/movie/popular').then(movies => movies.slice(0, limit))
    const getTrendingMovies = (limit = 10) => fetchTMDBData('/trending/movie/week').then(movies => movies.slice(0, limit))
    const getTrendingTVShows = (limit = 10) => fetchTMDBData('/trending/tv/week').then(shows => shows.slice(0, limit))

    const fetchAllHomeData = async () => {
        loading.value = true
        error.value = null

        try {
            const [popular, trendingMovies, trendingTV] = await Promise.all([
                getPopularMovies(),
                getTrendingMovies(),
                getTrendingTVShows()
            ])

            return {
                popularMovies: popular,
                trendingMovies,
                trendingTVShows: trendingTV,
            }
        } catch (err) {
            console.error('Error fetching home data:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        error,
        fetchAllHomeData,
        getPopularMovies,
        getTrendingMovies,
        getTrendingTVShows
    }
}