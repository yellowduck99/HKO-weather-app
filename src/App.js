import WeatherApp from './WeatherApp';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react'
import Theme from "./Theme"
import ChoseTheme from './ChoseTheme';
import { useState } from 'react';

const Wrap = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
    background-color: ${({ theme }) => theme.backgroundColor};
`

const App = () => {

    const [currentTheme, setCurrentTheme] = useState('light')
    const handleClick = (e) => {
        let theme = e.target.checked ? 'dark' : 'light'
        setCurrentTheme(theme)
    }


    return(
       
        <ThemeProvider theme={Theme[currentTheme]} >
            <ChoseTheme handleClick={handleClick} />
            <Wrap>
                <WeatherApp LOCATION='Sha Tin' />
                <WeatherApp LOCATION='Chek Lap Kok' />
            </Wrap>
        </ThemeProvider>
       
    )
}

export default App;