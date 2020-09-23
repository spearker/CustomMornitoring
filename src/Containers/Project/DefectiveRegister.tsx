import React, {useCallback, useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import {uploadTempFile} from "../../Common/fileFuctuons";
import {API_URLS, getProjectList} from "../../Api/mes/production";
import {getParameter, postRequest} from "../../Common/requestFunctions";
import {getToken} from "../../Common/tokenFunctions";
import {TOKEN_NAME} from "../../Common/configset";
import Header from "../../Components/Text/Header";
import WhiteBoxContainer from "../WhiteBoxContainer";
import ListHeader from "../../Components/Text/ListHeader";
import NormalInput from "../../Components/Input/NormalInput";
import RadioInput from "../../Components/Input/RadioInput";
import NormalNumberInput from "../../Components/Input/NormalNumberInput";
import NormalFileInput from "../../Components/Input/NormalFileInput";
import OldFileInput from "../../Components/Input/OldFileInput";
import RegisterButton from "../../Components/Button/RegisterButton";
import IcButton from "../../Components/Button/IcButton";
import searchImage from "../../Assets/Images/ic_search.png";
import ColorCalendarDropdown from "../../Components/Dropdown/ColorCalendarDropdown";
import MachinePickerModal from "../../Components/Modal/MachinePickerModal";
import moment from "moment";
import Styled from "styled-components";
import ProductionPickerModal from "../../Components/Modal/ProductionPickerModal";
import InputContainer from '../InputContainer'


interface Props {
    match: any;
    // chilren: string;
}


const DefectiveRegisterContainer = ({ match }: Props)  => {

    console.log(match)

    const history = useHistory()
    const [open, setOpen] = useState<boolean>(false)
    const [selectHistory, setSelectHistory] = useState<{ name?: string, pk?: string }>()
    const [selectMaterial, setSelectMaterial] = useState<{ name?: string, pk?: string }>()
    const [selectMachine, setSelectMachine] = useState<{ name?: string, pk?: string }>()
    const [pk, setPk] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [no, setNo] = useState<number>();
    const [selectDate, setSelectDate] = useState<string>(moment().format("YYYY-MM-DD"));
    const [reason, setReason] = useState<string>('')
    const textBoxRef = useRef(null);
    const [infoList, setInfoList] = useState<IInfo[]>([]);
    const [paths, setPaths] = useState<any[1]>([null]);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);



    useEffect(()=>{
        if( match.params.pk ){
            ////alert(`수정 페이지 진입 - pk :` + param)
            setIsUpdate(true)
            getData()
        }

    },[])



    /**
     * addFiles()
     * 사진 등록
     * @param {object(file)} event.target.files[0] 파일
     * @returns X
     */
    const addFiles = async (event: any, index: number): Promise<void> => {
        console.log(event.target.files[0]);
        console.log(index)
        if(event.target.files[0] === undefined){

            return;
        }
        console.log(event.target.files[0].type);
        if(event.target.files[0].type.includes('image')){ //이미지인지 판별

            const tempFile  = event.target.files[0];
            console.log(tempFile)
            const res = await uploadTempFile(event.target.files[0]);

            if(res !== false){
                console.log(res)
                const tempPatchList= paths.slice()
                tempPatchList[index] = res;
                console.log(tempPatchList)
                setPaths(tempPatchList)
                return
            }else{
                return
            }

        }else{

            //alert('이미지 형식만 업로드 가능합니다.')
        }

    }



    /**
     * getData()
     * 기계 정보 수정을 위한 조회
     * @param {string} url 요청 주소
     * @param {string} pk 기계 pk
     * @returns X
     */
    const getData = useCallback(async()=>{

        const tempUrl = `${API_URLS['customer'].load}?pk=${match.params.pk}`
        const res = await getProjectList(tempUrl)

        if(res === false){
            //TODO: 에러 처리
        }else{
            setName(res.name);
            setPk(res.pk);
            setNo(Number(res.number));
            setPk(res.pk);
            setPaths([res.photo])
            setInfoList(res.info_list)
        }
    },[pk, name, no,paths])

    /**
     * onsubmitFormUpdate()
     * 기계 정보 수정 요청
     * @param {string} url 요청 주소
     * @param {string} pk 기계 pk
     * @param {string} name 이름
     * @param {string} no 넘버
     * @param {object(file)} file 사진 파일
     * @param {string} info 상세정보
     * @param {string} made 제조정보
     * @param {string} type 종류
     * @param {string} madeNo 제조사넘버
     * @returns X
     */
    const onsubmitFormUpdate = useCallback(async(e)=>{
        e.preventDefault();
        if(name === "" ){
            //alert("이름은 필수 항목입니다. 반드시 입력해주세요.")
            return;
        }

        const data = {
            pk: getParameter('pk'),
            name: name,
            number: no,
            photo: paths[0],
            //info_list : infoList.length > 0 ? JSON.stringify(infoList) : null,

        };

        const res = await postRequest('http://203.234.183.22:8299/api/v1/defective/update/', data, getToken(TOKEN_NAME))

        if(res === false){
            ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
        }else{
            //alert('성공적으로 수정 되었습니다')
            setIsUpdate(false)
            history.goBack()
        }

    },[pk, name, no, paths,])

    /**
     * onsubmitForm()
     * 기계 정보 등록
     * @param {string} url 요청 주소
     * @param {string} name 이름
     * @param {string} no 넘버
     * @param {string} info 상세정보
     * @param {string} made 제조정보
     * @param {string} type 종류
     * @param {string} madeNo 제조사넘버
     * @returns X
     */
    const onsubmitForm = useCallback(async(e)=>{
        e.preventDefault();
        console.log(infoList)
        ////alert(JSON.stringify(infoList))
        console.log(JSON.stringify(infoList))
        if(name === "" ){
            //alert("이름은 필수 항목입니다. 반드시 입력해주세요.")
            return;
        }
        const data = {

            name: name,
            number: no,
            photo: paths[0],
            // info_list : infoList.length > 0 ? JSON.stringify(infoList) : null,

        };


        const res = await postRequest('http://203.234.183.22:8299/api/v1/defective/register', data, getToken(TOKEN_NAME))

        if(res === false){
            //TODO: 에러 처리
        }else{
            if(res.status === 200){
                //alert('성공적으로 등록 되었습니다')
                const data = res.results;
                setName('');
                setPk('');
                setNo(undefined);
                setPaths([null])
                setInfoList([])

                history.goBack();
            }else{
                //TODO:  기타 오류
            }
        }

    },[pk, name, no, paths,])




    return (
        <div>
            <Header title={isUpdate ? '불량 이력수정' : '불량 이력등록'}/>
            <WhiteBoxContainer>
                <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm} >
                    <ListHeader title="필수 항목"/>
                    <InputContainer title={"품목(품목명)"} width={120}>
                        <ProductionPickerModal select={selectMaterial}
                                               onClickEvent={(e) => {
                                                   setSelectMaterial({...selectMaterial, ...e })
                                               }} text={"품목명을 검색해주세요."} type={true}/>
                    </InputContainer>
                    <InputContainer title={"기계"} width={120}>
                        <MachinePickerModal select={
                            selectMachine && (selectMachine.name && selectMachine.pk) ? selectMachine : undefined
                        } text={'기계명을 검색해 주세요'} onClickEvent={(e: {name?: string, pk?: string}) => {
                            setSelectMachine({...selectMachine, name: e.name, pk: e.pk})
                        }}/>
                    </InputContainer>
                    <NormalInput title={'검수자'} value={name} onChangeEvent={setName} description={'검수자'} width={120} />
                    <NormalNumberInput title={'불량 개수'} value={no} onChangeEvent={setNo} description={'불량 개수를 입력하세요.'} width={120} />
                    <InputContainer title={"불량 검수일"} width={120}>
                        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', backgroundColor: '#f4f6fa', border: '0.5px solid #b3b3b3', height: 32}}>
                            <div style={{width: 817, display: 'table-cell'}}>
                                <div style={{marginTop: 5}}>
                                    {
                                        selectDate === ''
                                          ?<InputText>&nbsp; 거래처를 선택해 주세요</InputText>
                                          :<InputText style={{color: '#111319'}}>&nbsp; {selectDate}</InputText>
                                    }
                                </div>
                            </div>
                            <ColorCalendarDropdown select={selectDate} onClickEvent={(select) => {
                                setSelectDate(select)
                            }} text={'날짜 선택'} type={'single'} customStyle={{ height: 32, marginLeft: 0}}/>
                        </div>
                    </InputContainer>
                    <InputContainer title={"불량 사유"} width={120}>
                        <textarea maxLength={160} ref={textBoxRef} onChange={(e)=>setReason(e.target.value)} style={{border:0, fontSize:14, padding:12, height:'70px', width:'calc(100% - 124px)'}} placeholder="내용을 입력해주세요 (80자 미만)">
                            {reason}
                        </textarea>
                    </InputContainer>
                    <RegisterButton name={isUpdate ? '수정하기' : '등록하기'} />
                </form>
            </WhiteBoxContainer>
        </div>
    );
}

const InputText = Styled.p`
    color: #b3b3b3;
    font-size: 15px;
    text-align: left;
    vertical-align: middle;
    font-weight: regular;
`

export default DefectiveRegisterContainer
