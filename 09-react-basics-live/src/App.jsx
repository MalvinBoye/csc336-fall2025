import { BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import Home from "./Home.jsx";
import About from "./About.jsx";
import ApiAdvice from "./ApiAdvice.jsx";

function App () {
    return (
    < >
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <nav>
                <Link to = "/">Home</Link>
                <Link to = "/">About</Link>
                <Link to ="/" >Advice</Link>
            </nav>
            <Routes>
                <Route path = "/" elememt={<Home/>}/>
                <Route path = "/" elememt={<About/>}/>
                <Route path = "/" elememt={<ApiAdvice/>}/>
                
            </Routes>

        </BrowserRouter>
    </>
    );
}
export default App;