import {Link, useNavigate} from "react-router-dom";
import './Navbar.css'

export const Navbar = () => {

    const navigate = useNavigate()

    return (
        <nav className="navbar">
            <div className="left"> <button className="backBtn" onClick={() => { navigate(-1) }}> <span className="material-symbols-rounded"> arrow_back </span> </button> </div>
            <Link className="center" to="/">Previsioni del tempo</Link>
            <Link className="right" to="/favs"> <span className="material-symbols-rounded">favorite</span> </Link>
        </nav>
    )
}