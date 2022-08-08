import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import { FavsProvider } from './FavsContext'

import './App.css';
import {Navbar} from "./components/Navbar"
import {Search} from "./components/Search"
import {Place} from "./components/Place"
import {Favs} from "./components/Favs";

function App() {
  return (
    <div className="App">
        <FavsProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Search />} />
                    <Route path="/favs" element={<Favs />} />
                    <Route path="/place/:place" element={<Place />} />
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            </Router>
        </FavsProvider>
    </div>
  );
}

export default App;
