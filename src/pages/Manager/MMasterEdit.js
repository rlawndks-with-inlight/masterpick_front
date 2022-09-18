import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import ManagerWrappers from '../../components/elements/ManagerWrappers';
import SideBar from '../../common/manager/SideBar';
import ManagerContentWrappers from '../../components/elements/ManagerContentWrappers';
import axios from 'axios';
import Breadcrumb from '../../common/manager/Breadcrumb';
import { AiFillFileImage } from 'react-icons/ai'
import ButtonContainer from '../../components/elements/button/ButtonContainer';
import AddButton from '../../components/elements/button/AddButton';
import CancelButton from '../../components/elements/button/CancelButton';
import $ from 'jquery';
import { addItem, updateItem } from '../../functions/utils';
import { Card, Title, Input, Select, Row, Col, ImageContainer } from '../../components/elements/ManagerTemplete';
import { backUrl } from '../../data/Data';
import theme from '../../styles/theme';

const MMasterEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [myNick, setMyNick] = useState("")
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)
    const [channelUrl, setChannelUrl] = useState('')
    const [channelContent, setChannelContent] = useState(undefined)
    const [formData] = useState(new FormData())
    useEffect(() => {
        async function fetchPost() {
            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/item?table=master&pk=${params.pk}`)
                $('.name').val(response.data.name)
                setUrl(backUrl + response.data.profile_img)
                $('.background-color').val(response.data.background_color)
                $('.motto').val(response.data.motto)
            } else {
                $('.background-color').val(theme.color.background1);

            }
        }
        fetchPost();
    }, [])
    const editMaster = async () => {
        if ((!$(`.name`).val() || !content) && params.pk == 0) {
            alert('필요값이 비어있습니다.');
        } else {

            formData.append("name", $(`.name`).val());
            formData.append("backgroundColor", $(`.background-color`).val());
            formData.append("motto", $(`.motto`).val());
            formData.append("master", content);
            // formData.append("channel", channelContent);
            if (params.pk > 0) formData.append("pk", params.pk)
            if (window.confirm(`${params.pk == 0 ? '추가하시겠습니까?' : '수정하시겠습니까?'}`)) {
                if (params.pk <= 0) {
                    const { data: response } = await axios.post('/api/addmaster', formData);
                    alert(response.message);
                    if (response.result > 0) {
                        navigate('/manager/list/master');
                    }

                } else {
                    const { data: response } = await axios.post('/api/updatemaster', formData);
                    alert(response.message);
                    if (response.result > 0) {
                        navigate('/manager/list/master');
                    }
                }
            }
        }


    }
    const addFile = (e) => {
        if (e.target.files[0]) {
            setContent(e.target.files[0]);
            setUrl(URL.createObjectURL(e.target.files[0]))
        }
    };

    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={params.pk == 0 ? '거장 추가' : '거장 수정'} nickname={myNick} />
                    <Card>
                        {/* <Row>
                            <Col>
                                <Title>아이디</Title>
                                <Input className='id' />
                            </Col>
                            <Col>
                                <Title>비밀번호</Title>
                                <Input className='pw' placeholder='****' type={'password'} />
                            </Col>

                        </Row> */}
                        <Row>
                            <Col>
                                <Title>이름</Title>
                                <Input className='name' />
                            </Col>
                             <Col>
                                <Title>좌우명</Title>
                                <Input className='motto' />
                            </Col> 
                        </Row>
                        <Row>
                            <Col>
                                <Title>프로필 이미지</Title>
                                <ImageContainer for="file1">

                                    {url ?
                                        <>
                                            <img src={url} alt="#"
                                                style={{
                                                    width: '200px', height: '150px',
                                                    margin: '24px'
                                                }} />
                                        </>
                                        :
                                        <>
                                            <AiFillFileImage style={{ margin: '4rem', fontSize: '4rem', color: `${theme.color.manager.font3}` }} />
                                        </>}
                                </ImageContainer>
                                <div>
                                    <input type="file" id="file1" onChange={addFile} style={{ display: 'none' }} />
                                </div>
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <Title>카드 배경색</Title>
                                <Input type={'color'} className='background-color' style={{ background: '#fff', height: '36px', width: '220px' }} />
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col>
                                <Title>채널 이미지</Title>
                                <ImageContainer for="file2">

                                    {channelUrl ?
                                        <>
                                            <img src={channelUrl} alt="#"
                                                style={{
                                                    width: '200px', height: '150px',
                                                    margin: '24px'
                                                }} />
                                        </>
                                        :
                                        <>
                                            <AiFillFileImage style={{ margin: '4rem', fontSize: '4rem', color: `${theme.color.manager.font3}` }} />
                                        </>}
                                </ImageContainer>
                                <div>
                                    <input type="file" id="file2" onChange={addChannelFile} style={{ display: 'none' }} />
                                </div>
                            </Col>

                        </Row> */}
                    </Card>
                    <ButtonContainer>
                        <CancelButton onClick={() => navigate(-1)}>x 취소</CancelButton>
                        <AddButton onClick={editMaster}>{params.pk == 0 ? '+ 추가' : '수정'}</AddButton>
                    </ButtonContainer>
                </ManagerContentWrappers>
            </ManagerWrappers>
        </>
    )
}
export default MMasterEdit;