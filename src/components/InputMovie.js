import React, { useRef } from "react";
import classes from "./InputMovie.module.css";

const InputMovies = () => {
  const title = useRef();
  const Opening = useRef();
  const Release = useRef();

  const sumbitHandler = (e) => {
    e.preventDefault();
    const val={
        title:title.current.value,
        Opening:Opening.current.value,
        Release:Release.current.value
    }
    console.log(val);
  };

  return (
    <form className={classes.form} onSubmit={sumbitHandler}>
      <label>Title</label>
      <br />
      <input ref={title} type="text" />
      <br />

      <label>Opening Text</label>
      <br />
      <textarea rows={5} ref={Opening} />
      <br />

      <label>Release Date</label>
      <br />
      <input type="text" ref={Release} />
      <br />

      <button>Add Moive</button>
    </form>
  );
};

export default InputMovies;
