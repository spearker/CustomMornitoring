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
import IcSearchButton from "../../Assets/Images/ic_search.png";
import IcPlusGray from '../../Assets/Images/ic_plus_gray.png'
import PartsPickerModal from '../../Components/Modal/PartsPickerModal'
import {uploadTempFile} from '../../Common/fileFuctuons'

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

const initParts = {
    name: '',
    steel_grade: '',
    standard: {
        w: 0, h: 0, l: 0
    },
    material:[{
        material_pk: '',
        usage:''
    }]
}

const initComponent = {
    material_pk:'',
    usage: ''
}

const initDrawing = ''

const MoldCreateRegisterContainer = () => {
    const history = useHistory();
    const [moldData, setMoldData] = useState<{name: string, pk: string}>()
    const [selectDate, setSelectDate] = useState<string>(moment().format("YYYY-MM-DD"))
    const [selectParts, setSelectParts] = useState<{part: {pk: string, name: string, current: string }[][], parts: {pk: string, name: string, current:string}[]}>({
        part:[[{
            pk: '',
            name: '',
            current: ''
        }]],
        parts: [{
            pk: '',
            name: '',
            current: ''
        }]
    })

    const [components, setComponents] = useState<{material_pk: string, usage: string}[]>([{
        material_pk:'',
        usage: ''
    }])

    const [parts, setParts] = React.useState<{name: string, steel_grade: string, standard: {w: number, h: number, l:number}, material:{material_pk:string,usage: string}[]}[]>(
      [{
          name: '',
          steel_grade: '',
          standard: {
              w: 0, h: 0, l: 0
          },
          material:[{
            material_pk: '',
              usage:''
          }]
      }]
    )

    const [drawing, setDrawing] = useState<string[]>([''])

    const postContractRegisterData = useCallback(async () => {
        const tempUrl = `${API_URLS["making"].register}`
        const resultData = await postMoldRegister(tempUrl, {
            mold_pk: moldData?.pk,
            schedule: selectDate,
            part: parts,
            component: components
        });
        if(resultData.status === 200){
            history.push('/mold/create/list')
        }
    }, [parts, drawing, components, moldData, selectDate])

    const addFile = async (event: any, index: number): Promise<void> => {

        if(event.target.files[0] === undefined){
            return;
        }


        // if(target !== undefined && !event.target.files[0].type.includes('image')){ //이미지인지 판별
        //     //alert('이미지 형식만 업로드 가능합니다.');
        //     return onChangeEvent('');
        // }

        const res = await uploadTempFile(event.target.files[0]);

        console.log(res, event.target.files[0])
        let tmp = drawing
        if (res !== false) {
            console.log(111)
            tmp[index] = res
        }else{
            tmp[index] = ''
        }
        console.log(tmp)
        setDrawing([...tmp]);
    }

    useEffect(()=>{
        console.log(drawing)
    },[drawing])

    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
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
                        {/*<tr>*/}
                        {/*    <td>• 금형 바코드 번호</td>*/}
                        {/*    <td><Input placeholder="Read only" disabled onChangeText={(e:string) => setMoldBarcode(e)} /></td>*/}
                        {/*</tr>*/}
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
                                    }} text={'날짜 선택'} type={'single'} customStyle={{ height: 32, marginLeft: 0}}/>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                {
                    parts && parts.map((v, i) =>
                      <MoldPartDropdown title={'파트'} part={true} onClick={() => {
                          setSelectParts({...selectParts, part: [...selectParts.part, [{pk: '', name: '', current:''}]]})
                          setParts([...parts, initParts])
                      }} onClickDelete={() => {
                          let tmpParts = parts

                          if(tmpParts.length === 1){
                              console.log('삭제불가능')
                          }else{
                              tmpParts.splice(i, 1)
                              setParts([...tmpParts])
                          }
                    }}>
                        <PartInput title={'파트명'} value={parts[i].name} onChangeEvent={(input)=>{
                            let tmp = parts
                            tmp[i] = {...tmp[i], name: input}
                            return setParts([...tmp])
                        }} />
                        <PartInput title={'강종'} value={parts[i].steel_grade} onChangeEvent={(input)=>{
                            let tmp = parts
                            tmp[i] = {...tmp[i], steel_grade: input}
                            return setParts([...tmp])
                        }} />
                        <div style={{ display:'flex', paddingTop:16, verticalAlign: 'top'}}>
                            <p style={{fontSize: 14, marginTop:5, fontWeight: 700, width: "13%",textAlign: "left" ,display:'inline-block'}}>{`• 규격`}</p>
                            <div style={{width: "90%",justifyContent: "space-around",display:"flex"}}>
                                <InputWrap>
                                    <InputBox type="text" value={parts[i].standard.w} onChange={(input)=>{
                                        let tmp = parts
                                        tmp[i] = {...tmp[i], standard: {
                                              ...tmp[i].standard,
                                                w: Number(input.target.value)
                                            }
                                        }
                                        return setParts([...tmp])
                                    }} placeholder={'가로규격 입력'} />
                                    <p>mm</p>
                                </InputWrap>
                                <InputWrap>
                                    <InputBox type="text" value={parts[i].standard.h} onChange={(input)=>{
                                        let tmp = parts
                                        tmp[i] = {...tmp[i], standard: {
                                                ...tmp[i].standard,
                                                h: Number(input.target.value)
                                            }
                                        }
                                        return setParts([...tmp])}} placeholder={'세로규격 입력'} />
                                    <p>mm</p>
                                </InputWrap>
                                <InputWrap>
                                    <InputBox type="text" value={parts[i].standard.l} onChange={(input)=>{
                                        let tmp = parts
                                        tmp[i] = {...tmp[i], standard: {
                                                ...tmp[i].standard,
                                                l: Number(input.target.value)
                                            }
                                        }
                                        return setParts([...tmp])}} placeholder={'높이규격 입력'} />
                                    <p>mm</p>
                                </InputWrap>
                            </div>
                        </div>
                          {
                              parts[i].material.map((value, index) =>
                                <div style={{ display:'flex', paddingTop:16, verticalAlign: 'top'}}>
                                    <p style={{fontSize: 14, marginTop:5, fontWeight: 700, width: "13%",textAlign: "left" ,display:'inline-block'}}>{`• 부품`}</p>
                                    <div style={{width: "87%",display:"flex",alignItems: "center"}}>
                                        <PartsPickerModal text={'부품을 검색해 주세요.'} onClickEvent={(e) => {
                                            let tmpArr = parts
                                            let tmp = selectParts
                                            console.log(e)
                                            tmp.part[i][index] = e
                                            tmpArr[i].material[index] = {...tmpArr[i].material[index], material_pk: e.pk}

                                            setParts([...tmpArr])
                                            setSelectParts({...tmp})
                                        }} select={selectParts.part[i][index]} width={365}/>
                                        <p style={{marginLeft: 15}}>현재 재고량</p>
                                        <MaterialBox type="text" value={selectParts.part[i][index].current} placeholder={'9,999,999,999'} />
                                        <p>사용할 수량</p>
                                        <MaterialBox type="text" value={parts[i].material[index].usage} onChange={(e) => {
                                            let tmpArr = parts
                                            tmpArr[i].material[index] = {...tmpArr[i].material[index], usage: e.target.value}

                                            setParts([...tmpArr])
                                        }} placeholder={'9,999,999,999'} />
                                        <DeleteButton onClick={() => {
                                            let tmpCompo = parts
                                            let tmp = selectParts

                                            if(tmpCompo[i].material.length === 1){
                                                console.log('삭제불가능')
                                            }else{
                                                tmpCompo[i].material.splice(i, 1)
                                                tmp.part[i].splice(i, 1)

                                                setSelectParts({...tmp})
                                                setParts([...tmpCompo])
                                            }
                                        }}>
                                            <p>부품 삭제</p>
                                        </DeleteButton>
                                    </div>
                                </div>
                              )
                          }
                        <div style={{ display:'flex', paddingTop:16, verticalAlign: 'top'}}>
                            <p style={{fontSize: 14, marginTop:5, fontWeight: 700, width: "13%",textAlign: "left" ,display:'inline-block'}}>{``}</p>
                            <div style={{width: "87%",display:"flex",alignItems: "center"}}>
                                <AddButton onClick={() => {
                                    let tmpArr = parts
                                    let tmp = selectParts

                                    tmp.part[i].push({pk: '', name: '', current: ''})

                                    tmpArr[i] = {...tmpArr[i], material: [...tmpArr[i].material, initComponent]}

                                    setSelectParts({...tmp})
                                    setParts([...tmpArr])
                                }}>
                                    <img src={IcPlusGray} style={{width: 13, height: 13, marginTop:3, marginBottom:3}} />
                                    <p>부품 추가</p>
                                </AddButton>
                            </div>
                        </div>
                    </MoldPartDropdown>)
                }

                <MoldPartDropdown title={'부품'} part={false}>
                    {

                        components.map((v, i) =>
                            <div style={{ display:'flex', paddingTop:16, verticalAlign: 'top'}}>
                                <p style={{fontSize: 14, marginTop:5, fontWeight: 700, width: "13%",textAlign: "left" ,display:'inline-block'}}>{`• 부품명`}</p>
                                <div style={{width: "87%",display:"flex",alignItems: "center"}}>
                                    <PartsPickerModal text={'부품을 검색해 주세요.'} onClickEvent={(e) => {
                                        let tmpArr = components
                                        let tmp = selectParts
                                        tmp.parts[i] = e
                                        tmpArr[i] = {...tmpArr[i], material_pk: e.pk}

                                        setComponents([...tmpArr])
                                        setSelectParts({...tmp})
                                    }} select={selectParts.parts[i]} width={365}/>
                                <p style={{marginLeft: 15}}>현재 재고량</p>
                                <MaterialBox type="text" value={selectParts.parts[i].current}  placeholder={'9,999,999,999'} />
                                <p>사용할 수량</p>
                                <MaterialBox type="text" value={components[i].usage} onChange={(e) => {
                                    let tmpArr = components
                                    tmpArr[i] = {...tmpArr[i], usage: e.target.value}

                                    setComponents([...tmpArr])
                                }} placeholder={'9,999,999,999'} />
                                <DeleteButton onClick={() => {
                                    let tmpCompo = components
                                    if(tmpCompo.length === 1){
                                        console.log('삭제불가능')
                                    }else{
                                        tmpCompo.splice(i, 1)
                                        setComponents([...tmpCompo])
                                    }
                                }}>
                                    <p>부품 삭제</p>
                                </DeleteButton>
                            </div>
                        </div>
                        )
                    }
                    <div style={{ display:'flex', paddingTop:16, verticalAlign: 'top'}}>
                        <p style={{fontSize: 14, marginTop:5, fontWeight: 700, width: "13%",textAlign: "left" ,display:'inline-block'}}>{``}</p>
                        <div style={{width: "87%",display:"flex",alignItems: "center"}}>
                            <AddButton onClick={() => setComponents([...components, initComponent ])}>
                                <img src={IcPlusGray} style={{width: 13, height: 13, marginTop:3, marginBottom:3}} />
                                <p>부품 추가</p>
                            </AddButton>
                        </div>
                    </div>
                </MoldPartDropdown>
                <MoldPartDropdown title={'도면'} part={false}>
                    {
                        drawing.map((v, i) => <div style={{ display:'flex', paddingTop:16, verticalAlign: 'top'}}>
                            {console.log(v)}
                            <p style={{fontSize: 14, marginTop:5, fontWeight: 700, width: "13%",textAlign: "left" ,display:'inline-block'}}>{`• 도면명`}</p>
                            <div style={{width: "87%",display:"flex",alignItems: "center"}}>
                                <UploadBox placeholder="도면을 업로드해주세요." style={{width: 700}} value={drawing[i]} onChange={()=>drawing[i]}/>
                                <UploadButton onClick={() => {}}>
                                    <label htmlFor={'file'}  style={{ textAlign:'center', fontSize:14, width:'100%', height: '100%', paddingBottom:2 , paddingTop:4, backgroundColor:POINT_COLOR, paddingLeft:12, paddingRight:12, cursor:'pointer'}}>파일 선택</label>
                                </UploadButton>
                                <input type={'file'} name="file" id={'file'} style={{display:'none'}} onChange={(e) => {
                                    e.persist();

                                    console.log('inputEvent', e)
                                    addFile(e, i)
                                }}/>
                                <DeleteButton onClick={() => {
                                    let tmpCompo = drawing
                                    if(tmpCompo.length === 1){
                                        console.log('삭제불가능')
                                    }else{
                                        tmpCompo.splice(i, 1)
                                        setDrawing([...tmpCompo])
                                    }
                                }}>
                                    <p>도면 삭제</p>
                                </DeleteButton>
                            </div>
                        </div>)
                    }
                    <div style={{ display:'flex', paddingTop:16, verticalAlign: 'top'}}>
                        <p style={{fontSize: 14, marginTop:5, fontWeight: 700, width: "13%",textAlign: "left" ,display:'inline-block'}}>{``}</p>
                        <div style={{width: "87%",display:"flex",alignItems: "center"}}>
                            <AddButton onClick={() => setDrawing([...drawing, ''])}>
                                <img src={IcPlusGray} style={{width: 13, height: 13, marginTop:3, marginBottom:3}} />
                                <p>도면 추가</p>
                            </AddButton>
                        </div>
                    </div>
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


