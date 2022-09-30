import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { backUrl } from "../data/Data";
import theme from "../styles/theme";

const Card = styled.div`
width: 48%; 
display: flex;
margin-bottom: 16px;
height: 180px;
background: ${theme.color.background3};
cursor:pointer;
@media screen and (max-width:1000px) {
    height: 18vw;
}
@media screen and (max-width:700px) {
    width: 100%; 
    height: 36vw;
}
`
const Img = styled.div`
width: 150px;
background:#fff;
@media screen and (max-width:1000px) {
    width:15vw;
}
@media screen and (max-width:700px) {
    width:28.125vw;
}
`
const Title = styled.div`
font-size:${theme.size.font3}; 
font-weight: bold;
width:250px;
@media screen and (max-width:1200px) {
    width:20vw;
}
@media screen and (max-width:700px) {
    width:47.5vw;
}
`
const TextContainer = styled.div`
padding: 16px;
display: flex;
flex-direction: column;
justify-content: space-between;
@media screen and (max-width:500px) {
    padding: 8px;
}
`
const Hash = styled.div`
font-size: ${theme.size.font5};
display: flex;
flex-wrap: wrap;
`
const Date = styled.div`
font-size: ${theme.size.font5};
margin-top: 16px;
@media screen and (max-width:500px) {
    margin-top: 6px;
}
`
const ThemeCard = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <Card onClick={() =>{}}>
                <Img style={{
                    backgroundImage: `url(${backUrl + props.item?.main_img ?? ""})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundBlendMode: 'multiply'
                }} />

                <TextContainer>
                    <Title> {props.item?.title ?? ""}</Title>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Hash>
                            {props.item?.hash}
                        </Hash>
                        <Date>{props.item?.date.substring(0, 10) ?? ""}</Date>
                    </div>
                </TextContainer>
            </Card>
        </>
    )
}
export default ThemeCard;