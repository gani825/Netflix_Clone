import "./MovieCard.css";
import { IMAGE_URL } from "../../api";

const MovieCard = ({ movie, setSelectedMovie }) => {
    return (
        <div
            className="movie-card"
            onClick={() => setSelectedMovie(movie)}
        >
            <img
                src={`${IMAGE_URL}${movie.poster_path || movie.backdrop_path}`}
                alt={movie.title || movie.name}
            />
        </div>
    );
};

export default MovieCard;
