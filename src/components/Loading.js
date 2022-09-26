import { Circles } from 'react-loader-spinner';
import styled from 'styled-components';
import theme from '../styles/theme';
import loadingGif from '../assets/images/icon/logo.gif'
const LoadingContainer = styled.div`
margin: 15vw auto;
@media (max-width: 1000px) {
    margin: 20vw auto;
}
@media (max-width: 650px) {
    margin: 35vh auto;
}
@media (max-width: 375px) {
    margin: 25vh auto;
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