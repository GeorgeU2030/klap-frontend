<template>
  <section class="mb-12">
    <div class="flex items-center gap-3 mb-6">
      <component :is="icon" class="h-6 w-6 text-purple-500" />
      <h2 class="text-2xl font-bold text-white">{{ title }}</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" :isTV="props.isTV" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import type { Movie } from '@/types/movie'
import MovieCard from './MovieCard.vue'

interface Props {
  title: string
  movies: Movie[]
  isTV?: boolean
  icon: Component
}

const props = withDefaults(defineProps<Props>(), {
  isTV: false,
})

</script>