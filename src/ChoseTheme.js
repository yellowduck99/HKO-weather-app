import styled from "@emotion/styled"

const Control = styled.div`
display: flex;
gap: 10px;
`

const ChoseTheme = (props) => {

    const {handleClick} = props

    return (
        <Control>
            <p>Day</p>
            <div className='form-check form-switch  '>
            <input className='form-check-input'
            type='checkbox' role="switch"
            onChange={(e) => handleClick(e)}
            id="flexSwitchCheckDefault" />
            </div>
            <p>Night</p>
        </Control>
        
      
    )
}

export default ChoseTheme;