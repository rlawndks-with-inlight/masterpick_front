import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { zTalk, zTheme } from '../../data/TestData';
import axios from 'axios';
import { backUrl, slideSetting } from '../../data/Data';
import { Wrappers, Title, Content, Card, Img, WrapDiv, SliderDiv, ImgTitle } from '../../components/elements/UserContentTemplete';
import Loading from '../../components/Loading';
import megaphoneIcon from '../../assets/images/icon/megaphone.svg';
import theme from '../../styles/theme';
import ThemeCard from '../../components/ThemeCard';
import ContentTable from '../../components/ContentTable';
import { commarNumber } from '../../functions/utils';
import SelectSubType from '../../components/elements/SelectSubType';
import SubType from '../../components/elements/SubType';

const Home = () => {
    const navigate = useNavigate();
    const [subTypeNum, setSubTypeNum] = useState(0)
    const [posts, setPosts] = useState([]);
    const [setting, setSetting] = useState({});
    const [loading, setLoading] = useState(false);

    const [bestMasterObj, setBestMasterObj] = useState({});
    const [bestList, setBestList] = useState([])
    const [masterList, setMasterList] = useState([])
    const [masterPk, setMasterPk] = useState(0);

    const [recommendMasterPk, setRecommendMasterPk] = useState(0);

    const settings = {
        infinite: true,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        setPosts(zTalk[0].image_list);
        async function fetchPost() {
            setLoading(true)
            const { data: masterResponse } = await axios.get('/api/items?table=master');

            const { data: response } = await axios.get('/api/getmaincontent');

            let best_list = JSON.parse(response?.data?.best_list);

            let best_mater_yield_list = JSON.parse(response?.data?.best_mater_yield_list);

            let recommendation_list = JSON.parse(response?.data?.recommendation_list);

            let master_list = [];
            let max_yield = 0;
            let max_index = 0;
            for (var i = 0; i < masterResponse.data.length; i++) {
                master_list.push(masterResponse.data[i]);
                master_list[i].yield = best_mater_yield_list[master_list[i].pk].best_mater_yield;
                master_list[i].recommend_obj = recommendation_list[master_list[i].pk];
                if (parseFloat(master_list[i].yield) > max_yield) {
                    max_yield = master_list[i].yield;
                    max_index = i;
                }
            }
            setBestMasterObj(master_list[max_index])

            setMasterPk(master_list[0].pk);
            setMasterList(master_list)
            setBestList(best_list)
            setSetting(response?.data)

            setTimeout(() => setLoading(false), 1500);
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
                            <img src={backUrl + setting?.main_img} style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }} />
                        </Content>

                        <Title>이달의 BEST 수익률</Title>
                        <Content>
                            <div style={{ display: 'flex', width: '100%', border: '1px solid #D9D9D9' }}>
                                <div style={{ borderRight: '20px solid transparent', borderBottom: `80px solid #FFB92B`, width: '50%', position: 'relative' }}>
                                    <div style={{ display: 'flex', position: 'absolute', alignItems: 'center', top: '6px', left: '20%' }}>
                                        <img src={backUrl + bestMasterObj?.profile_img ?? ''} style={{ height: '75px', marginRight: '5vw' }} />
                                        <div style={{ color: '#670D0D', fontSize: theme.size.font5 }}>{bestMasterObj?.name ?? ''}</div>
                                    </div>
                                </div>
                                <div style={{ position: 'relative', width: '50%', display: 'flex' }}>
                                    <div style={{ margin: 'auto', alignItems: 'center', textAlign: 'center', fontSize: `${theme.size.font2}`, fontWeight: 'bold' }}>
                                        <div style={{ marginBottom: '4px' }}>누적 수익률</div>
                                        <div style={{ marginTop: '4px', color: '#FB0000' }}>+{commarNumber(bestMasterObj?.yield ?? '0')}%</div>
                                    </div>

                                </div>
                            </div>
                        </Content>
                        <Title>BEST 투자대가</Title>
                        <Content>
                            <WrapDiv>
                                {masterList.map((item, idx) => (
                                    <>
                                        <ThemeCard data={item} />

                                    </>
                                ))}
                            </WrapDiv>
                            <SliderDiv>
                                <Slider {...slideSetting} className='board-container pointer'>
                                    {masterList.map((item, idx) => (
                                        <>
                                            <ThemeCard data={item} />

                                        </>
                                    ))}
                                </Slider>
                            </SliderDiv>

                        </Content>
                        <ImgTitle img={megaphoneIcon}>대가의 추천 종목</ImgTitle>
                        <Content>
                            <SelectSubType className='subtype-container' style={{ marginBottom: '16px' }}>
                                {masterList.map((item, index) => (
                                    <>
                                        <SubType style={{ color: `${masterPk == item.pk ? '#fff' : theme.color.font1}`, background: `${masterPk == item.pk ? theme.color.background1 : theme.color.background3}` }} onClick={() => { setMasterPk(item.pk) }}>
                                            {item.name}
                                        </SubType>
                                    </>
                                ))}
                            </SelectSubType>
                        </Content>
                        <ImgTitle img={megaphoneIcon}>주간/월간 BEST 수익</ImgTitle>
                        <Content>
                            <ContentTable columns={[
                                { name: "거장명", column: "master_name", width: 25, type: 'text' },
                                { name: "종목명", column: "name", width: 25, type: 'text' },
                                { name: "수익률", column: "yield", width: 25, type: 'text' },
                                { name: "보유기간", column: "days", width: 25, type: 'text' }
                            ]}
                                data={bestList} />
                        </Content>
                    </>}

            </Wrappers>
        </>
    )
}
export default Home;