import "./Modal.css";

const Modal = ({movie, onClose}) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>

                <button className="close" onClick={onClose}>✖</button>

                <img
                    className="modal-poster"
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt=""
                />

                <div className="modal-info">
                    <h1>{movie.title || movie.name}</h1>

                    <p>{movie.overview || "설명이 없습니다."}</p>

                    <button className="play">▶ 재생</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
