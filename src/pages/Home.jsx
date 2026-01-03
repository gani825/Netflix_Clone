import { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Banner from "../components/banner/Banner";
import MovieRow from "../components/movie/MovieRow";
import Modal from "../components/movie/Modal";
import { BASE_URL, API_KEY } from "../api/api";

const Home = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    //공통 정제 함수
    const bannedCountries = ["IN", "ID", "RU", "TR"];

    const cleanList = list =>
        list.filter(item =>
            item.poster_path &&
            (item.title || item.name) &&
            item.overview &&
            (
                item.original_language === "ko" ||
                item.original_language === "en"
            ) &&
            !bannedCountries.includes(item.origin_country?.[0])
        );


    // 검색 기능
    useEffect(() => {
        if (!searchText) {
            setSearchResults([]);
            return;
        }

        const fetchSearch = async () => {
            const res = await fetch(
                `${BASE_URL}/search/multi?api_key=${API_KEY}&language=ko-KR&query=${searchText}`
            );
            const data = await res.json();

            setSearchResults(cleanList(data.results || []));
        };

        fetchSearch();
    }, [searchText]);


    return (
        <div style={{ background: "#111", minHeight: "100vh" }}>
            <Navbar setSearchText={setSearchText} />

            {/* 검색 결과 있을 때 */}
            {searchResults.length > 0 ? (
                <MovieRow
                    title={`"${searchText}" 검색 결과`}
                    customMovies={searchResults}
                    setSelectedMovie={setSelectedMovie}
                />
            ) : (
                <>
                    <Banner setSelectedMovie={setSelectedMovie} />

                    <MovieRow
                        title="오늘의 인기콘텐츠"
                        fetchUrl="/trending/movie/week"
                        setSelectedMovie={setSelectedMovie}
                    />

                    <MovieRow
                        title="높은 평점 콘텐츠"
                        fetchUrl="/movie/top_rated"
                        setSelectedMovie={setSelectedMovie}
                    />

                    <MovieRow
                        title="오늘 대한민국의 TOP 10 시리즈"
                        fetchUrl="/tv/popular"
                        setSelectedMovie={setSelectedMovie}
                        showRank
                        rowType="top10"
                    />

                    <MovieRow
                        title="지금 뜨는 콘텐츠"
                        fetchUrl="/movie/popular"
                        setSelectedMovie={setSelectedMovie}
                    />

                    <MovieRow
                        title="넷플릭스 오리지널"
                        fetchUrl="/discover/tv"
                        setSelectedMovie={setSelectedMovie}
                    />
                </>
            )}

            {selectedMovie && (
                <Modal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
            )}
        </div>
    );
};

export default Home;
