import bottomMenuImg1 from '../assets/images/icon/bottommenu1.svg';
import bottomMenuWhiteImg1 from '../assets/images/icon/bottommenu1-white.svg';
import bottomMenuActiveImg1 from '../assets/images/icon/bottommenu1-active.svg';
import bottomMenuImg2 from '../assets/images/icon/bottommenu2.svg';
import bottomMenuWhiteImg2 from '../assets/images/icon/bottommenu2-white.svg';
import bottomMenuActiveImg2 from '../assets/images/icon/bottommenu2-active.svg';
import bottomMenuImg3 from '../assets/images/icon/bottommenu3.svg';
import bottomMenuWhiteImg3 from '../assets/images/icon/bottommenu3-white.svg';
import bottomMenuActiveImg3 from '../assets/images/icon/bottommenu3-active.svg';
import bottomMenuImg4 from '../assets/images/icon/bottommenu4.svg';
import bottomMenuWhiteImg4 from '../assets/images/icon/bottommenu4-white.svg';
import bottomMenuActiveImg4 from '../assets/images/icon/bottommenu4-active.svg';
import bottomMenuImg5 from '../assets/images/icon/bottommenu5.svg';
import bottomMenuWhiteImg5 from '../assets/images/icon/bottommenu5-white.svg';
import bottomMenuActiveImg5 from '../assets/images/icon/bottommenu5-active.svg';
import logo from '../assets/images/test/logo.svg'
import weather1 from '../assets/images/icon/weather1.svg';
import weather2 from '../assets/images/icon/weather2.svg';
import weather3 from '../assets/images/icon/weather3.svg';
import weather4 from '../assets/images/icon/weather4.svg';
import weather5 from '../assets/images/icon/weather5.svg';
import { EditorState } from "draft-js"

export const frontUrl = "https://masterpick.co.kr";
export const backUrl = "https://masterpick.co.kr:8443";
export const logoSrc = logo;
//http://masterpick.com:8001
export const editorState = {
    editorState: EditorState.createEmpty()
}
export const KAKAO_CLIENT_ID = "b68ba786ac0334d8a70ffc768ee9a590";
export const KAKAO_REDIRECT_URI =  `${frontUrl}/oauth/callback/kakao`;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

