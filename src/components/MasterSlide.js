import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SelectSubType from '../components/elements/SelectSubType';
import SubType from '../components/elements/SubType';
import theme from '../styles/theme';
import axios from 'axios';

const MasterSlide = (props) => {
    let { onClickMaster } = props;
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
            <SelectSubType className='subtype-container' style={{ marginBottom: '16px' }}>
                {masterList.map((item, index) => (
                    <>
                        <SubType style={{ color: `${theme.color.font1}`, background: `${params.pk == item.pk ? theme.color.background2 : theme.color.background3}` }} onClick={() => { onClickMaster ? onClickMaster(item.pk) : navigate(`/master/${item.pk}`) }}>
                            {item.name}
                        </SubType>
                    </>
                ))}
            </SelectSubType>
        </>
    )
}
export default MasterSlide;