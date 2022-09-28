import React from 'react'
import styled from 'styled-components'
import { useEffect, useState, useRef } from 'react';
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
import { Card, Title, Input, Select, Row, Col, ImageContainer, Table, Tr, Td, SectorInput, SectorAddButton, Container } from '../../components/elements/ManagerTemplete';
import { backUrl } from '../../data/Data';
import theme from '../../styles/theme';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { RiDeleteBinLine } from 'react-icons/ri'

const MMasterEventEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [myNick, setMyNick] = useState("")
    const [sectorList, setSectorList] = useState([])

    useEffect(() => {
        async function fetchPost() {
            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/getmastercontents?table=master_event&pk=${params.pk}`);
                let sector_list = response.data;
                setSectorList(sector_list);
                await new Promise((r) => setTimeout(r, 100));
                for (var i = 0; i < sector_list.length; i++) {
                    $(`.sector-td-1-${i}`).val(sector_list[i]?.name);
                    $(`.sector-td-2-${i}`).val(sector_list[i]?.level);
                }
            } else {
                navigate(-1);
            }
        }
        fetchPost();
    }, [])
    const editMaster = async () => {
        if (window.confirm("저장 하시겠습니까?")) {
            let sector_list = [];
            for (var i = 0; i < sectorList.length; i++) {
                if ($(`.sector-tr-${i}`).css('display') != 'none') {
                    sector_list.push(
                        [$(`.sector-td-1-${i}`).val(), $(`.sector-td-2-${i}`).val(), params.pk]
                    )
                }
            }
            let obj = {
                list: sector_list,
                columns: ['name', 'level', 'master_pk'],
                table: 'master_event',
                master_pk: params.pk
            }

            const { data: response } = await axios.post('/api/updatemastercontent', obj);
            alert(response.message);
            if (response.result > 0) {
                navigate('/manager/list/master');
            }
        }

    }


    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={params.pk == 0 ? '거장종목추가' : '거장종목수정'} nickname={myNick} />
                    <Card>
                        <Row>
                            <Col>
                                <Title>종목</Title>
                                <Container>
                                    <Table>
                                        <Tr>
                                            <Td>종목명</Td>
                                            <Td>등급</Td>
                                            <Td style={{ width: '20%' }}>삭제</Td>
                                        </Tr>
                                        {sectorList && sectorList.map((item, idx) => (
                                            <>
                                                <Tr className={`sector-tr-${idx}`}>
                                                    <Td ><SectorInput className={`sector-td-1-${idx}`} /></Td>
                                                    <Td ><SectorInput className={`sector-td-2-${idx}`} /> </Td>
                                                    <Td style={{ width: '20%' }}><RiDeleteBinLine style={{ cursor: 'pointer' }} onClick={() => { $(`.sector-tr-${idx}`).css('display', 'none') }} /></Td>
                                                </Tr>
                                            </>
                                        ))}
                                    </Table>
                                    <SectorAddButton onClick={() => { setSectorList([...sectorList, ...[{}]]) }}>+추가</SectorAddButton>
                                </Container>
                            </Col>
                        </Row>

                    </Card>

                    <ButtonContainer>
                        <CancelButton onClick={() => navigate(-1)}>x 취소</CancelButton>
                        <AddButton onClick={editMaster}>{params.pk == 0 ? '+ 추가' : '저장'}</AddButton>
                    </ButtonContainer>
                </ManagerContentWrappers>
            </ManagerWrappers>
        </>
    )
}
export default MMasterEventEdit;