import React, {
    useEffect,
    useState,
    useCallback,
} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getMoldData,} from "../../Api/pm/preservation";
import LoadtoneBox from "../../Components/Box/LoadtoneBox";

const MoldContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any>({
        pk: "",
        max_count: 0,
        current_count: 0,
    });
    const [index, setIndex] = useState({pk:'PK'});
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);

    const indexList = {
        mold: {
            pk: 'PK',
            mold_name: '금형 명',
            location_name: '제조사 명',
            mold_number: '제조 번호',
        }
    }

    const dummy = [
        {
            pk: 'PK1',
            mold_name: '금형 01',
            location_name: '(주)시즐',
            mold_number: '1234-123-1349(제조번호)',
        },
        {
            pk: 'PK2',
            mold_name: '금형 02',
            location_name: '(주)시즐',
            mold_number: '1234-143-1349(제조번호)',
        },
        {
            pk: 'PK3',
            mold_name: '금형 03',
            location_name: '(주)시즐',
            mold_number: '1234-153-1349(제조번호)',
        },
        {
            pk: 'PK4',
            mold_name: '금형 04',
            location_name: '(주)시즐',
            mold_number: '1234-323-1349(제조번호)',
        },
        {
            pk: 'PK5',
            mold_name: '금형 05',
            location_name: '(주)시즐',
            mold_number: '1234-523-1349(제조번호)',
        },
    ]

    const detaildummy = [
        {
            pk: 'PK1',
            max_count: 100,
            current_count: 20
        }
    ]

    const onClick = useCallback((mold) => {
        console.log('dsfewfewf',mold.pk,mold.mold_name);
        if(mold.pk === selectPk){
            setSelectPk(null);
            setSelectMold(null);
            setSelectValue(null);
        }else{
            setSelectPk(mold.pk);
            setSelectMold(mold.mold_name);
            setSelectValue(mold)
            //TODO: api 요청
            // getData(mold.pk)
        }



    }, [list, selectPk]);

    const getData = useCallback( async(pk)=>{
        //TODO: 성공시
        const tempUrl = `${API_URLS['mold'].load}?pk=${pk}`
        const res = await getMoldData(tempUrl)

        setDetailList(res)

    },[])

    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['mold'].list}`
        const res = await getMoldData(tempUrl)

        setList(res)

    },[])

    useEffect(()=>{
        // getList()
        setIndex(indexList["mold"])
        setList(dummy)
        setDetailList(detaildummy)
    },[dummy, detaildummy])

    const WidthPercent = detaildummy[0].current_count/detaildummy[0].max_count*100

    return (
        <div>
            <OvertonTable
                title={'금형 타발 수'}
                indexList={index}
                valueList={list}
                clickValue={selectValue}
                mainOnClickEvent={onClick}>
                {
                    selectPk !== null ?
                        <LineTable title={selectMold}>
                            {
                                <CountingContainer>
                                    <div>
                                        <p>타수 카운팅</p>
                                    </div>
                                    <div>
                                       <MoldArrowContainer>
                                           <div style={{marginLeft: WidthPercent+"%"}}>

                                           </div>
                                       </MoldArrowContainer>
                                        <MoldMaxBar>
                                            <div style={{width: WidthPercent+"%" }}>

                                            </div>
                                        </MoldMaxBar>
                                        <CountingNum>
                                            {[0,1,2,3,4,5].map((v, i)=>{
                                                return(
                                                    <span>{v*=(detaildummy[0].max_count/5)}</span>
                                                )
                                            })}
                                        </CountingNum>
                                        <div style={{display: "flex",justifyContent:"flex-end"}}>
                                            <span>(회)</span>
                                        </div>
                                    </div>
                                </CountingContainer>
                            }
                        </LineTable>
                        :
                        null
                }
            </OvertonTable>
            {
                selectPk !== null ?
            <div style={{display:"flex",justifyContent:"space-between", marginTop: 20}}>
                <LoadtoneBox title={'현재 타수 카운팅'}>
                    <div style={{paddingTop: 25, paddingBottom: 27}}>
                        <BottomBox>
                            <div style={{display:"flex",flexDirection:"row"}}>
                               <p>38,898</p>
                               <p style={{marginTop:22, paddingLeft: 7}}>회</p>
                            </div>
                            <p>77.9 %</p>
                        </BottomBox>
                    </div>
                </LoadtoneBox>
                <LoadtoneBox title={'금일 타수 카운팅'}>
                    <div style={{paddingTop: 25, paddingBottom: 27}}>
                        <BottomBox>
                            <div style={{display:"flex",flexDirection:"row"}}>
                                <p>1,000</p>
                                <p style={{marginTop:22, paddingLeft: 7}}>회</p>
                            </div>
                            <p>00.0 %</p>
                        </BottomBox>
                    </div>
                </LoadtoneBox>
                <LoadtoneBox title={'남은 타수 카운팅'}>
                    <div style={{paddingTop: 25, paddingBottom: 27}}>
                        <BottomBox>
                            <div style={{display:"flex",flexDirection:"row"}}>
                                <p>11,102</p>
                                <p style={{marginTop:22, paddingLeft: 7}}>회</p>
                            </div>
                            <p>00.0 %</p>
                        </BottomBox>
                    </div>
                </LoadtoneBox>
            </div>
                    :
                    null
            }
        </div>
    );
}

const CountingContainer = Styled.div`
   display: flex;
   flex-direction: row;
   margin-right: 20px;
   p {
    font-size: 14px;
      &:first-child{
      font-family: NotoSansCJKkr-Bold;
      }
   }
`
const MoldArrowContainer = Styled.div`
  margin-top: 1px;
  margin-left: 85px;
  width: 870px;
  height: 20px;
  border: 0;
  border-radius: 25px;
  div {
    width: 10px;
    height: 20px;
    border: 0;
    border-radius: 25px;
    background-color: #fd6b00;
  }
`

const MoldMaxBar = Styled.div`
  margin-top: 1px;
  margin-left: 85px;
  width: 870px;
  height: 20px;
  border: 0;
  border-radius: 25px;
  background-color: #1b2333;
  div {
    height: 20px;
    border: 0;
    border-radius: 25px;
    background-color: #fd6b00;
  }
`

const CountingNum = Styled.p`
   margin-left: 85px;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   span {
      font-size: 14px;
   }
`

const BottomBox = Styled.div`
    display: inline-block;
    p {
        font-size: 20px;
         &:first-child{
            font-size: 40px;
            }
    }
`

export default MoldContainer;