const AddButton = Styled.button`
    display:flex;
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding: 5px;
    padding-left: 45%;
    width: 100%;
    background-color: #f4f6fa;
    p{
        color: #b3b3b3;
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

const InputWrap = Styled.div`
    display:flex;
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding: 5px;
    width: 31%;
    background-color: #f4f6fa;
    p{
        color: #b3b3b3;
    }
`

const InputBox = Styled.input`
    border: solid 0.5px #f4f6fa;
    font-size: 14px;
    width: 100%;
    background-color: #f4f6fa;
`

const MaterialBox = Styled.input`
    text-align: right;
    display:flex;
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding: 6px;
    width: 11%;
    background-color: #f4f6fa;
    margin: 0 16px 0 8px;
`

const SearchBox = Styled(Input)`
    input{
        padding-left: 8px;
        font-famaily: NotoSansCJKkr;
        height: 28px;
        border: 0.5px solid #b3b3b3;
        width: calc( 100% - 8px );
        background-color: #f4f6fa;
        font-size: 15px;
        &::placeholder:{
            color: #b3b3b3;
        };
     }
`

const UploadBox = Styled(Input)`
    input{
        padding-left: 8px;
        font-famaily: NotoSansCJKkr;
        height: 28px;
        border: 0.5px solid #b3b3b3;
        width: 100%;
        background-color: #f4f6fa;
        font-size: 15px;
        &::placeholder:{
            color: #b3b3b3;
        };
     }
`

const SearchButton = Styled.button`
    margin-right: 16px;
    width: 32px;
    height: 32px;
    background-color: ${POINT_COLOR};
    img{
        width: 20px;
        height: 20px;
        margin-top: 5px;
    }
`

const UploadButton = Styled.button`
    width: 11.5%;
    height: 32px;
    background-color: #19b9df;
    margin-right: 16px;
    p{
        font-family: NotoSansCJKkr-Bold;
        color: #000000;
        font-size: 15px;
        font-weight: 500;
    }
`

const DeleteButton = Styled.button`
    width: 11.5%;
    height: 32px;
    background-color: #b3b3b3;
    p{
        font-family: NotoSansCJKkr-Bold;
        color: #ffffff;
        font-size: 15px;
        font-weight: 500;
    }
`

export default MoldCreateRegisterContainer
