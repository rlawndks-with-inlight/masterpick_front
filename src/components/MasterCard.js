import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { backUrl } from "../data/Data"
const Card = styled.div`
width:100%;
background:${props => props.theme.color.background3};
text-align:left;
height:112px;
margin:6px 0;
color:${props => props.theme.color.font1};
font-weight:bold;
font-size:${props => props.theme.size.font3};
cursor:pointer;
position:relative;

`
const TextContainer = styled.div`
width: 50%;
padding: 20px;
margin-left: auto;
text-align: center;
font-size:${props => props.theme.size.font1};
@media screen and (max-width:350px) {
    padding: 10px;
    font-size:${props => props.theme.size.font2};
}
`
const MasterCard = (props) => {
    const navigate = useNavigate();
    const {item} = props;
    return (
        <>
            <Card style={{ background: item.background_color }} onClick={() => { navigate(`/master/${item.pk}`, { state: { name: item.name, nickname: item.nickname, img: item.profile_img } }) }}>
                <img style={{ position: 'absolute', bottom: '0', left: '5%', height: '90%' }} src={backUrl + item.profile_img} />
                <TextContainer>
                    <div style={{ marginTop: '8px' }}>{item.name} 전문가</div>
                    <div style={{ marginTop: '8px', wordBreak: 'break-all' }}>"{item.motto}"</div>
                </TextContainer>
            </Card>
        </>
    )
}
export default MasterCard;