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
import { Card, Title, Input, Select, Row, Col, Table, Tr, Td, SectorInput, SectorAddButton, Container } from '../../components/elements/ManagerTemplete';
import { backUrl } from '../../data/Data';
import theme from '../../styles/theme';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import Picker from 'emoji-picker-react';
import SelectSubType from '../../components/elements/SelectSubType';
import SubType from '../../components/elements/SubType';
import { RiDeleteBinLine } from 'react-icons/ri'

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
width: auto; 
height: 12rem;
margin: 24px;
@media screen and (max-width:700px) {
    width: 12rem; 
    height: 9rem;
}
`
const SlideContainer = styled.div`
margin:12px auto 6px 24px;
@media screen and (max-width:700px) {
    margin:6px 0;
}
`
const MMainEdit = () => {
    const params = useParams();
    const navigate = useNavigate();

    const editorRef = useRef();
    const introduceRef = useRef();
    const howToUseRef = useRef();
    const mustReadRef = useRef();
    const [myNick, setMyNick] = useState("")
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)
    const [url2, setUrl2] = useState('')
    const [content2, setContent2] = useState(undefined)
    const [setting, setSetting] = useState({});
    const [formData] = useState(new FormData())
    const [noteFormData] = useState(new FormData());

    const [bestMasterImg, setBestMasterImg] = useState("");
    const [bestMasterList, setBestMasterList] = useState([])
    const [bestMasterNum, setBestMasterNum] = useState(0);

    const [masterImg, setMasterImg] = useState("");
    const [masterList, setMasterList] = useState([])
    const [masterNum, setMasterNum] = useState(0);

    const [sectorList, setSectorList] = useState([])

    useEffect(() => {
        async function fetchPost() {
            formData.delete('main')
            formData.delete('best_mater_yield_list')
            formData.delete('recommendation_list')
            formData.delete('best_list')
            formData.delete('pk')
            formData.delete('banner')
            setUrl('')
            setUrl2('')
            const { data: masterResponse } = await axios.get('/api/items?table=master');
            setBestMasterList(masterResponse.data);
            setBestMasterNum(masterResponse.data[0].pk)
            setBestMasterImg(backUrl + masterResponse.data[0].profile_img);

            setMasterList(masterResponse.data);
            setMasterNum(masterResponse.data[0].pk)
            setMasterImg(backUrl + masterResponse.data[0].profile_img);

            const { data: response } = await axios.get('/api/getmaincontent');
            console.log(response)
            let best_obj = JSON.parse(response.data.best_mater_yield_list);
            for (var i = 0; i < Object.keys(best_obj).length; i++) {
                $(`.best_mater_yield-${Object.keys(best_obj)[i]}`).val(best_obj[Object.keys(best_obj)[i]]?.best_mater_yield)
            }
            let obj = JSON.parse(response.data.recommendation_list);
            for (var i = 0; i < Object.keys(obj).length; i++) {
                $(`.name-${Object.keys(obj)[i]}`).val(obj[Object.keys(obj)[i]]?.name)
                $(`.note-${Object.keys(obj)[i]}`).val(obj[Object.keys(obj)[i]]?.note)
                $(`.recommend_price-${Object.keys(obj)[i]}`).val(obj[Object.keys(obj)[i]]?.recommend_price)
                $(`.current_price-${Object.keys(obj)[i]}`).val(obj[Object.keys(obj)[i]]?.current_price)
                $(`.yield-${Object.keys(obj)[i]}`).val(obj[Object.keys(obj)[i]]?.yield)
            }
            let sector_list = JSON.parse(response.data.best_list);
            setSectorList(sector_list);
            await new Promise((r) => setTimeout(r, 100));
            for (var i = 0; i < sector_list.length; i++) {
                $(`.best-td-1-${i}`).val(sector_list[i]?.master_name)
                $(`.best-td-2-${i}`).val(sector_list[i]?.name)
                $(`.best-td-3-${i}`).val(sector_list[i]?.yield)
                $(`.best-td-4-${i}`).val(sector_list[i]?.days)
            }
            setSetting(response.data ?? {});
            if (response.data) {
                setUrl(backUrl + response.data.main_img);
                setUrl2(backUrl + response.data.banner_img);
            }
        }
        $('div.toastui-editor-defaultUI-toolbar > div:nth-child(4)').append(`<button type="button" class='emoji' aria-label='이모티콘' style='font-size:18px;'>🙂</button>`);
        fetchPost();
    }, [params])
    useEffect(() => {
        $('button.emoji').on('click', function () {
            $('.emoji-picker-react').attr('style', 'display: flex !important')
        })
        $('.toastui-editor-toolbar-icons').on('click', function () {
            $('.emoji-picker-react').attr('style', 'display: none !important')
        })
    }, [params])
    const editSetting = async () => {


        let best_obj = {};
        for (var i = 0; i < bestMasterList.length; i++) {
            best_obj[bestMasterList[i].pk] = {
                best_mater_yield: $(`.best_mater_yield-${bestMasterList[i].pk}`).val(),
            }
        }
        let obj = {};
        for (var i = 0; i < masterList.length; i++) {
            obj[masterList[i].pk] = {
                name: $(`.name-${masterList[i].pk}`).val(),
                note: $(`.note-${masterList[i].pk}`).val(),
                recommend_price: $(`.recommend_price-${masterList[i].pk}`).val(),
                current_price: $(`.current_price-${masterList[i].pk}`).val(),
                yield: $(`.yield-${masterList[i].pk}`).val(),
            }
        }
        let sector_list = [];
        for (var i = 0; i < sectorList.length; i++) {
            if ($(`.best-tr-${i}`).css('display') != 'none') {
                sector_list.push(
                    { master_name: $(`.best-td-1-${i}`).val(), name: $(`.best-td-2-${i}`).val(), yield: $(`.best-td-3-${i}`).val(), days: $(`.best-td-4-${i}`).val() }
                )
            }
        }
        if (window.confirm("저장하시겠습니까?")) {
            if (params.category == 'main_img') formData.append('main', content);
            if (params.category == 'best_mater_yield_list') formData.append('best_mater_yield_list', JSON.stringify(best_obj));
            if (params.category == 'recommendation_list') formData.append('recommendation_list', JSON.stringify(obj));
            if (params.category == 'best_list') formData.append('best_list', JSON.stringify(sector_list));
            if (params.category == 'banner_img') formData.append('banner', content2);

            const { data: response } = await axios.post('/api/editmaincontent', formData)
            if (response.result > 0) {
                alert('성공적으로 저장되었습니다.')
            } else {
                alert(response.message)
            }
        }

        // formData.append('introduce', introduceRef.current.getInstance().getHTML());
        // formData.append('howToUse', howToUseRef.current.getInstance().getHTML());
        // formData.append('mustRead', mustReadRef.current.getInstance().getHTML());

        // if (setting.main_img) {
        //     if (window.confirm("정말 수정하시겠습니까?")) {
        //         formData.append('pk', setting?.pk);
        //         const { data: response } = await axios.post('/api/updatesetting', formData);
        //         if (response.result > 0) {
        //             alert("성공적으로 수정되었습니다.")
        //         }
        //     }
        // } else {
        //     if (window.confirm("정말 추가하시겠습니까?")) {
        //         const { data: response } = await axios.post('/api/addsetting', formData);
        //         if (response.result > 0) {
        //             alert("성공적으로 추가되었습니다.")
        //         }
        //     }

        // }
    }
    const addFile = (e) => {
        if (e.target.files[0]) {
            setContent(e.target.files[0]);
            setUrl(URL.createObjectURL(e.target.files[0]))
        }
    };
    const addFile2 = (e) => {
        if (e.target.files[0]) {
            setContent2(e.target.files[0]);
            setUrl2(URL.createObjectURL(e.target.files[0]))
        }
    };
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        introduceRef.current.getInstance().insertText(emojiObject.emoji)
    };
    const onClickBestMaster = (num) => {
        setBestMasterNum(num)
        for (var i = 0; i < bestMasterList.length; i++) {
            if (bestMasterList[i].pk == num) {
                setBestMasterImg(backUrl + bestMasterList[i].profile_img)
            }
        }
    }
    const onClickMaster = (num) => {
        setMasterNum(num);
        for (var i = 0; i < masterList.length; i++) {
            if (masterList[i].pk == num) {
                setMasterImg(backUrl + masterList[i].profile_img)
            }
        }
    }


    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={'메인페이지'} nickname={myNick} />
                    <Card>
                        {params.category == 'main_img' ?
                            <>
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
                            </>
                            :
                            <>
                            </>}
                        {params.category == 'best_mater_yield_list' ?
                            <>
                                <Row>
                                    <Col>
                                        <Title>BEST 투자대가 </Title>
                                        <SlideContainer>
                                            <SelectSubType className='subtype-container' style={{ marginBottom: '16px' }}>
                                                {bestMasterList.map((item, index) => (
                                                    <>
                                                        <SubType style={{ color: `${theme.color.font1}`, background: `${bestMasterNum == item.pk ? theme.color.background2 : theme.color.background3}` }} onClick={() => { onClickBestMaster(item.pk) }}>
                                                            {item.name}
                                                        </SubType>
                                                    </>
                                                ))}
                                            </SelectSubType>
                                        </SlideContainer>
                                        <img src={bestMasterImg} style={{ margin: '12px auto 6px 24px', height: '84px', width: 'auto' }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Title>이달의 BEST 수익률</Title>
                                        {bestMasterList.map((item, index) => (
                                            <>
                                                <Input style={{ display: `${item.pk == bestMasterNum ? 'block' : 'none'}` }} placeholder='only number' className={`best_mater_yield-${item.pk}`} />
                                            </>
                                        ))}
                                    </Col>
                                </Row>
                            </>
                            :
                            <>
                            </>}
                        {params.category == 'recommendation_list' ?
                            <>
                                <Row>
                                    <Col>
                                        <Title>거장 추천종목</Title>
                                        <SlideContainer>
                                            <SelectSubType className='subtype-container' style={{ marginBottom: '16px' }}>
                                                {masterList.map((item, index) => (
                                                    <>
                                                        <SubType style={{ color: `${theme.color.font1}`, background: `${masterNum == item.pk ? theme.color.background2 : theme.color.background3}` }} onClick={() => { onClickMaster(item.pk) }}>
                                                            {item.name}
                                                        </SubType>
                                                    </>
                                                ))}
                                            </SelectSubType>
                                        </SlideContainer>
                                        <img src={masterImg} style={{ margin: '12px auto 6px 24px', height: '84px', width: 'auto' }} />

                                    </Col>
                                </Row>
                                {masterList.map((item, index) => (
                                    <>
                                        <div style={{ display: `${item.pk == masterNum ? 'block' : 'none'}` }}>

                                            <Row>
                                                <Col>
                                                    <Title>종목명{item.pk}</Title>
                                                    <Input className={`name-${item.pk}`} />
                                                </Col>
                                                <Col>
                                                    <Title>종목설명</Title>
                                                    <Input className={`note-${item.pk}`} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Title>추천가</Title>
                                                    <Input placeholder='only number' className={`recommend_price-${item.pk}`} />
                                                </Col>
                                                <Col>
                                                    <Title>현재가</Title>
                                                    <Input placeholder='only number' className={`current_price-${item.pk}`} />
                                                </Col>
                                                <Col>
                                                    <Title>현재수익률</Title>
                                                    <Input placeholder='only number' className={`yield-${item.pk}`} />
                                                </Col>
                                            </Row>

                                        </div>
                                    </>
                                ))}
                            </>
                            :
                            <>
                            </>}
                        {params.category == 'best_list' ?
                            <>
                                <Row>
                                    <Col>
                                        <Title>주/월간 BEST 수익률 </Title>
                                        <Container>
                                            <Table>
                                                <Tr>
                                                    <Td>거장명</Td>
                                                    <Td>종목명</Td>
                                                    <Td>수익률</Td>
                                                    <Td>보유기간</Td>
                                                    <Td style={{ width: '20%' }}>삭제</Td>
                                                </Tr>
                                                {sectorList && sectorList.map((item, idx) => (
                                                    <>
                                                        <Tr className={`best-tr-${idx}`}>
                                                            <Td ><SectorInput className={`best-td-1-${idx}`} /></Td>
                                                            <Td ><SectorInput className={`best-td-2-${idx}`} /> </Td>
                                                            <Td ><SectorInput className={`best-td-3-${idx}`} placeholder='only number' /> </Td>
                                                            <Td ><SectorInput className={`best-td-4-${idx}`} placeholder='only number' /> </Td>
                                                            <Td style={{ width: '20%' }}><RiDeleteBinLine style={{ cursor: 'pointer' }} onClick={() => { $(`.best-tr-${idx}`).css('display', 'none') }} /></Td>
                                                        </Tr>
                                                    </>
                                                ))}
                                            </Table>
                                            <SectorAddButton onClick={() => { setSectorList([...sectorList, ...[{}]]) }}>+추가</SectorAddButton>
                                        </Container>
                                    </Col>

                                </Row>
                            </>
                            :
                            <>
                            </>}
                        {params.category == 'banner_img' ?
                            <>
                                <Row>
                                    <Col>
                                        <Title>배너등록</Title>
                                        <ImageContainer for="file2">

                                            {url2 ?
                                                <>
                                                    <Img src={url2} alt="#"
                                                    />
                                                </>
                                                :
                                                <>
                                                    <AiFillFileImage style={{ margin: '6rem auto', fontSize: '4rem', color: `${theme.color.manager.font3}` }} />
                                                </>}
                                        </ImageContainer>
                                        <div>
                                            <input type="file" id="file2" onChange={addFile2} style={{ display: 'none' }} />
                                        </div>
                                    </Col>
                                </Row>
                            </>
                            :
                            <>
                            </>}
                        {/* <Row>
                            <Col>
                                <Title>투자대가 TOP PICK 배너 </Title>
                            </Col>
                        </Row> */}


                    </Card>
                    <ButtonContainer>
                        <CancelButton onClick={() => navigate(-1)}>x 취소</CancelButton>
                        <AddButton onClick={editSetting}>{'저장'}</AddButton>
                    </ButtonContainer>
                </ManagerContentWrappers>
            </ManagerWrappers>
        </>
    )
}
export default MMainEdit;