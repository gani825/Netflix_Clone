import { useEffect, useState } from "react";
import { BASE_URL, API_KEY, IMAGE_URL } from "../../api/api";
import "./MovieRow.css";

const MovieRow = ({ title, setSelectedMovie, fetchUrl }) => {
    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {
        try {
            const res = await fetch(`${BASE_URL}${fetchUrl}?api_key=${API_KEY}&language=ko-KR`);
            const data = await res.json();
            setMovies(data.results);
        } catch (e) {
            console.log("영화 로딩 실패", e);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <section className="movie-row">
            <h2>{title}</h2>

            <div className="movie-list">
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        src={`${IMAGE_URL}${movie.poster_path || movie.backdrop_path}`}
                        alt={movie.title}
                        className="movie-card"
                        onClick={() => setSelectedMovie(movie)}
                    />
                ))}
            </div>
        </section>
    );
};

export default MovieRow;
