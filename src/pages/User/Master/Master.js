import { useEffect, useState } from "react";
import { Wrappers, Title, TransparentButton, ViewerContainer } from "../../../components/elements/UserContentTemplete";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MasterSlide from "../../../components/MasterSlide";
import MasterCard from "../../../components/MasterCard";
import Loading from "../../../components/Loading";
import { Viewer } from '@toast-ui/react-editor';
import MetaTag from "../../../components/MetaTag";
import { commarNumber } from "../../../functions/utils";

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
const SectorContainer = styled.div`
width:90%;
max-width:700px;
margin:0 auto;
margin-bottom:20px;
font-size:${(props) => props.theme.size.font5};
`
const Progress = styled.progress`

appearance: none;
width: 100%;
height:8px;
color:red;
background: #red;

::-webkit-progress-bar {
    background: #fff;
    border-radius: 0;
}
::-webkit-progress-value{
    background: #3BBAD5;

}
`
const Master = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { state } = useLocation();
    const [item, setItem] = useState({})
    const [sectorList, setSectorList] = useState([])
    const [sectorMax, setSectorMax] = useState(0)
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    useEffect(() => {
        async function fetchPost() {
            setLoading(true)
            const { data: response } = await axios.get(`/api/item?table=master&pk=${params.pk}`)
            setItem(response.data)
            setTitle("masterpick - 대가프로필 / "+response.data.name)
            let sector_list = JSON.parse(response.data?.sector_list);
            sector_list = sector_list.sort(function (a, b) {
                return b.percent - a.percent
            })
            let max = 0;
            for (var i = 0; i < sector_list.length; i++) {
                if (sector_list[i].percent > max) {
                    max = sector_list[i].percent;
                }
            }
            setSectorMax(max)
            setSectorList(sector_list)
            setLoading(false)
        }
        fetchPost();
    }, [params])
    const addSubscribeMaster = async () => {
        if (localStorage.getItem('auth')) {
            if (window.confirm('구독 하시겠습니까?')) {
                const { data: response } = await axios.post('/api/addsubscribe', {
                    user_pk: JSON.parse(localStorage.getItem('auth'))?.pk,
                    master_pk: params.pk
                })
                if (response.result > 0) {
                    alert("구독을 완료하였습니다.")
                } else {
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
            <Wrappers>
                <MetaTag title={title} />
                <MasterSlide />
                <Title>대가 프로필</Title>
                <div style={{ margin: '0 2px 24px auto' }}>
                    <TransparentButton onClick={addSubscribeMaster} style={{ position: 'absolute', top: '98px', right: '0' }}>+ 구독</TransparentButton>
                </div>
                {loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <MasterCard item={item} />
                        <Title>대가 수익률</Title>
                        <ViewerContainer style={{width:'90%'}}>
                            <Viewer initialValue={item?.yield ?? `<body></body>`} />
                        </ViewerContainer>
                        <Title>대가 투자원칙</Title>
                        <ViewerContainer style={{width:'90%'}}>
                            <Viewer initialValue={item?.investment_principle ?? `<body></body>`} />
                        </ViewerContainer>


                        <Title>대가 투자 스타일</Title>
                        <ViewerContainer style={{width:'90%'}}>
                            <Viewer initialValue={item?.investment_style ?? `<body></body>`} />
                        </ViewerContainer>
                        {sectorList && sectorList.length > 0 ?
                            <>
                                <Title>투자 섹터 비중</Title>
                                <SectorContainer>
                                    {sectorList.map((itm, idx) => (
                                        <>
                                            <div style={{ display: 'flex', marginBottom: '4px' }}>
                                                <div style={{ color: '#2F2F6E', width: '15%', textAlign: 'end' }}>{itm.title}</div>
                                                <div style={{ display: 'flex', alignItems: 'center', width: '10%', textAlign: 'left', marginLeft: '8px' }}>{itm.percent}</div>
                                                <div style={{ display: 'flex', alignItems: 'center', width: '80%' }}><Progress value={`${itm.percent}`} max={sectorMax} /></div>
                                            </div>
                                        </>
                                    ))}
                                </SectorContainer>


                            </>
                            :
                            <>
                            </>}
                        <Button onClick={addSubscribeMaster}>구독하기</Button>
                    </>}


            </Wrappers>
        </>
    )
}
export default Master;