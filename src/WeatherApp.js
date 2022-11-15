import styled from "@emotion/styled"
import { useState, useEffect, useCallback } from "react"
import WeatherIcon from "./WeatherIcon"
import RefreshButton from "./Refreash"

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const WeatherCard = styled.div`
    position: relative;
    min-width: 360px;
    box-shadow: ${({theme}) => theme.boxShadow };
    background-color: ${({theme}) => theme.cardColor };
    box-sizing: border-box;
    padding: 30px 15px;
    display: flex;
    justify-content:space-between;
    align-items: center;
`

const Location = styled.div`
    font-size: 18px;
    color: ${({theme}) => theme.textColor };
    font-weight: bold;
`
const TempRange = styled.div`
    font-size: 15px;
    color: ${({theme}) => theme.textColor };
`
const CurrentTemp = styled.div`
    font-size: 24px;
    color: ${({theme}) => theme.textColor };
    font-weight: bold;
`

const Humid = styled.div`
    font-size: 20px;
    color: ${({theme}) => theme.textColor };
    font-weight: bold;
`

const Rainfall = styled.div`
    font-size: 14px;
    color: ${({theme}) => theme.textColor };
`

const Text = styled.div`

`

const Graph = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const Datetime = styled.div`
    font-size: 14px;
    color: ${({theme}) => theme.textColor };
`

//return whole fetch promise to Promise.all
const fetchCurrent = (LOCATION) => {
    const CURRENT = 'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en'
    return (
        fetch(CURRENT)
            .then(res => res.json())
            .then(data => {
                // destructure json from array[0]
                // filter the specific location temp
                let [temp] = data.temperature.data.filter(json => json.place === LOCATION)
                return ({
                    updateTime: data.updateTime,
                    currentTemp: temp['value'],
                    humidity: data.humidity.data[0]['value'],
                    weatherIcon: data.icon[0]
                })
            })
    )
}
//return whole fetch promise to Promise.all
const fetchForecast = () => {
    const FORECAST = 'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en'
    return (
        fetch(FORECAST)
            .then(res => res.json())
            .then(data => {
                return ({
                    tempRange: `${data.weatherForecast[0]['forecastMintemp']['value']}-${data.weatherForecast[0]['forecastMaxtemp']['value']}`,
                    rainfall: data.weatherForecast[0]['PSR']
                })
            })
    )
}

const WeatherApp = (props) => {

    //const LOCATION = 'Sha Tin'
    const {LOCATION} = props;

    const [weather, setWeather] = useState({
        updateTime: '2022-11-11T10:02:00+08:00',
        currentTemp: 0,
        humidity: 67,
        weatherIcon: 51,
        tempRange: '23-29',
        rainfall: 'low',
        isLoading: true,
    })
    let lastUpdateStr = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
    }).format(new Date(weather.updateTime))

    const fetchData = useCallback (() => {
        const fetchingData = async () => {

            console.log('fetching data')
            const [currentWeather, forecastWeather] = await Promise.all([
                fetchCurrent(LOCATION),
                fetchForecast()
            ])
            setWeather({
                ...currentWeather,
                ...forecastWeather,
                isLoading: false,
            })
        }

        setWeather(prevState => {
            return {
                ...prevState,
                isLoading:true,
            }
        })

        fetchingData()
    },[LOCATION])

    useEffect(() => {
        fetchData()
    },[fetchData])

    return (
        <Container >
            {weather.isLoading?console.log('loading'):''}
            <WeatherCard >
                <Text>
                <Location>{LOCATION}</Location>
                <TempRange>{`${weather.tempRange}°C`}</TempRange>
                <CurrentTemp>{`${weather.currentTemp}°C`}</CurrentTemp>
                <Humid>{`${weather.humidity}%`}</Humid>
                <Rainfall>{weather.rainfall}</Rainfall>
                <Datetime>{`Last update: ${lastUpdateStr}`}</Datetime>
                </Text>
                <Graph>
                    <WeatherIcon weatherIcon={weather.weatherIcon} />
                    <RefreshButton onClick={fetchData} 
                    isLoading={weather.isLoading} />
                </Graph>
            </WeatherCard>

        </Container>
    )
}

export default WeatherApp
