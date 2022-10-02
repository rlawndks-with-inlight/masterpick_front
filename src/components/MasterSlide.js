import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SelectSubType from '../components/elements/SelectSubType';
import SubType from '../components/elements/SubType';
import theme from '../styles/theme';
import axios from 'axios';
import { backUrl } from '../data/Data';
import styled from 'styled-components';
import $ from 'jquery'
const Img = styled.div`
width: 107px;
height: 62px;
margin: 8px;
background:#fff;
border:1px solid #707070;
cursor:pointer;
border-radius: 50%;
background-size: contain;
background-repeat: no-repeat; 
background-position: center center; 
background-blend-mode: multiply;
@media screen and (max-width:1000px) {
    width:15.666666vw;
    height:8.8715596vw;
    margin:1vw;
}
@media screen and (max-width:600px) {
    width:18.566666vw;
    height:11.0715596vw;
}
`
const MasterSlide = (props) => {
    let { onClickMaster, num, isPhoto, overlapList, width, status } = props;
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [masterList, setMasterList] = useState([])
    useEffect(() => {
        async function fetchPosts() {
            const { data: response } = await axios.get(`/api/items?table=master${status ? `&status=1` : ''}`);
            setMasterList(response.data);
        }
        fetchPosts();
    }, [])
    const makeMarginImg = (idx) =>{
        if(idx%7==0){
            return '1.6666vw 1.6666vw 1.6666vw auto'
        }else if(idx%7==3){
            return '1.6666vw auto 1.6666vw 1.6666vw'
        }else if(idx%7==4){
            return '1.6666vw 1.6666vw 1.6666vw 11vw'
        }else if(idx%7==6){
            return '1.6666vw 11vw 1.6666vw 1.6666vw'
        }else{
            return '1.6666vw'
        }
    }
    useEffect(()=>{
        if(isPhoto){
        }
    },[])
    return (
        <>
            <SelectSubType className='subtype-container' style={{ marginBottom: '16px', width: `${width ? width : ''}`,display:`${isPhoto?'flex':''}`,flexWrap:`${isPhoto?'wrap':''}` }}>
                {masterList.map((item, index) => (
                    <>
                        {isPhoto ?
                            <>
                                {overlapList ?
                                    <>
                                        {

                                        }
                                        <Img style={{backgroundImage: `url(${backUrl + item?.profile_img ?? ""})`, opacity: `${overlapList.includes(item.pk) ? '1' : '0.5'}`,margin:`${window.innerWidth<=700?makeMarginImg(index):''}`}} 
                                        onClick={() => { onClickMaster ? onClickMaster(item.pk) : navigate(`/master/${item.pk}`) }} />
                                    </>
                                    :
                                    <>
                                        <Img style={{backgroundImage: `url(${backUrl + item?.profile_img ?? ""})`,opacity: `${params.pk == item.pk || num == item.pk ? '1' : '0.5'}`}} 
                                        onClick={() => { onClickMaster ? onClickMaster(item.pk) : navigate(`/master/${item.pk}`) }} />
                                    </>
                                }
                            </>
                            :
                            <>
                                {overlapList ?
                                    <>
                                        <SubType style={{ color: `${theme.color.font1}`, background: `${overlapList.includes(item.pk) ? theme.color.background2 : theme.color.background3}` }} onClick={() => { onClickMaster(item.pk) }}>
                                            {item.name}
                                        </SubType>
                                    </>
                                    :
                                    <>
                                        <SubType style={{ color: `${theme.color.font1}`, background: `${params.pk == item.pk || num == item.pk ? theme.color.background2 : theme.color.background3}` }} onClick={() => { onClickMaster ? onClickMaster(item.pk) : navigate(`/master/${item.pk}`) }}>
                                            {item.name}
                                        </SubType>
                                    </>
                                }
                            </>
                        }
                    </>
                ))}
            </SelectSubType>
        </>
    )
}
export default MasterSlide;