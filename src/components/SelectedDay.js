import './SelectedDay.css'
import img from "../img/img";

export const SelectedDay = (props) => {

    const weatherCodes = {
        0: 'sereno',
        1: 'prevalentemente sereno',
        2: 'nuvoloso',
        3: 'coperto',
        45: 'nebbia',
        48: 'nebbia gelata',
        51: 'pioviggine leggera',
        53: 'pioviggine',
        55: 'pioviggine',
        56: 'pioviggine gelata',
        57: 'pioviggine gelata',
        61: 'pioggia leggera',
        63: 'pioggia',
        65: 'pioggia intensa',
        66: 'pioggia gelata',
        67: 'pioggia gelata',
        71: 'nevicata leggera',
        73: 'nevicata',
        75: 'nevicata intensa',
        77: 'nevicata granulosa',
        80: 'rovesci leggeri',
        81: 'rovesci',
        82: 'rovesci violenti',
        85: 'rovesci di neve',
        86: 'rovesci di neve',
        95: 'temporale',
        96: 'temporale con grandine',
        99: 'temporale con grandine',
    }

    return (
        <div className="selectedDay">
            <table>
                <thead>
                    <tr>
                        <th>Ora</th>
                        <th></th>
                        <th>Meteo</th>
                        <th>T (°C)</th>
                        <th>Precipitazioni (mm)</th>
                        <th>Vento (km/h)</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.weather?.map((w, i) => {
                        if (i % 2 === 0) {
                            return  <tr key={i} className={i}>
                                <td> { w.time } </td>
                                <td className="weatherIcon">
                                    <img src={img(w.weathercode)}/>
                                </td>
                                <td>
                                    <span>{weatherCodes[w.weathercode]}</span>
                                </td>
                                <td> { w.T }° </td>
                                <td> { w.precipitation } </td>
                                <td> { w.wind } </td>
                            </tr>
                        }
                    })
                }
                </tbody>
            </table>
        </div>
    )
}