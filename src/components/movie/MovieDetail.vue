<template>
  <div v-if="item" class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-violet-900/30" style="background-color: #080808;">
    <!-- Header con backdrop -->
    <div class="relative h-96 overflow-hidden">
      <div
          class="absolute inset-0 bg-cover bg-center bg-no-repeat"
          :style="{ backgroundImage: `url(${backdropUrl})` }"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>

      <!-- Botón de regreso -->
      <button
          @click="goBack"
          class="absolute cursor-pointer top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-violet-900/30 hover:bg-violet-800/40 backdrop-blur-sm rounded-lg border border-violet-500/20 hover:border-violet-400/50 transition-all duration-300 text-white"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back
      </button>
    </div>

    <!-- Contenido principal -->
    <div class="container mx-auto px-6 -mt-32 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- Poster y información básica -->
        <div class="lg:col-span-1 pb-12">
          <div class="sticky top-6">
            <div class="bg-gradient-to-b from-violet-900/20 to-purple-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-violet-500/20 p-6">
              <img
                  :src="posterUrl"
                  :alt="item.title || item.name"
                  class="w-full rounded-lg shadow-2xl mb-6"
              >

              <!-- Información básica -->
              <div class="space-y-4">
                <div>
                  <h3 class="text-cyan-400 font-medium mb-2">Release Date</h3>
                  <p class="text-gray-300">{{ formatDate(item.release_date || item.first_air_date) }}</p>
                </div>

                <div>
                  <h3 class="text-cyan-400 font-medium mb-2">Rating</h3>
                  <div class="flex items-center gap-2">
                    <div class="flex items-center bg-gradient-to-r from-violet-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      ⭐ {{ item.vote_average?.toFixed(1) }}
                    </div>
                    <span class="text-gray-400 text-sm">({{ item.vote_count }} votes)</span>
                  </div>
                </div>

                <div v-if="item.number_of_seasons">
                  <h3 class="text-cyan-400 font-medium mb-2">Seasons</h3>
                  <p class="text-gray-300">{{ item.number_of_seasons }} seasons</p>
                </div>

                <div v-if="item.runtime">
                  <h3 class="text-cyan-400 font-medium mb-2">Runtime</h3>
                  <p class="text-gray-300">{{ item.runtime }} minutes</p>
                </div>

                <div v-if="item.genres">
                  <h3 class="text-cyan-400 font-medium mb-2">Genres</h3>
                  <div class="flex flex-wrap gap-2">
                    <span
                        v-for="genre in item.genres"
                        :key="genre.id"
                        class="px-3 py-1 bg-purple-900/30 text-purple-200 rounded-full text-sm border border-purple-500/20"
                    >
                      {{ genre.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contenido principal -->
        <div class="lg:col-span-2 space-y-8 pb-12">

          <!-- Título y descripción -->
          <div class="bg-gradient-to-b from-violet-900/20 to-purple-900/20 backdrop-blur-sm rounded-xl border border-violet-500/20 p-8">
            <h1 class="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {{ item.title || item.name }}
            </h1>

            <p class="text-gray-300 text-lg leading-relaxed">
              {{ item.overview }}
            </p>
          </div>

          <!-- Sistema de calificación -->
          <div class="bg-gradient-to-b from-violet-900/20 to-purple-900/20 backdrop-blur-sm rounded-xl border border-violet-500/20 p-8">
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-2xl font-bold text-white">Rate this {{ item.title ? 'Movie' : 'TV Show' }}</h2>
              <div class="text-right">
                <div class="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  {{ totalScore }}/100
                </div>
                <div class="text-sm text-gray-400">Total Score</div>
              </div>
            </div>

            <!-- Criterios de calificación -->
            <div class="space-y-6">
              <div
                  v-for="criterion in ratingCriteria"
                  :key="criterion.name"
                  class="bg-gray-900/50 rounded-lg p-6 border border-violet-500/10 hover:border-violet-500/20 transition-all duration-300"
              >
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-white">{{ criterion.name }}</h3>
                    <p class="text-sm text-gray-400">Max: {{ criterion.max }} points</p>
                  </div>
                  <div class="text-right">
                    <div class="text-xl font-bold text-cyan-400">{{ criterion.score }}/{{ criterion.max }}</div>
                  </div>
                </div>

                <!-- Slider -->
                <div class="relative">
                  <input
                      type="range"
                      :min="0"
                      :max="criterion.max"
                      v-model="criterion.score"
                      class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      :style="{
                      background: `linear-gradient(to right,
                        #8b5cf6 0%,
                        #06b6d4 ${(criterion.score / criterion.max) * 100}%,
                        #374151 ${(criterion.score / criterion.max) * 100}%,
                        #374151 100%)`
                    }"
                  >

                  <!-- Marcas en el slider -->
                  <div class="flex justify-between text-xs text-gray-500 mt-2">
                    <span>0</span>
                    <span>{{ Math.floor(criterion.max / 2) }}</span>
                    <span>{{ criterion.max }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Botón de calificar -->
            <div class="mt-8 flex justify-center">
              <button
                  @click="submitRating"
                  class="px-8 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-violet-500/20 hover:border-violet-400/50"
              >
                <span class="flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                  </svg>
                  Submit Rating
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {useRoute, useRouter} from "vue-router";
import {useAuth} from "@/composables/useAuth.ts";

// Interfaces
interface Genre {
  id: number
  name: string
}

interface MovieItem {
  id: number
  title?: string
  name?: string
  overview: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  vote_count: number
  release_date?: string
  first_air_date?: string
  runtime?: number
  number_of_seasons?: number
  genres: Genre[]
}

interface RatingCriterion {
  name: string
  max: number
  score: number
}

const router = useRoute()
const { id, type } = router.params;
const source = router.query.source;
const item = ref<MovieItem | null>(null)

const { user } = useAuth()

// Reactive data
const ratingCriteria = ref<RatingCriterion[]>([
  { name: 'Story', max: 25, score: 0 },
  { name: 'Direction', max: 15, score: 0 },
  { name: 'Performances', max: 15, score: 0 },
  { name: 'Visuals', max: 15, score: 0 },
  { name: 'Sound', max: 10, score: 0 },
  { name: 'Emotion', max: 10, score: 0 },
  { name: 'Rewatch', max: 10, score: 0 }
])
const existingRating = ref<RatingCriterion[] | null>(null)
const hasRated = ref(false)
// Computed properties
const totalScore = computed(() => {
  return ratingCriteria.value.reduce((sum, criterion) => sum + Number(criterion.score), 0)
})

const posterUrl = computed(() => {
  return item.value?.poster_path
      ? `https://image.tmdb.org/t/p/original${item.value.poster_path}`
      : '/placeholder-poster.jpg'
})

const backdropUrl = computed(() => {
  return item.value?.backdrop_path
      ? `https://image.tmdb.org/t/p/original${item.value.backdrop_path}`
      : '/placeholder-backdrop.jpg'
})

// Methods
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
const route = useRouter()

const goBack = () => {
  route.push('/dashboard')
}

const submitRating = async () => {
  if (!item.value || !user.value) return

  const payload = {
    user_id: user.value.id,
    story: ratingCriteria.value[0].score,
    direction: ratingCriteria.value[1].score,
    performances: ratingCriteria.value[2].score,
    visuals: ratingCriteria.value[3].score,
    sound: ratingCriteria.value[4].score,
    emotion: ratingCriteria.value[5].score,
    rewatch: ratingCriteria.value[6].score,
    tmdb_id: item.value.id,
    type: type,
    original_title: item.value.title || item.value.name || 'Untitled',
    overview: item.value.overview || '',
    poster_path: item.value.poster_path || '',
    release_date: item.value.release_date || item.value.first_air_date || '',
    number_of_seasons: item.value.number_of_seasons,
    backdrop_path: item.value.backdrop_path,
    vote_average: 0,
    vote_count: 0,
    genres: item.value.genres ? item.value.genres.map(g => g.name) : []
  }

  try {
    const method = (type === 'tv' && hasRated.value) ? 'PUT' : 'POST'
    const endpoint = method === 'POST'
        ? `${import.meta.env.VITE_API_URL}/rating/create`
        : `${import.meta.env.VITE_API_URL}/rating/update/${user.value.id}/${item.value.id}`

    const res = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      const error = await res.json()
      console.error('Failed:', error)
      return
    }

    route.push("/dashboard")

  } catch (error) {
    console.error('Error:', error)
    alert('Unexpected error')
  }
}



// Lifecycle
onMounted(async () => {
  if (source === 'backend') {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/items/${type}/${id}`);
    item.value = await res.json();
  } else {
    const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
    item.value = await res.json();
  }

  if (item.value && user.value) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/rating/get/${user.value.id}/${item.value.id}`)
      if (res.ok) {
        const data = await res.json()
        hasRated.value = true
        existingRating.value = [
          { name: 'Story', max: 25, score: data.story },
          { name: 'Direction', max: 15, score: data.direction },
          { name: 'Performances', max: 15, score: data.performances },
          { name: 'Visuals', max: 15, score: data.visuals },
          { name: 'Sound', max: 10, score: data.sound },
          { name: 'Emotion', max: 10, score: data.emotion },
          { name: 'Rewatch', max: 10, score: data.rewatch },
        ]
        if (type === 'tv') {
          ratingCriteria.value = existingRating.value
        }
      }
    } catch (e) {
      hasRated.value = false
    }
  }
})
</script>

<style scoped>
/* Estilos personalizados para el slider */
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(45deg, #8b5cf6, #06b6d4);
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(45deg, #8b5cf6, #06b6d4);
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

/* Animaciones suaves */
.slider {
  transition: all 0.3s ease;
}

.slider:hover {
  transform: scaleY(1.2);
}

/* Scrollbar personalizado */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #8b5cf6, #06b6d4);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #7c3aed, #0891b2);
}
</style>