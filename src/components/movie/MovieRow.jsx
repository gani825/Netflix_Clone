import {useEffect, useState, useRef} from "react";
import {BASE_URL, API_KEY, IMAGE_URL} from "../../api/api";
import "./MovieRow.css";

const MovieRow = ({title, setSelectedMovie, fetchUrl, customMovies, showRank = false}) => {
    const [movies, setMovies] = useState([]);
    const rowRef = useRef();
    const [page, setPage] = useState(0);
    const [maxPage, setMaxPage] = useState(0);

    const fetchMovies = async () => {
        try {
            if (customMovies) {
                setMovies(customMovies);
                return;
            }

            const res = await fetch(
                `${BASE_URL}${fetchUrl}?api_key=${API_KEY}&language=ko-KR`
            );
            const data = await res.json();
            setMovies(data.results);
        } catch (e) {
            console.log("영화 로딩 실패", e);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [customMovies]);

    useEffect(() => {
        if (!rowRef.current) return;
        const container = rowRef.current;
        const pageCount = Math.ceil(container.scrollWidth / container.clientWidth);
        setMaxPage(pageCount - 1);
    }, [movies]);

    useEffect(() => {
        if (!rowRef.current) return;

        if (showRank) {
            setMaxPage(1); // TOP10이면 무조건 0,1 → 2페이지
            return;
        }

        const container = rowRef.current;
        const pageCount = Math.ceil(container.scrollWidth / container.clientWidth);
        setMaxPage(pageCount - 1);
    }, [movies]);


    const slideLeft = () => {
        const container = rowRef.current;
        container.scrollLeft -= container.clientWidth;
        setPage(prev => Math.max(prev - 1, 0));
    };

    const slideRight = () => {
        const container = rowRef.current;
        container.scrollLeft += container.clientWidth;
        setPage(prev => Math.min(prev + 1, maxPage));
    };

    const handlePageClick = (targetPage) => {
        const container = rowRef.current;
        container.scrollLeft = container.clientWidth * targetPage;
        setPage(targetPage);
    };

    const displayMovies = showRank ? movies.slice(0, 10) : movies;

    return (
        <section className="movie-row">
            <h2>{title}</h2>

            <div className="slider-wrapper">
                {page > 0 && (
                    <button className="slide-btn left" onClick={slideLeft}>‹</button>
                )}

                <div
                    className={`movie-list ${showRank ? "top10-list" : ""}`}
                    ref={rowRef}
                >
                    {displayMovies.map((movie, idx) => (
                        <div className="rank-card" key={movie.id}>
                            {showRank && <span className="rank-big">{idx + 1}</span>}

                            <div className="movie-card-wrapper">
                                <img
                                    src={
                                        showRank
                                            ? `${IMAGE_URL}${movie.poster_path}`
                                            : `${IMAGE_URL}${movie.backdrop_path || movie.poster_path}`
                                    }
                                    alt={movie.title}
                                    className="row-movie-card"
                                    onClick={() => setSelectedMovie(movie)}
                                />

                                {!showRank && (
                                    <div className="movie-title">
                                        {movie.title || movie.name}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>


                {page < maxPage && (
                    <button className="slide-btn right" onClick={slideRight}>›</button>
                )}
            </div>

            <div className="page-indicator">
                {Array.from({length: maxPage + 1}).map((_, idx) => (
                    <div
                        key={idx}
                        className={`bar ${idx === page ? "active" : ""}`}
                        onClick={() => handlePageClick(idx)}
                    />
                ))}
            </div>

        </section>
    );
};

export default MovieRow;
