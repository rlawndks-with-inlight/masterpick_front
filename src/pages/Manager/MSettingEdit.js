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
import { Card, Title, Input, Select, Row, Col } from '../../components/elements/ManagerTemplete';
import { backUrl } from '../../data/Data';
import theme from '../../styles/theme';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
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

    const editorRef = useRef();
    const introduceRef = useRef();
    const howToUseRef = useRef();
    const mustReadRef = useRef();
    const [myNick, setMyNick] = useState("")
    const [url, setUrl] = useState('')
    const [setting, setSetting] = useState({});
    const [content, setContent] = useState(undefined)
    const [formData] = useState(new FormData())
    const [noteFormData] = useState(new FormData());
    useEffect(() => {
        async function fetchPost() {
            const { data: response } = await axios.get('/api/setting');
            setSetting(response.data ?? {});
            if (response.data) {
                setUrl(backUrl + response.data.main_img);
                introduceRef.current.getInstance().setHTML(response.data.introduce.replaceAll('http://localhost:8001', backUrl));
                howToUseRef.current.getInstance().setHTML(response.data.how_to_use.replaceAll('http://localhost:8001', backUrl));
                mustReadRef.current.getInstance().setHTML(response.data.must_read.replaceAll('http://localhost:8001', backUrl));
            }
        }
        fetchPost();
    }, [])
    const editSetting = async () => {
        if (!url && !content) {
            alert("필요값이 비어있습니다.");
        } else {

            formData.append('master', content);
            formData.append('introduce', introduceRef.current.getInstance().getHTML());
            formData.append('howToUse', howToUseRef.current.getInstance().getHTML());
            formData.append('mustRead', mustReadRef.current.getInstance().getHTML());
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
                    <Breadcrumb title={'환경설정'} nickname={myNick} />
                    <Card>

                        <Row>
                            <Col>
                                <Title>메인 배너</Title>
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
                        <Row>
                            <Col>
                                <Title>소개</Title>
                                <div id="editor">
                                    {/* <Picker onEmojiClick={onEmojiClick} /> */}
                                    <Editor
                                        placeholder="내용을 입력해주세요."
                                        previewStyle="vertical"
                                        height="600px"
                                        initialEditType="wysiwyg"
                                        useCommandShortcut={false}
                                        useTuiEditorEmoji={true}
                                        hideModeSwitch={true}
                                        plugins={[colorSyntax]}
                                        language="ko-KR"
                                        ref={introduceRef}
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
                                <Title>활용법</Title>
                                <div id="editor">
                                    {/* <Picker onEmojiClick={onEmojiClick} /> */}
                                    <Editor
                                        placeholder="내용을 입력해주세요."
                                        previewStyle="vertical"
                                        height="600px"
                                        initialEditType="wysiwyg"
                                        useCommandShortcut={false}
                                        useTuiEditorEmoji={true}
                                        hideModeSwitch={true}
                                        plugins={[colorSyntax]}
                                        language="ko-KR"
                                        ref={howToUseRef}
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
                                <Title>필독사항</Title>
                                <div id="editor">
                                    {/* <Picker onEmojiClick={onEmojiClick} /> */}
                                    <Editor
                                        placeholder="내용을 입력해주세요."
                                        previewStyle="vertical"
                                        height="600px"
                                        initialEditType="wysiwyg"
                                        useCommandShortcut={false}
                                        useTuiEditorEmoji={true}
                                        hideModeSwitch={true}
                                        plugins={[colorSyntax]}
                                        language="ko-KR"
                                        ref={mustReadRef}
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