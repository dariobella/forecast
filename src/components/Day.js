import './Day.css'

export const Day = (props) => {

    return (
        <div className={`day ${props.class}`}>
            <div className="date">{props.date}</div>
            <div className="weather">{props.weather}</div>
            <div className="maxT"v>Max T {props.maxT}°</div>
            <div className="minT">Min T {props.minT}°</div>
        </div>
    )
}