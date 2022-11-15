import ButtonImg from './images/refresh-button.png'
import styled from '@emotion/styled'

const Button = styled.img`
height: 20px;
width: 20px;
filter: ${({theme}) => theme.filter};
cursor: pointer;
animation: rotate infinite 1.5s linear;
annimation-duration: ${({isLoading}) => (isLoading?'1.5s':'0s')}
@keyframes rotate {
    from {
        transform: rotate(360deg)
    }
    to{
        transform: rotate(0deg)
    }

}

`



const RefreshButton = (props) => {

    const {onClick,isLoading} = props;

    return(
        <Button id='refreash' onClick={onClick}
        isLoading={isLoading}
        src={ButtonImg} alt='' />
    )
}

export default RefreshButton;