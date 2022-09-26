import bottomMenuImg1 from '../assets/images/icon/bottommenu1.svg';
import bottomMenuActiveImg1 from '../assets/images/icon/bottommenu1-active.svg';
import bottomMenuImg2 from '../assets/images/icon/bottommenu2.svg';
import bottomMenuActiveImg2 from '../assets/images/icon/bottommenu2-active.svg';
import bottomMenuImg3 from '../assets/images/icon/bottommenu3.svg';
import bottomMenuActiveImg3 from '../assets/images/icon/bottommenu3-active.svg';
import bottomMenuImg4 from '../assets/images/icon/bottommenu4.svg';
import bottomMenuActiveImg4 from '../assets/images/icon/bottommenu4-active.svg';
import bottomMenuImg5 from '../assets/images/icon/bottommenu5.svg';
import bottomMenuActiveImg5 from '../assets/images/icon/bottommenu5-active.svg';
import logo from '../assets/images/test/logo.svg'
import { EditorState } from "draft-js"
export const backUrl = "http://localhost:8001";
export const logoSrc = logo;
//http://masterpick.com:8001
export const editorState = {
    editorState: EditorState.createEmpty()
}

export const localization = {
    locale: 'ko',
}
export const zBottomMenu = [
    { name: '필독!활용법', link: '/howtouse', icon: <img src={bottomMenuImg1} className='menu-icon' />, activeIcon: <img src={bottomMenuActiveImg1} className='menu-icon' />, allowList: ['/howtouse'] },
    // { name: '핵심비디오', link: '/videolist', icon: <img src={playImg} className='menu-icon' />, activeIcon: <img src={playActiveImg} className='menu-icon' />, allowList: ['/videolist'] },
    { name: '대가프로필', link: '/masterlist', icon: <img src={bottomMenuImg2} className='menu-icon' />, activeIcon: <img src={bottomMenuActiveImg2} className='menu-icon' />, allowList: ['/masterlist'] },
    { name: '대가종목', link: '/masterevent', icon: <img src={bottomMenuImg3} className='menu-icon' />, activeIcon: <img src={bottomMenuActiveImg3} className='menu-icon' />, allowList: ['/masterevent'] },
    { name: '수익률', link: '/yield', icon: <img src={bottomMenuImg4} className='menu-icon' />, activeIcon: <img src={bottomMenuActiveImg4} className='menu-icon' />, allowList: ['/yield'] },
    { name: '구독전용', link: '/subscriptiononly', icon: <img src={bottomMenuImg5} className='menu-icon' />, activeIcon: <img src={bottomMenuActiveImg5} className='menu-icon' />, allowList: ['/subscriptiononly'] }
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
            { name: '폰번호', width: 22, type: 'text', column: 'phone' },
            { name: '레벨', width: 11, type: 'level', column: 'user_level' },
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
            { name: '프로필이미지', width: 15, type: 'img', column: 'profile_img' },
            { name: '이름', width: 15, type: 'text', column: 'name' },
            { name: '생성시간', width: 14, type: 'text', column: 'date' },
            { name: '맨위로', width: 8, type: 'top', column: '' },
            { name: '정보수정', width: 10, type: 'edit', column: 'edit' },
            { name: '종목수정', width: 10, type: 'event_edit', column: 'edit' },
            { name: '수익률수정', width: 10, type: 'yield_edit', column: 'edit' },
            { name: '구독전용수정', width: 10, type: 'subscribe_edit', column: 'edit' },
            { name: '삭제', width: 8, type: 'delete', column: 'delete' }
        ],
    },
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
    slidesToShow: 1.15,
    slidesToScroll: 1,
    breakpoint: 480,
    beforeChange: (current, next) => {console.log(current)},
    afterChange: current => {console.log(current)},
}