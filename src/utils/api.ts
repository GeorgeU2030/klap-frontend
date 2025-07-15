import { useAuthStore } from '@/stores/auth'

export class ApiClient {
    private baseURL: string
    private authStore: ReturnType<typeof useAuthStore> | null = null

    constructor(baseURL: string) {
        this.baseURL = baseURL
    }

    private getAuthStore() {
        if (!this.authStore) {
            this.authStore = useAuthStore()
        }
        return this.authStore
    }

    async request(endpoint: string, options: RequestInit = {}): Promise<Response> {
        const url = `${this.baseURL}${endpoint}`
        const authStore = this.getAuthStore()

        const makeRequest = async (token?: string) => {
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
                ...(options.headers as Record<string, string>),
            }

            if (token) {
                headers.Authorization = `Bearer ${token}`
            }

            return fetch(url, {
                ...options,
                headers,
                credentials: 'include', 
            })
        }

        let response = await makeRequest(authStore.accessToken || undefined)

        if (response.status === 401 && authStore.accessToken && !authStore.isRefreshing) {
            const refreshSuccess = await authStore.refreshToken()

            if (refreshSuccess) {
                response = await makeRequest(authStore.accessToken || undefined)
            } else {
                authStore.clearAuth()
            }
        }

        return response
    }

    async get(endpoint: string, options: RequestInit = {}) {
        return this.request(endpoint, { ...options, method: 'GET' })
    }

    async post(endpoint: string, data?: any, options: RequestInit = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        })
    }

    async put(endpoint: string, data?: any, options: RequestInit = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        })
    }

    async delete(endpoint: string, options: RequestInit = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' })
    }
}

export const apiClient = new ApiClient(import.meta.env.VITE_API_URL)

export const api = {
    get: (endpoint: string, options?: RequestInit) => apiClient.get(endpoint, options),
    post: (endpoint: string, data?: any, options?: RequestInit) => apiClient.post(endpoint, data, options),
    put: (endpoint: string, data?: any, options?: RequestInit) => apiClient.put(endpoint, data, options),
    delete: (endpoint: string, options?: RequestInit) => apiClient.delete(endpoint, options),
}