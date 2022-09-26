import styled from "styled-components";

const Table = styled.table`

`
const Tr = styled.tr`

`
const Td = styled.td`

`
const ContentTable = (props) => {
    const { columns, data } = props;
    return (
        <>
            <Table>
                <Tr>
                    {columns.map((item, idx) => (
                        <>
                        </>
                    ))}
                </Tr>
                <Tr>
                    {data.map((item, idx) => (
                        <>
                        </>
                    ))}
                </Tr>
            </Table>
        </>
    )
}
export default ContentTable;