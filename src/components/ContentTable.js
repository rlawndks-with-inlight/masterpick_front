import styled from "styled-components";
import { commarNumber } from "../functions/utils";

const Table = styled.table`
font-size:${props => props.theme.size.font4};
width:90%;
margin:0 auto;
text-align:center;
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
    const { columns, data } = props;
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
                    <Tr>
                        {columns.map((column, idx) => (
                            <>
                                <Td style={{ width: column.width }}>
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