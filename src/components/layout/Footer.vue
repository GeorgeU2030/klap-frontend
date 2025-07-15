<template>
  <footer class="bg-gradient-to-b from-[#0A0A0A] to-[#151515] border-t border-gray-800/50 mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="flex items-center gap-3 group mb-4 md:mb-0">
          <div
            class="p-1.5 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 group-hover:from-purple-500 group-hover:to-cyan-400 transition-all">
            <Clapperboard class="h-6 w-6 text-black" />
          </div>
          <div class="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
            <span
              class="font-display text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-cyan-300 transition-all duration-300">
              Klap
            </span>
            <span class="text-gray-400 text-sm font-medium tracking-wide">
              developed by
              <span class="text-white/90 font-semibold hover:text-white transition-colors">KESTREL</span>
            </span>
          </div>
        </div>

        <div class="text-center md:text-right">
          <p class="text-gray-300 text-sm">
            © 2025 KESTREL - All rights reserved.
          </p>
          <p class="text-gray-400 text-xs mt-1">
            Designed with ♥ for Movie and TV show lovers.
          </p>
        </div>
      </div>

      <div class="h-px mt-6 w-full bg-gradient-to-r from-violet-700 via-purple-800/50 to-cyan-700"></div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Clapperboard } from 'lucide-vue-next'
</script>