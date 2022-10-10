import React, { useEffect, useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import InputMovies from "./components/InputMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoding, seLoding] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    detchMovieHandler();
  }, []);

  const detchMovieHandler = async () => {
    seLoding(true);
    try {
      const response = await fetch(
        "https://react-http-75eb7-default-rtdb.firebaseio.com/films.json"
      );
      if (!response.ok) throw new Error("SomeThing wents wrong ...Retrying");
      const data = await response.json();

      const transform = [];
      for (const key in data) {
        transform.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(transform);
      seLoding(false);
    } catch (e) {
      seLoding(false);
      console.log(e.message);
    }
  };

  const addHandler = async (data) => {
    console.log("Start Post");
    const response = await fetch(
      "https://react-http-75eb7-default-rtdb.firebaseio.com/films.json",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
    detchMovieHandler();
  };

const removeHandle=async(id)=>{
  const url=`https://react-http-75eb7-default-rtdb.firebaseio.com/films/${id}.json`
  const response = await fetch(url,{
    method:'DELETE'
  })
  console.log(response);
  detchMovieHandler();
}

  let status;
  if (!isLoding && movies.length > 0) {
    status = <MoviesList remove={removeHandle} movies={movies} />;
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
        <InputMovies add={addHandler} />
      </section>
      <section>
        <button onClick={detchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{status}</section>
    </React.Fragment>
  );
}

export default App;
