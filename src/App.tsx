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
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchData = async (
    query = currentQuery,
    order = orderCriteria,
    sort = sortOrder,
  ) => {
    try {
      let result;
      if (query && query.trim().length > 0) {
        result = await animeService.searchAnime(query, order, sort);
        console.log(
          "seacrh query: " + query + "  orderby: " + order,
          "  sort: " + sort,
        );
      } else {
        result = await animeService.getTopAnime();
      }
      const validAnime = (result.data || []).filter((anime: Anime) => anime.rank != null);
      console.log(validAnime)
      setAnimeList(validAnime);
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
    fetchData(query, orderCriteria, sortOrder);
  };

  const handleOrderChange = (newOrder: string) => {
    setOrderCriteria(newOrder);
    if (newOrder) {
      fetchData(currentQuery, newOrder, sortOrder);
    }
  };

  const handleSortChange = (newSort: string) => {
    setSortOrder(newSort);
    if (newSort) {
      fetchData(currentQuery, orderCriteria, newSort);
    }
  };
  return (
    <>
      <Header
        onSearch={handleSearch}
        onOrderChange={handleOrderChange}
        onSortChange={handleSortChange}
      />
      <HomePage animeList={animeList} loading={Loading} />
    </>
  );
}

export default App;
