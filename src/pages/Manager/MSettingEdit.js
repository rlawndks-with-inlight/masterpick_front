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
import { Card, Title, Input, Select, Row, Col } from '../../components/elements/ManagerTemplete';
import { backUrl } from '../../data/Data';
import theme from '../../styles/theme';

const ImageContainer = styled.label`
border: 2px dashed ${props => props.theme.color.manager.font3};
margin:12px auto 6px 24px;
height:16rem;
border-radius:2rem;
text-align:center;
min-width:20rem;
@media screen and (max-width:700px) {
min-width:10rem;

    margin:16px 24px;
}
`
const Img = styled.img`
width: 16rem; 
height: 12rem;
margin: 24px;
@media screen and (max-width:700px) {
    width: 12rem; 
    height: 9rem;
}
`
const MSettingEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [myNick, setMyNick] = useState("")
    const [url, setUrl] = useState('')
    const [setting, setSetting] = useState({});
    const [content, setContent] = useState(undefined)
    const [formData] = useState(new FormData())
    useEffect(() => {
        async function fetchPost() {
            const { data: response } = await axios.get('/api/setting');
            setSetting(response.data ?? {});
            if (response.data) {
                setUrl(backUrl + response.data.main_img);
            }
        }
        fetchPost();
    }, [])
    const editSetting = async () => {
        if (!url && !content) {
            alert("필요값이 비어있습니다.");
        } else {

            formData.append('master', content);
            if (setting.main_img) {
                if (window.confirm("정말 수정하시겠습니까?")) {
                    formData.append('pk', setting?.pk);
                    const { data: response } = await axios.post('/api/updatesetting', formData);
                    if (response.result > 0) {
                        alert("성공적으로 수정되었습니다.")
                    }
                }
            } else {
                if (window.confirm("정말 추가하시겠습니까?")) {
                    const { data: response } = await axios.post('/api/addsetting', formData);
                    if (response.result > 0) {
                        alert("성공적으로 추가되었습니다.")
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
                    <Breadcrumb title={'메인 이미지'} nickname={myNick} />
                    <Card>

                        <Row>
                            <Col>
                                <Title>이미지</Title>
                                <ImageContainer for="file1">

                                    {url ?
                                        <>
                                            <Img src={url} alt="#"
                                            />
                                        </>
                                        :
                                        <>
                                            <AiFillFileImage style={{ margin: '6rem auto', fontSize: '4rem', color: `${theme.color.manager.font3}` }} />
                                        </>}
                                </ImageContainer>
                                <div>
                                    <input type="file" id="file1" onChange={addFile} style={{ display: 'none' }} />
                                </div>
                            </Col>
                        </Row>

                    </Card>
                    <ButtonContainer>
                        <CancelButton onClick={() => navigate(-1)}>x 취소</CancelButton>
                        <AddButton onClick={editSetting}>{setting.main_img ? '수정' : '+ 추가'}</AddButton>
                    </ButtonContainer>
                </ManagerContentWrappers>
            </ManagerWrappers>
        </>
    )
}
export default MSettingEdit;