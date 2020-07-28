import React, {useEffect, useState, useContext, useCallback, ReactElement, SetStateAction} from 'react';
import OvertonTable from "../../Components/Table/OvertonTable";
import {getRequest} from "../../Common/requestFunctions";
import {getToken} from "../../Common/tokenFunctions";
import {TOKEN_NAME} from "../../Common/configset";
import LineTable from "../../Components/Table/LineTable";



interface Props{
    type: string
}


const OvertonMaintenanceContainer = ({type}:Props) => {

    const [list, setList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any[]>([]);
    const [option, setOption] = useState(0);
    const [keyword, setKeyword] = useState<string>('');
    const [index, setIndex] = useState({pk:'PK'});
    const [subIndex, setSubIndex] = useState({pk:'PK'})
    const [page, setPage] = useState<number>(1);
    const [selectPk, setSelectPk ]= useState<any>(null);

    const indexList = {
        overtone: {
            pk: 'PK',
            machine_name: '기계명',
            machine_number: '기계 번호',
            manufacturer_code: '공정명',
            machine_register_time: '기계 등록 시간'
        }
    }

    const indexName = {
        overtone: '프레스 오버톤',
    }

    const dummy = [
        {
            pk: 'PK11212',
            machine_name: '프레스 01',
            machine_number: '000-000-00',
            manufacturer_code: '공정 01',
            machine_register_time: '2020.06.16 22:34:40',
            more_Action: false
        },
        {
            pk: 'PK123123122222222323232323222',
            machine_name: '프레스 02',
            machine_number: '000-000-00',
            manufacturer_code: '공정 02',
            machine_register_time: '2020.06.16 22:34:40',
            more_Action: false
        },
        {
            pk: 'PK2423433333333333333',
            machine_name: '프레스 03',
            machine_number: '000-000-00',
            manufacturer_code: '공정 03',
            machine_register_time: '2020.06.16 22:34:40',
            more_Action: false
        },
        {
            pk: 'PK34534',
            machine_name: '프레스 04',
            machine_number: '000-000-00',
            manufacturer_code: '공정 04',
            machine_register_time: '2020.06.16 22:34:40',
            more_Action: false
        },
        {
            pk: 'PK3453567894',
            machine_name: '프레스 05',
            machine_number: '000-000-00',
            manufacturer_code: '공정 05',
            machine_register_time: '2020.06.16 22:34:40',
            more_Action: false
        },
    ]

    const buttonList = {
        overtone: [
            {
                Name: '자세히 보기',
                Type: 'DETAIL',
                Change: ''
            }
        ]
    }
    
    const detaildummy = [
        {
            pk: 'PK1',
            normaltone: '100 ton',
            overtone: '120 ton',
            overton_time: '21:00:03',
        },
        {
            pk: 'PK2',
            normaltone: '100 ton',
            overtone: '120 ton',
            overton_time: '19:00:03',
        },
        {
            pk: 'PK3',
            normaltone: '100 ton',
            overtone: '120 ton',
            overton_time: '21:00:03',
        },
        {
            pk: 'PK4',
            normaltone: '100 ton',
            overtone: '120 ton',
            overton_time: '21:00:03',
        },
        {
            pk: 'PK5',
            normaltone: '100 ton',
            overtone: '120 ton',
            overton_time: '21:00:03',
        },
    ]

    const detailTitle = {
        overtone: {
            pk: 'PK',
            normaltone: '정상톤',
            overtone: '오버톤',
            overton_time: '오버톤 시간',
        },
    }

    const onClick = useCallback(pk => {
        console.log(pk);
        if(pk === selectPk){
            setSelectPk(null);
        }else{
            setSelectPk(pk);
            //TODO: api 요청
            //getData(pk);
        }



    }, [list, selectPk]);

    const getData = useCallback( async(pk)=>{

        //TODO: 성공시

    },[])


    const getList = useCallback(async ()=>{ // useCallback
        setList(dummy)
        setDetailList(detaildummy)
        /*
        const res = await getRequest(`http://211.208.115.66:8099/api/v1/${type}/list?page=${page}`, getToken(TOKEN_NAME))


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
    },[list, detailList])

    useEffect(()=>{
        //alert(type)
        setList([])
        setIndex(indexList["overtone"])
        setSubIndex(detailTitle["overtone"])
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
        <OvertonTable
            title={'프레스 오버톤'}
            indexList={index}
            valueList={list}
            mainOnClickEvent={onClick}>
            {
                selectPk !== null ?
                <LineTable contentTitle={subIndex} contentList={detailList}/>
                :
                null
            }
        </OvertonTable>
    );
}



export default OvertonMaintenanceContainer;
