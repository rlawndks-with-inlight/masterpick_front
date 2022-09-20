import axios from "axios";
import { useEffect, useState } from "react";
import { Title, Wrappers } from "../../components/elements/UserContentTemplete";

import MasterSlide from "../../components/MasterSlide";
import MasterCard from "../../components/MasterCard";

const MasterList = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function fetchPosts() {
            const { data: response } = await axios.get('/api/items?table=master');
            setPosts(response.data);
        }
        fetchPosts();
    }, [])
    return (
        <>
            <Wrappers>
                <MasterSlide />
                {posts.map((item, idx) => (
                    <>
                        <MasterCard item={item} />
                    </>
                ))}
            </Wrappers>
        </>
    )
}
export default MasterList;