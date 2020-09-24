import React, {useCallback, useEffect, useState} from 'react';
import {TOKEN_NAME} from '../../Common/configset'
import Header from '../../Components/Text/Header';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import NormalInput from '../../Components/Input/NormalInput';
import RegisterButton from '../../Components/Button/RegisterButton';
import NormalFileInput from '../../Components/Input/NormalFileInput';
import {getToken} from '../../Common/tokenFunctions';
import {getParameter, getRequest, postRequest} from '../../Common/requestFunctions';
import {uploadTempFile} from '../../Common/fileFuctuons';
import ListHeader from '../../Components/Text/ListHeader';
import OldFileInput from '../../Components/Input/OldFileInput';
import RadioInput from '../../Components/Input/RadioInput';
import NormalNumberInput from '../../Components/Input/NormalNumberInput';
import {useHistory} from 'react-router-dom'
import {Input} from "semantic-ui-react";
import ColorCalendarDropdown from "../../Components/Dropdown/ColorCalendarDropdown";
import moment from "moment";
import InputContainer from "../InputContainer";
import Styled from "styled-components";
import SearchModalContainer from "../SearchModalContainer";
import SearchInput from "../../Components/Input/SearchInput";
import SearchedList from "../../Components/List/SearchedList";
import InnerBodyContainer from "../InnerBodyContainer";
import AddInput from "../../Components/Input/AddInput";
import TextList from "../../Components/List/TextList";
import ProductionPickerModal from "../../Components/Modal/ProductionPickerModal";
import NormalAddressInput from "../../Components/Input/NormalAddressInput";
import useObjectInput from "../../Functions/UseInput";

