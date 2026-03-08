// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pokemon-center-backend.vercel.app/api';

// HTTP Client
export const apiClient = {
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
        }
        throw new Error(errorData.message || 'Request failed');
      }

      // Handle 204 No Content responses
      if (response.status === 204) {
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{ user: any; access_token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async register(email: string, password: string) {
    return this.request<{ user: any; access_token: string }>('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  },

  // Pokemon endpoints
  async getPokemon(token: string) {
    return this.request<any[]>('/api/pokemon', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  async createPokemon(data: any, token: string) {
    return this.request<any>('/api/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  },

  async updatePokemon(id: string, data: any, token: string) {
    return this.request<any>(`/api/pokemon/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  },

  async deletePokemon(id: string, token: string) {
    return this.request(`/api/pokemon/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Users endpoints
  async getUsers(token: string) {
    return this.request<any[]>('/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

export type { ApiResponse, LoginResponse, Pokemon, CreatePokemonRequest } from './types';
