import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
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
import { getIframeLinkByLink, stringToHTML } from '../../functions/utils';
import { Wrappers, Title, Content, Card, Img, WrapDiv, SliderDiv, Width90Component } from '../../components/elements/UserContentTemplete';
import ThemeCard from '../../components/ThemeCard'
import VideoCard from '../../components/VideoCard';
import Loading from '../../components/Loading';
import SelectTypeComponent from '../../components/SelectTypeComponent';
import { useCallback } from 'react';
import $ from 'jquery'
const HowToUse = () => {
    const navigate = useNavigate();
    const [typeNum, setTypeNum] = useState(0)
    const [setting, setSetting] = useState({});
    const [loading, setLoading] = useState(false);


    const zMenu = [
        { title: '소개', column: 'introduce' },
        { title: '활용법', column: 'how_to_use' },
        { title: '필독사항', column: 'must_read' },
    ]
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
            const { data: response } = await axios.get('/api/setting')
            let obj = response.data;
            setSetting(response.data);
            obj.note = stringToHTML(obj[zMenu[typeNum]['column']], backUrl)
            $('.note').html(obj.note)
            $('.note > img').css("width", "100%")
            setLoading(false)

        }
        fetchPost();
    }, [])
    const selectTypeNum = useCallback((num) => {
        setTypeNum(num);
        let obj = setting;
        obj.note = stringToHTML(obj[zMenu[num]['column']], backUrl)
        $('.note').html(obj.note)
        $('.note > img').css("width", "100%")
    }, [setting])
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
                        <Width90Component>
                            <SelectTypeComponent posts={zMenu} num={typeNum} selectTypeNum={selectTypeNum} />
                        </Width90Component>
                        <Width90Component style={{ minHeight: '128px', background: `${theme.color.background3}` }}>
                            <div style={{ padding: '16px' }} className="note">
                            </div>
                        </Width90Component>
                    </>}


            </Wrappers>
        </>
    )
}
export default HowToUse;