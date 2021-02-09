import React, {useCallback, useState} from 'react'
import Styled from 'styled-components'
import {POINT_COLOR} from '../../Common/configset'
import {API_URLS, postMoldRegister} from '../../Api/mes/manageMold'
import RegisterDropdown from '../../Components/Dropdown/RegisterDropdown'
import {useHistory} from 'react-router-dom'
import {Input} from 'semantic-ui-react'

const mainType = [
  'PMS',
  'MES'
]

const mesSubType = [
  '기준 정보 관리',
  '인사 관리',
  '거래처 관리',
  '영업 관리',
  '외주처 관리',
  '재고 관리',
  '공정 관리',
  '생산 관리',
  '품질 관리',
  '바코드 관리',
  '금형 관리',
  'KPI'
]

const pmsSubType = [
  '프레스 모니터링',
  '프레스 보전관리',
  '프레스 데이터 통계',
  '프레스 데이터 분석',
]


const QnARegisterContainer = () => {
  const history = useHistory()

  const [qnaData, setQnaData] = useState<{
    mainCategory: string
    subCategory: string
    title: string
    writer: string
    contents: string,
    file: string
  }>({
    mainCategory: '',
    subCategory: '',
    title: '',
    writer: '',
    contents: '',
    file: ''
  })

  const postContractRegisterData = useCallback(async () => {
    const tempUrl = `${API_URLS['mold'].register}`
    const resultData = await postMoldRegister(tempUrl, qnaData)
    if (resultData.status === 200) {
      history.push('/mold/current/list')
    }
  }, [])


  return (
    <div>
      <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
        <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
          <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: 'bold'}}>금형 등록</span>
        </div>
      </div>
      <ContainerMain>
        <div>
          <p className={'title'}>필수 항목</p>
        </div>
        <div>
          <table style={{color: 'black'}}>
            <tr>
              <td>• 대분류</td>
              <td><RegisterDropdown type={'string'} onClickEvent={(e: string) => setQnaData({
                ...qnaData,
                mainCategory: e
              })} select={qnaData.mainCategory} contents={mainType} text={'타입을 선택해 주세요'}/></td>
            </tr>
            <tr>
              <td>• 중분류</td>
              <td><RegisterDropdown type={'string'} onClickEvent={(e: string) => setQnaData({
                ...qnaData,
                subCategory: e
              })} select={qnaData.subCategory}
                                    contents={qnaData.mainCategory === 'MES' ? mesSubType : qnaData.mainCategory === 'PMS' ? pmsSubType : []}
                                    text={'타입을 선택해 주세요'}/></td>
            </tr>
            <tr>
              <td>• 제목</td>
              <td><Input placeholder="금형 이름을 입력하세요."
                         onChange={(e) => setQnaData({...qnaData, title: e.target.value})}/>
              </td>
            </tr>
          </table>
        </div>
        <div style={{marginTop: 72}}>
          <ButtonWrap onClick={async () => {
            await postContractRegisterData()
          }}>
            <div style={{width: 360, height: 46}}>
              <p style={{fontSize: 18, marginTop: 8}}>등록하기</p>
            </div>
          </ButtonWrap>
        </div>
      </ContainerMain>
    </div>
  )
}

const ContainerMain = Styled.div`
    width: 1060px;
    height: auto;
    border-radius: 6px;
    background-color: white;
    padding: 35px 20px 0 20px;
    .title {
        font-size: 18px;
        font-family: NotoSansCJKkr;
        font-weight: bold;
        color: #19b8df;
        text-align: left;
    }
    table{
        width: 100%;
        height: 100%;
        margin-top: 35px;
    }
    td{
        font-family: NotoSansCJKkr;
        font-weight: bold;
        font-size: 15px;
        input{
            padding-left: 8px;
            font-family: NotoSansCJKkr;
            height: 32px;
            border: 0.5px solid #b3b3b3;
            width: calc( 100% - 8px );
            background-color: #f4f6fa;
            font-size: 15px;
            &::placeholder:{
                color: #b3b3b3;
            };
        }
        &:first-child{
            width: 133px;
            text-align: left;
        }
    }
    tr{
        height: 65px;
    }
`

const CheckButton = Styled.button`
    position: absolute;
    bottom: 0px;
    height: 46px;
    width: 225px;
    div{
        width: 100%;
    }
    span{
        line-height: 46px;
        font-family: NotoSansCJKkr;
        font-weight: bold;
    }
`

const ButtonWrap = Styled.button`
    padding: 4px 12px 4px 12px;
    margin-bottom: 50px;
    border-radius: 5px;
    color: black;
    background-color: ${POINT_COLOR};
    border: none;
    font-weight: bold;
    font-size: 13px;
    img {
      margin-right: 7px;
      width: 14px;
      height: 14px;
    }
`

const InputText = Styled.p`
    color: #b3b3b3;
    font-size: 15px;
    text-align: left;
    vertical-align: middle;
    font-weight: regular;
`


const SearchButton = Styled.button`
    width: 32px;
    height: 35px;
    background-color: ${POINT_COLOR};
    border: 1px solid #b3b3b3;
`

export default QnARegisterContainer
