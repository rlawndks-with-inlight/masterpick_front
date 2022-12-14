import React from 'react'
import styled from 'styled-components'
import { useEffect, useState, useRef, useCallback } from 'react';
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
import fontSize from "tui-editor-plugin-font-size";
import "tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css";
import { RiDeleteBinLine } from 'react-icons/ri'

const MMasterEdit = () => {
    const params = useParams();
    const navigate = useNavigate();

    const yieldRef = useRef();
    const principleRef = useRef();
    const styleRef = useRef();

    const [myNick, setMyNick] = useState("")
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)
    const [channelUrl, setChannelUrl] = useState('')
    const [channelContent, setChannelContent] = useState(undefined)
    const [formData] = useState(new FormData())
    const [noteFormData] = useState(new FormData());
    const [sectorList, setSectorList] = useState([])
    useEffect(() => {
        async function fetchPost() {
            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/item?table=master&pk=${params.pk}`)
                $('.name').val(response.data.name)
                $('.yield').val(response.data.yield)
                setUrl(backUrl + response.data.profile_img)
                $('.background-color').val(response.data.background_color)
                $('.motto').val(response.data.motto)
                yieldRef.current.getInstance().setHTML(response.data.yield.replaceAll('http://localhost:8001', backUrl));
                principleRef.current.getInstance().setHTML(response.data.investment_principle.replaceAll('http://localhost:8001', backUrl));
                styleRef.current.getInstance().setHTML(response.data.investment_style.replaceAll('http://localhost:8001', backUrl));
                let sector_list = JSON.parse(response.data.sector_list);
                setSectorList(sector_list);
                await new Promise((r) => setTimeout(r, 500));
                for (var i = 0; i < sector_list.length; i++) {
                    $(`.sector-td-1-${i}`).val(sector_list[i]?.title);
                    $(`.sector-td-2-${i}`).val(sector_list[i]?.percent);
                }

            } else {
                $('.background-color').val(theme.color.background1);

            }
        }
        fetchPost();
    }, [])
    const editMaster = async () => {
        let sector_list = [];
        for (var i = 0; i < sectorList.length; i++) {
            if ($(`.sector-tr-${i}`).css('display') != 'none') {
                if (isNaN(parseFloat($(`.sector-td-2-${i}`).val()))) {
                    alert('?????????????????? ????????? ????????? ????????? ?????? ????????? ?????? ????????????.');
                    return;
                } else {
                    sector_list.push(
                        { title: $(`.sector-td-1-${i}`).val(), percent: parseFloat($(`.sector-td-2-${i}`).val()) }
                    )
                }
            }
        }
        if ((!$(`.name`).val() || !content) && params.pk == 0) {
            alert('???????????? ??????????????????.');
        } else {

            formData.append("name", $(`.name`).val());
            formData.append("backgroundColor", $(`.background-color`).val());
            formData.append("motto", $(`.motto`).val());
            formData.append("master", content);
            formData.append("sectorList", JSON.stringify(sector_list));
            formData.append('yield', yieldRef.current.getInstance().getHTML());//?????? ?????????
            formData.append('principle', principleRef.current.getInstance().getHTML());//????????????
            formData.append('style', styleRef.current.getInstance().getHTML());//???????????????


            // formData.append("channel", channelContent);
            if (params.pk > 0) formData.append("pk", params.pk)
            if (window.confirm(`${params.pk == 0 ? '?????????????????????????' : '?????????????????????????'}`)) {
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
         
                    <Breadcrumb title={params.pk == 0 ? '?????? ??????' : '?????? ??????'} nickname={myNick} />
                    <Card>
                        {/* <Row>
                            <Col>
                                <Title>?????????</Title>
                                <Input className='id' />
                            </Col>
                            <Col>
                                <Title>????????????</Title>
                                <Input className='pw' placeholder='****' type={'password'} />
                            </Col>

                        </Row> */}
                        <Row>
                            <Col>
                                <Title>??????</Title>
                                <Input className='name' />
                            </Col>
                            <Col>
                                <Title>?????????</Title>
                                <Input className='motto' />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>????????? ?????????</Title>
                                <ImageContainer for="file1">

                                    {url ?
                                        <>
                                            <img src={url} alt="#"
                                                style={{
                                                    width: 'auto', height: '150px',
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
                                <Title>?????? ?????????</Title>
                                <Input type={'color'} className='background-color' style={{ background: '#fff', height: '36px', width: '220px' }} />
                            </Col>
                           
                        </Row>
                        <Row>
                        <Col>
                                <Title>?????? ?????????</Title>
                                <div id="editor">
                                    {/* <Picker onEmojiClick={onEmojiClick} /> */}
                                    <Editor
                                        placeholder="????????? ??????????????????."
                                        previewStyle="vertical"
                                        height="600px"
                                        initialEditType="wysiwyg"
                                        useCommandShortcut={false}
                                        useTuiEditorEmoji={true}
                                        hideModeSwitch={true}
                                        plugins={[colorSyntax,fontSize]}
                                        language="ko-KR"
                                        ref={yieldRef}
                                        hooks={{
                                            addImageBlobHook: async (blob, callback) => {

                                                noteFormData.append('note', blob);
                                                const { data: response } = await axios.post('/api/addimage', noteFormData);
                                                if (response.result > 0) {
                                                    callback(backUrl + response.data.filename)
                                                    noteFormData.delete('note');
                                                } else {
                                                    noteFormData.delete('note');
                                                    return;
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>????????????</Title>
                                <div id="editor">
                                    {/* <Picker onEmojiClick={onEmojiClick} /> */}
                                    <Editor
                                        placeholder="????????? ??????????????????."
                                        previewStyle="vertical"
                                        height="600px"
                                        initialEditType="wysiwyg"
                                        useCommandShortcut={false}
                                        useTuiEditorEmoji={true}
                                        hideModeSwitch={true}
                                        plugins={[colorSyntax,fontSize]}
                                        language="ko-KR"
                                        ref={principleRef}
                                        hooks={{
                                            addImageBlobHook: async (blob, callback) => {

                                                noteFormData.append('note', blob);
                                                const { data: response } = await axios.post('/api/addimage', noteFormData);
                                                if (response.result > 0) {
                                                    callback(backUrl + response.data.filename)
                                                    noteFormData.delete('note');
                                                } else {
                                                    noteFormData.delete('note');
                                                    return;
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>???????????????</Title>
                                <div id="editor">
                                    {/* <Picker onEmojiClick={onEmojiClick} /> */}
                                    <Editor
                                        placeholder="????????? ??????????????????."
                                        previewStyle="vertical"
                                        height="600px"
                                        initialEditType="wysiwyg"
                                        useCommandShortcut={false}
                                        useTuiEditorEmoji={true}
                                        hideModeSwitch={true}
                                        plugins={[colorSyntax,fontSize]}
                                        language="ko-KR"
                                        ref={styleRef}
                                        hooks={{
                                            addImageBlobHook: async (blob, callback) => {

                                                noteFormData.append('note', blob);
                                                const { data: response } = await axios.post('/api/addimage', noteFormData);
                                                if (response.result > 0) {
                                                    callback(backUrl + response.data.filename)
                                                    noteFormData.delete('note');
                                                } else {
                                                    noteFormData.delete('note');
                                                    return;
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>?????? ?????? ??????</Title>
                                <Container>
                                    <Table>
                                        <Tr>
                                            <Td>??????</Td>
                                            <Td>?????????</Td>
                                            <Td style={{ width: '20%' }}>??????</Td>
                                        </Tr>
                                        {sectorList && sectorList.map((item, idx) => (
                                            <>
                                                <Tr className={`sector-tr-${idx}`}>
                                                    <Td ><SectorInput className={`sector-td-1-${idx}`} /></Td>
                                                    <Td ><SectorInput className={`sector-td-2-${idx}`} placeholder={'only number'} /> </Td>
                                                    <Td style={{ width: '20%' }}><RiDeleteBinLine style={{ cursor: 'pointer' }} onClick={() => { $(`.sector-tr-${idx}`).css('display', 'none') }} /></Td>
                                                </Tr>
                                            </>
                                        ))}
                                    </Table>
                                    <SectorAddButton onClick={() => { setSectorList([...sectorList, ...[{}]]) }}>+??????</SectorAddButton>
                                </Container>
                            </Col>
                        </Row>
                    </Card>

                    <ButtonContainer>
                        <CancelButton onClick={() => navigate(-1)}>x ??????</CancelButton>
                        <AddButton onClick={editMaster}>{params.pk == 0 ? '+ ??????' : '??????'}</AddButton>
                    </ButtonContainer>
              
        </>
    )
}
export default MMasterEdit;