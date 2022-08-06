import img from '../img/img'
import './Day.css'

export const Day = (props) => {

    return (
        <div className={`day ${props.selected}`}>
            <div className="date">{props.date}</div>
            <div className="weather">
                <img src={img(props.weathercode)} />
            </div>
            <div className="T">
                <div className="minT">{props.minT}°</div>
                <div className="maxT"v>{props.maxT}°</div>
            </div>
        </div>
    )
}