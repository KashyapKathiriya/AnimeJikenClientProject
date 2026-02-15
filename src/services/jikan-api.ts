import type { SearchResponse } from '../types/anime';

const API_BASE_URL = "https://api.jikan.moe/v4";

async function fetchData<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if(!response.ok) {
        throw new Error(`API Error: status - ${response.status}, message - ${response.statusText}`)
    }
    return response.json();
}

export const animeService = {
    getTopAnime: async (): Promise<SearchResponse> => {
        return fetchData<SearchResponse>("/top/anime");
    },
    searchAnime: async (query: string, sortBy?: string): Promise<SearchResponse> => {
        const safequery = encodeURIComponent(query);
        if(sortBy) {
            return fetchData<SearchResponse>(`/anime?q=${safequery}&order_by=${sortBy}&sort=desc`);
        } else {
            return fetchData<SearchResponse>(`/anime?q=${safequery}`);
        }
    },
}