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

const SubscriptionOnly = () => {
    const navigate = useNavigate();
    const [subTypeNum, setSubTypeNum] = useState(0)
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [typeNum, setTypeNum] = useState(0)
    const [overlapList, setOverlapList] = useState([]);

    useEffect(() => {
        async function fetchPost() {
            setLoading(true)
            let auth_obj = JSON.parse(localStorage.getItem('auth'))
            const { data: response } = await axios.post(`/api/getmastercontents`, {
                table: 'master_subscribe',
                order: 'pk',
                desc: true,
                status: 1,
                is_subscribe: true,
                user_pk: auth_obj?.pk ?? 0
            })
            setPosts(response.data)
            setTimeout(() => setLoading(false), 1000);
        }
        fetchPost();
    }, [])

    const onClickMaster = async (num) => {
        setLoading(true)
        setTypeNum(num)
        let overlap_list = [...overlapList];
        if(overlap_list.includes(num)){
            for(var i = 0; i < overlap_list.length; i++){ 
                if (overlap_list[i] === num) { 
                    overlap_list.splice(i, 1); 
                  i--; 
                }
              }
        }else{
            overlap_list.push(num);
        }
        setOverlapList(overlap_list)
        let auth_obj = JSON.parse(localStorage.getItem('auth'))
        const { data: response } = await axios.post(`/api/getmastercontents`, {
            table: 'master_subscribe',
            order: 'pk',
            desc: true,
            status: 1,
            is_subscribe: true,
            user_pk: auth_obj?.pk ?? 0,
            overlap_list:overlap_list
        })
        setPosts(response.data)
        setTimeout(() => setLoading(false), 500);
    }
    return (
        <>
            <Wrappers className='wrappers'>
                <MasterSlide onClickMaster={onClickMaster} num={typeNum} width={'90%'} is_subscribe={true} overlapList={overlapList} status={1} />

                {loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <div style={{ position: 'relative' }}>
                            <ContentTable columns={[
                                { name: "대가명", column: "master_name", width: 25, type: 'text' },
                                { name: "종목명", column: "name", width: 25, type: 'text' },
                                { name: "기준가", column: "base_price", width: 25, type: 'number' },
                                { name: "포착일시", column: "capture_date", width: 25, type: 'text' },
                            ]} click={'/post/master_subscribe'}
                                isPointer={true}
                                data={posts} />
                        </div>
                    </>}
            </Wrappers>
        </>
    )
}
export default SubscriptionOnly;