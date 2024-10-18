// import React from 'react';
// import './MovieCard.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


// const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type, Genre, Director, Actors, Language, imdbRating, BoxOffice } }) => {
//   return (
//     // <div className='movie-card' key={imdbID}>
//     //   <img src={Poster} alt={Title} className="movie-image"/>
//     //   <div className="movie-details">
//     //     <h2>{Title} ({Type}) ({Year})</h2>
//     //     <p><strong>Genre:</strong> {Genre}</p>
//     //     <p><strong>Director:</strong> {Director}</p>
//     //     <p><strong>Cast:</strong> {Actors}</p>
//     //     <p><strong>Language:</strong> {Language}</p>
//     //     <p><strong>IMDb Rating:</strong> {imdbRating}/10</p>
//     //     <p><strong>Box Office:</strong> {BoxOffice}</p>
//     //   </div>
//     // </div>

//     <div className="card">
//         <img src={Poster} className='card-img-top' alt={Title} />
//         <div className="card-body">
//           <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//         </div>
//     </div>
//   );
// };

// export default MovieCard;

import React from 'react';
import './MovieCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Runtime, Genre, Director, Actors, Language, imdbRating, BoxOffice } }) => {
    return (
        <div className="col-md-3" key={imdbID}>
            <div className="card movie-card mt-4">
                <div className="poster-container">
                    <img src={Poster} className="card-img-top" alt={Title} />
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
                    <p className="card-text"><strong>BoxOffice:</strong> {BoxOffice}</p>

                </div>
            </div>
        </div>
    );
};

export default MovieCard;
