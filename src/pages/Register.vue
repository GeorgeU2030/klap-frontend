<template>
    <div class="min-h-screen bg-[#080808] flex items-center justify-center p-4 relative overflow-hidden">
      
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-700 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
      </div>
  
      <div class="relative z-10 w-full max-w-md">
        <div class="bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700/50 p-8 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-2xl blur opacity-20"></div>
          
          <div class="relative z-10">
            
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <UserPlusIcon class="w-8 h-8 text-white" />
              </div>
              <h1 class="text-3xl font-bold text-white mb-2">Create Account</h1>
              <p class="text-gray-400">Sign up for a new account</p>
            </div>
  
            <div class="space-y-6">
              <div class="space-y-2">
                <Label for="full_name" class="block text-sm font-medium text-gray-300">
                  Full Name
                </Label>
                <div class="relative">
                  <UserIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="full_name"
                    v-model="formData.full_name"
                    type="text"
                    placeholder="John Doe"
                    :class="[
                      'w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-400',
                      errors.full_name ? 'border-red-500' : 'border-gray-600'
                    ]"
                  />
                </div>
                <p v-if="errors.full_name" class="text-red-400 text-sm mt-1">{{ errors.full_name }}</p>
              </div>
  
              <div class="space-y-2">
                <Label for="email" class="block text-sm font-medium text-gray-300">
                  Email
                </Label>
                <div class="relative">
                  <MailIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    placeholder="your@email.com"
                    :class="[
                      'w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-400',
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    ]"
                  />
                </div>
                <p v-if="errors.email" class="text-red-400 text-sm mt-1">{{ errors.email }}</p>
              </div>
  
              <div class="space-y-2">
                <Label for="password" class="block text-sm font-medium text-gray-300">
                  Password
                </Label>
                <div class="relative">
                  <LockIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    v-model="formData.password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="••••••••"
                    :class="[
                      'w-full pl-10 pr-12 py-3 bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-400',
                      errors.password ? 'border-red-500' : 'border-gray-600'
                    ]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    @click="showPassword = !showPassword"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors h-auto p-0"
                  >
                    <EyeOffIcon v-if="showPassword" class="w-5 h-5" />
                    <EyeIcon v-else class="w-5 h-5" />
                  </Button>
                </div>
                <p v-if="errors.password" class="text-red-400 text-sm mt-1">{{ errors.password }}</p>
              </div>
  
              <div class="space-y-2">
                <Label for="confirm_password" class="block text-sm font-medium text-gray-300">
                  Confirm Password
                </Label>
                <div class="relative">
                  <LockIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="confirm_password"
                    v-model="confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    placeholder="••••••••"
                    :class="[
                      'w-full pl-10 pr-12 py-3 bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-400',
                      errors.confirm_password ? 'border-red-500' : 'border-gray-600'
                    ]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors h-auto p-0"
                  >
                    <EyeOffIcon v-if="showConfirmPassword" class="w-5 h-5" />
                    <EyeIcon v-else class="w-5 h-5" />
                  </Button>
                </div>
                <p v-if="errors.confirm_password" class="text-red-400 text-sm mt-1">{{ errors.confirm_password }}</p>
              </div>
  
              <div class="space-y-2">
                <Label for="profile_image" class="block text-sm font-medium text-gray-300">
                  Profile Image URL
                </Label>
                <div class="relative">
                  <ImageIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="profile_image"
                    v-model="formData.profile_image"
                    type="url"
                    placeholder="https://example.com/profile.jpg"
                    :class="[
                      'w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-400',
                      errors.profile_image ? 'border-red-500' : 'border-gray-600'
                    ]"
                  />
                </div>
                <p v-if="errors.profile_image" class="text-red-400 text-sm mt-1">{{ errors.profile_image }}</p>
                
                <div v-if="formData.profile_image && isValidUrl(formData.profile_image)" class="mt-3 flex justify-center">
                  <div class="relative">
                    <img 
                      :src="formData.profile_image" 
                      alt="Profile preview" 
                      class="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                      @error="handleImageError"
                    />
                  </div>
                </div>
              </div>
  
              <Button
                @click="handleRegister"
                :disabled="isLoading"
                class="w-full py-3 px-4 bg-gradient-to-r cursor-pointer from-purple-700 to-cyan-600 hover:from-purple-500 hover:to-cyan-400 transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                <div v-if="isLoading" class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
                <span v-else>Create Account</span>
              </Button>
  
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-600"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-gray-900/50 text-gray-400">or continue with</span>
                </div>
              </div>
  
              <Button
                @click="handleGoogleRegister"
                :disabled="isLoading"
                variant="outline"
                class="w-full py-3 px-4 bg-white text-gray-900 cursor-pointer font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border-gray-300"
              >
                <div v-if="isLoading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
                <template v-else>
                  <img :src="GoogleIcon" alt="Google" class="w-5 h-5 mr-2" />
                  Sign up with Google
                </template>
              </Button>
            </div>
  
            <div class="mt-8 text-center">
              <p class="text-gray-400 text-sm">
                Already have an account?
                <a
                  href="#"
                  class="text-cyan-400 hover:text-cyan-300 transition-colors font-medium ml-1"
                  @click.prevent="handleLogin"
                >
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { Button } from '@/components/ui/button'
  import { Input } from '@/components/ui/input'
  import { Label } from '@/components/ui/label'
  import { 
    UserPlusIcon, 
    UserIcon, 
    MailIcon, 
    LockIcon, 
    EyeIcon, 
    EyeOffIcon,
    ImageIcon
  } from 'lucide-vue-next'
  import GoogleIcon from '@/assets/images/google.webp'
  import { useRouter } from 'vue-router'
  
  interface FormData {
    email: string
    password: string
    full_name: string
    profile_image: string
  }
  
  interface FormErrors {
    email?: string
    password?: string
    full_name?: string
    profile_image?: string
    confirm_password?: string
  }
  
  const formData = reactive<FormData>({
    email: '',
    password: '',
    full_name: '',
    profile_image: ''
  })
  
  const confirmPassword = ref<string>('')
  const showPassword = ref<boolean>(false)
  const showConfirmPassword = ref<boolean>(false)
  const isLoading = ref<boolean>(false)
  const errors = reactive<FormErrors>({})

  const router = useRouter()
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required'
    } else if (formData.full_name.trim().length < 2) {
      newErrors.full_name = 'Full name must be at least 2 characters'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    if (!confirmPassword.value) {
      newErrors.confirm_password = 'Please confirm your password'
    } else if (formData.password !== confirmPassword.value) {
      newErrors.confirm_password = 'Passwords do not match'
    }

    if (formData.profile_image && !isValidUrl(formData.profile_image)) {
      newErrors.profile_image = 'Please enter a valid URL'
    }
    
    Object.assign(errors, newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }
  
  const handleImageError = (): void => {
    errors.profile_image = 'Failed to load image. Please check the URL.'
  }
  
  const handleRegister = async (): Promise<void> => {
    if (!validateForm()) return
    
    isLoading.value = true
    
    try {
      
      const registerData = {
        email: formData.email.trim(),
        password: formData.password,
        full_name: formData.full_name.trim(),
        profile_image: formData.profile_image.trim() || ''
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(registerData)
      })
      
      if (!response.ok) {
        throw new Error('Registration failed')
      }
      
      router.push('/login')
      
    } catch (error) {
      console.error('Registration error:', error)
      errors.email = 'Registration failed. Please try again.'
    } finally {
      isLoading.value = false
    }
  }
  
  const handleGoogleRegister = async (): Promise<void> => {
    isLoading.value = true
    
    try {
      console.log('Registering with Google...')
      
      // Aquí implementarías la lógica de registro con Google
      // Por ejemplo, usando Google OAuth
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      alert('Google registration initiated!')
      
    } catch (error) {
      console.error('Google registration error:', error)
    } finally {
      isLoading.value = false
    }
  }
  
  const handleLogin = (): void => {
    router.push('/login')
  }
  
  const clearErrors = (): void => {
    Object.keys(errors).forEach(key => {
      delete errors[key as keyof FormErrors]
    })
  }
  
  import { watch } from 'vue'
  
  watch([() => formData.email, () => formData.password, () => formData.full_name, () => formData.profile_image, confirmPassword], () => {
    clearErrors()
  })
  </script>