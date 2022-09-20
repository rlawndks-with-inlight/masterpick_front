import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import { backUrl } from "../../../data/Data";
import theme from "../../../styles/theme";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import $ from 'jquery'
import styled from "styled-components";
import { BsFillShareFill } from 'react-icons/bs';
import logo from '../../../assets/images/test/logo.svg'
import { commarNumber, stringToHTML } from "../../../functions/utils";
const Logo = styled.img`
position: fixed;
bottom: 0;
height:18px;
`
const Progress = styled.progress`

appearance: none;
position: fixed;
bottom: 0;
width: 100%;
left: 0;
right: 0;
height:16px;

::-webkit-progress-bar {
background: #f0f0f0;
border-radius: 0;
}

::-webkit-progress-value {
background:transparent;
border-bottom: 16px solid #4CDAD8;
border-right: 10px solid transparent;
}
`
const Post = () => {
    const params = useParams();
    const [post, setPost] = useState({})
    const [percent, setPercent] = useState(0);
    useEffect(() => {
        async function fetchPost() {
            const { data: response } = await axios.get(`/api/item?table=${params.table}&pk=${params.pk}&views=1`)
            let obj = response.data;

            obj.note = stringToHTML(obj.note, backUrl)
            $('.note').append(obj.note)
            $('.note > img').css("width", "100%")
            setPost(obj);

        }
        fetchPost();
        
        window.addEventListener('scroll', function (el) {
            let per = Math.floor(($(window).scrollTop() / ($(document).height() - $(window).height())) * 100);
            setPercent(per);
        })
    }, [])
   
    
    return (
        <>
            <Wrappers className="wrapper">
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'end', fontSize: `${theme.size.font4}` }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ margin: '0 4px' }}>{post.nickname}</div> /
                        <div style={{ margin: '0 4px' }}>{post?.date?.substring(5, 10)}</div> /
                        <div style={{ margin: '0 8px 0 4px' }}>{commarNumber(post?.views??0)}</div>
                        <BsFillShareFill style={{ cursor: 'pointer' }} />
                    </div>
                </div>
                <img src={backUrl + post.main_img} style={{ width: '100%', margin: '16px 0' }} />
                <Title>{post.title}</Title>
                <div style={{ fontSize: `${theme.size.font4}`, color: `${theme.color.font2}` }}>{post.hash}</div>
                <div className="note">
                </div>
                <Progress value={`${percent}`} max="100"></Progress>
                {/* <Logo src={logo} style={{left:`${percent-1}.7%`}}/> */}
            </Wrappers>
        </>
    )
}
export default Post;