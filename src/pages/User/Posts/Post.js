import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Wrappers } from "../../../components/elements/UserContentTemplete";
import { backUrl, zWeather } from "../../../data/Data";
import theme from "../../../styles/theme";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import $ from 'jquery'
import styled from "styled-components";
import { commarNumber, stringToHTML } from "../../../functions/utils";
import firstPartnersImg from '../../../assets/images/test/first-partners.svg'
import { Pie3D } from 'react-pie3d'
import { Row } from "../../../components/elements/ManagerTemplete";
import { AiFillCaretDown } from 'react-icons/ai'
import 'chart.js/auto';
import { Doughnut } from "react-chartjs-2";
import ReactApexChart from "react-apexcharts";
import Loading from "../../../components/Loading";
const Progress = styled.progress`

appearance: none;
position: fixed;
bottom: 0;
width: 100%;
left: 0;
right: 0;
height:16px;

::-webkit-progress-bar {
background: #f0f0f0;
border-radius: 0;
}

::-webkit-progress-value {
background:transparent;
border-bottom: 16px solid #FB8200;
border-right: 10px solid transparent;
}
`
const TitleStyle = styled.div`
font-size:${props => props.theme.size.font1};
font-weight:bold;
margin-right:16px;
margin-top:16px;
margin-bottom:8px;
`
const SubTitleStyle = styled.div`
font-size:${props => props.theme.size.font2};
font-weight:bold;
margin-right:16px;
cursor:pointer;
margin-left:16px;
margin-bottom:8px;
`
const Content = styled.div`
margin:0 auto 1rem 0;
width:90%;
margin:0 auto;
font-size:${props => props.theme.size.font3};
display:flex;
flex-direction:column;
font-weight:normal;

`
const InvestmentPointDetail = styled.div`
display:flex;
flex-wrap: wrap;
background: ${props => props.theme.color.background3};
max-width: 468px;
margin: 8px auto ;
width: 100%;
padding: 16px;
@media screen and (max-width:500px) {
    padding: 2.5vw;
    width:85vw
}
`
const DonutContainer = styled.div`
width:50%;
@media screen and (max-width:700px) {
    width:100%;

}
`
const DonutExplainContainer = styled.div`
text-align:end;
width:50%;
@media screen and (max-width:700px) {
    width:100%;
}
`
const Post = () => {
    const params = useParams();

    const [loading, setLoading] = useState(false)

    const [percent, setPercent] = useState(0);
    const [item, setItem] = useState({})
    const [typeNum, setTypeNum] = useState(0);//매출액-0,영업이익-1
    const [takeList, setTakeList] = useState([])//매출액
    const [operatingProfitList, setOperatingProfitList] = useState([])//영업이익

    const [investmentPointList, setInvestmentPointList] = useState([])//투자포인트-막대그래프
    const [investmentPointDetailDisplay, setInvestmentPointDetailDisplay] = useState(false)
    const [majorBussinessList, setMajorBussinessList] = useState([])//주요사업-원형그래프
    const [donutObj, setDonutObj] = useState({})
    const donutData = {
        series: [50, 40, 30, 10, 0],
        options: {
            chart: {
                type: 'donut',
            },
            legend: {
                position: 'bottom'
            },
            responsive: [{
                breakpoint: 480,
            }],
            plotOptions: {
                pie: {
                    donut: {
                        // hollow: {  
                        //   margin: 15,
                        //   size: '70%',
                        //   image: '../../css/images/a-icon.jpg',
                        //   imageWidth: 64,
                        //   imageHeight: 64,
                        //   imageClipped: false
                        // },
                        labels: {
                            show: true,
                            total: {
                                showAlways: true,
                                show: false,
                                label: '주요 사업',
                                fontSize: '12px',
                                color: 'red'
                            },
                            value: {
                                fontSize: '22px',
                                show: true,
                                color: 'blue',
                            },
                        },
                    }
                }
            },
            labels: ["침입", "배회", "쓰러짐", "화재", "안전모"],
            title: {
            },
        },
    }
    const zColor = ['#594a7d', '#0030c0', '#90c000', '#aaeebb', '#c00030', '#00c090', '#cba123', '#789af3', '#e7fa09', '#e4f404']

    useEffect(() => {
        async function fetchPost() {
            setLoading(true)
            const { data: response } = await axios.get(`/api/getmastercontent?table=${params.table}&pk=${params.pk}`)
            let obj = response.data;
            console.log(response)
            //list
            let take_list = JSON.parse(response?.data?.take_list);
            setTakeList(take_list);

            let operating_profit_list = JSON.parse(response?.data?.operating_profit_list);
            setOperatingProfitList(operating_profit_list);

            let investment_point_list = JSON.parse(response?.data?.investment_point_list);
            setInvestmentPointList(investment_point_list);

            let major_bussiness_list = JSON.parse(response?.data?.major_bussiness_list);
            setMajorBussinessList(major_bussiness_list);
            let donut_obj = donutData;
            donut_obj.series = [];
            donut_obj.options.labels = [];
            for (var i = 0; i < major_bussiness_list.length; i++) {
                donut_obj.series.push(parseFloat(major_bussiness_list[i].percent))
                donut_obj.options.labels.push(major_bussiness_list[i].element+`(${commarNumber(major_bussiness_list[i].price)}원)`)
            }
            setDonutObj(donut_obj)
            //note
            obj.main_note = stringToHTML(obj.main_note, backUrl)
            $('.main_note').append(obj.main_note)
            $('.main_note > img').css("width", "100%")
            obj.company_overview_note = stringToHTML(obj.company_overview_note, backUrl)
            $('.company_overview_note').append(obj.company_overview_note)
            $('.company_overview_note > img').css("width", "100%")
            obj.investment_point_note = stringToHTML(obj.investment_point_note, backUrl)
            $('.investment_point_note').append(obj.investment_point_note)
            $('.investment_point_note > img').css("width", "100%")
            obj.major_bussiness_note = stringToHTML(obj.major_bussiness_note, backUrl)
            $('.major_bussiness_note').append(obj.major_bussiness_note)
            $('.major_bussiness_note > img').css("width", "100%")
            obj.share_note = stringToHTML(obj.share_note, backUrl)
            $('.share_note').append(obj.share_note)
            $('.share_note > img').css("width", "100%")
            obj.capital_change_note = stringToHTML(obj.capital_change_note, backUrl)
            $('.capital_change_note').append(obj.capital_change_note)
            $('.capital_change_note > img').css("width", "100%")
            obj.investment_indicator_note = stringToHTML(obj.investment_indicator_note, backUrl)
            $('.investment_indicator_note').append(obj.investment_indicator_note)
            $('.investment_indicator_note > img').css("width", "100%")
            obj.etc_note = stringToHTML(obj.etc_note, backUrl)
            $('.etc_note').append(obj.etc_note)
            $('.etc_note > img').css("width", "100%")
            $('.note > body').css('margin', '0');
            setItem(obj);
            setLoading(false)
        }
        fetchPost();

        window.addEventListener('scroll', function (el) {
            let per = Math.floor(($(window).scrollTop() / ($(document).height() - $(window).height())) * 100);
            setPercent(per);
        })
    }, [])

    // 1-1,2-4,3-5,4-2
    return (
        <>
            <Wrappers className="wrapper">
                {loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <Content>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'end', margin: '16px 0 32px 0' }}>
                                <img src={firstPartnersImg} style={{ height: '50px' }} />
                                <img src={backUrl + item.master_profile_img} style={{ height: '72px' }} />
                            </div>
                            <div style={{ display: 'flex', margin: '8px auto 8px 0' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', marginRight: '12px' }}>
                                    <div style={{ fontSize: theme.size.font1, fontWeight: 'bold', color: '#FB0000', marginBottom: '4px' }}>{item?.name}</div>
                                    <div style={{ fontSize: theme.size.font5 }}>매수기준가 {commarNumber(item?.base_price ?? '0')}원 ({item?.capture_date} 기준)</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', marginRight: '12px' }}>
                                    <img src={zWeather[item?.weather ?? 0].icon} style={{ height: '27px' }} />
                                    <div style={{ fontSize: theme.size.font5 }}>투자날씨</div>
                                </div >
                                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                                    <div style={{ height: '21px', margin: 'auto', marginTop: '6px' }}>{item?.score}</div>
                                    <div style={{ fontSize: theme.size.font5 }}>투자점수</div>
                                </div>
                            </div>
                            <div className="note main_note">
                            </div>
                            <div style={{ width: '100%', maxWidth: '500px', margin: '16px auto', display: 'flex', background: '#E4E4E4', borderRadius: '20px', height: '48px', fontSize: theme.size.font3, cursor: 'pointer' }}>
                                <div onClick={() => setTypeNum(0)} style={{ width: '49%', borderRadius: '20px', textAlign: 'center', background: `${typeNum == 0 ? '#fff' : '#E4E4E4'}`, padding: '12px 0', margin: 'auto' }}>매출액</div>
                                <div onClick={() => setTypeNum(1)} style={{ width: '49%', borderRadius: '20px', textAlign: 'center', background: `${typeNum == 1 ? '#fff' : '#E4E4E4'}`, padding: '12px 0', margin: 'auto' }}>영업이익</div>
                            </div>
                            <div style={{ display: 'flex', maxWidth: '500px', width: '100%', margin: '16px auto', overflowX: 'auto' }}>
                                {typeNum == 0 ?
                                    <>
                                        {takeList.map((post, idx) => (
                                            <>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '6px', fontSize: `${theme.size.font4}` }}>
                                                    <div>{post.price}</div>
                                                    <div style={{ height: '50px', border: `1px solid ${theme.color.background1}`, width: '20px', background: `${theme.color.background1}`, margin: '6px' }}>
                                                        <div style={{ height: `${50 - parseFloat(post.score) / 100 * 50}px`, background: `${theme.color.background2}`, marginTop: 'auto' }} />
                                                    </div>
                                                    <div>{post.year}</div>
                                                </div>
                                            </>
                                        ))}
                                    </>
                                    :
                                    <>
                                        {operatingProfitList.map((post, idx) => (
                                            <>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '6px', fontSize: `${theme.size.font4}` }}>
                                                    <div>{post.price}</div>
                                                    <div style={{ height: '50px', border: `1px solid ${theme.color.background1}`, width: '20px', background: `${theme.color.background1}`, margin: '6px' }}>
                                                        <div style={{ height: `${50 - parseFloat(post.score) / 100 * 50}px`, background: `${theme.color.background2}`, marginTop: 'auto' }} />
                                                    </div>
                                                    <div>{post.year}</div>
                                                </div>
                                            </>
                                        ))}
                                    </>
                                }
                            </div>
                            <TitleStyle>1. 기업개요</TitleStyle>
                            <div className="note company_overview_note">
                            </div>
                            <TitleStyle>2. 투자포인트</TitleStyle>
                            <div style={{ display: 'flex', maxWidth: '500px', width: '100%', margin: '16px auto', overflowX: 'auto' }}>
                                {investmentPointList.map((post, idx) => (
                                    <>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '6px', fontSize: `${theme.size.font4}` }}>
                                            <div>{post.score}</div>
                                            <div style={{ height: '50px', border: `1px solid ${theme.color.background1}`, width: '20px', background: `${theme.color.background1}`, margin: '6px' }}>
                                                <div style={{ height: `${50 - parseFloat(post.score) / 100 * 50}px`, background: `${theme.color.background2}`, marginTop: 'auto' }} />
                                            </div>
                                            <div>{post.element}</div>
                                        </div>
                                    </>
                                ))}
                            </div>
                            <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto 16px auto', background: `${theme.color.background3}`, textAlign: 'center', display: 'flex', padding: '16px 0', cursor: 'pointer' }}
                                onClick={() => { setInvestmentPointDetailDisplay(!investmentPointDetailDisplay) }}>
                                <div style={{ display: 'flex', margin: '0 auto', alignItems: 'center' }}>
                                    <div style={{ marginRight: '4px' }}>지표별 설명보기</div>
                                    <AiFillCaretDown />
                                </div>
                            </div>
                            {investmentPointDetailDisplay ?
                                <>
                                    <InvestmentPointDetail>
                                        {investmentPointList.map((post, idx) => (
                                            <>
                                                <div style={{ display: 'flex', flexDirection: 'column', width: '50%', fontWeight: 'bold', fontSize: theme.size.font3 }}>
                                                    <div style={{ display: 'flex', marginBottom: '4px' }}>
                                                        <div style={{ marginRight: '4px' }}>{post.element}</div>
                                                        <div style={{ color: '#FB0000' }}>{post.score}</div>
                                                    </div>
                                                    <div style={{ fontSize: theme.size.font4, color: theme.color.font2 }}>
                                                        {post.sub_title}
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                    </InvestmentPointDetail>
                                </>
                                :
                                <>
                                </>
                            }

                            <div className="note investment_point_note">
                            </div>
                            <TitleStyle>3. 주요 사업</TitleStyle>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <DonutContainer>
                                    {donutObj == {} ?
                                        <>
                                            <ReactApexChart
                                                options={donutData.options}
                                                series={donutData.series}
                                                type="donut"
                                            />
                                        </>
                                        :
                                        <>
                                            <ReactApexChart
                                                options={donutObj?.options ?? donutData.options}
                                                series={donutObj?.series ?? donutData.series}
                                                type="donut"
                                            />
                                        </>
                                    }

                                </DonutContainer>
                                <DonutExplainContainer>
                                    <img src={backUrl + item?.major_bussiness_img} style={{ width: 'auto', width: '100%' }} />
                                    <div style={{ marginLeft: 'auto', fontSize: theme.size.font4 }}>
                                        {item?.major_bussiness_text}
                                    </div>
                                </DonutExplainContainer>
                            </div>
                            <div className="note major_bussiness_note">
                            </div>
                            <TitleStyle>4. 지배구조, 자본금 변동사항</TitleStyle>
                            <SubTitleStyle>(1) 최대주주 및 특수관계인 지분</SubTitleStyle>
                            <div className="note share_note" style={{ marginLeft: '16px' }}>
                            </div>
                            <SubTitleStyle>(2) 자본금 변동사항</SubTitleStyle>
                            <img src={backUrl + item?.capital_change_img} style={{ marginLeft: '16px', width: 'auto' }} />
                            <div style={{ marginLeft: 'auto', fontSize: theme.size.font4 }}>
                                {item?.capital_change_text}
                            </div>
                            <div className="note capital_change_note" style={{ marginLeft: '16px' }}>
                            </div>
                            <TitleStyle>5. 투자 지표</TitleStyle>
                            <img src={backUrl + item?.investment_indicator_img} style={{ width: '100%' }} />
                            <div className="note investment_indicator_note">
                            </div>
                            <TitleStyle>6. 추가 내용들</TitleStyle>

                            <div className="note etc_note">
                            </div>
                        </Content>
                    </>
                }

                <Progress value={`${percent}`} max="100"></Progress>

            </Wrappers>
        </>
    )
}
export default Post;