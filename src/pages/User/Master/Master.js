import { useEffect, useState } from "react";
import { Wrappers, Title, TransparentButton } from "../../../components/elements/UserContentTemplete";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { backUrl } from "../../../data/Data";
import MasterSlide from "../../../components/MasterSlide";
import MasterCard from "../../../components/MasterCard";
import { stringToHTML } from "../../../functions/utils";
import $ from 'jquery'
const Button = styled.button`
width:364px;
margin:0 auto;
height:62px;
border:none;
background:linear-gradient(to right, ${(props) => props.theme.color.background1}, ${(props) => props.theme.color.background2});
color:#fff;
font-size:${(props) => props.theme.size.font1};
font-weight:600;
cursor:pointer;
border: 1px solid transparent;
border-radius:10px;
@media (max-width: 600px) {
width:90%;
}

`
const Master = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { state } = useLocation();
    const [posts, setPosts] = useState([]);
    const [typeNum, setTypeNum] = useState(1)
    const [subTypeNum, setSubTypeNum] = useState(0)
    const [item, setItem] = useState({})
    useEffect(()=>{
        console.log(params)
    },[params])
    useEffect(()=>{
        async function fetchPost(){
            const {data:response} = await axios.get(`/api/item?table=master&pk=${params.pk}`)
            setItem(response.data)
            let obj = response.data;
            if(response.data.investment_principle){
                $('.principle').html(stringToHTML(obj['investment_principle'], backUrl))
                $('.principle > img').css({"width": "100%","max-width":"700px"});
            }else{
                $('.principle').html("");
            }
            if(response.data.investment_style){
                $('.style').html(stringToHTML(obj['investment_style'], backUrl))
                $('.style > img').css({"width": "100%","max-width":"700px"});
            }else{
                $('.style').html("");
            }
            
        }
        fetchPost()
    },[params])
    return (
        <>
            <Wrappers>
                <MasterSlide/>
                <Title>대가 프로필</Title>
                <div style={{margin:'0 2px 0 auto'}}>
                    <TransparentButton>+ 구독</TransparentButton>
                </div>
                <MasterCard item={item} />
                <Title>대가 투자원칙</Title>
                <div className="note principle">
                </div>
                <Title>대가 투자 스타일</Title>
                <div className="note style">
                </div>
                <Title>투자 섹터 비중</Title>

                <Button>구독하기</Button>
            </Wrappers>
        </>
    )
}
export default Master;