import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from '../assets/images/test/logo.svg';
const Wrappers = styled.footer`
    display:flex;
    flex-direction:column;
    background:${props=>props.theme.color.background3};
    color:${props=>props.theme.color.font1};
    font-weight:500;
    padding:32px 120px;
    @media screen and (max-width:1050px) {
        display:none;
    }
`
const Footer = () =>{
    const {pathname} = useLocation();
    
    return (
        <>
        {pathname.includes('/manager')?
        <>
        </>
        :
        <>
        <Wrappers>
            <img src={logo} style={{width:'80px'}} />
            <div style={{marginTop:'8px'}}>서울시 마포구 양화로 127 7층(첨단빌딩)</div>
            <div style={{marginTop:'8px'}}>Email&nbsp;&nbsp;First_partner@naver.com&nbsp;&nbsp;&nbsp;FAX&nbsp;&nbsp;02-332-3593</div>
        </Wrappers>
        </>
        }
        
        </>
    )
}
export default Footer;