import React from 'react';
import './MovieCard.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Runtime, Genre, Director, Actors, Language, imdbRating } }) => {
    return (
        <div className="col-md-3" key={imdbID}>
            <div className="card movie-card mt-4">

                <div className="poster-container">

                    <img src={Poster !== 'N/A' ? Poster : 'https://via.placeholder.com/150'} className="card-img-top" alt={Title} />
                    <div className="overlay-text-left">{Year}</div>
                    <div className="overlay-text-right">{Language}</div>
                    <div className="overlay-title">{Title}</div>

                </div>

                <div className="card-body">

                    <p className="card-text"><strong>Genre:</strong> {Genre}</p>
                    <p className="card-text"><strong>Runtime:</strong> {Runtime}</p>
                    <p className="card-text"><strong>Actors:</strong> {Actors}</p>
                    <p className="card-text"><strong>Director:</strong> {Director}</p>
                    <p className="card-text"><strong>IMDb Rating:</strong> {imdbRating}/10</p>

                </div>
            </div>
        </div>
    );
};

export default MovieCard;
