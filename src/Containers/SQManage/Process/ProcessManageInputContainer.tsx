import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import ColorCalendarDropdown from '../../../Components/Dropdown/ColorCalendarDropdown'
import moment from 'moment'
import {POINT_COLOR} from '../../../Common/configset'
import {API_URLS, postMoldRegister} from '../../../Api/mes/manageMold'
import MoldPickerModal from '../../../Components/Modal/MoldPickerModal'
import PartsPickerModal from '../../../Components/Modal/PartsPickerModal'
import {Input} from 'semantic-ui-react'
import {useHistory} from 'react-router-dom'
import MachinePickerModal from '../../../Components/Modal/MachinePickerModal'
import RadioInput from '../../../Components/Input/RadioInput'
import DeleteButton from '../../../Assets/Images/delete_btn.png'

const factoryDummy = [
  '더미 업체 1',
  '더미 업체 2',
  '더미 업체 3',
]

const productionDummy = [
  '더미 품목 1',
  '더미 품목 2',
  '더미 품목 3',
]

const listDummy = [
  {
    project_pk: 'dummy01',
    factory: '더미 업체 1',
    production: '더미 품목 1',
    planDate: {start: '2020-08-15', end: '2020-08-17'}
  },
  {
    project_pk: 'dummy02',
    factory: '더미 업체 1',
    production: '더미 품목 1',
    planDate: {start: '2020-08-15', end: '2020-08-17'}
  },
]

interface Props {
  match: any
}

