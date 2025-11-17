import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from "./Home.jsx";
import About from "./About.jsx";
import ApiAdvice from "./ApiAdvice.jsx";
import "./App.css";

function App () {
    return (
    < >
        <BrowserRouter>
            <nav>
                <Link to = "/" className="nav-btn">Home</Link>
                <Link to = "/about" className="nav-btn">About</Link>
                <Link to ="/advice" className="nav-btn" >Advice</Link>
            </nav>
            
          
            <Routes>
                <Route path = "/" element={<Home />}/>
                <Route path = "/about" element={<About />}/>
                <Route path = "/advice" element={<ApiAdvice />}/>
            </Routes>
          
        </BrowserRouter>
    </>
    );
}
export default App;