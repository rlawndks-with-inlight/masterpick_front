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

const MMasterSubscribeEdit = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [myNick, setMyNick] = useState("")
    const [masterList, setMasterList] = useState([])

    //표-start
    const [sectorList, setSectorList] = useState([])
    const [takeList, setTakeList] = useState([])//매출액
    const [operatingProfitList, setOperatingProfitList] = useState([])//영업이익
    const [investmentPointList, setInvestmentPointList] = useState([])//투자포인트-막대그래프
    const [majorBussinessList, setMajorBussinessList] = useState([])//주요사업-원형그래프
    //표-end

    //file-start
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)
    const [url2, setUrl2] = useState('')
    const [content2, setContent2] = useState(undefined)
    const [url3, setUrl3] = useState('')
    const [content3, setContent3] = useState(undefined)
    const [formData] = useState(new FormData())
    //file-end

    //editor-start
    const mainRef = useRef();//메인 이미지 및 콘텐츠
    const companyOverviewRef = useRef();//기업개요 설명
    const investmentPointRef = useRef();//투자포인트 설명
    const majorBussinessRef = useRef();//주요사업 설명
    const shareRef = useRef();//변동사항 지분 설명
    const capitalChangeRef = useRef();//변동사항 자본금변동 설명
    const investmentIndicatorRef = useRef();//투자지표 설명
    const etcRef = useRef();//추가내용들 설명
    //editor-end

    const [noteFormData] = useState(new FormData());

    useEffect(() => {
        async function fetchPost() {
            const { data: masterresponse } = await axios.get('/api/items?table=master')
            console.log(masterresponse)
            setMasterList(masterresponse?.data ?? []);
            if (params.pk > 0) {

                const { data: response } = await axios.get(`/api/getmastercontents?table=master_subscribe&pk=${params.pk}`);
                let sector_list = response.data;
                setSectorList(sector_list);
                await new Promise((r) => setTimeout(r, 100));
                for (var i = 0; i < sector_list.length; i++) {
                    $(`.sector-td-1-${i}`).val(sector_list[i]?.name);
                    $(`.sector-td-2-${i}`).val(sector_list[i]?.level);
                }
            } else {

            }
        }
        fetchPost();
    }, [])
    const editMaster = async () => {
        let take_list = [];
        for (var i = 0; i < takeList.length; i++) {
            if ($(`.take-tr-${i}`).css('display') != 'none') {
                take_list.push(
                    { year: $(`.take-td-1-${i}`).val(), price: $(`.take-td-2-${i}`).val() }
                )
            }
        }
        let operating_profit_list = [];
        for (var i = 0; i < operatingProfitList.length; i++) {
            if ($(`.operatingProfit-tr-${i}`).css('display') != 'none') {
                operating_profit_list.push(
                    { year: $(`.operatingProfit-td-1-${i}`).val(), price: $(`.operatingProfit-td-2-${i}`).val() }
                )
            }
        }
        let investment_point_list = [];
        for (var i = 0; i < investmentPointList.length; i++) {
            if ($(`.investmentPoint-tr-${i}`).css('display') != 'none') {
                investment_point_list.push(
                    { element: $(`.investmentPoint-td-1-${i}`).val(), score: $(`.investmentPoint-td-2-${i}`).val(), sub_title: $(`.investmentPoint-td-3-${i}`).val() }
                )
            }
        }
        let major_bussiness_list = [];
        for (var i = 0; i < majorBussinessList.length; i++) {
            if ($(`.majorBussiness-tr-${i}`).css('display') != 'none') {
                major_bussiness_list.push(
                    { element: $(`.majorBussiness-td-1-${i}`).val(), price: $(`.majorBussiness-td-2-${i}`).val(), percent: $(`.majorBussiness-td-3-${i}`).val() }
                )
            }
        }
        if (window.confirm("저장 하시겠습니까?")) {
            formData.append('name', $('.name').val());
            formData.append('base_price', $('.base_price').val());
            formData.append('capture_date', $('.capture_date').val());
            formData.append('score', $('.score').val());
            formData.append('weather', $('.weather').val());
            formData.append('master_pk', $('.master_pk').val());
            formData.append('main_note', mainRef.current.getInstance().getHTML());
            formData.append('take_list', JSON.stringify(take_list));
            formData.append('operating_profit_list', JSON.stringify(operating_profit_list));
            formData.append('company_overview_note', companyOverviewRef.current.getInstance().getHTML());
            formData.append('investment_point_list', JSON.stringify(investment_point_list));
            formData.append('investment_point_note', investmentIndicatorRef.current.getInstance().getHTML());
            formData.append('major_bussiness_list', JSON.stringify(major_bussiness_list));
            formData.append('major_bussiness_img', content);
            formData.append('major_bussiness_text', $('.major_bussiness_text').val());
            formData.append('major_bussiness_note', majorBussinessRef.current.getInstance().getHTML());
            formData.append('share_note', shareRef.current.getInstance().getHTML());
            formData.append('capital_change_img', content2);
            formData.append('capital_change_text', $('.capital_change_text').val());
            formData.append('capital_change_note', capitalChangeRef.current.getInstance().getHTML());
            formData.append('investment_indicator_img', content3);
            formData.append('investment_indicator_note', investmentIndicatorRef.current.getInstance().getHTML());
            formData.append('etc_note', etcRef.current.getInstance().getHTML());

            if (params.pk > 0) {
                formData.append('pk', params.pk);
                const { data: response } = await axios.post('/api/updatesubscribecontent', formData);
                console.log(response)
            } else if (params.pk == 0) {
                const { data: response } = await axios.post('/api/addsubscribecontent', formData);
                console.log(response)
            } else {
                return;
            }
        }

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
    const addFile3 = (e) => {
        if (e.target.files[0]) {
            setContent3(e.target.files[0]);
            setUrl3(URL.createObjectURL(e.target.files[0]))
        }
    };
    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={params.pk == 0 ? '거장구독컨텐츠 추가' : '거장구독컨텐츠 수정'} nickname={myNick} />
                    <Card>
                        <Row>
                            <Col>
                                <Title>종목명</Title>
                                <Input className='name' placeholder='종목명을 입력해주세요.' />
                            </Col>
                            <Col>
                                <Title>기준가</Title>
                                <Input className='base_price' placeholder='숫자를 입력해주세요.' />
                            </Col>
                            <Col>
                                <Title>포착일시</Title>
                                <Input className='capture_date' type={'date'} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>투자점수</Title>
                                <Input className='score' placeholder='100 이하 숫자를 입력해주세요.' />
                            </Col>
                            <Col>
                                <Title>투자날씨</Title>
                                <Select className='weather'>
                                    <option value={0}>맑음 : 강력매수</option>
                                    <option value={1}>구름 조금 : 매수</option>
                                    <option value={2}>흐림 : 중립</option>
                                    <option value={3}>약한비 : 매도</option>
                                    <option value={4}>비 : 강력매도</option>
                                </Select>
                            </Col>
                            <Col>
                                <Title>대가명</Title>
                                <Select className='master_pk'>
                                    {masterList.map((item, idx) => (
                                        <>
                                            <option value={item.pk}>{item.name}</option>
                                        </>
                                    ))}
                                </Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>메인 콘텐츠</Title>
                                <Title>&nbsp;&nbsp;&nbsp;(1) 메인 이미지 및 텍스트</Title>
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
                                        ref={mainRef}
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
                                <Title>매출액</Title>
                                <Container>
                                    <Table>
                                        <Tr>
                                            <Td>연도</Td>
                                            <Td>매출액</Td>
                                            <Td style={{ width: '20%' }}>삭제</Td>
                                        </Tr>
                                        {takeList && takeList.map((item, idx) => (
                                            <>
                                                <Tr className={`take-tr-${idx}`}>
                                                    <Td ><SectorInput className={`take-td-1-${idx}`} /></Td>
                                                    <Td ><SectorInput className={`take-td-2-${idx}`} /> </Td>
                                                    <Td style={{ width: '20%' }}><RiDeleteBinLine style={{ cursor: 'pointer' }} onClick={() => { $(`.take-tr-${idx}`).css('display', 'none') }} /></Td>
                                                </Tr>
                                            </>
                                        ))}
                                    </Table>
                                    <SectorAddButton onClick={() => { setTakeList([...takeList, ...[{}]]) }}>+추가</SectorAddButton>
                                </Container>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>영업이익</Title>
                                <Container>
                                    <Table>
                                        <Tr>
                                            <Td>연도</Td>
                                            <Td>매출액</Td>
                                            <Td style={{ width: '20%' }}>삭제</Td>
                                        </Tr>
                                        {operatingProfitList && operatingProfitList.map((item, idx) => (
                                            <>
                                                <Tr className={`operatingProfit-tr-${idx}`}>
                                                    <Td ><SectorInput className={`operatingProfit-td-1-${idx}`} /></Td>
                                                    <Td ><SectorInput className={`operatingProfit-td-2-${idx}`} /> </Td>
                                                    <Td style={{ width: '20%' }}><RiDeleteBinLine style={{ cursor: 'pointer' }} onClick={() => { $(`.operatingProfit-tr-${idx}`).css('display', 'none') }} /></Td>
                                                </Tr>
                                            </>
                                        ))}
                                    </Table>
                                    <SectorAddButton onClick={() => { setOperatingProfitList([...operatingProfitList, ...[{}]]) }}>+추가</SectorAddButton>
                                </Container>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>1. 기업개요</Title>
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
                                        ref={companyOverviewRef}
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
                                <Title>2. 투자 포인트</Title>
                                <Title>&nbsp;&nbsp;&nbsp;(1) 막대 그래프</Title>

                                <Container>
                                    <Table>
                                        <Tr>
                                            <Td>요소</Td>
                                            <Td>점수</Td>
                                            <Td>부제목</Td>
                                            <Td style={{ width: '20%' }}>삭제</Td>
                                        </Tr>
                                        {investmentPointList && investmentPointList.map((item, idx) => (
                                            <>
                                                <Tr className={`investmentPoint-tr-${idx}`}>
                                                    <Td ><SectorInput className={`investmentPoint-td-1-${idx}`} /></Td>
                                                    <Td ><SectorInput className={`investmentPoint-td-2-${idx}`} /> </Td>
                                                    <Td ><SectorInput className={`investmentPoint-td-3-${idx}`} /> </Td>
                                                    <Td style={{ width: '20%' }}><RiDeleteBinLine style={{ cursor: 'pointer' }} onClick={() => { $(`.investmentPoint-tr-${idx}`).css('display', 'none') }} /></Td>
                                                </Tr>
                                            </>
                                        ))}
                                    </Table>
                                    <SectorAddButton onClick={() => { setInvestmentPointList([...investmentPointList, ...[{}]]) }}>+추가</SectorAddButton>
                                </Container>
                                <Title>&nbsp;&nbsp;&nbsp;(2) 설명</Title>

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
                                        ref={investmentPointRef}
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
                                <Title>3. 주요 사업</Title>
                                <Title>&nbsp;&nbsp;&nbsp;(1) 원형 그래프</Title>
                                <Container>
                                    <Table>
                                        <Tr>
                                            <Td>부문</Td>
                                            <Td>매출액</Td>
                                            <Td>퍼센트</Td>
                                            <Td style={{ width: '20%' }}>삭제</Td>
                                        </Tr>
                                        {majorBussinessList && majorBussinessList.map((item, idx) => (
                                            <>
                                                <Tr className={`majorBussiness-tr-${idx}`}>
                                                    <Td ><SectorInput className={`majorBussiness-td-1-${idx}`} /></Td>
                                                    <Td ><SectorInput className={`majorBussiness-td-2-${idx}`} /> </Td>
                                                    <Td ><SectorInput className={`majorBussiness-td-3-${idx}`} /> </Td>
                                                    <Td style={{ width: '20%' }}><RiDeleteBinLine style={{ cursor: 'pointer' }} onClick={() => { $(`.majorBussiness-tr-${idx}`).css('display', 'none') }} /></Td>
                                                </Tr>
                                            </>
                                        ))}
                                    </Table>
                                    <SectorAddButton onClick={() => { setMajorBussinessList([...majorBussinessList, ...[{}]]) }}>+추가</SectorAddButton>
                                </Container>
                                <Title>&nbsp;&nbsp;&nbsp;(2) 표 이미지</Title>
                                <ImageContainer for="file1">

                                    {url ?
                                        <>
                                            <img src={url} alt="#"
                                                style={{
                                                    width: 'auto', height: '8rem',
                                                    margin: '2rem'
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
                                <Input className='major_bussiness_text' />
                                <Title>&nbsp;&nbsp;&nbsp;(3) 설명</Title>
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
                                        ref={majorBussinessRef}
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
                                <Title>4. 지배구조, 자본금 변동사항</Title>
                                <Title>&nbsp;&nbsp;&nbsp;(1) 최대주주 및 특수관계인 지분</Title>
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
                                        ref={shareRef}
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
                                <Title>&nbsp;&nbsp;&nbsp;(2) 자본금 변동사항</Title>
                                <ImageContainer for="file2">
                                    {url2 ?
                                        <>
                                            <img src={url2} alt="#"
                                                style={{
                                                    width: 'auto', height: '8rem',
                                                    margin: '2rem'
                                                }} />
                                        </>
                                        :
                                        <>
                                            <AiFillFileImage style={{ margin: '4rem', fontSize: '4rem', color: `${theme.color.manager.font3}` }} />
                                        </>}
                                </ImageContainer>
                                <div>
                                    <input type="file" id="file2" onChange={addFile2} style={{ display: 'none' }} />
                                </div>
                                <Input className='capital_change_text' />
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
                                        ref={capitalChangeRef}
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
                                <Title>5. 투자 지표</Title>

                                <Title>&nbsp;&nbsp;&nbsp;(1) 표 이미지</Title>
                                <ImageContainer for="file3">
                                    {url3 ?
                                        <>
                                            <img src={url3} alt="#"
                                                style={{
                                                    width: 'auto', height: '8rem',
                                                    margin: '2rem'
                                                }} />
                                        </>
                                        :
                                        <>
                                            <AiFillFileImage style={{ margin: '4rem', fontSize: '4rem', color: `${theme.color.manager.font3}` }} />
                                        </>}
                                </ImageContainer>
                                <div>
                                    <input type="file" id="file3" onChange={addFile3} style={{ display: 'none' }} />
                                </div>
                                <Title>&nbsp;&nbsp;&nbsp;(2) 설명</Title>

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
                                        ref={investmentIndicatorRef}
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
                                <Title>6. 추가 내용들</Title>
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
                                        ref={etcRef}
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
                        <AddButton onClick={editMaster}>{params.pk == 0 ? '+ 추가' : '저장'}</AddButton>
                    </ButtonContainer>
                </ManagerContentWrappers>
            </ManagerWrappers>
        </>
    )
}
export default MMasterSubscribeEdit;