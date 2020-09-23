import React, {useCallback, useEffect, useState} from 'react'
import Styled from "styled-components";
import {Input} from 'semantic-ui-react'
import ColorCalendarDropdown from "../../Components/Dropdown/ColorCalendarDropdown";
import moment from "moment";
import {POINT_COLOR} from "../../Common/configset";
import {API_URLS, postMoldRegister} from "../../Api/mes/manageMold";
import RegisterDropdown from "../../Components/Dropdown/RegisterDropdown";
import {useHistory} from "react-router-dom"
import MoldPickerModal from "../../Components/Modal/MoldPickerModal";
import MoldPartDropdown from "../../Components/Dropdown/MoldPartDropdown";
import NormalInput from "../../Components/Input/NormalInput";
import PartInput from "../../Components/Input/PartInput";

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


const MoldCreateRegisterContainer = () => {
    const history = useHistory();
    const [open, setOpen] = useState<boolean>(false)
    const [moldData, setMoldData] = useState<{name: string, pk: string}>()
    const [moldBarcode, setMoldBarcode] = useState<string>('')
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
            <div style={{position: 'relative', textAlign: 'left', marginTop: 48}}>
                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: "bold"}}>금형 제작 등록</span>
                </div>
            </div>
            <ContainerMain>
                <div>
                    <p className={'title'}>필수 항목</p>
                </div>
                <div>
                    <table style={{color: "black"}}>
                        <tr>
                            <td>• 금형명</td>
                            <td><MoldPickerModal text={'금형을 선택해 주세요'} onClickEvent={(e) => setMoldData(e)} select={moldData}/></td>
                        </tr>
                        <tr>
                            <td>• 금형 바코드 번호</td>
                            <td><Input placeholder="Read only" disabled onChangeText={(e:string) => setMoldBarcode(e)} /></td>
                        </tr>
                        <tr>
                            <td>• 제작 일정</td>
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
                <MoldPartDropdown title={'파트'} part={true}>
                    <PartInput title={'거래처명'} value={processData.name} onChangeEvent={(input)=>setProcessData({...processData,name: input})} />
                    <PartInput title={'강종'} value={processData.name} onChangeEvent={(input)=>setProcessData({...processData,name: input})} />
                    <div style={{ display:'flex', paddingTop:16, verticalAlign: 'top'}}>
                        <p style={{fontSize: 14, marginTop:5, fontWeight: 700, width: "13%",textAlign: "left" ,display:'inline-block'}}>{`• 규`}</p>
                        <div style={{width: "86%"}}>
                            <InputBox type="text" value={''} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {console.log('')}} placeholder={'가로규격 입력'} />
                        </div>
                    </div>
                </MoldPartDropdown>
                <MoldPartDropdown title={'부품'} part={false}>

                </MoldPartDropdown>
                <MoldPartDropdown title={'도면'} part={false}>

                </MoldPartDropdown>
                <div style={{marginTop: 72}}>
                    <ButtonWrap onClick={async () => {
                        await postContractRegisterData()
                    }}>
                        <div style={{width: 360, height: 46}}>
                            <p style={{fontSize: 18, paddingTop: 8}}>등록하기</p>
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
            width: calc( 100% - 15px );
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

const InputBox = Styled.input`
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding: 6px;
    padding-left: 10px;
    width: calc(100% - 10px);
    background-color: #f4f6fa;
`

const SearchButton = Styled.button`
    width: 32px;
    height: 35px;
    background-color: ${POINT_COLOR};
    border: 1px solid #b3b3b3;
`

export default MoldCreateRegisterContainer
