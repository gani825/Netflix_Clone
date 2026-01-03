import { useEffect, useState } from "react";
import { API_KEY, BASE_URL, IMAGE_URL } from "../../api/api";
import "./Banner.css";

const Banner = ({ setSelectedMovie, fetchUrl, children }) => {
    const [movie, setMovie] = useState(null);

    const fetchBannerMovie = async () => {
        try {
            const res = await fetch(
                `${BASE_URL}${fetchUrl || "/trending/all/week"}?api_key=${API_KEY}&language=ko-KR`
            );

            const data = await res.json();

            const randomIndex = Math.floor(Math.random() * data.results.length);
            setMovie(data.results[randomIndex]);
        } catch (error) {
            console.log("배너 불러오기 실패", error);
        }
    };

    useEffect(() => {
        fetchBannerMovie();
    }, []);

    return (
        <header
            className="banner"
            style={{
                backgroundImage: `url(${IMAGE_URL}${movie?.backdrop_path})`,
            }}
        >
            {movie && (
                <div className="banner-contents">

                    {/* 🔥🔥 여기 추가 = Series에서 보낸 UI 표시 */}
                    {children}

                    <h1>{movie.title || movie.name || movie.original_name}</h1>

                    <p>
                        {movie?.overview
                            ? movie.overview.slice(0, 200) + "..."
                            : "설명이 준비되지 않은 콘텐츠입니다."}
                    </p>

                    <div className="banner-buttons">
                        <button>▶ 재생</button>
                        <button onClick={() => setSelectedMovie(movie)}>
                            ⓘ 상세 정보
                        </button>
                    </div>
                </div>
            )}

            <div className="banner-fadeBottom"></div>
        </header>
    );
};

export default Banner;
