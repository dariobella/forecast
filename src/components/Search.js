import {useState, useEffect, useRef, useContext} from "react"
import {useNavigate} from "react-router-dom"

import FavsContext from "../FavsContext"
import './Search.css'

export const Search = (props) => {
    const { favs } = useContext(FavsContext)
    const [place, setPlace] = useState(props.place || '')
    const [autocomplete, setAutocomplete] = useState([])
    const [autocompleteClick, setAutocompleteClick] = useState(props.autocompleteClick || false)
    const navigate = useNavigate()
    const searchInput = useRef()

    useEffect(() => {
        const fetchAutocomplete = async () => {
            const requestAutocomplete = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${place}&language=it`).then(res => res.json())
            setAutocomplete(requestAutocomplete.results)
        }
        fetchAutocomplete()
    }, [place])

    function FormSubmit(e) {
        e.preventDefault()
        if (autocompleteClick) {
            navigate(`/place/${place}`)
        }
    }

    function autocompleteBtnClick(p) {
        setPlace(p)
        setAutocompleteClick(true)
        searchInput.current.focus()
    }

    function searchChange(v) {
        setPlace(v)
        setAutocompleteClick(false)
    }

    return (
        <div className={props.className || 'large'}>
            <div className="container">
                <form id="searchForm" autoComplete="off" onSubmit={FormSubmit}>
                    <input
                        ref={searchInput}
                        id="search"
                        type="text"
                        placeholder={props.placeholder || 'Cerca un luogo'}
                        value={place}
                        onChange={e => searchChange(e.target.value)}
                    />
                    <button type="submit" className="searchBtn">
                        <span className={`material-symbols-rounded ${autocompleteClick ? 'searchIcon' : 'searchIconDisabled'}`}>
                            search
                        </span>
                    </button>
                </form>
                <div className={`autocomplete ${autocompleteClick ? 'hideAutocomplete' : ''}`}>
                    {
                        autocomplete?.map((r) => {
                            return  <button className="autocompleteResult" onClick={() => autocompleteBtnClick(r.name)} key={r.id}>
                                        <div className="left"></div>
                                        <div className="center">{r.name}</div>
                                        <div className="right">
                                            { favs.includes(r.name) && <span className="material-symbols-rounded">favorite</span> }
                                        </div>
                                    </button>
                        })
                    }
                </div>
            </div>
        </div>
    )
}