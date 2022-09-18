import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import ManagerWrappers from '../../components/elements/ManagerWrappers';
import SideBar from '../../common/manager/SideBar';
import ManagerContentWrappers from '../../components/elements/ManagerContentWrappers';
import axios from 'axios';
import Breadcrumb from '../../common/manager/Breadcrumb';
import ButtonContainer from '../../components/elements/button/ButtonContainer';
import AddButton from '../../components/elements/button/AddButton';
import CancelButton from '../../components/elements/button/CancelButton';
import $ from 'jquery';
import { addItem, updateItem } from '../../functions/utils';
import { Card, Title, Input, Row, Col, ImageContainer, Select } from '../../components/elements/ManagerTemplete';


const MUserEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [myNick, setMyNick] = useState("")
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)
    const [formData] = useState(new FormData())
    useEffect(() => {

        async function fetchPost() {
            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/item?table=user&pk=${params.pk}`)
                $('.id').val(response.data.id)
                $('.pw').val("")
                $('.name').val(response.data.name)
                $('.nickname').val(response.data.nickname)
                $('.phone').val(response.data.phone)
                $('.level').val(response.data.user_level)
            }
        }
        fetchPost();
    }, [])
    const editUser = () => {
        if (!$(`.id`).val() || !$(`.name`).val() || !$(`.nickname`).val() || !$(`.phone`).val() || (!$(`.pw`).val() && params.pk == 0)) {
            alert('필요값이 비어있습니다.');
        } else {
            let obj = {
                id: $(`.id`).val(),

            }
            if (window.confirm(`${params.pk == 0 ? '추가하시겠습니까?' : '수정하시겠습니까?'}`)) {
                params.pk == 0 ?
                    addItem('user', { id: $(`.id`).val(), pw: $(`.pw`).val(), name: $(`.name`).val(), nickname: $(`.nickname`).val(), phone: $(`.phone`).val(), user_level: $(`.level`).val() }) :
                    updateItem('user', {
                        id: $(`.id`).val(), pw: $(`.pw`).val(), name: $(`.name`).val(), nickname: $(`.nickname`).val(), phone: $(`.phone`).val(), user_level: $(`.level`).val(), pk: params.pk
                    })
            }
        }


    }
    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={params.pk == 0 ? '회원 추가' : '회원 수정'} nickname={myNick} />
                    <Card>
                        <Row>
                            <Col>
                                <Title style={{ margintop: '32px' }}>아이디</Title>
                                <Input className='id' />
                            </Col>
                            <Col>
                                <Title style={{ margintop: '32px' }}>비밀번호</Title>
                                <Input className='pw' type={'password'} placeholder='****' />
                            </Col>
                            <Col>
                                <Title style={{ margintop: '32px' }}>이름</Title>
                                <Input className='name' />
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Title style={{ margintop: '32px' }}>닉네임</Title>
                                <Input className='nickname' />
                            </Col>
                            <Col>
                                <Title style={{ margintop: '32px' }}>폰번호</Title>
                                <Input className='phone' />
                            </Col>
                            <Col>
                                <Title style={{ margintop: '32px' }}>유저레벨</Title>
                                <Select className='level'>
                                    <option value={0}>일반유저</option>
                                    <option value={40}>관리자</option>
                                </Select>
                            </Col>
                        </Row>
                    </Card>
                    <ButtonContainer>
                        <CancelButton onClick={() => navigate(-1)}>x 취소</CancelButton>
                        <AddButton onClick={editUser}>{params.pk == 0 ? '+ 추가' : '수정'}</AddButton>
                    </ButtonContainer>
                </ManagerContentWrappers>
            </ManagerWrappers>
        </>
    )
}
export default MUserEdit;