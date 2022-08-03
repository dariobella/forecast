import {useParams} from "react-router-dom";


export const Place = () => {
    let { place } = useParams()
    return (
        <div className="placePage">
            <h1>This is {place}'s place page</h1>
        </div>
    )
}