<template>
  <div class="min-h-screen bg-[#080808] text-white">
    <Navbar />

    <HeroCarousel :movies="homeData.popularMovies" />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <MovieList title="Películas en Tendencia" :movies="homeData.trendingMovies" :icon="TrendingUp" />

      <MovieList title="Series en Tendencia" :movies="homeData.trendingTVShows" :isTV="true" :icon="Tv" />
    </main>

    <Footer />

    <!-- Loading State -->
    <div v-if="loading" class="fixed inset-0 bg-gray-950 flex items-center justify-center z-50">
      <div class="text-white text-xl">Cargando...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { TrendingUp, Tv } from 'lucide-vue-next'
import type { Movie } from '@/types/movie.ts'
import { useTMDB } from '@/composables/useTMDB.ts'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import HeroCarousel from '@/components/movie/HeroCarousel.vue'
import MovieList from '@/components/movie/MovieList.vue'

const { loading, fetchAllHomeData } = useTMDB()

const homeData = ref({
  popularMovies: [] as Movie[],
  trendingMovies: [] as Movie[],
  trendingTVShows: [] as Movie[],
})

onMounted(async () => {
  try {
    homeData.value = await fetchAllHomeData()
  } catch (error) {
    console.error('Error loading home data:', error)
  }
})
</script>