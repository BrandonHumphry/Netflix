import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

// common base url for image in movies object
const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  // a snippet of code which runs based on a specific conditon
  useEffect(() => {
    // if [], run once when row loads, and don't run again
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // check the console log to see structure of data getting back
      // console.log(request)
      // console log again the object
      console.log(request.data.results);
      // setMovies to the data we got for the movies
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>

      {/* create a contaner to be able to hold and scroll posters */}
      <div className="row_posters">
        {/* container -> movie posters, map over movies and pull out poster image for each */}
        {movies.map(movie => (
          <img
            key={movie.id}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
