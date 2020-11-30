import React, {useCallback, useState} from 'react'
import Styled from 'styled-components'
import ColorCalendarDropdown from '../../Components/Dropdown/ColorCalendarDropdown'
import moment from 'moment'
import {POINT_COLOR} from '../../Common/configset'
import {API_URLS, postMoldRegister} from '../../Api/mes/manageMold'
import MoldPickerModal from '../../Components/Modal/MoldPickerModal'
import PartsPickerModal from '../../Components/Modal/PartsPickerModal'
import {Input} from 'semantic-ui-react'
import {useHistory} from 'react-router-dom'
import MemberPickerModal from "../../Components/Modal/MemberPickerModal";

interface modalData {
    name?: string,
    pk?: string
}

const MoldRepairRegisterContainer = () => {

    const history = useHistory()

    const [open, setOpen] = useState<boolean>(false)
    const [reason, setReason] = useState<string>('')
    const [selectMember, setSelectMember] = useState<modalData>({})

    const [selectDate, setSelectDate] = useState<string>(moment().format('YYYY-MM-DD'))

    const [moldData, setMoldData] = useState<{ name: string, pk: string }>({name: '', pk: ''})
    const [parts, setParts] = useState<{ name: string, pk: string }>()
    const [managerData, setManagerData] = useState<string>()

    const postContractRegisterData = useCallback(async () => {

        if (!moldData || moldData?.pk === '' || !moldData.pk) {
            alert('금형명은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (!reason || reason === '') {
            alert('수리사유 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (!selectMember.pk || selectMember.pk === '') {
            alert('수리 담당자는 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (!selectDate || selectDate === '') {
            alert('완료 예정일은 필수 항목입니다. 반드시 입력해주세요.')
            return
        }

        const tempUrl = `${API_URLS['repair'].register}`
        const resultData = await postMoldRegister(tempUrl, {
            mold_pk: moldData?.pk,
            description: reason,
            manager: selectMember.pk,
            complete_date: selectDate
        })

        if (resultData.status === 200) {
            alert('금형 수리 요청이 등록되었습니다.')
            history.push('/mold/current/list')
        }
    }, [moldData, reason, parts, selectMember, selectDate])

    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: 'bold'}}>금형 수리 등록</span>
                </div>
            </div>
            <ContainerMain style={{paddingBottom: 20}}>
                <div>
                    <p className={'title'}>필수 항목</p>
                </div>
                <div>
                    <table style={{color: 'black'}}>
                        <tr>
                            <td>• 금형명</td>
                            <td><MoldPickerModal text={'금형을 선택해 주세요'} onClickEvent={(e) => setMoldData(e)}
                                                 select={moldData}/></td>
                        </tr>
                        <tr>
                            <td>• 수리 사유</td>
                            <td>
                                <div style={{border: '1px solid #b3b3b3', marginRight: 1, width: '99%'}}>
                                    <textarea maxLength={160} onChange={(e) => setReason(e.target.value)} style={{
                                        border: 0,
                                        fontSize: 14,
                                        padding: 12,
                                        height: '70px',
                                        width: '96%',
                                        resize: 'none'
                                    }} placeholder="내용을 입력해주세요 (80자 미만)">
                                        {reason}
                                    </textarea>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>• 수리 담당자</td>
                            <td><MemberPickerModal onClickEvent={(e) => setSelectMember(e)}
                                                   text={'작업자를 선택해 주세요'} select={selectMember}/>
                            </td>
                        </tr>
                        <tr>
                            <td>• 완료 예정일</td>
                            <td>
                                <div style={{
                                    display: 'flex',
                                    flex: 1,
                                    flexDirection: 'row',
                                    backgroundColor: '#f4f6fa',
                                    border: '0.5px solid #b3b3b3',
                                    height: 32
                                }}>
                                    <div style={{width: 817, display: 'table-cell'}}>
                                        <div style={{marginTop: 5}}>
                                            {
                                                selectDate === ''
                                                    ? <InputText>&nbsp; 거래처를 선택해 주세요</InputText>
                                                    : <InputText
                                                        style={{color: '#111319'}}>&nbsp; {selectDate}</InputText>
                                            }
                                        </div>
                                    </div>
                                    <ColorCalendarDropdown select={selectDate} onClickEvent={(select) => {
                                        setSelectDate(select)
                                    }} text={'날짜 선택'} type={'single'} customStyle={{height: 32, marginLeft: 0}}/>
                                </div>
                            </td>
                        </tr>
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

export default MoldRepairRegisterContainer
