import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Wrappers, Title, Content } from '../../components/elements/UserContentTemplete';
import Loading from '../../components/Loading';
import ContentTable from '../../components/ContentTable';
import styled from 'styled-components';

const ScreenDiv = styled.div`
width:90%;
height:134px;
position:absolute;
background:linear-gradient(to left, #FFB92B, #FB8200);
opacity:0.97;
left:5%;
top:30px;
font-size:${props=>props.theme.size.font1};
font-weight:bold;
color:#fff;
display:flex;
cursor:pointer;
`
const MasterEvent = () => {
    const navigate = useNavigate();
    const [subTypeNum, setSubTypeNum] = useState(0)
    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(false);



    const settings = {
        infinite: true,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        async function fetchPost() {
            setLoading(true)

            const { data: response } = await axios.get('/api/getmastercontents?table=master_event&order=level')
            console.log(response)
            setPosts(response.data)
            setTimeout(() => setLoading(false), 1000);
        }
        fetchPost();
    }, [])

    return (
        <>
            <Wrappers className='wrappers'>
                {loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <Content>
                            <Title>대가들의 종목</Title>
                        </Content>

                        <div style={{ position: 'relative' }}>
                            <ScreenDiv onClick={()=>navigate('/masterlist')}>
                                <p style={{margin:'auto'}}>TOP 5 보러가기</p>
                            </ScreenDiv>
                            <ContentTable columns={[
                                { name: "대가이름", column: "master_name", width: 25, type: 'text'  },
                                { name: "종목명", column: "name", width: 50, type: 'text'  },
                                { name: "등급", column: "level", width: 25, type: 'text'  }
                            ]}
                                data={posts} />
                        </div>
                    </>
                }

            </Wrappers>
        </>
    )
}
export default MasterEvent;