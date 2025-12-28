import {useState} from "react";
import Banner from "../components/banner/Banner";
import MovieRow from "../components/movie/MovieRow";
import Modal from "../components/movie/Modal";

const Home = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);

    return (
        <div style={{background: "#111", minHeight: "100vh"}}>
            <Banner setSelectedMovie={setSelectedMovie}/>

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
                title="지금 뜨는 콘텐츠"
                fetchUrl="/movie/popular"
                setSelectedMovie={setSelectedMovie}
            />

            <MovieRow
                title="넷플릭스 오리지널"
                fetchUrl="/discover/tv"
                setSelectedMovie={setSelectedMovie}
            />

            {selectedMovie && (
                <Modal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}
        </div>
    );
};

export default Home;