const ProcessManageInputContainer = ({match}: Props) => {

  const history = useHistory()

  const [selectMachine, setSelectMachine] = useState<{ pk: string, name: string }>()
  const [selectMold, setSelectMold] = useState<{ pk: string, name: string }>()

  const [type, setType] = useState<number>(0)

  const [open, setOpen] = useState<boolean>(false)
  const [reason, setReason] = useState<string>('')
  const [selectDate, setSelectDate] = useState<string>(moment().format('YYYY-MM-DD'))

  const [moldData, setMoldData] = useState<{ name: string, pk: string }>({name: '', pk: ''})
  const [parts, setParts] = useState<{ name: string, pk: string }>()
  const [managerData, setManagerData] = useState<string>()

  const [machineData, setMachineData] = useState<{ pk: string }[]>([{pk: ''}])

  const postContractRegisterData = useCallback(async () => {

    if (!moldData || moldData?.pk === '' || !moldData.pk) {
      alert('금형명은 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (!reason || reason === '') {
      alert('수리사유 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (!managerData || managerData === '') {
      alert('수리 담당자는 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (!selectDate || selectDate === '') {
      alert('완료 예정일은 필수 항목입니다. 반드시 입력해주세요.')
      return
    }

    const tempUrl = `${API_URLS['repair'].register}`
    const resultData = await postMoldRegister(tempUrl, {
      mold_pk: moldData?.pk,
      description: reason,
      manager: managerData,
      complete_date: selectDate
    })

    if (resultData.status === 200) {
      alert('금형 수리 요청이 등록되었습니다.')
      history.push('/mold/current/list')
    }
  }, [moldData, reason, parts, managerData, selectDate])

  useEffect(() => {
    switch (type) {
      case 0:
        setMachineData([{pk: ''}])
        break
      case 1:
        setMachineData([{pk: ''}, {pk: ''}])
        break
      case 2:
      case 3:
      default:
        setMachineData([{pk: ''}])
        break
    }
  }, [type])

  const machineTable = (index: number) => {
    return (
      <tbody style={{borderBottom: '0.5px solid #b3b3b3'}}>
      <tr>
        <td>• {index + 1}번 기계</td>
        <td style={{display: 'flex'}}>
          <div style={{width: '100%', height: 32, alignItems: 'center', justifyContent: 'center', marginTop: 8}}>
            <MachinePickerModal onClickEvent={setSelectMachine} text={'기계를 선택해 주세요'} select={selectMachine}/>
          </div>
          {
            type !== 0 && (type === 1 && index >= 2) || (type >= 2) ?
              <img src={DeleteButton} style={{width: 32, height: 32, marginTop: 8}}
                   onClick={() => {
                     let tmpMachineData = machineData
                     tmpMachineData.splice(index, 1)

                     setMachineData([...tmpMachineData])
                   }}/> : null
          }

        </td>
      </tr>
      <tr>
        <td>• 사용 금형</td>
        <td>
          <MoldPickerModal onClickEvent={setSelectMold} text={'금형을 선택해 주세요'} select={selectMold}/>
        </td>
      </tr>
      <tr>
        <td>• 캐비티</td>
        <td><Input disabled={true} placeholder="금형을 선택하면 자동으로 입력됩니다."
                   onChange={(e) => setManagerData(e.target.value)}/>
        </td>
      </tr>
      <tr>
        <td>• 적정 SPM</td>
        <td><Input placeholder="적정 SPM값을 입력해 주세요. (단위: 00)" onChange={(e) => setManagerData(e.target.value)}/>
        </td>
      </tr>
      <tr>
        <td>• 적정 슬라이드 높이</td>
        <td><Input placeholder="적정 슬라이더 높이 값을 입력해 주세요. (단위: 00)"
                   onChange={(e) => setManagerData(e.target.value)}/>
        </td>
      </tr>
      <tr>
        <td>• 적정 피더거리</td>
        <td><Input placeholder="적정 피더 거리 값을 입력해 주세요. (단위: 00)" onChange={(e) => setManagerData(e.target.value)}/>
        </td>
      </tr>
      <tr>
        <td style={{color: '#19b9df'}}>• 초품 검사 개수</td>
        <td><Input placeholder="초품 검사 개수를 입력해주세요" onChange={(e) => setManagerData(e.target.value)}/>
        </td>
      </tr>
      {
        type === 0 && (<React.Fragment>
          <tr>
            <td style={{color: '#19b9df'}}>• 주기 검사 간격</td>
            <td><Input placeholder="주기 검사 간격을 입력해주세요 (단위 : 시간)" onChange={(e) => setManagerData(e.target.value)}/>
            </td>
          </tr>
          <tr>
            <td style={{color: '#19b9df'}}>• 주기 검사 개수</td>
            <td><Input placeholder="주기 검사 개수를 입력해주세요." onChange={(e) => setManagerData(e.target.value)}/>
            </td>
          </tr>
        </React.Fragment>)
      }
      {
        type !== 0 && index === machineData.length - 1 && <tr>
            <td></td>
            <td>
                <div style={{
                  width: '100%',
                  height: '32px',
                  backgroundColor: '#f4f6fa',
                  border: '0.5px solid #b3b3b3',
                  cursor: 'pointer',
                }} onClick={() => {
                  setMachineData([...machineData, {pk: ''}])
                }}>
                    <p> + 기계 추가</p>
                </div>
            </td>
        </tr>
      }
      </tbody>
    )
  }

  return (
    <div>
      <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
        <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
          <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: 'bold'}}>공정 SQ 인증 정보 등록</span>
        </div>
      </div>
      <ContainerMain style={{paddingBottom: 20}}>
        <div>
          <p className={'title'}>필수 항목</p>
        </div>
        <div>
          <table style={{color: 'black'}}>
            <tr>
              <td colSpan={2}>
                <div style={{width: '100%'}}>
                  <RadioInput title={'타입'} contents={[{title: '단발', value: 0}, {title: '라인', value: 1}, {
                    title: '조립',
                    value: 2
                  }, {title: '검수', value: 3}]}
                              target={type}
                              width={135}
                              onChangeEvent={(e) => {
                                setType(e)
                              }}/>
                </div>
              </td>
            </tr>
            <tbody style={{borderBottom: '0.5px solid #b3b3b3', padding: '10px 0 10px 0'}}>
            <tr>
              <td>• 공정명</td>
              <td><Input
                placeholder="공정명 입력해 주세요."
                onChange={(e) => setManagerData(e.target.value)}/>
              </td>
            </tr>
            </tbody>
            {
              machineData.map((v, i) => {
                return machineTable(i)
              })

            }
            <tbody style={{borderBottom: '0.5px solid #b3b3b3'}}>
            <tr>
              <td>• 설명</td>
              <td><Input placeholder="설명글을 입력해주세요"
                         onChange={(e) => setManagerData(e.target.value)}/>
              </td>
            </tr>
            </tbody>
            {
              type !== 0 && <tbody style={{borderBottom: '0.5px solid #b3b3b3'}}>
              <tr>
                  <td style={{color: '#19b9df'}}>• 주기 검사 간격</td>
                  <td><Input placeholder="주기 검사 간격을 입력해주세요 (단위 : 시간)" onChange={(e) => setManagerData(e.target.value)}/>
                  </td>
              </tr>
              <tr>
                  <td style={{color: '#19b9df'}}>• 주기 검사 개수</td>
                  <td><Input placeholder="주기 검사 개수를 입력해주세요." onChange={(e) => setManagerData(e.target.value)}/>
                  </td>
              </tr>
              </tbody>
            }
          </table>
        </div>
        <div style={{marginTop: 72,}}>
          <ButtonWrap onClick={async () => {
            await postContractRegisterData()
          }}>
            <div style={{width: 360, height: 46, boxSizing: 'border-box', paddingTop: '9px'}}>
              <p style={{fontSize: 18}}>등록하기</p>
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
border-collapse: collapse;
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
height: 50px;
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
line - height: 46px;
font-family: NotoSansCJKkr;
font-weight: bold;
}
`

const ButtonWrap = Styled.button`
padding: 4px 12px 4px 12px;
border-radius: 5px;
color: black;
background-color: ${POINT_COLOR};
border: none;
font-weight: bold;
font-size: 13px;
img {
margin - right: 7px;
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

export default ProcessManageInputContainer
