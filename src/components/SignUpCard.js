import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import logo from '../assets/images/test/logo.svg'
import kakao from '../assets/images/icon/kakao.png'
import naver from '../assets/images/icon/naver.png'
import { Title } from './elements/UserContentTemplete';
import { formatPhoneNumber } from '../functions/utils';
import { WrapperForm, CategoryName, Input, Button, FlexBox, SnsLogo } from './elements/AuthContentTemplete';

const SignUpCard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [phoneCheckIng, setPhoneCheckIng] = useState(false);
    const [isCheckId, setIsCheckId] = useState(false);
    const [isCheckNickname, setIsCheckNickname] = useState(false);
    const [isCheckPhoneNumber, setIsCheckPhoneNumber] = useState(false)
    const [randNum, setRandNum] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [num, setNum] = useState("");
    const [isCoinside, setIsCoinside] = useState(false);
    const [isSendSms, setIsSendSms] = useState(false)
    const [fixPhoneNumber, setFixPhoneNumber] = useState("")
    const [typeNum, setTypeNum] = useState(0);
    useEffect(()=>{
        if(location.state){
            $('.id').val(location.state.id);
            $('.pw').val("111");
            $('.pw-check').val("111");
            setTypeNum(location.state.type_num)
            setIsCheckId(true);
        }
    },[])
    const onCheckId = async () => {
        if (!$('.id').val()) {
            alert('아이디를 입력해주세요.');
        } else {
            const { data: response } = await axios.post('/api/checkexistid', { id: $('.id').val() });
            alert(response.message);
            if (response.result > 0) {
                setIsCheckId(true);
                $('.pw').focus();
            } else {
                setIsCheckId(false);
            }
        }
    }
    const onCheckNickname = async () => {
        if (!$('.nickname').val()) {
            alert('아이디를 입력해주세요.');
        } else {
            const { data: response } = await axios.post('/api/checkexistnickname', { nickname: $('.nickname').val() });
            alert(response.message);
            if (response.result > 0) {
                setIsCheckNickname(true);
                $('.phone').focus();
            } else {
                setIsCheckNickname(false);
            }
        }
    }
    const sendSms = async () => {
        if (!$('.phone').val()) {
            alert("핸드폰 번호를 입력해주세요.")
            return;
        }
        setIsCheckPhoneNumber(false);
        let fix_phone = $('.phone').val().replace('-', '');
        setFixPhoneNumber(fix_phone);
        let content = "";
        for (var i = 0; i < 6; i++) {
            content += Math.floor(Math.random() * 10).toString();
        }

        let string = `\n인증번호를 입력해주세요 ${content}.\n\n-We are-`;
        try {
            const { data: response } = await axios.post(`/api/sendsms`, {
                receiver: [fix_phone, formatPhoneNumber(fix_phone)],
                content: string
            })
            if (response?.result > 0) {
                alert('인증번호가 발송되었습니다.');

                setIsSendSms(true)
                setRandNum(content);
                $('phone-check').focus();
            } else {
                setIsSendSms(false)
            }
        } catch (e) {
            console.log(e)
        }

        //console.log(response)

    }
    const confirmCoincide = (e) => {
        if (randNum === $('.phone-check').val()) {
            setIsCheckPhoneNumber(true);
            alert("인증번호가 일치합니다.");
        } else {
            setIsCheckPhoneNumber(false);
            alert("인증번호가 일차하지 않습니다.");
        }
    }
    const onSignUp = async () => {
        if (!$('.id').val()) {
            alert('필수값을 입력해주세요.');
        } else if (!isCheckId) {
            alert('아이디 중복확인을 해주세요.');
        } else if ($('.pw').val() != $('.pw-check').val()) {
            alert('비밀번호가 일치하지 않습니다.');
        } else if (!isCheckPhoneNumber) {
            alert('전화번호 인증을 완료해 주세요.');
        } else if (!isCheckNickname) {
            alert('닉네임 중복확인을 해주세요.');
        } else {
            if (window.confirm('회원가입 하시겠습니까?')) {
                const { data: response } = await axios.post('/api/adduser', {
                    id: $('.id').val(),
                    pw: $('.pw').val(),
                    name: $('.name').val(),
                    nickname: $('.nickname').val(),
                    phone: $('.phone').val(),
                    user_level: 0,
                    type_num:typeNum
                })
                if (response.result > 0) {
                    alert('회원가입이 완료되었습니다.');
                    navigate('/login');
                } else {
                    alert(response.message);
                }
            }

        }
    }
    const onKeyPressId = (e) => {
        if (e.key == 'Enter') {
            onCheckId();
        }
    }
    const onKeyPressPw = (e) => {
        if (e.key == 'Enter') {
            $('.pw-check').focus();
        }
    }
    const onKeyPressPwCheck = (e) => {
        if (e.key == 'Enter') {
            $('.name').focus();
        }
    }
    const onKeyPressName = (e) => {
        if (e.key == 'Enter') {
            $('.nickname').focus();
        }
    }
    const onKeyPressNickname = (e) => {
        if (e.key == 'Enter') {
            onCheckNickname();
        }
    }
    const onKeyPressPhone = (e) => {
        if (e.key == 'Enter') {
            sendSms();
        }
    }
    const onKeyPressPhoneCheck = (e) => {
        if (e.key == 'Enter') {
            confirmCoincide();
        }
    }

    return (
        <>
            <WrapperForm onSubmit={onSignUp} id='login_form'>
                <Title>회원가입</Title>
                {location.state?
                <>
                </>
                :
                <>
                <CategoryName>아이디</CategoryName>
                <Input placeholder='아이디를 입력해주세요.' type={'text'} className='id' disabled={isCheckId} onKeyPress={onKeyPressId} />
                <Button onClick={onCheckId} disabled={isCheckId}>{isCheckId ? '사용가능' : '중복확인'}</Button>
                <CategoryName>비밀번호</CategoryName>
                <Input placeholder='비밀번호를 입력해주세요.' type={'password'} className='pw' onKeyPress={onKeyPressPw} />
                <CategoryName>비밀번호 확인</CategoryName>
                <Input placeholder='비밀번호를 한번더 입력해주세요.' type={'password'} className='pw-check' onKeyPress={onKeyPressPwCheck} />
                </>
                }
                
               
                <CategoryName>이름</CategoryName>
                <Input placeholder='이름을 입력해주세요.' type={'text'} className='name' onKeyPress={onKeyPressName} />
                <CategoryName>닉네임</CategoryName>
                <Input placeholder='닉네임을 입력해주세요.' type={'text'} className='nickname' onKeyPress={onKeyPressNickname} />
                <Button onClick={onCheckNickname} disabled={isCheckNickname}>{isCheckNickname ? '사용가능' : '중복확인'}</Button>
                <CategoryName>전화번호</CategoryName>
                <Input placeholder='전화번호를 입력해주세요.' type={'text'} className='phone' disabled={isCheckPhoneNumber} onKeyPress={onKeyPressPhone} />
                <Button onClick={sendSms} disabled={isCheckPhoneNumber}>인증번호 발송</Button>
                <Input style={{marginTop:'36px'}} placeholder='인증번호를 입력해주세요.' type={'text'} className='phone-check' disabled={isCheckPhoneNumber} onKeyPress={onKeyPressPhoneCheck} />
                <Button onClick={confirmCoincide} disabled={isCheckPhoneNumber}>{isCheckPhoneNumber ? '확인완료' : '인증번호 확인'}</Button>
                <Button style={{marginTop:'36px'}} onClick={onSignUp}>회원가입</Button>
                <CategoryName>SNS 간편 회원가입</CategoryName>
                <FlexBox>
                    <SnsLogo src={kakao} />
                    <SnsLogo src={naver} />
                </FlexBox>

            </WrapperForm>
        </>
    );
};
export default SignUpCard;