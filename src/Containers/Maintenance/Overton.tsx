import React, {useEffect, useState, useContext, useCallback, ReactElement, SetStateAction} from 'react';
import OvertonTable from "../../Components/Table/OvertonTable";
import {getRequest} from "../../Common/requestFunctions";
import {getToken} from "../../Common/tokenFunctions";
import {TOKEN_NAME} from "../../Common/configset";


interface Props{
    type: string
}


const OvertonMaintenanceContainer = ({type}:Props) => {

    const [list, setList] = useState<any[]>([]);
    const [option, setOption] = useState(0);
    const [keyword, setKeyword] = useState<string>('');
    const [index, setIndex] = useState({pk:'PK'});
    const [page, setPage] = useState<number>(1);

    const indexList = {
        overton: {
            pk: 'PK',
            machine_name: '기계명',
            machine_number: '기계 번호',
            manufacturer_code: '공정명',
            machine_register_time: '기계 등록 시간'
        }
    }

    const indexName = {
        overton: '프레스 오버톤',
    }

    const dummy = [
        {
            pk: 'PK11212',
            machine_name: '프레스 01',
            machine_number: '000-000-00',
            manufacturer_code: '공정 01',
            machine_register_time: '2020.06.16 22:34:40'
        },
        {
            pk: 'PK123123122222222323232323222',
            machine_name: '프레스 02',
            machine_number: '000-000-00',
            manufacturer_code: '공정 02',
            machine_register_time: '2020.06.16 22:34:40'
        },
        {
            pk: 'PK2423433333333333333',
            machine_name: '프레스 03',
            machine_number: '000-000-00',
            manufacturer_code: '공정 03',
            machine_register_time: '2020.06.16 22:34:40'
        },
        {
            pk: 'PK34534',
            machine_name: '프레스 04',
            machine_number: '000-000-00',
            manufacturer_code: '공정 04',
            machine_register_time: '2020.06.16 22:34:40'
        },
        {
            pk: 'PK34534',
            machine_name: '프레스 05',
            machine_number: '000-000-00',
            manufacturer_code: '공정 05',
            machine_register_time: '2020.06.16 22:34:40'
        },
    ]

    const buttonList = {
        overton: [
            {
                Name: '자세히 보기',
                Type: 'DETAIL'
            }
        ]
    }

    const getList = useCallback(async ()=>{
        setList(dummy)
        /*
        const res = await getRequest(`http://61.101.55.224:9912/api/v1/${type}/list?page=${page}`, getToken(TOKEN_NAME))


        if(res === false){
            alert('[SERVER ERROR] 데이터를 로드 할 수 없습니다.')
        }else{
            if(res.status === 200){
                if(res.results === []){
                    return;
                }
                setList(res.results.items)
            }else{
                alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
            }
        }
         */
    },[])

    useEffect(()=>{
        //alert(type)
        setList([])
        setIndex(indexList["overton"])
        getList()

        /*
        if(type == 'machine'){
          setIndex(index_machine)
        }else if(type == 'factory'){
          setIndex(index_factory);
        }
        */

    },[type])

    return (
        <OvertonTable indexList={index} valueList={list} type={"overton"} pkKey={"pk"} buttonList={buttonList.overton}/>
    );
}



export default OvertonMaintenanceContainer;
