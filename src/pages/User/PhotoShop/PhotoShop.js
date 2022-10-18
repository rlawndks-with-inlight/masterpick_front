import styled from "styled-components";
import { Wrappers } from "../../../components/elements/UserContentTemplete";
import logoImg from './logo.png'
import html2canvas from "html2canvas";
const Title = styled.div`
width:100%;
margin:24px 0;
display:flex;
align-items:center;
font-weight:bold;
font-size:18px;
`
const Circle = styled.div`
color:#fff;
background:#d83b46;
padding:4px 3px 3px 4px;
margin-right:8px;
border-radius:8px;
`
const TitleText = styled.div`
color:#d83b46;
`

const Ul = styled.ul`
width: 90%;
margin-bottom:18px;
font-size:14px;
`
const Li = styled.li`
::marker{
color:#d83b46;
}
line-height:24px;
width:100%;
margin-bottom:12px;
`
const Table = styled.table`
width:100%;
border-collapse : collapse;
border-spacing : 0;
`
const Tr = styled.tr`

`
const Td1 = styled.td`
border-bottom:1px solid #ddd;
background:#eee;
padding:12px 0 12px 16px;
font-size:13px;
font-weight:bold;
`
const Td2 = styled.td`
border-bottom:1px solid #ddd;
padding:8px 0 8px 16px;
font-size:12px;
color:#5a5a5a;
`
const PhotoShop = () => {
    const type = 0;
    const zUseGuide = [// 이용가이드
        {
            title: "",
            list: [

            ]
        },
    ]
    const zBetGuide = [// 배팅가이드

    ]
    const zSiteRule = [// 사이트규정

    ]
    const onCapture = async () => {
        console.log(1)
        await html2canvas(document.getElementById('div'), { scale: 2.5 }).then(canvas => {
            onSaveAs(canvas.toDataURL('image/png'), 'image-download.png')
        });
    }
    const onSaveAs = (uri, filename) => {
        console.log('onSaveAs');
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.href = uri;
        link.download = filename;
        link.click();
        document.body.removeChild(link);
    };
    return (
        <>
            <Wrappers maxWidth={750}>
                <div id="div" style={{ padding: '0 32px' }}>
                    {type == 0 ?//사이트규정
                        <>
                            <div style={{ display: 'flex', width: '100%', alignItems: 'center', fontSize: '26px', fontWeight: 'bold', margin: '24px 0' }}>
                                <img src={logoImg} style={{ height: '48px', margin: '0 4px 0 auto' }} />
                                <p style={{ margin: '0 auto 0 4px' }}>사이트 규정</p>
                            </div>
                            <div style={{ width: '100%', borderTop: '1px solid #000' }} />
                            <Title>
                                <Circle onClick={onCapture}>01</Circle>
                                <TitleText>개인정보 노출 규정 안내</TitleText>
                            </Title>
                            <div style={{ padding: '8px', background: '#eee', borderRadius: '8px', width: '90%', margin: '0 auto', marginBottom: '18px' }}>
                                <Ul>
                                <Li>랜덤박스 사이트 내에서는 카카오톡, 텔레그램 등의 메신저 아이디 및 전화번호, 계좌번호 등과 같은 개인정보를 주고받는 행위는 일체 금지되고 있습니다.</Li>
                                <Li>개인정보 노출에 대해서는 경고 없이 영구 차단 및  IP 차단 조치가 이루어 지고 있습니다.</Li>
                                </Ul>
                            </div>
                            <Title>
                                <Circle>02</Circle>
                                <TitleText>수강 규정 안내</TitleText>
                            </Title>
                            <div style={{ width: '90%', margin: '0 auto' }}>
                                <Table>
                                    <Tr>
                                        <Td1 style={{ borderTop: '1px solid #d83b46' }}>낚시행위</Td1>
                                        <Td2 style={{ borderTop: '1px solid #d83b46' }}>경기진행상황 및 스코어등을 허위로 유포하는 행위</Td2>
                                    </Tr>
                                    <Tr>
                                        <Td1>회원비방, 욕설</Td1>
                                        <Td2>특정회원 비방 및 욕설 등을 하는 행위</Td2>
                                    </Tr>
                                    <Tr>
                                        <Td1>개인방송홍보</Td1>
                                        <Td2>사이트내 아프리카TV, 다음팟등 개인방송을 홍보하는 행위</Td2>
                                    </Tr>
                                    <Tr>
                                        <Td1>도배</Td1>
                                        <Td2>반복적인 글, 이슈 등을 등록하는 행위</Td2>
                                    </Tr>
                                    <Tr>
                                        <Td1>카페, 블로그홍보</Td1>
                                        <Td2>사이트내 카페 혹은 블로그 등을 홍보하는 행위</Td2>
                                    </Tr>
                                    <Tr>
                                        <Td1>경쟁사이트홍보</Td1>
                                        <Td2>스코어관련 사이트를 홍보하는 행위</Td2>
                                    </Tr>
                                    <Tr>
                                        <Td1>운영자모욕</Td1>
                                        <Td2>운영자에 대한 비매너 행동, 욕설등을 하는 행위</Td2>
                                    </Tr>
                                    <Tr>
                                        <Td1>사이트비방</Td1>
                                        <Td2>랜덤박스를 비방하는 행위</Td2>
                                    </Tr>
                                    <Tr>
                                        <Td1>개인정보노출</Td1>
                                        <Td2>사이트내 전화번호, 카톡 이메일, 메신저등을 공유 하는 행위</Td2>
                                    </Tr>
                                    <Tr>
                                        <Td1>금전거래</Td1>
                                        <Td2>사이트내 계좌번호 노출 등 금전거래를 하는 행위</Td2>
                                    </Tr>
                                    <Tr>
                                        <Td1>분란조성</Td1>
                                        <Td2>게시판 성격에 맞지 않는 글을 등록하는 행위</Td2>
                                    </Tr>
                                    <Tr>
                                        <Td1>사칭</Td1>
                                        <Td2>특정회원 사칭 및 운영진을 사칭하는 행위</Td2>
                                    </Tr>
                                    <Tr>
                                        <Td1>불법프로그램유포</Td1>
                                        <Td2>게시글 채팅등에 불법 프로그램을 유포하는 행위</Td2>
                                    </Tr>
                                    <Tr>
                                        <Td1>유료픽판매</Td1>
                                        <Td2>유료픽 광고, 홍보, 판매들을 하는 행위</Td2>
                                    </Tr>
                                    <Tr>
                                        <Td1>불법사이트홍보</Td1>
                                        <Td2>불법사이트 추천 및 홍보, 유도 활동을 하는 행위</Td2>
                                    </Tr>
                                    <Tr>
                                        <Td1>가족방 비방/비하</Td1>
                                        <Td2>가족방에 대한 비방 및 비하하는 행위</Td2>
                                    </Tr>
                                    <Tr>
                                        <Td1>포인트 테러행위</Td1>
                                        <Td2>타회원의 포인트를 악의적인 목적으로 소모시키는 행위</Td2>
                                    </Tr>
                                    <Tr>
                                        <Td1>기타</Td1>
                                        <Td2>그외 운영자가 판단해 벌점이 필요한 경우</Td2>
                                    </Tr>
                                </Table>
                            </div>
                            <Title>
                                <Circle>03</Circle>
                                <TitleText>현금 영수증 및 원천징수 영수증 신청방법</TitleText>
                            </Title>
                            <div style={{ padding: '8px', background: '#eee', borderRadius: '8px', width: '90%', margin: '0 auto', marginBottom: '18px' }}>
                                <Ul>
                                    <Li>총알 환전으로 발생한 소득에 대해서는 사업소득으로 구분되며, 관련 증빙 서류로 원친징수 영수증을 신청하시면 발급해 드립니다.</Li>
                                    <Li>현금 영수증 및 원천징수 영수증 신청방법<br />영수증 신청 메일 주소 :  help@rdombox.com</Li>
                                </Ul>
                            </div>
                        </>
                        :
                        <>
                        </>
                    }
                    {type == 1 ?//배팅가이드
                        <>
                        </>
                        :
                        <>
                        </>
                    }
                    {type == 2 ?//이용가이드
                        <>
                            <div style={{ display: 'flex', width: '100%', alignItems: 'center', fontSize: '26px', fontWeight: 'bold', margin: '24px 0' }}>
                                <img src={logoImg} style={{ height: '48px', margin: '0 4px 0 auto' }} />
                                <p style={{ margin: '0 auto 0 4px' }}>이용 가이드</p>
                            </div>
                            <div style={{ width: '100%', borderTop: '1px solid #000' }} />
                            <Title>
                                <Circle onClick={onCapture}>01</Circle>
                                <TitleText>랜덤박스 소개</TitleText>
                            </Title>
                            <div style={{ padding: '8px', background: '#eee', borderRadius: '8px', width: '90%', margin: '0 auto', marginBottom: '18px' }}>
                                <Ul>
                                    <Li>랜덤박스 사이틑 분석 커뮤니티 사이트 입니다. 배팅 사이트가 아닙니다.<br />동행복권과 파생차트를 송출해 드리고, 회원님들끼리 분석하고 소통할 수 있는 공간입니다.</Li>
                                </Ul>
                            </div>
                            <Title>
                                <Circle>02</Circle>
                                <TitleText>캐시 충전 방법 및 충전 최소 금액 안내</TitleText>
                            </Title>
                            <div style={{ padding: '8px', background: '#eee', borderRadius: '8px', width: '90%', margin: '0 auto', marginBottom: '18px' }}>
                                <Ul>
                                    <Li>캐시 충전은 메인 화면 우측 상단 [마켓] {'>'} [코인충전]으로 들어가셔서 충전 원하시는 금액의 캐시를 충전 신청하시고, 부가세 10% 포함하여 당사 계좌로 입금 해주시면 됩니다.</Li>
                                    <Li>랜덤박스의 충전 최소 금액은 11000원입니다.</Li>
                                </Ul>
                            </div>
                            <Title>
                                <Circle>03</Circle>
                                <TitleText>캐시 환불 안내</TitleText>
                            </Title>
                            <div style={{ width: '90%', margin: '0 auto', marginBottom: '18px', fontWeight: 'bold' }}>
                                1. 캐시 환불 규정
                            </div>
                            <div style={{ padding: '8px', background: '#eee', borderRadius: '8px', width: '90%', margin: '0 auto', marginBottom: '18px' }}>
                                <Ul>
                                    <Li>랜덤박스 캐시 결제 이후, 이를 사용하지 않은 회원은 7일 이내에는 환불신청이 가능하며 회사는 환불 시 환불 금액의 10%에 해당하는 환불 수수료를 공제한 나머지 금액을 이용자에게 환불 합니다. 자세한 내용은 이용약관 제 15조 청약철회 참고 바랍니다.</Li>
                                    <Li>자세한 환불 규정은 아래와 같습니다.</Li>
                                </Ul>
                                <div style={{ width: '90%', borderTop: '1px solid #ddd', margin: '0 auto' }} />
                                <Ul>
                                    <Li>충전한지 7일 이내의 캐시 건</Li>
                                    <Li>충전 캐시 중 일부 사용 시 환불 불가</Li>
                                    <Li>환불 시 환불 수수료 10% 공제한 나머지 금액 환불</Li>
                                </Ul>
                            </div>
                            <div style={{ width: '90%', margin: '0 auto', marginBottom: '18px', fontWeight: 'bold' }}>
                                2. 환불 접수 방법
                            </div>
                            <div style={{ padding: '8px', background: '#eee', borderRadius: '8px', width: '90%', margin: '0 auto', marginBottom: '18px' }}>
                                <Ul>
                                <Li>위의 캐시 환불 규정을 충족할 경우 계좌번호, 은행명, 예금주명이 모두 확인 가능한 이체확인증 help@rdombox.com 메일로 보내주시면 환불 접수됩니다.</Li>
                                <Li>반드시 계좌번호, 은행명, 예금주명이 모두 확인 가능한 이체에 이체 내역이 아닌 이체확인증 또는 송금확인증을 첨부해야 환불 접수가 완료됩니다.</Li>
                                <Li>이체확인증 및 송금확인증은 해당 은행에서 발급 가능하며, 은행 어플에서도 발급 가능합니다.</Li>
                                <Li>환불은 접수일부터 은행영업일 기준 3일 소요됩니다.</Li>
                                </Ul>
                            </div>
                            <Title>
                                <Circle>04</Circle>
                                <TitleText>총알 환전 안내</TitleText>
                            </Title>
                            <div style={{ padding: '8px', background: '#eee', borderRadius: '8px', width: '90%', margin: '0 auto', marginBottom: '18px' }}>
                                <Ul>
                                    <Li>총알 환전은 다른 회원에게 선물 받은 총알 또는 프로젝트로 받은 별사탕에 대해서만 환전이 가능합니다. 개시로 구매하신 일반 총알에 대해서는 환전이 불가합니다.</Li>
                                    <Li>환전 신청을 위해서는 [마켓]{'>'}[총알환전]으로 들어가셔서, 계좌번호 및 이름을 입력하시면 총알 환전 가능합니다. </Li>
                                    <Li>반드시 회원 인증 명의와 예금주명의가 동일해야 환전 가능합니다.</Li>
                                </Ul>
                            </div>
                        </>
                        :
                        <>
                        </>
                    }

                </div>
            </Wrappers>
        </>
    )
}
export default PhotoShop;