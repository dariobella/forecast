import {useState} from "react";
import './Search.css'
import {Link, useNavigate} from "react-router-dom";

export const Search = (props) => {
    const [place, setPlace] = useState(props.place || '')
    const navigate = useNavigate()

    function FormSubmit(e) {
        e.preventDefault()
        navigate(`/place/${place}`)
    }

    return (
        <div className={props.className || 'large'}>
            <form id="searchForm" onSubmit={FormSubmit}>
                <input
                    id="search"
                    type="text"
                    placeholder="Cerca un luogo"
                    value={place}
                    onChange={e => setPlace(e.target.value)}
                />
                <button type="submit" className="searchBtn">
                    <span className="material-icons-round searchIcon">
                        search
                    </span>
                </button>
            </form>
        </div>
    )
}