import React, {useEffect, useState, useContext, useCallback, ReactElement, SetStateAction} from 'react';
import OvertonTable from "../../Components/Table/OvertonTable";
import {getRequest} from "../../Common/requestFunctions";
import {getToken} from "../../Common/tokenFunctions";
import {TOKEN_NAME} from "../../Common/configset";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getMoldData} from "../../Api/pm/preservation";
import Styled from "styled-components";



const OvertonMaintenanceContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any[]>([]);
    const [option, setOption] = useState(0);
    const [keyword, setKeyword] = useState<string>('');
    const [index, setIndex] = useState({pk:'PK'});
    const [subIndex, setSubIndex] = useState({pk:'PK'})
    const [page, setPage] = useState<number>(1);
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMachine, setSelectMachine ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);


    const indexList = {
        overtone: {
            pk: 'PK',
            machine_name: '기계명',
            machine_number: '기계 번호',
            manufacturer_code: '공정명',
            machine_register_time: '기계 등록 시간'
        }
    }

    const detailTitle = {
        overtone: {
            pk: 'PK',
            normaltone: '정상톤',
            overtone: '오버톤',
            overton_time: '오버톤 시간',
        },
    }

    const onClick = useCallback(machine => {
        console.log(machine.pk,machine.machine_name);
        if(machine.pk === selectPk){
            setSelectPk(null);
            setSelectMachine(null)
            setSelectValue(null)
        }else{
            setSelectPk(machine.pk);
            setSelectMachine(machine.machine_name)
            setSelectValue(machine)
            //TODO: api 요청
            getData(machine.pk);
        }




    }, [list, selectPk]);

    const getData = useCallback( async(pk)=>{
        //TODO: 성공시
        const tempUrl = `${API_URLS['overtone'].load}?pk=${pk}`
        const res = await getMoldData(tempUrl)

        setDetailList(res)

    },[detailList])


    const getList = useCallback(async ()=>{ // useCallback
        const tempUrl = `${API_URLS['overtone'].list}`
        const res = await getMoldData(tempUrl)

        setList(res)

    },[list])

    useEffect(()=>{
        setIndex(indexList["overtone"])
        setSubIndex(detailTitle["overtone"])
        getList()

    },[])

    return (
        <OvertonTable
            title={'프레스 오버톤'}
            indexList={index}
            valueList={list}
            clickValue={selectValue}
            mainOnClickEvent={onClick}>
            {
                selectPk !== null ?
                    <LineTable title={selectMachine+' 오버톤 상세내용'} contentTitle={subIndex} contentList={detailList}>
                        <Line/>
                    </LineTable>
                    :
                    null
            }
        </OvertonTable>
    );
}

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default OvertonMaintenanceContainer;
