import './Navbar.css'
import {Link} from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/">Weather Forecast</Link>
        </nav>
    )
}