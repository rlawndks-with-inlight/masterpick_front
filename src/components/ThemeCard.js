import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { backUrl } from "../data/Data";
import { commarNumber, returnMoment } from "../functions/utils";
import theme from "../styles/theme";
import SubType from "./elements/SubType";
import axios from "axios";
const Card = styled.div`
width: 48%; 
display: flex;
margin-bottom: 16px;
height: 200px;
background: #fff;
cursor:pointer;
@media screen and (max-width:1000px) {
    height: 20vw;
}
@media screen and (max-width:700px) {
    width: 100%; 
    height: 40vw;
    min-height:150px;
}
`
const Img = styled.div`
width: 125px;
height: 180px;
margin: 10px;
background:#fff;
border:1px solid #707070;
@media screen and (max-width:1000px) {
    width:12.5vw;
    height: 18vw;
    margin:1vw;
}
@media screen and (max-width:700px) {
    width:25vw;
    height: 36vw;
    margin:auto 2vw;
}
`
const Title = styled.div`
font-size:${theme.size.font2}; 
font-weight: bold;
margin-bottom:auto;
@media screen and (max-width:1200px) {
}
@media screen and (max-width:700px) {
}
`
const TextContainer = styled.div`
padding: 16px;
display: flex;
flex-direction: column;
align-items:center;
text-align:center;
width:300px;
justify-content: space-between;
@media screen and (max-width:1000px) {
    width:31.2vw;
    padding:1vw;
}
@media screen and (max-width:700px) {
    width:66vw;
    padding:2vw;
}
`
const Hash = styled.div`
font-size: ${theme.size.font3};
display: flex;
flex-wrap: wrap;
align-item:center;
font-weight:bold;
margin:auto;
`
const Date = styled.div`
font-size: ${theme.size.font5};
margin-top: 16px;
@media screen and (max-width:500px) {
    margin-top: 6px;
}
`
const MasterCard = (props) => {
    const { data } = props;
    const navigate = useNavigate();
    const addSubscribeMaster = async () => {
        if (localStorage.getItem('auth')) {
            if (window.confirm('구독 하시겠습니까?')) {
                const { data: response } = await axios.post('/api/addsubscribe', {
                    user_pk: JSON.parse(localStorage.getItem('auth'))?.pk,
                    master_pk: data.pk
                })
                if(response.result>0){
                    alert("구독을 완료하였습니다.")
                }else{
                    alert(response.message);
                }
            }
        } else {
            alert('로그인을 해주세요.');
            navigate('/login');
            return;
        }
    }
    return (
        <>
            <Card>
                <Img style={{
                    backgroundImage: `url(${backUrl + data?.profile_img ?? ""})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundBlendMode: 'multiply', borderRadius: '50%'
                }} />

                <TextContainer>
                    <Title> {data?.name ?? ""} 전문가</Title>
                    <Title> {data?.motto ?? ""}</Title>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
                        <Hash>
                            <p style={{marginRight:'4px'}}>{data.yield_title}</p> <p style={{color:'#FB0000',marginLeft:'4px'}}>{parseInt(data.yield)>=0?'+':'-'}{commarNumber(data.yield)}%</p>
                        </Hash>
                        <div style={{ display: 'flex', margin: '0 auto' }}>
                            <SubType style={{ background: theme.color.background2 }} onClick={()=>navigate(`/master/${data.pk}`)}>투자전략</SubType>
                            <SubType style={{ background: theme.color.background2 }} onClick={addSubscribeMaster}>가입하기</SubType>
                        </div>
                    </div>
                </TextContainer>
            </Card>
        </>
    )
}
export default MasterCard;