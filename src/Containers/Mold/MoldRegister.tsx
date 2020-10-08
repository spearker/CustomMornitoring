import React, {useCallback, useEffect, useState} from 'react'
import Styled from "styled-components";
import {Input} from 'semantic-ui-react'
import ColorCalendarDropdown from "../../Components/Dropdown/ColorCalendarDropdown";
import moment from "moment";
import {POINT_COLOR} from "../../Common/configset";
import {API_URLS, postMoldRegister} from "../../Api/mes/manageMold";
import RegisterDropdown from "../../Components/Dropdown/RegisterDropdown";
import {useHistory} from "react-router-dom"

const typeDummy = [
    '타입 A',
    '타입 B',
    '타입 C',
]

const locationDummy = [
    '창고01',
    '창고02',
    '창고03',
]

const companyDummy = [
    '(주)대한민국',
    '(주)한국',
    '(주)조선',
]


const MoldRegisterContainer = () => {
    const history = useHistory();
    const [open, setOpen] = useState<boolean>(false)
    const [moldData, setMoldData] = useState<string>()
    const [selectOpen, setSelectOpen] = useState<boolean>(false)
    const [selectDate, setSelectDate] = useState<string>(moment().format("YYYY-MM-DD"))
    const [selectMachine, setSelectMachine] = useState<{ name?: string, pk?: string }>()
    const [processData, setProcessData] = useState<IProcessRegister>({
        type: 1,
        name: '',
        processes: [{machine_pk: ''}],
        description: ''
    })
    const [typeList, setTypeList] = useState<string[]>(typeDummy)
    const [locationList, setLocationList] = useState<string[]>(locationDummy)
    const [companyList, setCompanyList] = useState<string[]>(locationDummy)
    const [selectFactory, setSelectFactory] = useState<string>()
    const [modalSelect, setModalSelect] = useState<{factory?: string, production?: string}>({
        factory: undefined,
        production: undefined
    })
    const [selectDateRange, setSelectDateRange] = useState<{start: string, end: string}>({
        start: moment().format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD"),
    })

    const [contractData, setContractData] = useState<{mold_type:string,mold_name:string,part_name:string[],mold_location:string,delivery_company:string,mold_barcode:string,registered: string}>({
        mold_type: '',
        mold_name: '',
        part_name: [''],
        mold_location: '',
        delivery_company: '',
        mold_barcode: '',
        registered: moment().format('YYYY-MM-DD'),
    })

    const postContractRegisterData = useCallback(async () => {
        const tempUrl = `${API_URLS['mold'].register}`
        const resultData = await postMoldRegister(tempUrl, contractData);
        if(resultData.status === 200){
            history.push('/mold/current/list')
        }
    }, [contractData])

    useEffect(() => {
        console.log(contractData)
    }, [contractData])

    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: "bold"}}>금형 등록</span>
                </div>
            </div>
            <ContainerMain>
                <div>
                    <p className={'title'}>필수 항목</p>
                </div>
                <div>
                    <table style={{color: "black"}}>
                        <tr>
                            <td>• 타입</td>
                            <td><RegisterDropdown type={'string'} onClickEvent={(e: string) => setContractData({...contractData,mold_type: e})} select={contractData.mold_type} contents={typeList} text={'타입을 선택해 주세요'}/></td>
                        </tr>
                        <tr>
                            <td>• 금형명</td>
                            <td><Input placeholder="금형 이름을 입력하세요." onChange={(e) => setContractData({...contractData,mold_name: e.target.value})} /></td>
                        </tr>
                        {
                            processData.processes && processData.processes.length !== 0
                            && contractData.part_name.map((v, i) => {
                                return(
                                    <tr>
                                        {i === 0 ?
                                            <td>• 부품명</td>
                                            :
                                            <td></td>
                                        }
                                        <td><Input placeholder={'부품명을 검색해 주세요'} onChange={(e) => {
                                            let tmpList = contractData.part_name
                                            if (tmpList) {
                                                tmpList[i] = e.target.value
                                            }

                                            return setContractData({...contractData, part_name: tmpList})
                                        }}/></td>
                                    </tr>
                                )
                            })
                        }
                        {
                            processData.type !== 0 &&
                            <tr>
                                <td>{processData.processes && processData.processes.length !== 0 ? '' : '• 공정'}</td>
                                <td>
                                    <button onClick={() => {
                                        const list = contractData.part_name.concat('')

                                        setContractData({
                                            ...contractData,
                                            part_name: list
                                        })
                                    }}>
                                        <div style={{width: 919, height: 34, backgroundColor: '#f4f6fa', border: '1px solid #b3b3b3'}}>
                                            <div style={{marginTop: 5}}>
                                                <p style={{color: '#b3b3b3', }}>+ 부품 추가</p>
                                            </div>
                                        </div>
                                    </button>
                                </td>
                            </tr>
                        }
                        <tr>
                            <td>• 보관위치</td>
                            <td><RegisterDropdown type={'string'} onClickEvent={(e: string) => setContractData({...contractData,mold_location:e})} select={contractData.mold_location} contents={locationList} text={'보관 위치를 선택해 주세요'}/></td>
                        </tr>
                        <tr>
                            <td>• 납품업체</td>
                            <td><RegisterDropdown type={'string'} onClickEvent={(e: string) => setContractData({...contractData,delivery_company:e})} select={contractData.delivery_company} contents={companyList} text={'납품 업체를 선택해 주세요'}/></td>
                        </tr>
                        <tr>
                            <td>• 바코드 번호</td>
                            <td>
                                <div style={{width: 919, display: 'flex', flexDirection: 'row', marginBottom: 12}}>
                                    <Input disabled placeholder={'바코드 번호 생성 버튼을 눌러주세요.'} style={{flex: 85, height: 28}}/>
                                    <SearchButton style={{flex: 15}}>
                                        <p>바코드 번호 생성</p>
                                    </SearchButton>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>• 완료 예정일</td>
                            <td>
                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', backgroundColor: '#f4f6fa', border: '0.5px solid #b3b3b3', height: 32}}>
                                    <div style={{width: 817, display: 'table-cell'}}>
                                        <div style={{marginTop: 5}}>
                                            {
                                                    <InputText style={{color: '#111319'}}>&nbsp; {selectDate}</InputText>
                                            }
                                        </div>
                                    </div>
                                    <ColorCalendarDropdown select={selectDate} onClickEvent={(select) => {
                                        setSelectDate(select)
                                        setContractData({...contractData, registered: select})
                                    }} text={'날짜 선택'} type={'single'} customStyle={{ height: 32, marginLeft: 0}}/>
                                </div>
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
        font-famaily: NotoSansCJKkr;
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
        font-famaily: NotoSansCJKkr;
        font-weight: bold;
        font-size: 15px;
        input{
            padding-left: 8px;
            font-famaily: NotoSansCJKkr;
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

export default MoldRegisterContainer
