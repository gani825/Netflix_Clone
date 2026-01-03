import { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Banner from "../components/banner/Banner";
import MovieRow from "../components/movie/MovieRow";
import Modal from "../components/movie/Modal";
import { BASE_URL, API_KEY } from "../api/api";
import "./Series.css";

const Series = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [genrePopular, setGenrePopular] = useState([]);
    const [genreLatest, setGenreLatest] = useState([]);
    const [genreTopRated, setGenreTopRated] = useState([]);
    const [openGenre, setOpenGenre] = useState(false);
    const [selectedGenreName, setSelectedGenreName] = useState("");

    // 검색 상태
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // ------------------ 장르 불러오기 ------------------
    useEffect(() => {
        const fetchGenres = async () => {
            const res = await fetch(
                `${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=ko-KR`
            );
            const data = await res.json();

            const keepList = [
                10759, // Action & Adventure
                16,    // Animation
                35,    // Comedy
                80,    // Crime
                18,    // Drama
                10751, // Family
                9648,  // Mystery
                10765  // Sci-Fi & Fantasy
            ];

            const filtered = data.genres.filter(g => keepList.includes(g.id));

            setGenres(filtered);
        };

        fetchGenres();
    }, []);

    // 장르 선택 리스트
    useEffect(() => {
        if (!selectedGenre) {
            setGenrePopular([]);
            setGenreLatest([]);
            setGenreTopRated([]);
            return;
        }

        const cleanList = list =>
            list.filter(item =>
                item.poster_path &&
                item.name &&
                item.overview
            );

        // 인기 순
        const fetchPopular = async () => {
            const res = await fetch(
                `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=ko-KR&with_genres=${selectedGenre}&sort_by=popularity.desc`
            );
            const data = await res.json();
            setGenrePopular(cleanList(data.results));
        };

        // 최신 순
        const fetchLatest = async () => {
            const today = new Date().toISOString().split("T")[0];

            const res = await fetch(
                `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=ko-KR&with_genres=${selectedGenre}&sort_by=first_air_date.desc&first_air_date.lte=${today}&include_null_first_air_dates=false`
            );

            const data = await res.json();

            setGenreLatest(cleanList(data.results));
        };

        // 추천(평점 높은 순 + 최소 투표수)
        const fetchTopRated = async () => {
            const res = await fetch(
                `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=ko-KR&with_genres=${selectedGenre}&sort_by=vote_average.desc&vote_count.gte=200`
            );
            const data = await res.json();
            setGenreTopRated(cleanList(data.results));
        };

        fetchPopular();
        fetchLatest();
        fetchTopRated();
    }, [selectedGenre]);


    // 검색 기능
    useEffect(() => {
        if (!searchText) {
            setSearchResults([]);
            return;
        }

        const fetchSearch = async () => {
            const res = await fetch(
                `${BASE_URL}/search/tv?api_key=${API_KEY}&language=ko-KR&query=${searchText}`
            );

            const data = await res.json();

            // 홈처럼 깔끔하게 정제
            const filtered = data.results.filter(item =>
                item.poster_path && // 포스터 없는 애 제거
                item.overview &&  // 설명 없는 애 제거
                item.name  // 제목 없는 애 제거
            );

            setSearchResults(filtered);
        };

        fetchSearch();
    }, [searchText]);


    return (
        <div style={{ background: "#111", minHeight: "100vh" }}>
            <Navbar setSearchText={setSearchText} />

            <Banner fetchUrl="/trending/tv/week" setSelectedMovie={setSelectedMovie}>
                <div className="series-banner-header">
                    <h1>시리즈</h1>

                    <div className="genre-box">
                        <button
                            className="genre-btn"
                            onClick={() => setOpenGenre(prev => !prev)}
                        >
                            {selectedGenreName || "장르"} <span>▼</span>
                        </button>

                        {openGenre && (
                            <div className="genre-dropdown">
                                {genres.map(g => (
                                    <span
                                        key={g.id}
                                        onClick={() => {
                                            setSelectedGenre(g.id);
                                            setSelectedGenreName(g.name);
                                            setOpenGenre(false);
                                        }}
                                    >
                                        {g.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Banner>

            {/* ---------------- 검색 우선 표시 ---------------- */}
            {searchResults.length > 0 ? (
                <MovieRow
                    title={`"${searchText}" 검색 결과`}
                    customMovies={searchResults}
                    setSelectedMovie={setSelectedMovie}
                />
            ) : (
                <>
                    {genrePopular.length > 0 && (
                        <>
                            <MovieRow
                                title={`${selectedGenreName} 인기 시리즈`}
                                customMovies={genrePopular}
                                setSelectedMovie={setSelectedMovie}
                            />

                            <MovieRow
                                title={`${selectedGenreName} 최신 시리즈`}
                                customMovies={genreLatest}
                                setSelectedMovie={setSelectedMovie}
                            />

                            <MovieRow
                                title={`${selectedGenreName} 추천 시리즈`}
                                customMovies={genreTopRated}
                                setSelectedMovie={setSelectedMovie}
                            />
                        </>
                    )}
                    />
                    ) : (
                        <>
                            <MovieRow
                                title="지금 뜨는 TV 시리즈"
                                fetchUrl="/tv/popular"
                                setSelectedMovie={setSelectedMovie}
                            />

                            <MovieRow
                                title="평점 높은 시리즈"
                                fetchUrl="/tv/top_rated"
                                setSelectedMovie={setSelectedMovie}
                            />

                            <MovieRow
                                title="오늘의 인기 시리즈"
                                fetchUrl="/trending/tv/week"
                                setSelectedMovie={setSelectedMovie}
                            />
                        </>
                </>
            )}

            {selectedMovie && (
                <Modal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
            )}
        </div>
    );
};

export default Series;
