<template>
  <nav class="bg-[#080808] sticky top-0 z-50 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
      
        <div class="flex items-center gap-3">
          <div class="p-1.5 rounded-lg">
            <img src="/logo.png" class="w-7 h-7" alt="Klap Logo" />
          </div>
          <span class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-400 bg-clip-text text-transparent">
            Klap
          </span>
        </div>

        <div class="hidden md:flex items-center gap-6">
          <form @submit.prevent="onSearch" class="relative group">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search class="h-4 w-4 text-gray-400 transition-colors" />
            </div>
            <input v-model="query" type="text" placeholder="Search..."
              class="pl-10 pr-4 py-2 rounded-lg text-white placeholder-gray-400 w-64 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 border border-violet-800 hover:border-violet-700 transition-all" />
          </form>
          <Button variant="ghost"
            class="px-4 py-1.5 w-32 border-1 cursor-pointer border-cyan-400 rounded-lg hover:border-cyan-400/30 hover:bg-cyan-900/10 transition-colors group"
            @click="gotoLogin">
            <div class="flex items-center">
              <LogIn class="h-4 w-4 mr-2 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              <span class="text-cyan-100 group-hover:text-white font-medium">
                Login
              </span>
            </div>
          </Button>
          <Button
            class="px-4 py-1.5 w-32 rounded-lg bg-gradient-to-r cursor-pointer from-purple-700 to-cyan-600 hover:from-purple-500 hover:to-cyan-400 transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 relative overflow-hidden"
            @click="gotoRegister">
            <div class="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity"></div>
            <span class="relative z-10 flex items-center text-white font-medium">
              <UserPlus class="h-4 w-4 mr-2 text-cyan-100" />
              Register
            </span>
          </Button>
        </div>

        <div class="md:hidden">
          <button @click="toggleMenu"
            class="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            :aria-expanded="isOpen" aria-label="Toggle menu">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                :d="isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    
    <Transition enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform opacity-0 -translate-y-2" enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in" leave-from-class="transform opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-2">
      <div v-if="isOpen"
        class="md:hidden px-4 pb-4 space-y-3 border-t border-gray-800/50 bg-gradient-to-b from-[#0A0A0A] to-[#151515]">
        <form @submit.prevent="onSearch" class="relative group pt-3">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pt-3 pointer-events-none">
            <Search class="h-4 w-4 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
          </div>
          <input v-model="query" type="text" placeholder="Search..."
            class="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 border border-gray-800" />
        </form>

        <Button variant="ghost"
          class="px-4 py-1.5 w-full border-1 border-cyan-400 rounded-lg hover:border-cyan-400/30 hover:bg-cyan-900/10 transition-colors group"
          @click="gotoLogin">
          <div class="flex items-center">
            <LogIn class="h-4 w-4 mr-2 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            <span class="text-cyan-100 group-hover:text-white font-medium">
              Login
            </span>
          </div>
        </Button>
        <Button
          class="px-4 py-1.5 w-full rounded-lg bg-gradient-to-r from-purple-700 to-cyan-600 hover:from-purple-500 hover:to-cyan-400 transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 relative overflow-hidden"
          @click="gotoRegister">
          <div class="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity"></div>
          <span class="relative z-10 flex items-center text-white font-medium">
            <UserPlus class="h-4 w-4 mr-2 text-cyan-100" />
            Register
          </span>
        </Button>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search, LogIn, UserPlus } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const query = ref('')
const router = useRouter()
const isOpen = ref(false)

const onSearch = () => {
  if (!query.value.trim()) return
  router.push({ path: '/search', query: { query: query.value } })
}

const gotoLogin = () => {
  router.push('/login')
}

const gotoRegister = () => {
  router.push('/register')
}

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>