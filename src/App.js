import React, { useEffect, useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoding, seLoding] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      seLoding(true);
      try {
        const response = await fetch("https://swapi.dev/api/films/");
        if (!response.ok) throw new Error("SomeThing wents wrong ...Retrying");
        const data = await response.json();

        const transform = data.results.map((movie) => {
          return {
            id: movie.episode_id,
            title: movie.title,
            openingText: movie.opening_crawl,
            releaseDate: movie.release_date,
          };
        });
        console.log(transform);
        setMovies(transform);
        seLoding(false);
      } catch (e) {
        setErr(e.message);
      }
      seLoding(false);
    };

    fetchData();
  }, []);

  const detchMovieHandler = async () => {
    seLoding(true);
    while (true) {
      try {
        const response = await fetch("https://swapi.dev/api/films/");
        if (!response.ok) throw new Error("SomeThing wents wrong ...Retrying");
        const data = await response.json();

        const transform = data.results.map((movie) => {
          return {
            id: movie.episode_id,
            title: movie.title,
            openingText: movie.opening_crawl,
            releaseDate: movie.release_date,
          };
        });
        console.log(transform);
        setMovies(transform);
        seLoding(false);
        break;
      } catch (e) {
        seLoding(false);
        console.log("retry");
        setErr(e.message);
        await setTimeout(() => {}, 5000);
      }
    }
  };

  let status;

  if (!isLoding && movies.length > 0) {
    status = <MoviesList movies={movies} />;
  }
  if (!isLoding && movies.length === 0 && !err) {
    status = <p>Found no movies </p>;
  }
  if (isLoding) {
    status = <p>Loading...</p>;
  }
  if (!isLoding && err) {
    status = <p>{err}</p>;
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={detchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{status}</section>
    </React.Fragment>
  );
}

export default App;
