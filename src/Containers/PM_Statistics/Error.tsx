import React, {useEffect, useState, useContext, useCallback, ReactElement, SetStateAction} from 'react';
import OvertonTable from "../../Components/Table/OvertonTable";
import {getRequest} from "../../Common/requestFunctions";
import {getToken} from "../../Common/tokenFunctions";
import {TOKEN_NAME} from "../../Common/configset";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getErrorData} from "../../Api/pm/statistics";


const ErrorContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any[]>([]);
    const [option, setOption] = useState(0);
    const [keyword, setKeyword] = useState<string>('');
    const [index, setIndex] = useState({PressPk:'PK'});
    const [subIndex, setSubIndex] = useState({errorPk:'PK'})
    const [page, setPage] = useState<number>(1);
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMachine, setSelectMachine ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);


    const indexList = {
        error: {
            PressPk: 'PK',
            PressName: '기계명',
            PressNumber: '기계 번호',
            statement: '상태',
            pressRegisterDate: '기계 등록 시간'
        }
    }

    const detailTitle = {
        error: {
            errorPk: 'PK',
            keycamType:'키캠 상태',
            loadton: '로드톤',
            slideHeight: '슬라이드 높이',
            pressErrorCode: '에러코드',
            errorTime: '시간',
            errorDate: '날짜'
        },
    }

    const onClick = useCallback(machine => {
        console.log(machine.PressPk,machine.machine_name);
        if(machine.PressPk === selectPk){
            setSelectPk(null);
            setSelectMachine(null);
            setSelectValue(null);
        }else{
            setSelectPk(machine.PressPk);
            setSelectMachine(machine.machine_name);
            setSelectValue(machine)
            //TODO: api 요청
            getData(machine.PressPk);
        }



    }, [list, selectPk]);

    const getData = useCallback( async(pk)=>{
        //TODO: 성공시
        const tempUrl = `${API_URLS['error'].load}?pk=${pk}`
        const res = await getErrorData(tempUrl)

        setDetailList(res)

    },[detailList])


    const getList = useCallback(async ()=>{ // useCallback
        const tempUrl = `${API_URLS['error'].list}`
        const res = await getErrorData(tempUrl)

        setList(res)

    },[list])

    useEffect(()=>{
        setIndex(indexList["error"])
        setSubIndex(detailTitle['error'])
        getList()

    },[])

    return (
        <OvertonTable
            title={'프레스 에러 로그'}
            indexList={index}
            valueList={list}
            clickValue={selectValue}
            mainOnClickEvent={onClick}>
            {
                selectPk !== null ?
                    <LineTable title={selectMachine+' 상세 에러 로그'} contentTitle={subIndex} contentList={detailList}/>
                    :
                    null
            }
        </OvertonTable>
    );
}



export default ErrorContainer;
