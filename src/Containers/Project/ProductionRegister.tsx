import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {Input} from 'semantic-ui-react'
import ColorCalendarDropdown from '../../Components/Dropdown/ColorCalendarDropdown'
import moment from 'moment'
import {POINT_COLOR} from '../../Common/configset'
import {API_URLS, getProjectList, postProductionRegister} from '../../Api/mes/production'
import RegisterDropdown from '../../Components/Dropdown/RegisterDropdown'
import ProductionPickerModal from '../../Components/Modal/ProductionPickerModal'
import CustomerPickerModal from '../../Components/Modal/CustomerPickerModal'
import ProcessPickerModal from '../../Components/Modal/ProcessPickerModal'
import {useHistory} from 'react-router-dom'
import MemberPickerModal from '../../Components/Modal/MemberPickerModal'
import {getProductData} from '../../Api/pm/statistics'
import Notiflix from 'notiflix'

const typeDummy = [
    '수주 처리',
    '안전 재고 확보',
]

interface modalData {
    name?: string,
    pk?: string
}

interface Props {
    match: any
}


const ProductionRegisterContainer = ({match}: Props) => {
    const history = useHistory()
    const [open, setOpen] = useState<boolean>(false)
    const [isUpdate, setIsUpdate] = useState<boolean>(false)
    const [typeList, setTypelist] = useState<string[]>(typeDummy)
    const [selectType, setSelectType] = useState<string>()
    const [modalSelect, setModalSelect] = useState<{
        factory: { name?: string, pk?: string }, production: { name?: string, pk?: string },
        segment: { name?: string, pk?: string }
    }>({
        factory: {name: '', pk: ''},
        production: {name: '', pk: ''},
        segment: {name: '', pk: ''},
    })
    const [selectDate, setSelectDate] = useState<string>(moment().format('YYYY-MM-DD'))
    const [selectDateRange, setSelectDateRange] = useState<{ start: string, end: string }>({
        start: moment().format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD'),
    })

    const [materialType, setMaterialType] = useState<number>(-1)
    const [selectMember, setSelectMember] = useState<modalData>({})
    const [pk, setPk] = useState<string>('')

    const [chitData, setChitData] = useState<IProductionAdd>({
        type: 0,
        manager: '',
        material: '',
        from: '',
        to: '',
        amount: 0,
        supplier: '',
        segment: ''
    })

    useEffect(() => {
            if (match.params.pk) {
                setIsUpdate(true)
                getData()

            }
        }, []
    )

    const postChitRegisterData = useCallback(async () => {
        const tempUrl = `${API_URLS['production'].register}`
        let type = ''
        if (selectType === '수주 처리') {
            type = '0'
        } else if (selectType === '안전 재고 확보') {
            type = '1'
        }

        if (type === '') {
            alert('타입은 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (selectMember.pk === '') {
            alert('계획자는 필수 항목입니다. 반드시 입력해 주세요.')
            return
        } else if (modalSelect.production?.pk === '') {
            alert('품목명은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (selectDateRange.start === '') {
            alert('생산계획 일정은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (selectDateRange.end === '') {
            alert('생산계획 일정은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (chitData.amount === 0) {
            alert('총 수량은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (modalSelect.factory.pk === '') {
            alert('납품 업체를 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (modalSelect.segment.pk === '') {
            alert('공정명은 필수 항목입니다. 반드시 입력해주세요.')
            return
        }

        const resultData = await postProductionRegister(tempUrl, {
            type: Number(type),
            manager: selectMember.pk,
            material: modalSelect.production?.pk,
            from: selectDateRange.start,
            to: selectDateRange.end,
            amount: chitData.amount,
            supplier: modalSelect.factory?.pk,
            segment: modalSelect.segment?.pk
        })

        if (resultData) {
            Notiflix.Confirm.Init({
                titleColor: '#32c682',
                messageColor: '#000000',
                okButtonColor: '#ffffff',
                okButtonBackground: '#32c682',
            });

            Notiflix.Confirm.Show(
                '배포 확인',
                '지금 만드신 생산 계획을 배포 하시겠습니까? (예 선택시 배포 후 전표 등록으로 이동합니다)',
                '예',
                '아니요',
                function () {
                    const tempUrl = `${API_URLS['production'].distribute}?pk=${resultData.results}`
                    const res = getProjectList(tempUrl).then((res) => {
                        if (res) {
                            history.push({pathname: '/project/chit/register', state: {res}})
                        }

                    })

                },
                function () {
                    history.goBack()
                }
            )
        }
    }, [chitData, modalSelect])

    const getData = async () => {
        const tempUrl = `${API_URLS['production'].load}?pk=${match.params.pk}`
        const resultData = await getProductData(tempUrl)

        if (resultData) {
            let type = ''
            if (resultData.type === 0) {
                type = '수주 처리'
            } else if (resultData.type === 1) {
                type = '안전 재고 확보'
            }

            setPk(resultData.pk)

            setSelectType(type)

            setModalSelect({
                ...modalSelect,
                production: {
                    name: resultData.material_name,
                    pk: resultData.material
                },
                factory: {
                    name: resultData.supplier_name,
                    pk: resultData.supplier
                },
                segment: {
                    name: resultData.segment_name,
                    pk: resultData.segment_pk
                }
            })

            setSelectDateRange({
                start: resultData.from,
                end: resultData.to
            })

            setSelectMember({
                name: resultData.manager_name,
                pk: resultData.manager
            })

            setChitData({...chitData, amount: resultData.amount})
        }
    }

    const postUpdate = async () => {
        const tempUrl = `${API_URLS['production'].projectUpdate}`
        let type = ''
        if (selectType === '수주 처리') {
            type = '0'
        } else if (selectType === '안전 재고 확보') {
            type = '1'
        }

        if (type === '') {
            alert('타입은 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (selectMember.pk === '') {
            alert('계획자는 필수 항목입니다. 반드시 입력해 주세요.')
            return
        } else if (modalSelect.production?.pk === '') {
            alert('품목명은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (selectDateRange.start === '') {
            alert('생산계획 일정은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (selectDateRange.end === '') {
            alert('생산계획 일정은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (chitData.amount === 0) {
            alert('총 수량은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (modalSelect.factory.pk === '') {
            alert('납품 업체를 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (modalSelect.segment.pk === '') {
            alert('공정명은 필수 항목입니다. 반드시 입력해주세요.')
            return
        }

        const resultData = await postProductionRegister(tempUrl, {
            pk: pk,
            type: Number(type),
            manager: selectMember.pk,
            material: modalSelect.production?.pk,
            from: selectDateRange.start,
            to: selectDateRange.end,
            amount: chitData.amount,
            supplier: modalSelect.factory?.pk,
            segment: modalSelect.segment?.pk
        })

        if (resultData) {
            history.goBack()
        }
    }

    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
          <span style={{
              fontSize: 20,
              marginRight: 18,
              marginLeft: 3,
              fontWeight: 'bold'
          }}>{isUpdate ? '생산 계획 수정' : '생산 계획 등록'}</span>
                </div>
            </div>

            <ContainerMain>
                <div>
                    <p className={'title'}>필수 항목</p>
                </div>
                <div>
                    <table style={{color: 'black'}}>
                        <tr>
                            <td>• 타입</td>
                            <td><RegisterDropdown type={'string'} onClickEvent={(e: string) => setSelectType(e)}
                                                  select={selectType}
                                                  contents={typeList} text={'타입을 선택해 주세요'} buttonWid={30}
                                                  style={{width: '100%'}} inputStyle={{width: 891}}/></td>
                        </tr>
                        <tr>
                            <td>• 계획자</td>
                            <td>
                                <MemberPickerModal onClickEvent={(e) => setSelectMember(e)} type={'계획자'} selectAuthority
                                                   text={'계획자를 선택해 주세요'} select={selectMember}/>
                            </td>
                        </tr>
                        <tr>
                            <td>• 품목(품목명)</td>
                            <td><ProductionPickerModal select={modalSelect.production}
                                                       onClickEvent={(e) => {
                                                           setModalSelect({...modalSelect, production: e})
                                                       }} text={'품목명을 검색해주세요.'} type={1} buttonWid={30}
                                                       innerStyle={{width: '100%'}} innerWidth={891} useFilter/></td>
                        </tr>
                        <tr>
                            <td>• 생산 계획 일정</td>
                            <td>
                                <div style={{
                                    display: 'flex',
                                    flex: 1,
                                    flexDirection: 'row',
                                    backgroundColor: '#f4f6fa',
                                    border: '0.5px solid #b3b3b3',
                                    height: 32
                                }}>
                                    <div style={{width: 821, display: 'table-cell'}}>
                                        <div style={{marginTop: 5}}>
                                            {
                                                selectDateRange.start === ''
                                                    ? <InputText>&nbsp; 거래처를 선택해 주세요</InputText>
                                                    : <InputText
                                                        style={{color: '#111319'}}>&nbsp; {selectDateRange.start} ~ {selectDateRange.end}</InputText>
                                            }
                                        </div>
                                    </div>
                                    <ColorCalendarDropdown selectRange={selectDateRange} zIndex={3} unLimit
                                                           onClickEvent={(start, end) => {
                                                               setSelectDateRange({
                                                                   start,
                                                                   end: !end ? selectDateRange.end : end
                                                               })
                                                               setChitData({
                                                                   ...chitData,
                                                                   from: start,
                                                                   to: !end ? selectDateRange.end : end
                                                               })
                                                           }} text={'기간 선택'} type={'range'}
                                                           customStyle={{height: 32, marginLeft: 0}}/>
                                </div>
                            </td>
                        </tr>
                        {/*<tr>*/}
                        {/*    <td>• 공정 경로</td>*/}
                        {/*    <td><Input placeholder="입력해 주세요." onChangeText={(e:string) => setChitData({...chitData, manager: e})}/></td>*/}
                        {/*</tr>*/}
                        <tr>
                            <td>• 목표수량</td>
                            <td><Input placeholder="생산 목표 수량은 입력해 주세요 (최대: 2,147,483,647개)" type={'number'}
                                       value={chitData.amount}
                                       onChange={(e) => setChitData({...chitData, amount: Number(e.target.value)})}/>
                            </td>
                        </tr>
                        <tr>
                            <td>• 납품 업체</td>
                            <td>
                                <CustomerPickerModal select={modalSelect.factory}
                                                     onClickEvent={(e) => {
                                                         setModalSelect({...modalSelect, factory: e})
                                                     }} text={'거래처를 검색해주세요.'} buttonWid={30}
                                                     style={{width: '100%'}} inputWidth={891}/>
                            </td>
                        </tr>
                        <tr>
                            <td>• 공정명</td>
                            <td>
                                <ProcessPickerModal select={modalSelect.segment}
                                                    onClickEvent={(e) => {
                                                        setModalSelect({...modalSelect, segment: e})
                                                    }}
                                                    seg
                                                    text={'공정명을 검색해 주세요'} buttonWid={30}
                                                    style={{width: '100%'}} inputWidth={891}/>
                            </td>
                        </tr>
                        {/*<tr>*/}
                        {/*    <td>• 납기 일</td>*/}
                        {/*    <td>*/}
                        {/*        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', backgroundColor: '#f4f6fa', border: '0.5px solid #b3b3b3', height: 32}}>*/}
                        {/*            <div style={{width: 821, display: 'table-cell'}}>*/}
                        {/*                <div style={{marginTop: 5}}>*/}
                        {/*                    {*/}
                        {/*                        selectDate === ''*/}
                        {/*                            ?<InputText>&nbsp; 거래처를 선택해 주세요</InputText>*/}
                        {/*                            :<InputText style={{color: '#111319'}}>&nbsp; {selectDate}</InputText>*/}
                        {/*                    }*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*            <ColorCalendarDropdown select={selectDate} onClickEvent={(select) => {*/}
                        {/*                setSelectDate(select)*/}
                        {/*                setChitData({...chitData, deadline: select})*/}
                        {/*            }} text={'날짜 선택'} type={'single'} customStyle={{ height: 32, marginLeft: 0}}/>*/}
                        {/*        </div>*/}
                        {/*    </td>*/}
                        {/*</tr>*/}
                    </table>
                </div>
                <div style={{marginTop: 130}}>
                    <ButtonWrap onClick={async () => {
                        if (isUpdate) {
                            await postUpdate()
                        } else {
                            await postChitRegisterData()
                        }

                    }}>
                        <div style={{}}>
                            <p style={{fontSize: 18}}>{isUpdate ? '수정하기' : '등록하기'}</p>
                        </div>
                    </ButtonWrap>
                </div>
            </ContainerMain>
        </div>
    )
}

const ContainerMain = Styled.div`
    width: 1060px;
    height: 827px;
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
            width: calc( 917px - 8px );
            height: 32px;
            font-size: 15px;
            border: 0.5px solid #b3b3b3;
            background-color: #f4f6fa;
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
    width: 360px;
    height: 46px;
    box-sizing: border-box;
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

export default ProductionRegisterContainer

