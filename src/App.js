import React, { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoding, seLoding] = useState(false);
  const detchMovieHandler = async () => {
    seLoding(true);
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();

    const transform = data.results.map((movie) => {
      return {
        id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date,
      };
    });

    setMovies(transform);
    seLoding(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={detchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoding && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoding && movies.length===0 && <p>Found no movies </p>}
        {isLoding && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
