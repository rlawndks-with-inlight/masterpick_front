import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Title, Wrappers } from "../../components/elements/UserContentTemplete";
import { backUrl } from "../../data/Data";
import theme from "../../styles/theme";
import SelectSubType from '../../components/elements/SelectSubType';
import SubType from '../../components/elements/SubType';
const Card = styled.div`
width:100%;
background:${props => props.theme.color.background3};
text-align:left;
height:112px;
margin:6px 0;
color:${props => props.theme.color.font1};
font-weight:bold;
font-size:${props => props.theme.size.font3};
cursor:pointer;
position:relative;
`
const MasterList = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [subTypeNum, setSubTypeNum] = useState(0)
    useEffect(() => {
        async function fetchPosts() {
            const { data: response } = await axios.get('/api/items?table=master');
            console.log(response)
            setPosts(response.data);
        }
        fetchPosts();
    }, [])
    return (
        <>
            <Wrappers>
                <SelectSubType className='subtype-container' style={{ marginBottom: '16px' }}>
                    {posts.map((item, index) => (
                        <>
                            <SubType style={{ color: `${theme.color.font1}`, background: `${subTypeNum == index ? theme.color.background2 : theme.color.background3}` }} onClick={() => { setSubTypeNum(index) }}>
                                {item.name}
                            </SubType>
                        </>
                    ))}
                </SelectSubType>
                {posts.map((item, idx) => (
                    <>
                        <Card style={{ background: item.background_color }} onClick={() => { navigate(`/master/${item.pk}`, { state: { name: item.name, nickname: item.nickname, img: item.profile_img } }) }}>
                            <img style={{ position: 'absolute', bottom: '0', left: '5%', height: '80%' }} src={backUrl + item.profile_img} />
                            <div style={{ width: '50%', padding: '20px', marginLeft: 'auto', textAlign: 'center' }}>
                                <div style={{ fontSize: `${theme.size.font1}`, marginTop: '8px' }}>{item.name} 전문가</div>
                                <div style={{ fontSize: `${theme.size.font1}`, marginTop: '8px', wordBreak: 'break-all' }}>{item.motto}</div>
                            </div>
                        </Card>
                    </>
                ))}
            </Wrappers>
        </>
    )
}
export default MasterList;