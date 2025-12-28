import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import { API_KEY, BASE_URL, IMAGE_URL } from "./api/api";

function App() {
    return (
        <>
            <Navbar />
            <Home />
        </>
    );
}

export default App;
