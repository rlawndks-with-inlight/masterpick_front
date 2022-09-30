import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { commarNumber } from "../functions/utils";

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
    const { columns, data, click } = props;
    const onClickEvent = (str) =>{
        if(str){
            navigate(str)
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
                                <Td style={{ width: column.width, color:`${column.color?column.color:''}` }}>
                                    {column.type == 'text' ?
                                        item[column.column]
                                        :
                                        null}
                                    {column.type == 'number' ?
                                        commarNumber(item[column.column])
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