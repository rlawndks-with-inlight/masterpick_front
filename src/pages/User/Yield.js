import React from 'react'
import styled from 'styled-components'
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import theme from '../../styles/theme';
import SelectSubType from '../../components/elements/SelectSubType';
import { zTalk, zTheme } from '../../data/TestData';
import SubType from '../../components/elements/SubType';
import testImg from '../../assets/images/test/test5.jpg';
import axios from 'axios';
import { backUrl, slideSetting } from '../../data/Data';
import { getIframeLinkByLink } from '../../functions/utils';
import { Wrappers, Title, Content, Card, Img, WrapDiv, SliderDiv } from '../../components/elements/UserContentTemplete';
import ThemeCard from '../../components/ThemeCard'
import VideoCard from '../../components/VideoCard';
import Loading from '../../components/Loading';
import MasterSlide from '../../components/MasterSlide';
import MasterContentSlide from '../../components/MasterContentSlide';
import PleaseSelectMaster from '../../components/PleaseSelectMaster';

const Yield = () => {
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
    const [typeNum, setTypeNum] = useState(0)



    const settings = {
        infinite: true,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };


    const selectTypeNum = useCallback((num) => {
        setTypeNum(num)
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
                        <MasterContentSlide selectTypeNum={selectTypeNum} num={typeNum} />
                        {typeNum==0?
                        <>
                        <PleaseSelectMaster/>
                        </>
                        :
                        <>
                        </>}
                    </>}
            </Wrappers>
        </>
    )
}
export default Yield;