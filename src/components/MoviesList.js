import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {

  const removeHandler=(id)=>{
    props.remove(id);
  }

  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          remove={removeHandler.bind(null,movie.id)}
        />
      ))}
    </ul>
  );
};

export default MovieList;
