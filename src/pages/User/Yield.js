import React from 'react'
import styled from 'styled-components'
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Wrappers } from '../../components/elements/UserContentTemplete';
import Loading from '../../components/Loading';
import MasterSlide from '../../components/MasterSlide';
import ContentTable from '../../components/ContentTable';

const Yield = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [typeNum, setTypeNum] = useState(0)
    const [overlapList, setOverlapList] = useState([]);
    useEffect(() => {
        async function fetchPost() {
            setLoading(true)

            const { data: response } = await axios.post('/api/getmastercontents',{
                table:'master_yield',
                order:'yield',
                status: 1,
                desc:true
            })
            setPosts(response.data)
            setTimeout(() => setLoading(false), 1000);
        }
        fetchPost();
    }, [])

    const onClickMaster = async (num) => {
        setLoading(true)
        setTypeNum(num)
        let overlap_list = [...overlapList];
        if(overlap_list.includes(num)){
            for(var i = 0; i < overlap_list.length; i++){ 
                if (overlap_list[i] === num) { 
                    overlap_list.splice(i, 1); 
                  i--; 
                }
              }
        }else{
            overlap_list.push(num);
        }
        setOverlapList(overlap_list)
        const { data: response } = await axios.post('/api/getmastercontents',{
            table:'master_yield',
            order:'yield',
            desc:true,
            status: 1,
            pk:num
            //overlap_list:overlap_list
        })
        setPosts(response.data)
        setLoading(false);
    }
    return (
        <>
            <Wrappers className='wrappers'>
                <MasterSlide onClickMaster={onClickMaster} schema={'master_yield'} num={typeNum} width={'90%'} status={1} />
                {loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <div style={{ position: 'relative' }}>
                            <ContentTable columns={[
                                { name: "대가명", column: "master_name", width: "", type: 'text' },
                                { name: "종목명", column: "name", width: "", type: 'text' },
                                { name: "매수가", column: "purchase_price", type: 'number' },
                                { name: "매도가", column: "sell_price", width: "", type: 'number' },
                                { name: "수익률", column: "yield", width: "", type: 'percent' },
                                { name: "매도月", column: "period", width: "", type: 'text' }
                            ]}
                                data={posts}
                            />
                        </div>
                    </>}
            </Wrappers>
        </>
    )
}
export default Yield;