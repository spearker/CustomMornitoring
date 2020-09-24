import React, {useCallback, useEffect, useState} from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import Header from "../../Components/Text/Header";
import WhiteBoxContainer from "../../Containers/WhiteBoxContainer";
import ListHeader from "../../Components/Text/ListHeader";
import NormalInput from "../../Components/Input/NormalInput";
import DropdownInput from "../../Components/Input/DropdownInput";
import {getMaterialTypeList, transferCodeToName, transferStringToCode} from "../../Common/codeTransferFunctions";
import BasicSearchContainer from "../../Containers/Basic/BasicSearchContainer";
import NormalNumberInput from "../../Components/Input/NormalNumberInput";
import RegisterButton from "../../Components/Button/RegisterButton";
import {useHistory} from "react-router-dom";
import useObjectInput from "../../Functions/UseInput";
import {getParameter, getRequest, postRequest} from "../../Common/requestFunctions";
import {getToken} from "../../Common/tokenFunctions";
import {TOKEN_NAME} from "../../Common/configset";
import {JsonStringifyList} from "../../Functions/JsonStringifyList";

const BasicPartsRegister = () => {

    const history = useHistory();
    const [document, setDocument] = useState<any>({id:'', value:'(선택)'});

    const [essential,setEssential] = useState<any[]>([]);
    const [optional,setOptional] = useState<any[]>([]);

    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [pk, setPk] = useState<string>('');
    const indexList = getMaterialTypeList('kor');
    const [inputData, setInputData] = useObjectInput('CHANGE', {
        pk:'',
        material_name:'',
        material_type:1,
        location:[],
        using_mold:[],
        cost: 0,
        safe_stock:0,
        material_spec:'',
    });

    useEffect(()=>{

        if(getParameter('pk') !== "" ){
            setPk(getParameter('pk'))
            setIsUpdate(true)
            getData()
        }

    },[])

    const getData = useCallback(async()=>{

        const res = await getRequest('http://203.234.183.22:8299/api/v1/material/load?pk=' + getParameter('pk'), getToken(TOKEN_NAME))

        if(res === false){
            //TODO: 에러 처리
        }else{
            if(res.status === 200 || res.status === "200"){
                const data = res.results;
                const form = {

                    pk:data.pk,
                    material_name: data.material_name,
                    material_type:data.material_type,
                    location:[{pk: data.location_pk, name: data.location_name}],
                    using_mold: data.mold !== undefined ? [{pk: data.mold.mold_pk, name: data.mold.mold_name}] : [],
                    cost: data.cost,
                    safe_stock: data.safe_stock,
                    material_spec:data.material_spec,
                    stock:  data.stock,
                };

                setInputData('all', form)


            }else{
                //TODO:  기타 오류
            }
        }
    },[pk, optional, essential, inputData ])


    const onsubmitFormUpdate = useCallback(async(e)=>{
        e.preventDefault();

        const data = {
            pk: getParameter('pk'),
            material_name: inputData.material_name,
            material_type: inputData.material_type,
            location: inputData.location[0].pk,
            using_mold:  inputData.using_mold[0] ? inputData.using_mold[0].pk : null,
            cost: inputData.cost,
            safe_stock: inputData.safe_stock,
            material_spec: inputData.material_spec,
            info_list: JsonStringifyList(essential, optional)
        };
        const res = await postRequest('http://203.234.183.22:8299/api/v1/material/update', data, getToken(TOKEN_NAME))

        if(res === false){
            // //alert('[SERVER ERROR] 요청을 처리 할 수 없습니다')
        }else{
            if(res.status === 200){
                //alert('성공적으로 등록 되었습니다')
                history.push('/basic/list/material')
            }else{
                ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
            }
        }

    },[pk, optional, essential, inputData ])

    const onsubmitForm = useCallback(async(e)=>{
        e.preventDefault();



        const data = {
            document_pk: document.pk,
            material_name: inputData.material_name,
            material_type: inputData.material_type,
            cost: inputData.cost,
            location: inputData.location[0].pk,
            using_mold: inputData.using_mold[0] ? inputData.using_mold[0].pk : null,
            safe_stock: inputData.safe_stock,
            material_spec: inputData.material_spec,
            info_list: JsonStringifyList(essential, optional)
        };

        const res = await postRequest('http://203.234.183.22:8299/api/v1/material/register', data, getToken(TOKEN_NAME))

        if(res === false){
            // //alert('[SERVER ERROR] 요청을 처리 할 수 없습니다')
        }else{
            if(res.status === 200){
                //alert('성공적으로 등록 되었습니다')
                history.push('/basic/list/material')
            }else{
                ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
            }
        }

    },[pk, optional, essential, inputData, document])



    return(
        <DashboardWrapContainer index={'basic'}>
            <InnerBodyContainer>
                <Header title={isUpdate ? '부품 정보수정' : '부품 정보등록'}/>
                <WhiteBoxContainer>
                    {
                        <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm} >
                            <ListHeader title="필수 항목"/>
                            <NormalInput title={'부품 이름'}  value={inputData.material_name} onChangeEvent={(input)=>setInputData(`material_name`, input)} description={'이름을 입력해주세요.'}/>
                            <DropdownInput title={'부품 종류'} target={transferCodeToName('material',inputData.material_type)} contents={indexList} onChangeEvent={(input)=>setInputData('material_type',transferStringToCode('material',indexList[input]))} />
                            <BasicSearchContainer
                                title={'공장 정보'}
                                key={'pk'}
                                value={'name'}
                                onChangeEvent={(input)=>setInputData(`location`, input)}
                                option={1}
                                solo={true}
                                list={inputData.location}
                                searchUrl={'http://203.234.183.22:8299/api/v1/factory/search?'}
                            />

                            <NormalNumberInput title={'원가'}  value={inputData.cost} onChangeEvent={(input)=>setInputData(`cost`, input)} description={''}/>

                            {/*<br/>*/}
                            {/*<ListHeader title="선택 항목"/>*/}
                            {/*<NormalInput title={'품목 스펙'}  value={inputData.material_spec} onChangeEvent={(input)=>setInputData(`material_spec`, input)} description={'이름을 입력해주세요.'}/>*/}

                            {/*<br/>*/}
                            {/*<DocumentFormatInputList*/}
                            {/*  pk={!isUpdate ? document.pk : undefined}*/}
                            {/*  loadDataUrl={isUpdate? `http://203.234.183.22:8299/api/v1/material/load?pk=${pk}` :''}*/}
                            {/*  onChangeEssential={setEssential} onChangeOptional={setOptional}*/}
                            {/*  />*/}

                            {/*<BasicSearchContainer*/}
                            {/*    title={'사용 금형'}*/}
                            {/*    key={'pk'}*/}
                            {/*    value={'mold_name'}*/}
                            {/*    onChangeEvent={(input)=>setInputData(`using_mold`, input)}*/}
                            {/*    solo={true}*/}
                            {/*    list={inputData.using_mold}*/}
                            {/*    searchUrl={'http://203.234.183.22:8299/api/v1/mold/search?'}*/}
                            {/*/>*/}

                            <RegisterButton name={isUpdate ? '수정하기' : '등록하기'} />
                        </form>
                        // :
                        //
                        // <SelectDocumentForm category={3} onChangeEvent={setDocument}/>
                    }
                </WhiteBoxContainer>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default BasicPartsRegister
