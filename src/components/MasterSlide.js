import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SelectSubType from '../components/elements/SelectSubType';
import SubType from '../components/elements/SubType';
import theme from '../styles/theme';
import axios from 'axios';
import { backUrl } from '../data/Data';
import styled from 'styled-components';
const Img = styled.div`
width: 107px;
height: 62px;
margin: 10px;
background:#fff;
border:1px solid #707070;
`
const MasterSlide = (props) => {
    let { onClickMaster, num, isPhoto,width } = props;
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [masterList, setMasterList] = useState([])
    useEffect(() => {
        async function fetchPosts() {
            const { data: response } = await axios.get('/api/items?table=master');
            setMasterList(response.data);
        }
        fetchPosts();
    }, [])
    return (
        <>
            <SelectSubType className='subtype-container' style={{ marginBottom: '16px',width:`${width?width:''}` }}>
                {masterList.map((item, index) => (
                    <>
                        {isPhoto ?
                            <>
                                <Img style={{
                                    backgroundImage: `url(${backUrl + item?.profile_img ?? ""})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundBlendMode: 'multiply', borderRadius: '50%'
                                    , opacity: `${params.pk == item.pk || num == item.pk ? '1' : '0.5'}`
                                }} onClick={() => { onClickMaster ? onClickMaster(item.pk) : navigate(`/master/${item.pk}`) }} />
                            </>
                            :
                            <>
                                <SubType style={{ color: `${theme.color.font1}`, background: `${params.pk == item.pk || num == item.pk ? theme.color.background2 : theme.color.background3}` }} onClick={() => { onClickMaster ? onClickMaster(item.pk) : navigate(`/master/${item.pk}`) }}>
                                    {item.name}
                                </SubType>
                            </>
                        }
                    </>
                ))}
            </SelectSubType>
        </>
    )
}
export default MasterSlide;