export const zWeather = [
    { icon: weather1, name: '??????: ????????????' },
    { icon: weather2, name: '?????? ??????: ??????' },
    { icon: weather3, name: '??????: ??????' },
    { icon: weather4, name: '?????????: ??????' },
    { icon: weather5, name: '???: ????????????' },
]
export const localization = {
    locale: 'ko',
}
export const zBottomMenu = [
    { name: '??????!?????????', link: '/howtouse', icon: <img src={localStorage.getItem('dark_mode') ? bottomMenuWhiteImg1 : bottomMenuImg1} alt="#" className='menu-icon' />, activeIcon: <img src={bottomMenuActiveImg1} alt="#" className='menu-icon' />, allowList: ['/howtouse'] },
    // { name: '???????????????', link: '/videolist', icon: <img src={playImg} alt="#" className='menu-icon' />, activeIcon: <img src={playActiveImg} alt="#" className='menu-icon' />, allowList: ['/videolist'] },
    { name: '???????????????', link: '/masterlist', icon: <img src={localStorage.getItem('dark_mode') ? bottomMenuWhiteImg2 : bottomMenuImg2} alt="#" className='menu-icon' />, activeIcon: <img src={bottomMenuActiveImg2} alt="#" className='menu-icon' />, allowList: ['/masterlist'] },
    { name: '????????????', link: '/masterevent', icon: <img src={localStorage.getItem('dark_mode') ? bottomMenuWhiteImg3 : bottomMenuImg3} alt="#" className='menu-icon' />, activeIcon: <img src={bottomMenuActiveImg3} alt="#" className='menu-icon' />, allowList: ['/masterevent'] },
    { name: '?????????', link: '/yield', icon: <img src={localStorage.getItem('dark_mode') ? bottomMenuWhiteImg4 : bottomMenuImg4} alt="#" className='menu-icon' />, activeIcon: <img src={bottomMenuActiveImg4} alt="#" className='menu-icon' />, allowList: ['/yield'] },
    { name: '????????????', link: '/subscriptiononly', icon: <img src={localStorage.getItem('dark_mode') ? bottomMenuWhiteImg5 : bottomMenuImg5} alt="#" className='menu-icon' />, activeIcon: <img src={bottomMenuActiveImg5} alt="#" className='menu-icon' />, allowList: ['/subscriptiononly'] }
];
export const cardDefaultColor = {
    font: "#000",
    background: "#f4f4f4"
}
export const objManagerListContent = {
    user: {
        breadcrumb: '??????',
        schema: 'user',
        zColumn: [
            { name: '?????????', width: 11, type: 'text', column: 'id' },
            { name: '?????????', width: 11, type: 'text', column: 'nickname' },
            { name: '??????', width: 11, type: 'text', column: 'name' },
            { name: '?????????', width: 11, type: 'text', column: 'phone' },
            { name: '??????', width: 11, type: 'level', column: 'user_level' },
            { name: '???/????????????', width: 11, type: 'paid', column: 'is_paid' },
            { name: '???????????????', width: 22, type: 'text', column: 'last_login' },
            // { name: '??????', width: 8, type: 'status', column: 'status' },
            { name: '??????', width: 6, type: 'edit', column: 'edit' },
            { name: '??????', width: 6, type: 'delete', column: 'delete' }
        ]
    },
    master: {
        breadcrumb: '??????',
        schema: 'master',
        zColumn: [
            { name: '??????????????????', width: 16, type: 'img', column: 'profile_img' },
            { name: '??????', width: 16, type: 'text', column: 'name' },
            { name: '????????????', width: 20, type: 'text', column: 'date' },
            { name: '?????????', width: 8, type: 'top', column: '' },
            { name: '????????????', width: 8, type: 'status', column: 'status' },
            { name: '????????????', width: 8, type: 'edit', column: 'edit' },
            { name: '????????????', width: 8, type: 'event_edit', column: 'edit' },
            { name: '???????????????', width: 8, type: 'yield_edit', column: 'edit' },
            { name: '??????', width: 8, type: 'delete', column: 'delete' }
        ],
    },
    master_subscribe: {
        breadcrumb: '????????????',
        schema: 'master_subscribe',
        zColumn: [
            { name: '?????????', width: 15, type: 'text', column: 'name' },
            { name: '?????????', width: 15, type: 'text', column: 'base_price' },
            { name: '?????????', width: 23, type: 'text', column: 'capture_date' },
            { name: '????????????', width: 23, type: 'text', column: 'date' },
            { name: '?????????', width: 8, type: 'top', column: '' },
            { name: '??????', width: 8, type: 'edit', column: 'edit' },
            { name: '??????', width: 8, type: 'delete', column: 'delete' }
        ],
    },
    must_read: {
        breadcrumb: '????????????',
        schema: 'must_read',
        zColumn: [
            { name: '??????', width: 38, type: 'text', column: 'title' },
            { name: '????????????', width: 38, type: 'text', column: 'date' },
            { name: '????????????', width: 8, type: 'status', column: 'status' },
            { name: '??????', width: 8, type: 'edit', column: 'edit' },
            { name: '??????', width: 8, type: 'delete', column: 'delete' }
        ],
    },
    notice: {
        breadcrumb: '??????',
        schema: 'notice',
        zColumn: [
            { name: '??????', width: 38, type: 'text', column: 'title' },
            { name: '????????????', width: 38, type: 'text', column: 'date' },
            { name: '????????????', width: 8, type: 'status', column: 'status' },
            { name: '??????', width: 8, type: 'edit', column: 'edit' },
            { name: '??????', width: 8, type: 'delete', column: 'delete' }
        ],
    },
    alarm: {
        breadcrumb: '????????????',
        schema: 'alarm',
        zColumn: [
            { name: '??????', width: 25, type: 'text', column: 'title' },
            { name: '??????', width: 25, type: 'alarm_type', column: 'type' },
            { name: '????????????', width: 26, type: 'text', column: 'date' },
            { name: '????????????', width: 8, type: 'status', column: 'status' },
            { name: '??????', width: 8, type: 'edit', column: 'edit' },
            { name: '??????', width: 8, type: 'delete', column: 'delete' }
        ],
    }
}
export const getManagerListApi = (table, num) => {
    let str = "";
    return str;
}
export const slideSetting = {
    infinite: false,
    dots: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => { console.log(current) },
    afterChange: current => { console.log(current) },
}
export const masterSlideSetting = {
    infinite: false,
    dots: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 2500,
    slidesToShow: 4,
    slidesToScroll: 1,
    beforeChange: (current, next) => { console.log(current) },
    afterChange: current => { console.log(current) },
}