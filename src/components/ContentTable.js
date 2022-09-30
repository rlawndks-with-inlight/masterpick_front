import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { commarNumber } from "../functions/utils";
import { RiDeleteBinLine } from 'react-icons/ri'
import axios from "axios";

const Table = styled.table`
font-size:${props => props.theme.size.font4};
width:90%;
margin:0 auto;
text-align:center;
border-collapse: collapse;
`
const Tr = styled.tr`
width:100%;
height:26px;
border-bottom:1px solid ${props => props.theme.color.font4};
`
const Td = styled.td`
border-bottom:1px solid ${props => props.theme.color.font4};
`
const ContentTable = (props) => {
    const navigate = useNavigate();
    const { columns, data, click, schema,isPointer } = props;
    const onClickEvent = (str) =>{
        if(str){
            navigate(str)
        }
    }
    const deleteItem = async (pk, schema, cha) => {
        if(window.confirm(`정말로 ${cha??'삭제'}하시겠습니까?`)){
            let obj = {
                pk: pk,
                table: schema
            }
            const { data: response } = await axios.post(`/api/deleteitem`, obj)
    
            if (response.result > 0) {
                alert('has been deleted');
                window.location.reload();
            } else {
                alert('error')
            }
        }
    }
    return (
        <>
            <Table>
                <Tr>
                    {columns.map((item, idx) => (
                        <>
                            <Td style={{ width: item.width }}>{item.name}</Td>
                        </>
                    ))}
                </Tr>
                {data.map((item, idx) => (
                    <Tr onClick={()=>{click?onClickEvent(`${click+'/'+item.pk}`):onClickEvent(``)}}>
                        {columns.map((column, idx) => (
                            <>
                                <Td style={{ width: column.width, color:`${column.color?column.color:''}`,cursor:`${isPointer?'pointer':''}` }}>
                                    {column.type == 'text' ?
                                        item[column.column]??"---"
                                        :
                                        null}
                                    {column.type == 'number' ?
                                        commarNumber(item[column.column])??"---"
                                        :
                                        null}
                                    {column.type == 'day' ?
                                        item[column.column] + '일'
                                        :
                                        null}
                                    {column.type == 'percent' ?
                                        `${item[column.column] >= 0 ? '+' : '-'}` + item[column.column] + '%'
                                        :
                                        null}
                                        {column.type == 'delete' ?
                                        <RiDeleteBinLine style={{cursor:'pointer'}} onClick={()=>deleteItem(item.pk,schema,column.name)}/>
                                        :
                                        null}
                                </Td>
                            </>
                        ))}
                    </Tr>
                ))}

            </Table>
        </>
    )
}
export default ContentTable;