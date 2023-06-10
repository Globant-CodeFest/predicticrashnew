import styled from "styled-components"

export const ButtonsContainer = styled.div`
display: flex;
justify-content: space-between;
padding: 4% 3%;
width: 100%;
max-width: 490px;
position: fixed;
bottom: 0px;
z-index: 2;
border-top: solid 1px whitesmoke;
background-color: white
`

export const QuantityButton = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 45%;
padding: 2% 5%;
border-radius: 99px;
box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
`

export const ItemQuantity = styled.div`
font-size: 30px;
font-weight: 400;
width: 10%
`
export const ItemQuantityNumber = styled.div`
font-size: 17px;
font-weight: 700
`
export const TotalButton = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 50%;
padding: 2% 5%;
border-radius: 99px;
color: white;
${props => {
    if(props.disabled) {
        return `background-color: grey`;
    } else {
        return `background-color: #41dea4`;
    }
}}
`
export const TotalText = styled.div`
font-size: 18px;
font-weight: 700
`