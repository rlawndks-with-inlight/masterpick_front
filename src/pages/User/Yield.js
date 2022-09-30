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
import ContentTable from '../../components/ContentTable';

const Yield = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [typeNum, setTypeNum] = useState(0)

    useEffect(() => {
        async function fetchPost() {
            setLoading(true)

            const { data: response } = await axios.get('/api/getmastercontents?table=master_yield&order=yield&desc=true')
            console.log(response)
            setPosts(response.data)
            setTimeout(() => setLoading(false), 1000);
        }
        fetchPost();
    }, [])

    const onClickMaster = useCallback(async (num) => {
        setLoading(true)
        setTypeNum(num)
        const { data: response } = await axios.get(`/api/getmastercontents?table=master_yield&order=yield&desc=true&pk=${num}`)
        console.log(response)
        setPosts(response.data)
        setLoading(false);
    }, [])
    return (
        <>
            <Wrappers className='wrappers'>
                <MasterSlide onClickMaster={onClickMaster} num={typeNum} width={'90%'} />
                {loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <div style={{ position: 'relative' }}>
                            <ContentTable columns={[
                                { name: "대가명", column: "master_name", width: 30, type: 'text' },
                                { name: "종목명", column: "name", width: 30, type: 'text' },
                                { name: "매수가", column: "purchase_price", width: 30, type: 'number' },
                                { name: "수익률", column: "yield", width: 30, type: 'percent' },
                                { name: "보유기간", column: "period", width: 30, type: 'day' }
                            ]}
                                data={posts} />
                        </div>
                    </>}
            </Wrappers>
        </>
    )
}
export default Yield;