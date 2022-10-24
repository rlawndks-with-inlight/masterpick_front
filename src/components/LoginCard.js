import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import logo from '../assets/images/test/logo.svg'
import kakao from '../assets/images/icon/kakao.png'
import naver from '../assets/images/icon/naver.png'
import { WrapperForm, CategoryName, Input, Button, FlexBox, SnsLogo } from './elements/AuthContentTemplete';

const LoginCard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        async function isAdmin() {
            const { data: response } = await axios.get('/api/auth', {
                headers: {
                    'Content-type': 'application/json',
                }
            },
                { withCredentials: true });
            if (response.pk > 0) {
                localStorage.setItem('auth', JSON.stringify(response))
                navigate('/mypage');
            } else {
                localStorage.removeItem('auth')
            }
        }
        isAdmin();


    }, [])
    const onLogin = async () => {
        const { data: response } = await axios.post('/api/loginbyid', {
            id: $('.id').val(),
            pw: $('.pw').val()
        })
        alert(response.message);
        if (response.result > 0) {
            await localStorage.setItem('auth', JSON.stringify(response.data));
            navigate('/mypage');
        }
    }
    const onKeyPressId = (e) => {
        if (e.key == 'Enter') {
            $('.pw').focus();
        }
    }
    const onKeyPressPw = (e) => {
        if (e.key == 'Enter') {
            onLogin();
        }
    }
    const onLoginBySns = async(obj) =>{
        let objs = {
            id:obj.id,
            name:obj.legal_name,
            nickname:"카카오유저"+new Date().getTime(),
            phone:obj.phone_number,
            user_level:0,
            typeNum:obj.login_type,
            profile_img:obj.profile_image_url
        }
        const {data:response} = await axios.post('/api/loginbysns',objs);
        if(response.result>0){
            await localStorage.setItem('auth', JSON.stringify(response.data));
            navigate('/mypage');
        }else{
            alert(response.message);
        }
    }
    const kakaoLogin =  () => {
        if (window && window.flutter_inappwebview) {
            let params = { 'login_type': 1 };
            window.flutter_inappwebview.callHandler('native_app_login', JSON.stringify(params)).then(async function (result) {
                //result = "{'code':100, 'message':'success', 'data':{'login_type':1, 'id': 1000000}}"
                // JSON.parse(result)
                let obj = JSON.parse(result);
                await onLoginBySns(obj.data);
            });
        } else {
            alert('웹뷰가 아닙니다.');
        }
    }
    const naverLogin = () => {
        if (window && window.flutter_inappwebview) {
            var params = { 'login_type': 2 };
            window.flutter_inappwebview.callHandler('native_app_login', JSON.stringify(params)).then(function (result) {
                //result = "{'code':100, 'message':'success', 'data':{'login_type':1, 'id': 1000000}}"
                // JSON.parse(result)
            });
        } else {
            alert('웹뷰가 아닙니다.');
        }
    }
    return (
        <>
            <WrapperForm onSubmit={onLogin} id='login_form'>

                <CategoryName>가입 정보로 로그인</CategoryName>
                <Input placeholder='아이디를 입력해주세요.' type={'text'} className='id' onKeyPress={onKeyPressId} />
                <Input placeholder='비밀번호를 입력해주세요.' type={'password'} className='pw' onKeyPress={onKeyPressPw} />
                <FlexBox style={{ justifyContent: 'space-between', fontSize: '11px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input type={'checkbox'} className='login-lock' style={{ border: '1px solid #000', outline: 'none', borderRadius: '0' }} />
                        <div>로그인 상태 유지</div>
                    </div>
                    <div style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/findmyinfo')}>
                        아이디/비밀번호 찾기
                    </div>
                </FlexBox>
                <Button onClick={onLogin}>로그인</Button>
                <CategoryName style={{ marginTop: '36px' }}>SNS 간편 로그인</CategoryName>
                <FlexBox>
                    <SnsLogo src={kakao} onClick={kakaoLogin} />
                    <SnsLogo src={naver} onClick={naverLogin} />
                </FlexBox>
                <CategoryName style={{ marginTop: '0', fontSize: '11px' }}>
                    아직 masterpick 회원이 아니라면?<strong style={{ textDecoration: 'underline', cursor: 'pointer', marginLeft: '12px' }} onClick={() => { navigate('/signup') }}>회원가입</strong>
                </CategoryName>
                <Button style={{ marginTop: '36px' }} onClick={()=>navigate('/appsetting')}>설정</Button>
            </WrapperForm>
        </>
    );
};
export default LoginCard