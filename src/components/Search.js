import {useState} from "react";
import './Search.css'
import {Link, useNavigate} from "react-router-dom";

export const Search = () => {
    const [place, setPlace] = useState('')
    const navigate = useNavigate()

    function FormSubmit(e) {
        e.preventDefault()
        navigate(`/place/${place}`)
    }

    return (
        <div className="searchForm">
            <form id="searchForm" onSubmit={FormSubmit}>
                <input
                    id="search"
                    type="text"
                    placeholder="Search a place"
                    value={place}
                    onChange={e => setPlace(e.target.value)}
                />
                <Link to={`/place/${place}`} className="searchBtn">
                    <span className="material-icons-round searchIcon">
                        search
                    </span>
                </Link>
            </form>
        </div>
    )
}