import React from 'react';
import styles from "./CurrentWeather.module.css"

const CurrentWeather = ({data}) => {
    return (
        <div className={styles.weather}>
            <div className={styles.top}>
                <div>
                    <p className={styles.city}>{data.city}</p>
                    <p className={styles.weatherDescription}>{data.weather[0].description}</p>
                </div>
                <img src={`icons/${data.weather[0].icon}.png`} alt="weather" className={styles.weatherIcon} />
            </div>
            <div className={styles.bottom}>
                <p className={styles.temperature}>{data.main.temp}°C</p>
                <div className={styles.details}>
                    <div className={styles.parameterRow}>
                        <span className={styles.parameterLabel}>Details</span>
                    </div>

                    <div className={styles.parameterRow}>
                        <span className={styles.parameterLabel}>Feels like</span>
                        <span className={styles.parameterValue}>{data.main.feels_like}°C</span>
                    </div>

                    <div className={styles.parameterRow}>
                        <span className={styles.parameterLabel}>Sea level</span>
                        <span className={styles.parameterValue}>{data.main.sea_level}m</span>
                    </div>

                    <div className={styles.parameterRow}>
                        <span className={styles.parameterLabel}>Humidity</span>
                        <span className={styles.parameterValue}>{data.main.humidity}%</span>
                    </div>

                    <div className={styles.parameterRow}>
                        <span className={styles.parameterLabel}>Pressure</span>
                        <span className={styles.parameterValue}>{data.main.pressure}hPa</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;
