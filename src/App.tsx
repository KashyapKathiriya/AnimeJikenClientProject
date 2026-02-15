import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import type { Anime } from "./types/anime";
import { animeService } from "./services/jikan-api";

function App() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [Loading, setLoading] = useState(true);

  const [currentQuery, setCurrentQuery] = useState("");
  const [orderCriteria, setOrderCriteria] = useState("members");
  const [sortOrder, setSortOrder] = useState("desc")

  const fetchData = async (query?: string, sort?: string,) => {
    try {
      let result;
      if (query && query.trim().length > 0) {
        result = await animeService.searchAnime(query, sort);
        console.log("seacrh query: " + query + "sortby: " + sort);
        console.log(result.data);
      } else {
        result = await animeService.getTopAnime();
        console.log(result.data);
      }
      setAnimeList(result.data || []);
    } catch (error) {
      console.error("Error fetching the anime list: " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => fetchData(), 500);
  }, []);

  const handleSearch = (query: string) => {
    setCurrentQuery(query);
    fetchData(query, orderCriteria);
  };

  const handleOrderChange = (newSort: string) => {
    setOrderCriteria(newSort);
    if (newSort) {
      fetchData(currentQuery, newSort);
    }
  };
  return (
    <>
      <Header onSearch={handleSearch} onOrderChange={handleOrderChange} />
      <HomePage animeList={animeList} loading={Loading} />
    </>
  );
}

export default App;
