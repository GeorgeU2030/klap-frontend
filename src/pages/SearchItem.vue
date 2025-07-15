<template>
  <div class="min-h-screen bg-[#080808]">
    <header class="bg-gradient-to-r from-violet-900 to-cyan-500 border-b border-violet-500/20 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-4">
            <button @click="$router.push('/dashboard')" class="text-violet-400 cursor-pointer hover:text-cyan-300 transition-colors duration-300">
              <ArrowLeft class="h-5 w-5" />
            </button>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-violet-200 to-cyan-200 bg-clip-text text-transparent">Search</h1>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <div class="relative group mb-6">
          <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search class="h-5 w-5 text-violet-400" />
          </div>
          <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Search for movies, TV shows, people..."
              class="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-violet-900/20 to-cyan-800/40 border border-violet-500/30 rounded-xl text-white placeholder-violet-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/80 transition-all text-lg hover:border-violet-400/50"
          />
          <div v-if="isSearching" class="absolute inset-y-0 right-0 flex items-center pr-4">
            <Loader2 class="h-5 w-5 text-cyan-400 animate-spin" />
          </div>
        </div>

        <div class="flex flex-wrap gap-3 mb-6">
          <button
              v-for="filter in filters"
              :key="filter.value"
              @click="activeFilter = filter.value"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                activeFilter === filter.value
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white border border-violet-400/50 shadow-lg shadow-violet-500/25'
                  : 'bg-gradient-to-r from-violet-900/30 to-cyan-900/30 text-violet-200 border border-violet-500/30 hover:border-violet-400/60 hover:text-white hover:shadow-md hover:shadow-violet-500/20'
              ]"
          >
            <component :is="filter.icon" class="h-4 w-4 mr-2 inline" />
            {{ filter.label }}
          </button>
        </div>
      </div>

      <div v-if="searchQuery.trim()">
        <div v-if="isSearching" class="flex justify-center items-center py-12">
          <div class="text-center">
            <Loader2 class="h-8 w-8 text-cyan-400 animate-spin mx-auto mb-4" />
            <p class="text-violet-300">Searching...</p>
          </div>
        </div>

        <div v-else-if="!isSearching && results.length === 0" class="text-center py-12">
          <FileSearch class="h-16 w-16 text-violet-400/60 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-white mb-2">No results found</h3>
          <p class="text-violet-300/80">Try adjusting your search terms or filters</p>
        </div>

        <div v-else class="space-y-6">
          <div class="flex justify-between items-center">
            <p class="text-violet-300/80">
              Found <span class="text-cyan-300 font-medium">{{ totalResults }}</span> results for "<span class="text-violet-200">{{ searchQuery }}</span>"
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
            <div
                v-for="item in results"
                :key="item.id"
                class="bg-gradient-to-b from-violet-900/20 to-purple-900/20 backdrop-blur-sm rounded-xl overflow-hidden hover:from-violet-800/30 hover:to-purple-800/30 transition-all duration-300 cursor-pointer group border border-violet-500/20 hover:border-violet-400/50 hover:shadow-lg hover:shadow-violet-500/20 hover:scale-105"
                @click="openDetails(item)"
            >
              <div class="relative aspect-[2/3] overflow-hidden">
                <img
                    v-if="item.poster_path"
                    :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
                    :alt="item.title || item.name"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                    v-else
                    class="w-full h-full bg-gradient-to-br from-violet-900/80 to-cyan-900/80 flex items-center justify-center"
                >
                  <ImageIcon class="h-8 w-8 text-violet-400/70" />
                </div>

                <div class="absolute top-2 left-2 bg-gradient-to-r from-cyan-600/90 to-purple-600/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-white shadow-lg">
                  {{ getMediaType(item) }}
                </div>

                <!-- Overlay gradient on hover -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div class="p-3">
                <h3 class="font-semibold text-white mb-1 line-clamp-1 text-sm group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-300 transition-all duration-300">
                  {{ item.title || item.name }}
                </h3>
                <div class="flex items-center justify-between text-xs">
                    <span class="text-cyan-300 font-medium bg-black/30 px-2 py-1 rounded-full">
                      {{ formatDate(item.release_date || item.first_air_date) }}
                    </span>
                  <span class="text-violet-300/80 text-xs">
                      {{ item.vote_average?.toFixed(1) || 'N/A' }}
                    </span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="hasMore" class="text-center pt-8">
            <button
                @click="loadMore"
                :disabled="isLoadingMore"
                class="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30"
            >
                <span v-if="isLoadingMore" class="flex items-center">
                  <Loader2 class="h-4 w-4 mr-2 animate-spin" />
                  Loading...
                </span>
              <span v-else>Load More</span>
            </button>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-16">
        <Search class="h-16 w-16 text-violet-400/60 mx-auto mb-4" />
        <h3 class="text-xl font-semibold bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent mb-2">Search for movies and TV shows</h3>
        <p class="text-violet-300/80">Enter a search term to find your favorite content</p>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
  import { ref, onMounted, computed, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { 
    Search, 
    ArrowLeft, 
    Loader2, 
    FileSearch,
    Film,
    Tv,
    ImageIcon
  } from 'lucide-vue-next'
  
  const route = useRoute()
  const router = useRouter()
  
  // TMDB Configuration
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
  
  // Reactive state
  const searchQuery = ref('')
  const activeFilter = ref('multi')
  const results = ref([])
  const totalResults = ref(0)
  const currentPage = ref(1)
  const isSearching = ref(false)
  const isLoadingMore = ref(false)
  const selectedItem = ref(null)
  
  // Filters configuration
  const filters = [
    { value: 'multi', label: 'All', icon: Search },
    { value: 'movie', label: 'Movies', icon: Film },
    { value: 'tv', label: 'TV Shows', icon: Tv }
  ]
  
  // Computed properties
  const hasMore = computed(() => {
    return currentPage.value * 20 < totalResults.value
  })
  
  // Search debounce
  let searchTimeout = null
  
  const handleSearch = () => {
    if (searchTimeout) clearTimeout(searchTimeout)
    
    searchTimeout = setTimeout(() => {
      if (searchQuery.value.trim()) {
        currentPage.value = 1
        performSearch()
      } else {
        results.value = []
        totalResults.value = 0
      }
    }, 300)
  }
  
  const performSearch = async () => {
    if (!searchQuery.value.trim()) return
    
    isSearching.value = true
    
    try {
      const endpoint = activeFilter.value === 'multi' 
        ? '/search/multi' 
        : `/search/${activeFilter.value}`
      
      const response = await fetch(
        `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(searchQuery.value)}&page=${currentPage.value}`
      )
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (currentPage.value === 1) {
        results.value = data.results || []
      } else {
        results.value = [...results.value, ...(data.results || [])]
      }
      
      totalResults.value = data.total_results || 0
      
    } catch (error) {
      console.error('Search error:', error)
      results.value = []
      totalResults.value = 0
    } finally {
      isSearching.value = false
    }
  }
  
  const loadMore = async () => {
    if (isLoadingMore.value || !hasMore.value) return
    
    isLoadingMore.value = true
    currentPage.value += 1
    
    try {
      await performSearch()
    } finally {
      isLoadingMore.value = false
    }
  }
  
  const openDetails = (item) => {
    selectedItem.value = item
  }

  const getMediaType = (item) => {
    if (item.media_type === 'movie' || item.title) return 'Movie'
    if (item.media_type === 'tv' || item.name) return 'TV Show'
    return 'Unknown'
  }
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown'
    
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  // Watch for filter changes
  watch(activeFilter, () => {
    if (searchQuery.value.trim()) {
      currentPage.value = 1
      performSearch()
    }
  })
  
  // Initialize from route query
  onMounted(() => {
    if (route.query.query) {
      searchQuery.value = route.query.query
      performSearch()
    }
  })
  
  // Update URL when search changes
  watch(searchQuery, (newQuery) => {
    if (newQuery.trim()) {
      router.replace({ 
        path: '/search', 
        query: { query: newQuery } 
      })
    }
  })
</script>
  
<style scoped>
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

</style>