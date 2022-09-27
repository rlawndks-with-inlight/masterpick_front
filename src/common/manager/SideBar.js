import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi'
import logo from '../../assets/images/test/logo.svg'
import { BiRadioCircle } from 'react-icons/bi'
import { BsPerson, BsCameraVideo } from 'react-icons/bs'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { AiOutlineQuestionCircle, AiOutlineRotateLeft } from 'react-icons/ai'
import { SiYoutubemusic } from 'react-icons/si'

import axios from 'axios';
const Wrappers = styled.div`
display:flex;
flex-direction:column;
width:250px;
min-height:100vh;
box-shadow:0 2px 4px rgb(15 34 58 / 12%);
z-index:5;
position:fixed;
background:#fff;
overflow-y:auto;
padding-bottom:16px;
@media screen and (max-width:1000px) {
    position:fixed;
    display:${(props => props.display)};
    transition:1s;
    @keyframes fadein {
        from {
            left:-500px;
        }
        to {
            left:0;
        }
      }
}
`
const LogoWrappers = styled.div`
text-align:center;
font-size:32px;
font-weight:bold;
padding-top:24px;
padding-bottom:24px;
color:${(props) => props.theme.color.background1};
`
const SelectMenuContent = styled.div`
width:192px;
padding:16px 12px 16px 16px;
background:${(props) => props.theme.color.manager.background2}29;
margin:0.3rem auto;
border-radius:3px;
font-size:15px;
display:flex;
align-items:center;
color:${(props) => props.theme.color.manager.background1};
cursor:pointer;
`
const MenuContent = styled.div`
width:192px;
padding:16px 12px 16px 16px;
background:#fff;
margin:0.3rem auto;
border-radius:12px;
font-size:15px;
display:flex;
align-items:center;
color:${(props) => props.theme.color.manager.font3};
cursor:pointer;
transition: 0.4s;
&:hover{  
    color:${(props) => props.theme.color.manager.font1};
}
`
const MenuText = styled.p`
margin:0 0 0 8px;
`
const HambergurContainer = styled.div`
display:none;
position:fixed;
top:0;
left:0;
z-index:5;
padding:12px;
@media screen and (max-width:1000px) {
    display:flex;
}
`
const SideBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [auth, setAuth] = useState({})
    const [zIssueCategory, setZIssueCategory] = useState([])
    const [issueCategoryDisplay, setIssueCategoryDisplay] = useState(false);
    const [zFeatureCategory, setZFeatureCategory] = useState([])
    const [zMaster, setZMaster] = useState([])
    const [issueMasterDisplay, setIssueMasterDisplay] = useState(false);

    const [featureCategoryDisplay, setFeatureCategoryDisplay] = useState(false);
    const zSidebar = [
        { name: '회원관리', link: '/manager/list/user', icon: <BsPerson />, level: 40, allow_list: ['/manager/list/user'] },
        //{ name: '접속자현황', link: '/manager/list/user', icon: <MdOutlineAccessTime /> },
        //{ name: '회원통계', link: '/manager/list/user', icon: <IoStatsChartSharp /> },
        { name: '환경설정', link: '/manager/edit/setting', icon: <AiOutlineRotateLeft />, level: 40, allow_list: ['/manager/edit/setting'] },
        { name: '거장관리', link: '/manager/list/master', icon: <FaChalkboardTeacher />, level: 40, allow_list: ['/manager/list/master'] },
        { name: '구독전용', link: '/manager/list/master_subscribe', icon: <SiYoutubemusic />, level: 40, allow_list: ['/manager/list/master_subscribe'] },
        //{ name: '채널관리', link: '/manager/list/channel', icon: <FaChalkboardTeacher />, level: 40, allow_list: ['/manager/list/channel'] },
        // { name: '하루1단어', link: '/manager/list/oneword', icon: <WiDayHaze />, level: 40, allow_list: ['/manager/list/oneword'] },
        // { name: '하루1종목', link: '/manager/list/oneevent', icon: <WiDayHaze />, level: 40, allow_list: ['/manager/list/oneevent'] },
        // { name: '핵심테마', link: '/manager/list/theme', icon: <IoLogoReact />, level: 40, allow_list: ['/manager/list/theme'] },
        // { name: '전문가칼럼', link: '/manager/list/strategy', icon: <SiMicrostrategy />, level: 30, allow_list: ['/manager/list/strategy'] },
        // { name: '핵심이슈 카테고리', link: '/manager/list/issue_category', icon: <MdNotificationImportant />, level: 40, allow_list: ['/manager/list/issue_category'] },
        // { name: '핵심이슈', link: '/manager/list/issue', icon: <MdNotificationImportant />, level: 40, allow_list: ['/manager/list/issue', '/manager/list/issue/1', '/manager/list/issue/2', '/manager/list/issue/3', '/manager/list/issue/4', '/manager/list/issue/5', '/manager/list/issue/6', '/manager/list/issue/7', '/manager/list/issue/8', '/manager/list/issue/9'] },
        // { name: '핵심비디오', link: '/manager/list/video', icon: <BsCameraVideo />, level: 30 },
        //{ name: '문의관리', link: '/manager/list/inquiry', icon: <AiOutlineQuestionCircle />, level: 40 },
    ];
    const [display, setDisplay] = useState('none');
    useEffect(() => {
        if (localStorage.getItem('auth')) {
            let obj = JSON.parse(localStorage.getItem('auth'))
            setAuth(obj);
        }
    }, [location]);
    useEffect(() => {
        async function fetchPost() {
            const { data: response } = await axios.get('/api/items?table=master')
            setZMaster(response?.data);
        }
        fetchPost()
    }, [])
    const onClickMenu = (link) => {
        if (link == '/manager/list/issue') {
            changeIssueCategoryDisplay();
        } else if (link == '/manager/list/feature') {
            changeFeatureCategoryDisplay();
        } else if (link == '/manager/list/master_subscribe') {
            changeMasterDisplay();
        } else {
            navigate(link);
        }
    }
    const changeIssueCategoryDisplay = () => {
        setIssueCategoryDisplay(!issueCategoryDisplay);
    }
    const changeFeatureCategoryDisplay = () => {
        setFeatureCategoryDisplay(!featureCategoryDisplay);
    }
    const changeMasterDisplay = () => {
        setIssueMasterDisplay(!issueMasterDisplay);
    }

    return (
        <>
            <HambergurContainer onClick={() => { setDisplay('flex') }}>
                <GiHamburgerMenu />
            </HambergurContainer>
            <Wrappers display={display} className='scroll-css'>
                <HambergurContainer onClick={() => { setDisplay('none') }}>
                    <GiHamburgerMenu />
                </HambergurContainer>
                <LogoWrappers>
                    <img src={logo} style={{ height: '40px', width: 'auto' }} />
                </LogoWrappers>
                <div style={{ maxHeight: '80vh', paddingBottom: '32px' }}>
                    {zSidebar.map((item, index) => (
                        <>
                            {JSON.parse(localStorage.getItem('auth'))?.level ?? 0 >= item.level ?
                                <>
                                    {item.allow_list.includes(location.pathname) ?
                                        <>
                                            <SelectMenuContent key={index} onClick={() => { onClickMenu(`${item.link}`) }}>
                                                {item.icon}
                                                <MenuText>{item.name}</MenuText>
                                            </SelectMenuContent>
                                        </>
                                        :
                                        <>
                                            <MenuContent key={index} onClick={() => { onClickMenu(`${item.link}`) }}>
                                                {item.icon}
                                                <MenuText>{item.name}</MenuText>
                                            </MenuContent>
                                        </>}
                                </>
                                :
                                <>
                                </>
                            }


                        </>
                    ))}
                    {issueMasterDisplay ?
                        <>
                            {zMaster.map((item, idx) => (
                                <>
                                    <MenuContent key={idx} onClick={() => { navigate(`/manager/list/master_subscribe/${item.pk}`) }} style={{ color: `${location.pathname == `/manager/list/master_subscribe/${item.pk}` ? '#000' : ''}` }}>
                                        <MenuText style={{ marginLeft: '15px' }}>{item.name}</MenuText>
                                    </MenuContent>
                                </>
                            ))}
                        </>
                        :
                        <>
                        </>}
                    {/* {issueCategoryDisplay ?
                        <>
                            {zIssueCategory.map((item, idx) => (
                                <>
                                    <MenuContent key={idx} onClick={() => { navigate(`/manager/list/issue/${item.pk}`) }} style={{ color: `${location.pathname == `/manager/list/issue/${item.pk}` ? '#000' : ''}` }}>
                                        <MenuText style={{ marginLeft: '15px' }}>{item.title}</MenuText>
                                    </MenuContent>
                                </>
                            ))}
                        </>
                        :
                        <>
                        </>}
                    {JSON.parse(localStorage.getItem('auth'))?.level??0 >= 40 ?
                        <>
                            {'/manager/list/feature_category' == location.pathname ?
                                <>
                                    <SelectMenuContent onClick={() => { onClickMenu(`/manager/list/feature_category`) }}>
                                        <MdOutlineFeaturedPlayList />
                                        <MenuText>특징주 카테고리</MenuText>
                                    </SelectMenuContent>
                                </>
                                :
                                <>
                                    <MenuContent onClick={() => { onClickMenu(`/manager/list/feature_category`) }}>
                                        <MdOutlineFeaturedPlayList />
                                        <MenuText>특징주 카테고리</MenuText>
                                    </MenuContent>
                                </>}
                        </>
                        :
                        <>
                        </>
                    }

                    {JSON.parse(localStorage.getItem('auth'))?.level??0 >= 40 ?
                        <>
                            {'/manager/list/feature' == location.pathname ?
                                <>
                                    <SelectMenuContent onClick={() => { onClickMenu(`/manager/list/feature`) }}>
                                        <MdOutlineFeaturedPlayList />
                                        <MenuText>특징주</MenuText>
                                    </SelectMenuContent>
                                </>
                                :
                                <>
                                    <MenuContent onClick={() => { onClickMenu(`/manager/list/feature`) }}>
                                        <MdOutlineFeaturedPlayList />
                                        <MenuText>특징주</MenuText>
                                    </MenuContent>
                                </>}
                        </>
                        :
                        <>
                        </>
                    }


                    {featureCategoryDisplay ?
                        <>
                            {zFeatureCategory.map((item, idx) => (
                                <>
                                    <MenuContent key={idx} onClick={() => { navigate(`/manager/list/feature/${item.pk}`) }} style={{ color: `${location.pathname == `/manager/list/feature/${item.pk}` ? '#000' : ''}` }}>
                                        <MenuText style={{ marginLeft: '15px' }}>{item.title}</MenuText>
                                    </MenuContent>
                                </>
                            ))}
                        </>
                        :
                        <>
                        </>}
                    {JSON.parse(localStorage.getItem('auth'))?.level??0 >= 30 ?
                        <>
                            {'/manager/list/video' == location.pathname ?
                                <>
                                    <SelectMenuContent onClick={() => { onClickMenu(`/manager/list/video`) }}>
                                        <BsCameraVideo />
                                        <MenuText>핵심비디오</MenuText>
                                    </SelectMenuContent>
                                </>
                                :
                                <>
                                    <MenuContent onClick={() => { onClickMenu(`/manager/list/video`) }}>
                                        <BsCameraVideo />
                                        <MenuText>핵심비디오</MenuText>
                                    </MenuContent>
                                </>}
                        </>
                        :
                        <>
                        </>
                    }


                    {JSON.parse(localStorage.getItem('auth'))?.level??0 >= 40 ?
                        <>
                            {'/manager/list/notice' == location.pathname ?
                                <>
                                    <SelectMenuContent onClick={() => { onClickMenu('/manager/list/notice') }}>
                                        <AiOutlineQuestionCircle />
                                        <MenuText>공지사항</MenuText>
                                    </SelectMenuContent>
                                </>
                                :
                                <>
                                    <MenuContent onClick={() => { onClickMenu('/manager/list/notice') }}>
                                        <AiOutlineQuestionCircle />
                                        <MenuText>공지사항</MenuText>
                                    </MenuContent>
                                </>}
                        </>
                        :
                        <>
                        </>
                    } */}
                    <div style={{ paddingBottom: '36px' }} />
                </div>
            </Wrappers>
        </>
    )
}
export default SideBar