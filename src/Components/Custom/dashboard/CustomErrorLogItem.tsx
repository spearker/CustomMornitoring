import React from 'react'
import Styled from "styled-components";
import { YOUDONG_ERROR_CHART_ERROR_DATA, YOUDONG_ERROR_DASHBOARD } from "../../../Common/@types/youdong";

interface Props {
  data: YOUDONG_ERROR_DASHBOARD
}

const CustomErrorLogItem: React.FunctionComponent<Props> = ({ data }) => {
  return (
      <Container>
        <div>
          <div>
            <PressTitle>{data.pressName}</PressTitle>
          </div>
          <PressSubContainer>
            <div>
              <div>
                <div>
                  <PressSub>기계 번호</PressSub>
                </div>
                <div>
                  <PressSub>{data.pressNumber}</PressSub>
                </div>
              </div>
            </div>
            <div>
              <div>
                <PressSub>기계 등록 날짜</PressSub>
              </div>
              <div>
                <PressSub>-</PressSub>
              </div>
            </div>
          </PressSubContainer>
        </div>
        <Content>
          <ContentTitleContainer>
            <div style={{ width: '45%' }}>
              <ContentTitle>에러 상태</ContentTitle>
            </div>
            <div style={{ width: '55%' }}>
              <div style={{ paddingLeft: 20 }}>
                <ContentTitle>에러 발생 시간</ContentTitle>
              </div>
            </div>
          </ContentTitleContainer>
          <ContentContainer>
            <div style={{ width: '100%' }}>
              {
                data.errorData.map((data: YOUDONG_ERROR_CHART_ERROR_DATA) => {
                  return (
                      <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 16
                      }}>
                        <div style={{ width: '45%' }}>
                          <ContentData>{data.error_statement}</ContentData>
                        </div>
                        <div style={{ width: '55%' }}>
                          <div style={{ paddingLeft: 20 }}>
                            <ContentData>{data.error_time}</ContentData>
                          </div>
                        </div>
                      </div>
                  )
                })
              }
            </div>
          </ContentContainer>
        </Content>
      </Container>
  )
}

const Container = Styled.div`
  width: 380px;
  height: 100vh;
  padding: 10px;
  margin-right: 24px;
}
`

const PressTitle = Styled.span`
  font-family: NotoSansCJKkr;
  font-size: 22px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 4.55;
  letter-spacing: 0.44px;
  text-align: left;
  color: #ffffff;
`

const PressSubContainer = Styled.div`
  display: flex;
  justify-content: space-between;
`

const PressSub = Styled.span`
  font-family: NotoSansCJKkr;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.93;
  letter-spacing: normal;
  text-align: left;
  color: #d7e2f5;
`


const Content = Styled.div`
  background-color: rgba(17, 19, 25, .5);
    height: 100%;
  border-radius: 6px;
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 16px;
`

const ContentContainer = Styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  padding-bottom: 16px;
`


const ContentData = Styled.span`
  object-fit: contain;
  opacity: 0.7;
  font-family: NotoSansCJKkr;
  font-size: 17px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.93;
  letter-spacing: normal;
  text-align: left;
  color: white;
`

const ContentTitleContainer = Styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 0.5px solid rgba(255, 255, 255, .5);
  padding-top: 16px;
  padding-bottom: 9px;

`

const ContentTitle = Styled.span`
  font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.05;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
`

export default CustomErrorLogItem
