import type { Anime } from "../types/anime";

interface HomePageProps {
  animeList: Anime[];
  loading: boolean;
}

export function HomePage({ animeList, loading }: HomePageProps) {
  if (loading) {
    return <div className="container text-center">Loading anime...</div>;
  }
  return (
    <div className="container">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th className="text-center" style={{ width: "55px" }}>
              Rank
            </th>
            <th style={{ width: "auto" }}>Title</th>
            <th className="text-center" style={{ width: "300px" }}>
              Genres
            </th>
            <th className="text-center" style={{ width: "120px" }}>
              Type
            </th>
            <th className="text-center" style={{ width: "100px" }}>
              Score
            </th>
            <th className="text-center" style={{ width: "200px" }}>
              Completed
            </th>
          </tr>
        </thead>
        <tbody>
          {animeList.map((anime) => (
            <tr className="table-body-row" key={anime.mal_id}>
              <td className="text-center">{anime.rank ?? "N/A"}</td>
              <td className="title-cell">
                <div className="flex-container">
                  <div>
                    <img
                      src={anime.images.webp.image_url}
                      alt={anime.title}
                      style={{
                        width: "50px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>{anime.title}</div>
                    <div style={{ color: "gray" }}>
                      Episodes: {anime.episodes}
                    </div>
                    <div style={{ color: "gray" }}>
                      Members: {anime.members}
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-center">
                {anime.genres.map((g) => g.name).join(", ")}
              </td>
              <td className="text-center">{anime.type}</td>
              <td className="text-center">{anime.score}</td>
              <td className="text-center">{anime.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
