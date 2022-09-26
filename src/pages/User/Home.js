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
import { getIframeLinkByLink } from '../../functions/utils';
import { Wrappers, Title, Content, Card, Img, WrapDiv, SliderDiv, ImgTitle } from '../../components/elements/UserContentTemplete';
import Loading from '../../components/Loading';
import megaphoneIcon from '../../assets/images/icon/megaphone.svg';
const Home = () => {
    const navigate = useNavigate();
    const [subTypeNum, setSubTypeNum] = useState(0)
    const [posts, setPosts] = useState([]);
    const [setting, setSetting] = useState({});
    const [masters, setMasters] = useState([])
    const [oneWord, setOneWord] = useState({});
    const [issues, setIssues] = useState([]);
    const [oneEvent, setOneEvent] = useState({});
    const [themes, setThemes] = useState([]);
    const [videos, setVideos] = useState([]);
    const [strategies, setStrategies] = useState([]);
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
        setPosts(zTalk[0].image_list);
        async function fetchPost() {
            setLoading(true)

            const { data: response } = await axios.get('/api/gethomecontent')
            setSetting(response.data.setting);
            setMasters(response.data.masters)
            setOneWord(response.data.oneWord);
            setIssues(response.data.issues);
            setOneEvent(response.data.oneEvent);
            setThemes(response.data.themes);
            setStrategies(response.data.strategies)
            let video_list = response.data?.videos
            for (var i = 0; i < video_list.length; i++) {
                video_list[i].link = getIframeLinkByLink(video_list[i].link);
            }
            setVideos(video_list);
            setTimeout(() => setLoading(false), 1500);
        }
        fetchPost();
    }, [])
    const onChangeStrategyNum = async (num, pk) => {
        setSubTypeNum(num)
        let str = `/api/items?table=strategy&limit=3&status=1`;
        if (pk != 0) {
            str += `&user_pk=${pk}`;
        }
        const { data: response } = await axios.get(str);
        setStrategies(response?.data)
    }
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
                       
                    </>}
                    <Title>이달의 BEST 수익률</Title>
                    <Title>BEST 투자대가</Title>
                    <ImgTitle img={megaphoneIcon}>대가의 추천 종목</ImgTitle>
                    <ImgTitle img={megaphoneIcon}>주간/월간 BEST 수익</ImgTitle>
            </Wrappers>
        </>
    )
}
export default Home;