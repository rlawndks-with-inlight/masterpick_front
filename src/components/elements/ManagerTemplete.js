import styled from "styled-components";

export const Col = styled.div`
display:flex;
flex-direction:column;
`

export const Row = styled.div`
display:flex;
@media screen and (max-width:700px) {
    flex-direction:column;
}
`

export const Card = styled.div`
background:#fff;
display:flex;
flex-direction:column;
width:95%;
margin:12px auto;
box-shadow:${props=>props.theme.boxShadow};
border-radius:3px;
padding: 24px 0;
min-height:640px;
`
export const Title = styled.div`
margin:12px auto 6px 24px;
width:90%;
color:${props=>props.theme.color.manager.font2};
font-weight:bold;
margin-top:32px;
`
export const Input = styled.input`
margin:12px auto 6px 24px;
width:200px;
padding:8px;
outline:none;
::placeholder {
    color: #cccccc;
}
`

export const Select = styled.select`
margin:12px auto 6px 24px;
width:218px;
padding:8px;
outline:none;
`
export const ImageContainer = styled.label`
border: 2px dashed ${props=>props.theme.color.manager.font3};
margin:12px auto 6px 24px;
width:100%;
height:12rem;
border-radius:2rem;
text-align:center;
@media screen and (max-width:700px) {
    width:90%;
}
`