import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Series from "./pages/Series";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/series" element={<Series />} />
            </Routes>
        </>
    );
}

export default App;
