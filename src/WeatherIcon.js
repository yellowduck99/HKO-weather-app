import Descriptions from "./Descriptions";
import styled from "@emotion/styled";

const Image = styled.img`
    width: 5em;
    height: 5em;
`
const Description = styled.div`
    font-size: 14px;
    color: ${({theme}) => theme.textColor };

`
const Main = styled.div`
    display: flex;
    flex-direction:column;
    margin-bottom: 25px;
    align-items: center;
`

const WeatherIcon = (props) => {

    const {weatherIcon} = props

    return(
        <Main>
        <Image src={Descriptions[weatherIcon].icon}
        alt={Descriptions[weatherIcon].text} />
        <Description>{Descriptions[weatherIcon].text}</Description>
        </Main>
    )
}

export default WeatherIcon;
