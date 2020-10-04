import React, {useCallback, useEffect, useState,} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getBarcode, postBarcode} from "../../Api/mes/barcode";
import {useHistory} from "react-router-dom";
import {postProjectDelete} from "../../Api/mes/production";


const BarcodeListContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<{barcode_pk : string,
        barcode_name : string,
        main_type: string,
        detail_type: string,
        item_pk: string ,
        barcode_type : string,
        barcode_number: string,
        barcode_photo: string,
        description : string | null}>({barcode_pk : '',
        barcode_name : '',
        main_type: '',
        detail_type: '',
        item_pk: '' ,
        barcode_type : '',
        barcode_number: '',
        barcode_photo: '',
        description : ''});
    const [index, setIndex] = useState({ main_type: "품목(품목명)" });
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectBarcode, setSelectBarcode ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);
    const [deletePk, setDeletePk] = useState<(string[])>([]);
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });
    const history = useHistory();

    const indexList = {
        barcode: {
            main_type: "항목",
            detail_type: "상세 항목",
            barcode_number : "바코드 번호",
            barcode_name : "바코드 명",
            registered: "등록 날짜",
        }
    }

    const dummy = [
        {
            item_name: "품목명",
            item_type: "완제품",
            barcode_num : "1111-111-11-1234567",
            basic_barcode : "1111-111-11",
            registered: "2020.06.16",
        },
        {
            item_name: "품목명",
            item_type: "원자재",
            barcode_num : "1111-111-11-1234567",
            basic_barcode : "1111-111-11",
            registered: "2020.06.16",
        },
        {
            item_name: "품목명",
            item_type: "원자재",
            barcode_num : "A123456789B",
            basic_barcode : "1111-111-11",
            registered: "2020.06.16",
        },
        {
            item_name: "품목명",
            item_type: "완제품",
            barcode_num : "1111-111-11-1234567",
            basic_barcode : "1111-111-11",
            registered: "2020.06.16",
        },
        {
            item_name: "품목명",
            item_type: "완제품",
            barcode_num : "1111-111-11-1234567",
            basic_barcode : "1111-111-11",
            registered: "2020.06.16",
        },
    ]

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: () => history.push('/barcode/register')
        },
        {
            Name: '삭제',
            Link: ()=>postDelete()
        }
    ]


    const eventdummy = [
        {
            Name: '수정',
            Width: 60,
            Color: 'white',
            Link: (v) => history.push(`/barcode/register/${v.barcode_pk}`)
        },
    ]


    const onClick = useCallback((barcode) => {
        console.log('dsfewfewf',barcode.barcode_pk,barcode.barcode_name );
        if(barcode.pk === selectPk){
            setSelectPk(null);
            setSelectBarcode(null);
            setSelectValue(null);
        }else{
            setSelectPk(barcode.barcode_pk);
            setSelectBarcode(barcode.barcode_name);
            setSelectValue(barcode)
            //TODO: api 요청
            getData(barcode.barcode_pk)
        }

    }, [list, selectPk]);

    const allCheckOnClick = useCallback((list)=>{
        let tmpPk: string[] = []
        {list.length === 0 ?
            deletePk.map((v,i)=>{
                deletePk.pop()
            })
            :
            list.map((v, i) => {
                tmpPk.push(v.barcode_pk)
                deletePk.push(tmpPk.toString())
            })
        }
    },[deletePk])


    const checkOnClick = useCallback((Data) => {
        let IndexPk = deletePk.indexOf(Data.barcode_pk)
        {deletePk.indexOf(Data.barcode_pk) !== -1 ?
            deletePk.splice(IndexPk,1)
            :
            deletePk.push(Data.barcode_pk)
        }
    },[deletePk])

    const postDelete = useCallback(async () => {
        const tempUrl = `${API_URLS['barcode'].delete}`
        const res = await postProjectDelete(tempUrl, deletePk)
        console.log(res)

        getList()

        selectPk(null)
    },[deletePk])

    const getData = useCallback( async(pk)=>{
        //TODO: 성공시
        const tempUrl = `${API_URLS['barcode'].detailInfo}?barcode_pk=${pk}`
        const res = await getBarcode(tempUrl)

        setDetailList(res)

    },[detailList])

    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['barcode'].list}?page=${page.current}&keyword=${''}`
        const res = await getBarcode(tempUrl)

        setList(res)

    },[list])

    useEffect(()=>{
        getList()
        setIndex(indexList["barcode"])
        // setList(dummy)
        setTitleEventList(titleeventdummy)
        setEventList(eventdummy)
    },[])

    return (
        <div>
            <OvertonTable
                title={'바코드 현황'}
                allCheckbox={true}
                allCheckOnClickEvent={allCheckOnClick}
                titleOnClickEvent={titleEventList}
                indexList={index}
                valueList={list}
                EventList={eventList}
                clickValue={selectValue}
                checkBox={true}
                checkOnClickEvent={checkOnClick}
                mainOnClickEvent={onClick}>
                {
                    selectPk !== null ?
                        <LineTable title={selectBarcode+' 바코드 이미지'} >
                                <BarcodeContainer>
                                    <BarcodeImage>
                                        {detailList.barcode_photo === '' && detailList.barcode_photo === undefined ?
                                            <p>바코드 이미지가 없습니다.</p>
                                            :
                                            <img src={detailList.barcode_photo} style={{width: '100%', height: '100%'}}/>
                                        }
                                    </BarcodeImage>
                                    <BarcodeNum>
                                        <div>
                                            <p>바코드 번호</p>
                                            <p>{detailList.barcode_number}</p>
                                        </div>
                                        {/*<div>*/}
                                        {/*    <p>기준 바코드</p>*/}
                                        {/*    <p>A123</p>*/}
                                        {/*</div>*/}
                                    </BarcodeNum>
                                    <ButtonBox>바코드 이미지 다운로드</ButtonBox>
                                </BarcodeContainer>
                        </LineTable>
                        :
                        null
                }
            </OvertonTable>
        </div>
    );
}


const BarcodeContainer = Styled.div`
    padding: 10px;
    width: 96.3%;
    height: 184px;
    display: flex;
    flexDirection: row;
`

const BarcodeImage = Styled.div`
    display: flex;
    width: 370px;
    height: 182px;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
    p {
        color: #b3b3b3;
        font-family: NotoSansCJKkr-Bold;
    }
`

const BarcodeNum = Styled.div`
    padding: 140px 0px 10px 10px;
    color: white;
    width: 600px;
    height: 52px;
    div {
        font-family: NotoSansCJKkr-Bold;
        display: flex;
        flexDirection: row;
        p {
            &:first-child{
                padding-right: 10px;
            }
        }
    }
`

const ButtonBox = Styled.button`
    margin-left: 10%;
    color: white;
    border-radius: 5px;
    background-color: #717c90;
    border: 0;
    font-size: 14px;
    font-weight: bold;
    width: 188px;
    height: 30px;
`

export default BarcodeListContainer;
