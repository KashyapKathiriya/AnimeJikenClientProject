import { useEffect, useState } from "react";
import type { Anime } from "../types/anime";

export function HomePage() {
    const [animeList, setAnimeList] = useState<Anime[]>([]);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.jikan.moe/v4/top/anime");
                const result = await response.json();
                const top15 = result.data.slice(0, 15);
                setAnimeList(top15);
            } catch (error) {
                console.error("Error fetching the anime list: " + error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (Loading)
        return <div className="container text-center">Loading top anime...</div>;
    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: "60px" }}>Rank</th>
                        <th style={{ width: "auto" }}>Title</th>
                        <th style={{ width: "300px" }}>Genres</th>
                        <th style={{ width: "120px" }}>Type</th>
                        <th style={{ width: "100px" }}>Score</th>
                        <th style={{ width: "200px" }}>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {animeList.map((anime) => (
                        <tr className="table-body-row" key={anime.mal_id}>
                            <td>{anime.rank ?? "N/A"}</td>
                            <td className="title-cell">
                                <div className="flex-container">
                                    <div>
                                        <img
                                            src={anime.images.webp.image_url}
                                            alt={anime.title}
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                borderRadius: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <div>{anime.title}</div>
                                        <div style={{ color: "gray" }}>
                                            Episodes: {anime.episodes}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>{anime.genres.map((g) => g.name).join(", ")}</td>
                            <td>{anime.type}</td>
                            <td>{anime.score}</td>
                            <td>{anime.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