// 수주 등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const ContractRegister = () => {
    const history = useHistory()

    const [selectDate, setSelectDate] = useState<string>('')
    const [pk, setPk] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [no, setNo] = useState<number>();
    const [type, setType] = useState<number>(0); //0: 법인, 1:개인
    const [phone, setPhone]= useState<string>('');
    const [address, setAddress]= useState<string>('');
    const [fax, setFax]= useState<string>('');
    const [phoneM, setPhoneM]= useState<string>('');
    const [emailM, setEmailM]= useState<string>('');
    const [email, setEmail]= useState<string>('');
    const [manager, setManager]= useState<string>('');
    const [ceo, setCeo]= useState<string>('');
    const [infoList, setInfoList] = useState<IInfo[]>([]);

    const [paths, setPaths] = useState<any[1]>([null]);
    const [oldPaths, setOldPaths] = useState<any[1]>([null]);

    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    const [selectMaterial, setSelectMaterial] = useState<{ name?: string, pk?: string }>()

    //생산품 검색
    const [isPoupup, setIsPoupup] = useState<boolean>(false);
    const [isSearched, setIsSearched] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>('');
    const [checkList, setCheckList] = useState<IMaterial[]>([]);
    const [list, setList] = useState<IMaterial[]>([]);
    const [searchList, setSearchList] = useState<IMaterial[]>([]);

    const [inputData, setInputData] = useObjectInput('CHANGE', {
        name:'',
        description:'',
        location: {
            postcode: '',
            roadAddress:'',
            detail:'',
        },

    });

    useEffect(()=>{
        if(getParameter('pk') !== "" ){
            setPk(getParameter('pk'))
            ////alert(`수정 페이지 진입 - pk :` + param)
            setIsUpdate(true)
            getData()
        }

    },[])

    const onClickSearch = useCallback(async(e)=>{
        ////alert('keyword')
        e.preventDefault();
        let type = "material";
        // //alert('keyword')
        if(isPoupup === true ) {
            type = 'material'
        }else{
            return;
        }

        if(keyword  === '' || keyword.length < 2){
            //alert('2글자 이상의 키워드를 입력해주세요')

            return;
        }
        setIsSearched(true)

        const res = await getRequest(`http://203.234.183.22:8299/api/v1/${type}/search?keyword=` + keyword, getToken(TOKEN_NAME))

        if(res === false){
            //TODO: 에러 처리
        }else{
            if(res.status === 200){
                const results = res.results;
                if(isPoupup === true ){
                    setSearchList(results);
                }else{
                    return;
                }


            }else{
                //TODO:  기타 오류
            }
        }
    },[keyword])

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

        const res = await getRequest('http://203.234.183.22:8299/api/v1/customer/view?pk=' + getParameter('pk'), getToken(TOKEN_NAME))

        if(res === false){
            //TODO: 에러 처리
        }else{
            if(res.status === 200){
                const data = res.results;
                setName(data.name);
                setPk(data.pk);
                setNo(Number(data.number));
                setType(Number(data.type));
                setPk(data.pk);
                setCeo(data.ceo);
                setOldPaths([data.photo])
                setPhone(data.telephone);
                setEmailM(data.manager_email);
                setPhoneM(data.manager_phone)
                setManager(data.manager)
                setEmail(data.ceo_email)

                setInfoList(data.info_list)
                setAddress(data.address);
                setFax(data.fax);

            }else{
                //TODO:  기타 오류
            }
        }
    },[pk, name, no, type, ceo, paths, oldPaths, phone, emailM, email, phone, phoneM,  address, fax])

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
            type: type,
            ceo: ceo,
            photo: paths[0],
            telephone: phone,
            ceo_email: email,
            manager: manager,
            manager_phone: phoneM,
            manager_email: emailM,
            address: address,
            fax: fax,
            //info_list : infoList.length > 0 ? JSON.stringify(infoList) : null,

        };

        const res = await postRequest('http://203.234.183.22:8299/api/v1/customer/update/', data, getToken(TOKEN_NAME))

        if(res === false){
            ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
        }else{
            if(res.status === 200){
                //alert('성공적으로 수정 되었습니다')
                setIsUpdate(false)
                history.goBack()
            }else{
                ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
            }
        }

    },[pk, name, no, type, ceo, paths, oldPaths, phone, emailM, email, phone, phoneM,  address, fax, manager])

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
            type: type,
            ceo_name: ceo,
            photo: paths[0],
            telephone: phone,
            ceo_email: email,
            manager: manager,
            manager_phone: phoneM,
            manager_email: emailM,
            address: address,
            fax: fax,
            // info_list : infoList.length > 0 ? JSON.stringify(infoList) : null,

        };


        const res = await postRequest('http://203.234.183.22:8299/api/v1/outsourcing/register', data, getToken(TOKEN_NAME))

        if(res === false){
            //TODO: 에러 처리
        }else{
            if(res.status === 200){
                //alert('성공적으로 등록 되었습니다')
                const data = res.results;
                setName('');
                setPk('');
                setNo(undefined);
                setType(0);

                setCeo('');
                setPaths([null])
                setOldPaths([null])
                setPhone('');
                setEmailM('');
                setPhoneM('')
                setEmail('')

                setInfoList([])
                setAddress('');
                setFax('');

            }else{
                //TODO:  기타 오류
            }
        }

    },[pk, name, no, type, ceo, paths, oldPaths, phone, emailM, email, phone, phoneM,  address, fax, manager])




    return (
        <div>
            <Header title={isUpdate ? '수주 수정' : '수주 등록'}/>
            <WhiteBoxContainer>
                <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm} >
                    <ListHeader title="필수 항목"/>
                    <InputContainer title={"거래처 명"} width={120}>
                        <ProductionPickerModal select={selectMaterial}
                                               onClickEvent={(e) => {
                                                   setSelectMaterial({...selectMaterial, ...e })
                                               }} text={"품목명을 검색해주세요."} type={true}/>
                    </InputContainer>
                    <NormalInput title={'대표자 명'} value={address} description={'대표자 명을 입력해 주세요.'}  width={120}/>
                    <NormalInput title={'담당자 명'} value={address} description={'담당자 명을 입력해 주세요.'}  width={120}/>
                    <InputContainer title={"품목(품목명)"} width={120}>
                        <ProductionPickerModal select={selectMaterial}
                                               onClickEvent={(e) => {
                                                   setSelectMaterial({...selectMaterial, ...e })
                                               }} text={"품목명을 검색해주세요."} type={true}/>
                    </InputContainer>
                    <NormalInput title={'수량'} value={address} onChangeEvent={setAddress} description={'수량을 입력해 주세요.'}  width={120}/>
                    <NormalInput title={'미납 수량'} value={address} onChangeEvent={setAddress} description={'미납 수량을 입력해 주세요.'}  width={120}/>
                    <InputContainer title={"납기일"} width={120}>
                        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', backgroundColor: '#f4f6fa', border: '0.5px solid #b3b3b3', height: 32}}>
                            <div style={{width: 817, display: 'table-cell'}}>
                                <div style={{marginTop: 5}}>
                                    {
                                        selectDate === ''
                                            ?<InputText>&nbsp; 납기일을 선택해 주세요.</InputText>
                                            :<InputText style={{color: '#111319'}}>&nbsp; {selectDate}</InputText>
                                    }
                                </div>
                            </div>
                            <ColorCalendarDropdown select={selectDate} onClickEvent={(select) => {
                                setSelectDate(select)
                            }} text={'날짜 선택'} type={'single'} customStyle={{ height: 32, marginLeft: 0}}/>
                        </div>
                    </InputContainer>
                    <NormalAddressInput title={'공장 주소'} value={inputData.location} onChangeEvent={(input)=>setInputData(`location`, input)}  />
                    {/* 자유항목 입력 창
             <FullAddInput title={'자유 항목'} onChangeEvent={()=>{
              const tempInfo = infoList.slice();
              tempInfo.push({title:`자유 항목 ${infoList.length + 1}`, value:""});
              setInfoList(tempInfo)
            }}>
              {
                infoList.map((v: IInfo, i)=>{
                  return(
                      <CustomIndexInput index={i} value={v}
                      onRemoveEvent={()=>{
                        const tempInfo = infoList.slice();
                        tempInfo.splice(i, 1)
                        setInfoList(tempInfo)
                      }}
                      onChangeEvent={(obj: IInfo)=>{
                        const tempInfo = infoList.slice();
                        tempInfo.splice(i, 1, obj)
                        setInfoList(tempInfo)
                      }}
                      />
                  )
                })
              }
              </FullAddInput>

            */}
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


export default ContractRegister
