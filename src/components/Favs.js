import {useContext} from "react";
import FavsContext from "../FavsContext";

import './Favs.css'
import {useNavigate} from "react-router-dom";

export const Favs = (props) => {
    const { favs, toggleFav } = useContext(FavsContext)
    const navigate = useNavigate()

    return (
        <div className="favs">
            <div className="favWrap">
                <h1>Favourites</h1>
                <div className="favsList">
                    {
                        favs.map((f, i) => {
                            return  <div className={`fav ${ i === favs.length -1 ? 'lastFav' : '' }`} key={i}>
                                <div className="favName" onClick={() => { navigate(`/place/${f}`) }} >{f}</div>
                                <button onClick={() => {toggleFav(f)}}>
                                        <span className="material-symbols-rounded favDelete">
                                            close
                                        </span>
                                </button>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}