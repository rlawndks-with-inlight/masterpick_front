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
    { icon: weather1, name: '맑음: 강력매수' },
    { icon: weather2, name: '구름 조금: 매수' },
    { icon: weather3, name: '흐림: 중립' },
    { icon: weather4, name: '약한비: 매도' },
    { icon: weather5, name: '비: 강력매도' },
]
export const localization = {
    locale: 'ko',
}
export const zBottomMenu = [
    { name: '필독!활용법', link: '/howtouse', icon: <img src={localStorage.getItem('dark_mode') ? bottomMenuWhiteImg1 : bottomMenuImg1} alt="#" className='menu-icon' />, activeIcon: <img src={bottomMenuActiveImg1} alt="#" className='menu-icon' />, allowList: ['/howtouse'] },
    // { name: '핵심비디오', link: '/videolist', icon: <img src={playImg} alt="#" className='menu-icon' />, activeIcon: <img src={playActiveImg} alt="#" className='menu-icon' />, allowList: ['/videolist'] },
    { name: '대가프로필', link: '/masterlist', icon: <img src={localStorage.getItem('dark_mode') ? bottomMenuWhiteImg2 : bottomMenuImg2} alt="#" className='menu-icon' />, activeIcon: <img src={bottomMenuActiveImg2} alt="#" className='menu-icon' />, allowList: ['/masterlist'] },
    { name: '대가종목', link: '/masterevent', icon: <img src={localStorage.getItem('dark_mode') ? bottomMenuWhiteImg3 : bottomMenuImg3} alt="#" className='menu-icon' />, activeIcon: <img src={bottomMenuActiveImg3} alt="#" className='menu-icon' />, allowList: ['/masterevent'] },
    { name: '수익률', link: '/yield', icon: <img src={localStorage.getItem('dark_mode') ? bottomMenuWhiteImg4 : bottomMenuImg4} alt="#" className='menu-icon' />, activeIcon: <img src={bottomMenuActiveImg4} alt="#" className='menu-icon' />, allowList: ['/yield'] },
    { name: '구독전용', link: '/subscriptiononly', icon: <img src={localStorage.getItem('dark_mode') ? bottomMenuWhiteImg5 : bottomMenuImg5} alt="#" className='menu-icon' />, activeIcon: <img src={bottomMenuActiveImg5} alt="#" className='menu-icon' />, allowList: ['/subscriptiononly'] }
];
export const cardDefaultColor = {
    font: "#000",
    background: "#f4f4f4"
}
export const objManagerListContent = {
    user: {
        breadcrumb: '회원',
        schema: 'user',
        zColumn: [
            { name: '아이디', width: 11, type: 'text', column: 'id' },
            { name: '닉네임', width: 11, type: 'text', column: 'nickname' },
            { name: '이름', width: 11, type: 'text', column: 'name' },
            { name: '폰번호', width: 11, type: 'text', column: 'phone' },
            { name: '레벨', width: 11, type: 'level', column: 'user_level' },
            { name: '유/무료회원', width: 11, type: 'paid', column: 'is_paid' },
            { name: '로그인시간', width: 22, type: 'text', column: 'last_login' },
            // { name: '상태', width: 8, type: 'status', column: 'status' },
            { name: '수정', width: 6, type: 'edit', column: 'edit' },
            { name: '삭제', width: 6, type: 'delete', column: 'delete' }
        ]
    },
    master: {
        breadcrumb: '거장',
        schema: 'master',
        zColumn: [
            { name: '프로필이미지', width: 16, type: 'img', column: 'profile_img' },
            { name: '이름', width: 16, type: 'text', column: 'name' },
            { name: '생성시간', width: 20, type: 'text', column: 'date' },
            { name: '맨위로', width: 8, type: 'top', column: '' },
            { name: '노출여부', width: 8, type: 'status', column: 'status' },
            { name: '정보수정', width: 8, type: 'edit', column: 'edit' },
            { name: '종목수정', width: 8, type: 'event_edit', column: 'edit' },
            { name: '수익률수정', width: 8, type: 'yield_edit', column: 'edit' },
            { name: '삭제', width: 8, type: 'delete', column: 'delete' }
        ],
    },
    master_subscribe: {
        breadcrumb: '구독전용',
        schema: 'master_subscribe',
        zColumn: [
            { name: '종목명', width: 15, type: 'text', column: 'name' },
            { name: '기준가', width: 15, type: 'text', column: 'base_price' },
            { name: '기준일', width: 23, type: 'text', column: 'capture_date' },
            { name: '생성시간', width: 23, type: 'text', column: 'date' },
            { name: '맨위로', width: 8, type: 'top', column: '' },
            { name: '수정', width: 8, type: 'edit', column: 'edit' },
            { name: '삭제', width: 8, type: 'delete', column: 'delete' }
        ],
    },
    must_read: {
        breadcrumb: '필독사항',
        schema: 'must_read',
        zColumn: [
            { name: '제목', width: 38, type: 'text', column: 'title' },
            { name: '생성시간', width: 38, type: 'text', column: 'date' },
            { name: '노출여부', width: 8, type: 'status', column: 'status' },
            { name: '수정', width: 8, type: 'edit', column: 'edit' },
            { name: '삭제', width: 8, type: 'delete', column: 'delete' }
        ],
    },
    notice: {
        breadcrumb: '공지',
        schema: 'notice',
        zColumn: [
            { name: '제목', width: 38, type: 'text', column: 'title' },
            { name: '생성시간', width: 38, type: 'text', column: 'date' },
            { name: '노출여부', width: 8, type: 'status', column: 'status' },
            { name: '수정', width: 8, type: 'edit', column: 'edit' },
            { name: '삭제', width: 8, type: 'delete', column: 'delete' }
        ],
    },
    alarm: {
        breadcrumb: '푸시알람',
        schema: 'alarm',
        zColumn: [
            { name: '제목', width: 25, type: 'text', column: 'title' },
            { name: '타입', width: 25, type: 'alarm_type', column: 'type' },
            { name: '생성시간', width: 26, type: 'text', column: 'date' },
            { name: '노출여부', width: 8, type: 'status', column: 'status' },
            { name: '수정', width: 8, type: 'edit', column: 'edit' },
            { name: '삭제', width: 8, type: 'delete', column: 'delete' }
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