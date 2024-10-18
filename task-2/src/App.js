import React, { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import axios from 'axios';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [movieData, setMovieData] = useState([]);
  const [search, setSearch] = useState('');
  const apiKey = 'e34e39ce';

  const getMovieData = (query) => {
    const searchQuery = query ? `&s=${query}` : '&s=batman';
    axios
      .get(`http://www.omdbapi.com/?apikey=${apiKey}${searchQuery}`)

      .then(response => {

        if (response.data.Search) {

          const moviePromises = response.data.Search.map((movie) =>
            axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
          );

          Promise.all(moviePromises)
            .then(responses => {
              const fullMovieDetails = responses.map(res => res.data);
              setMovieData(fullMovieDetails);
            })
            .catch(error => {
              console.error('Error fetching full movie details:', error);
            });
        } else {
          setMovieData([]);
        }
      })

      .catch(error => {

        console.error('Error fetching movie data:', error);
      });
  };


  useEffect(() => {
    getMovieData(search);
  }, [search]);


  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <h1 className='text-center text-light'>Movie App <i class="bi bi-camera-reels"></i></h1>

        <div className="input-group mt-2 p-3 w-50">
        <input className="form-control text-center" placeholder="Search a movie" aria-label="Search a movie" aria-describedby="basic-addon2" onChange={handleInputChange}/>
        <span className="input-group-text" id="basic-addon2"><i class="bi bi-search"></i></span>
        </div>

        <div className="row">
          {movieData.length > 0 ? (
            movieData.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
