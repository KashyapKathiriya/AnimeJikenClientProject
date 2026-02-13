// Core anime interface
export interface Anime {
    mal_id: number;
    title: string;
    title_english?: string;
    title_japanese?: string;
    images: {
        jpg: { image_url: string; large_image_url: string; };
        webp: { image_url: string; large_image_url: string; };
    };
    synopsis: string;
    type: string; // TV, Movie, OVA, etc.
    episodes: number | null;
    status: string;
    aired: { from: string; to: string; };
    score: number;
    scored_by: number;
    rating: string; // PG-13, R, etc.
    genres: Genre[];
    rank: number | null;
    // studios: Studio[];
    trailer?: { youtube_id: string; };
}

export interface Genre {
    mal_id: number;
    name: string;
}

// Search response
export interface SearchResponse {
    data: Anime[];
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
        current_page: number;
        items: { count: number; total: number; per_page: number; };
    };
}