import ButtonImg from './images/refresh-button.png'
import styled from '@emotion/styled'

const Button = styled.img`
height: 20px;
width: 20px;
filter: ${({theme}) => theme.filter};
cursor: pointer;
`



const RefreshButton = (props) => {

    const {onClick} = props;

    return(
        <Button id='refreash' onClick={onClick}
        src={ButtonImg} alt='' />
    )
}

export default RefreshButton;