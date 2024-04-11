import { PagePopUp } from "./pages/PopUp";
import { PageSchema } from "./pages/Schema";
import {
    HashRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import './App.css'

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<PagePopUp />} />
                    <Route path="/schema" element={<PageSchema />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App
