import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Title, Wrappers,Content } from "../../../components/elements/UserContentTemplete";
import theme from "../../../styles/theme";


const NoticeList = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const { data: response } = await axios.get('/api/items?table=notice&status=1');
            setPosts(response.data);
        }
        fetchPosts();
    }, [])
    return (
        <>
            <Wrappers>
                <Title>공지사항</Title>
                {posts.map((item, idx) => (
                    <Content onClick={() => { navigate(`/post/notice/${item?.pk}`) }} style={{borderBottom:'1px solid #cccccc',paddingBottom:'16px',cursor:'pointer'}}>
                        <div >{item?.title ?? ""}</div>
                        <div style={{ fontSize: `${theme.size.font4}`, padding: '6px 0 0 0' }}>{item?.date ?? ""}</div>
                    </Content>
                ))}
            </Wrappers>
        </>
    )
}
export default NoticeList;