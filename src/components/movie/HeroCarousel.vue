<template>
  <section class="relative h-[280px] md:h-[600px] lg:h-[500px] overflow-hidden">
    <div v-if="movies.length > 0" class="relative w-full h-full">
      <!-- Slides -->
      <div
          v-for="(movie, index) in movies"
          :key="movie.id"
          class="absolute inset-0 transition-opacity duration-700"
          :class="{
          'opacity-100 z-10': index === currentSlide,
          'opacity-0 z-0': index !== currentSlide
        }"
      >
        <img
            :src="`${BACKDROP_BASE_URL}${movie.backdrop_path}`"
            :alt="movie.title"
            class="w-full h-full object-cover object-top"
            loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />
        <div class="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div
              class="max-w-7xl mx-auto transition-all duration-700"
              :class="{
              'opacity-100 translate-y-0': index === currentSlide,
              'opacity-0 translate-y-4': index !== currentSlide
            }"
          >
            <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 text-white line-clamp-2">
              {{ movie.title }}
            </h1>
            <p class="text-sm md:text-lg text-gray-300 mb-4 md:mb-6 max-w-2xl line-clamp-2 md:line-clamp-3">
              {{ movie.overview }}
            </p>
            <div class="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <Badge variant="outline" class="border-white text-white">
                {{ getYear(movie.release_date) }}
              </Badge>
            </div>
            <div class="flex gap-3 md:gap-4">
              <Button
                  size="lg"
                  class="bg-violet-800 hover:bg-violet-700 transition-colors"
                  @click="goToTrailer(movie.title)"
              >
                <Play class="h-5 w-5 mr-0 md:mr-2" />
                <span class="hidden md:inline">Watch Trailer</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- Carousel Controls -->
      <Button
          @click="prevSlide"
          variant="secondary"
          size="icon"
          class="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 z-20"
      >
        <ChevronLeft class="h-5 w-5 md:h-6 md:w-6" />
      </Button>
      <Button
          @click="nextSlide"
          variant="secondary"
          size="icon"
          class="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 z-20"
      >
        <ChevronRight class="h-5 w-5 md:h-6 md:w-6" />
      </Button>

      <!-- Carousel Indicators -->
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        <button
            v-for="(_, index) in visibleMovies"
            :key="index"
            @click="goToSlide(index)"
            @mouseenter="pauseAutoSlide"
            @mouseleave="resumeAutoSlide"
            :class="[
            'w-3 h-3 rounded-full transition-all duration-300',
            index === currentSlide ? 'bg-violet-800 w-6' : 'bg-gray-500 hover:bg-gray-400'
          ]"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { ChevronLeft, ChevronRight, Play } from 'lucide-vue-next'
import type { Movie } from '@/types/movie'
import { BACKDROP_BASE_URL } from '@/constants/tmdb'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Props {
  movies: Movie[]
  autoSlide?: boolean
  slideInterval?: number
  maxVisible?: number
}

const props = withDefaults(defineProps<Props>(), {
  autoSlide: true,
  slideInterval: 5000,
  maxVisible: 10
})

const currentSlide = ref(0)
let carouselInterval: number | null = null
let isPaused = ref(false)

const visibleMovies = computed(() => {
  return props.movies.slice(0, props.maxVisible)
})

function getYear(date?: string): string {
  if (!date) return 'No date'
  const d = new Date(date)
  return isNaN(d.getTime()) ? 'No date' : d.getFullYear().toString()
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % visibleMovies.value.length
  resetCarousel()
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + visibleMovies.value.length) % visibleMovies.value.length
  resetCarousel()
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  resetCarousel()
}

const startCarousel = () => {
  if (props.autoSlide && visibleMovies.value.length > 1) {
    stopCarousel()
    carouselInterval = setInterval(() => {
      if (!isPaused.value) {
        nextSlide()
      }
    }, props.slideInterval)
  }
}

const stopCarousel = () => {
  if (carouselInterval) {
    clearInterval(carouselInterval)
    carouselInterval = null
  }
}

const resetCarousel = () => {
  if (props.autoSlide) {
    stopCarousel()
    startCarousel()
  }
}

const pauseAutoSlide = () => {
  isPaused.value = true
}

const resumeAutoSlide = () => {
  isPaused.value = false
}

const goToTrailer = (movieTitle?: string) => {
  if (!movieTitle) return
  const query = encodeURIComponent(`${movieTitle} trailer`)
  const url = `https://www.youtube.com/results?search_query=${query}`
  window.open(url, '_blank')
}


onMounted(startCarousel)
onUnmounted(stopCarousel)
</script>