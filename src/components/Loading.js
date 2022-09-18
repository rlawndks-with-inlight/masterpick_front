import { Circles } from 'react-loader-spinner';
import styled from 'styled-components';
import theme from '../styles/theme';
import loadingGif from '../assets/images/test/logo.svg'
const LoadingContainer = styled.div`
margin: 15vw auto;
@media (max-width: 1000px) {
    margin: 25vw auto;
}
@media (max-width: 650px) {
    margin: 40vh auto;
}
@media (max-width: 375px) {
    margin: 30vh auto;
}
`
const Loading = () => {
    return (
        <>
            <LoadingContainer>
                <img src={loadingGif} style={{width:'100px'}}/>
            </LoadingContainer>
        </>
    )
}
export default Loading;