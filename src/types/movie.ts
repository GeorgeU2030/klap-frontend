export interface Movie {
    id: number
    title?: string
    name?: string
    overview: string
    poster_path: string
    backdrop_path: string
    vote_average: number
    release_date?: string
    first_air_date?: string
}

export interface TMDBResponse {
    results: Movie[]
}