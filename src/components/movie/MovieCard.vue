<template>
  <Card
    class="group cursor-pointer transition-all duration-300 bg-[#151515] border border-[#2A2A2A] hover:border-cyan-400/50 hover:shadow-lg hover:shadow-purple-500/20 overflow-hidden">
    <div class="relative aspect-[2/3]">
      <img v-if="movie.poster_path" :src="`${IMAGE_BASE_URL}${movie.poster_path}`" :alt="movie.title || movie.name"
        class="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300" loading="lazy" />

      <div v-else
        class="w-full h-full bg-gradient-to-br from-purple-900/80 to-cyan-900/80 flex items-center justify-center">
        <component :is="props.isTV ? Tv : Film" class="h-10 w-10 text-purple-400/70" />
      </div>
    </div>

    <div class="p-3 space-y-2 bg-[#151515]">
      <h3
        class="font-semibold text-white text-sm line-clamp-1 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-300">
        {{ movie.title || movie.name }}
      </h3>

      <div class="flex items-center justify-between text-xs">
        <span class="text-cyan-300 font-medium bg-black/30 px-2 py-1 rounded-full">
          {{ getYear(movie.release_date || movie.first_air_date) || 'N/A' }}
        </span>

        <Badge class="text-xs font-medium px-2 py-1" :class="{
          'bg-purple-700/90 text-purple-100': !props.isTV,
          'bg-cyan-700/90 text-cyan-100': props.isTV
        }">
          {{ props.isTV ? 'TV SHOW' : 'MOVIE' }}
        </Badge>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Film, Tv } from 'lucide-vue-next'
import type { Movie } from '@/types/movie'
import { IMAGE_BASE_URL } from '@/constants/tmdb'
import { Card } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge'

interface Props {
  movie: Movie
  isTV?: boolean
  showRating?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isTV: false,
  showRating: false
})

const getYear = (date?: string) => {
  if (!date) return null
  const d = new Date(date)
  return isNaN(d.getTime()) ? null : d.getFullYear()
}
</script>