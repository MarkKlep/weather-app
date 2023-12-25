import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import styles from './ForecastWeather.module.css';

const WEEK_DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

const ForecastWeather = ({ data }) => {

    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat( WEEK_DAYS.slice(0, dayInAWeek));
    console.log(data);
    return (
        <div className={styles.container}>
            <label className={styles.title}>Daily Forecast</label>
            <Accordion allowZeroExpanded>
                {
                    data.list.slice(0, 7).map((item, index) => (
                        <AccordionItem key={index}>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    <div className={styles.dailyItem}>
                                        <img src={`icons/${item.weather[0].icon}.png`} alt="weather" className={styles.weatherIcon} />
                                        <label className={styles.day}>
                                            {forecastDays[index]}
                                        </label>
                                        <label className={styles.description}>
                                            {item.weather[0].description}
                                        </label>
                                        <label className={styles.minMax}>
                                            {item.main.temp_min}°C / {item.main.temp_max}°C
                                        </label>
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>

                            <AccordionItemPanel>
                                <div className={styles.detailsContainer}>
                                    <div className={styles.details}>
                                        <label>Feels like: {item.main.feels_like}°C</label>
                                        <label>Pressure: {item.main.pressure}hPa</label>
                                        <label>Humidity: {item.main.humidity}%</label>
                                    </div>
                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                    ))
                }
            </Accordion>
        </div>
    );
}

export default ForecastWeather;
