import React, {useEffect, useState, useContext, useCallback, ReactElement, SetStateAction} from 'react';
import Styled from "styled-components";
import {API_URLS, getCluchData} from "../../Api/pm/preservation";

const dummyData:IPressClutch = {
    manufacturer_code:'factory1',
    machine_name: '프레스 01',
    machine_ton: '1000ton',
    statement:2
}

const ClutchMaintenanceContainer = () => {

    const [selectMachine, setSelectMachine] = useState<string>('1')

    const [pk, setPk] = useState<number>(1)
    const [data, setData] = useState<IPressClutch>()

    /**
     * getList()
     * 클러치 정보 불러오기
     */
    const getData = useCallback(async ()=>{

        // const tempUrl = `${API_URLS[pageType].load}?pk=${pk}`
        // const resultData = await getCluchData(tempUrl);
        setData(dummyData);

    },[data, pk])

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <div style={{position:'relative', textAlign:'left', marginTop:48}}>

                <div style={{display:'inline-block', textAlign:'left'}}>
                    <span style={{fontSize:20, marginRight:18, marginLeft: 3}}>클러치&브레이크</span>
                </div>
            </div>
            <MapFlexBox>
                <MapBox>
                    <div style={{width:100, height: 40,color: "black", backgroundColor: 'skyblue'}}
                         onClick={() => {
                             setSelectMachine('1')
                         }}
                    >프레스1</div>
                </MapBox>
            </MapFlexBox>
            <DetailBox>
                <div style={{width: 200, height: 30, marginTop: 14}}>
                    <p style={{fontSize: 18, fontWeight: "bold"}}>{data?.machine_name + " (" +data?.machine_ton+")"}</p>
                </div>
                <StatusBox>
                    {
                        data && data.statement === 0 ?
                            <NormalBox>
                                <div>
                                    <p>정상</p>
                                </div>
                            </NormalBox> :
                            <NormalDisableBox>
                                <div style={{marginTop: 63, marginLeft: 20}}>
                                    <p>정상</p>
                                </div>
                            </NormalDisableBox>
                    }
                    {
                        data && data.statement === 1 ?
                            <WarningBox>
                                <div style={{marginTop: 63}}>
                                    <p>위험</p>
                                </div>
                            </WarningBox> :
                            <WarningDisableBox>
                                <div style={{marginTop: 63}}>
                                    <p>위험</p>
                                </div>
                            </WarningDisableBox>
                    }
                    {
                        data && data.statement === 2 ?
                            <ChangeBox>
                                <div style={{marginTop: 63, marginRight: 20}}>
                                    <p>교체 요망</p>
                                </div>
                            </ChangeBox> :
                            <ChangeDisableBox>
                                <div style={{marginTop: 63, marginRight: 20}}>
                                    <p>교체 요망</p>
                                </div>
                            </ChangeDisableBox>
                    }
                </StatusBox>
            </DetailBox>
        </div>
    );
}

const DetailBox = Styled.div`
    width: 1100px;
    height: 300px;
    background-color: #17181c;
    border-radius: 6px;
    margin-top: 20px;
    
`

const NormalBox = Styled.div`
    width: 352px;
    height: 200px;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
    display: inline-block;
    margin-top: 20px;
    float: left;
    margin-right: 8px;
    background-image: linear-gradient(to bottom, #19b9df, #0f75bf);
    div: {
        margin-top: 63px;
        margin-left: 20px;
        p{
            font-size: 50px;
            text-align: center;
            color: white;
            font-weight: bold;
            font-family: NotoSansCJKkr-Bold;
        }
    }
`

const NormalDisableBox = Styled(NormalBox)`
    background-image: None;
    background-color: #242933;
    p{
        font-size: 50px;
        text-align: center;
        color: #42444b;
        font-weight: bold;
        font-family: NotoSansCJKkr-Bold;
    }
    
`

const WarningBox = Styled.div`
    width: 340px;
    height: 200px;
    margin-top: 20px;
    display: inline-block;
    float: left;
    background-image: linear-gradient(to bottom, #5c55ff, #421ea2);
    div: {
        margin-top: 63px;
        margin-left: 20px;
        p{
            font-size: 50px;
            text-align: center;
            color: white;
            font-weight: bold;
            font-family: NotoSansCJKkr-Bold;
        }
    }
`

const WarningDisableBox = Styled(WarningBox)`
    background-image: None;
    background-color: #242933;
    p{
        font-size: 50px;
        text-align: center;
        color: #42444b;
        font-weight: bold;
        font-family: NotoSansCJKkr-Bold;
    }
`

const ChangeBox = Styled.div`
    width: 352px;
    height: 200px;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    display: inline-block;
    margin-top: 20px;
    float: left;
    margin-left: 8px;
    background-image: linear-gradient(to bottom, #f73251, #8e0505);
    div{
        margin-top: 63px;
        margin-left: 20px;
        p{
            font-size: 50px;
            text-align: center;
            color: white;
            font-weight: bold;
            font-family: NotoSansCJKkr-Bold;
        }
    }
`

const ChangeDisableBox = Styled(ChangeBox)`
    background-image: None;
    background-color: #242933;
    p{
        font-size: 50px;
        text-align: center;
        color: #42444b;
        font-weight: bold;
        font-family: NotoSansCJKkr-Bold;
    }
`

const StatusBox = Styled.div`
    width: 1060px;
    height: 200px;
    background-color: #17181c;
    border-radius: 6px;
    margin-top: 20px;
    margin-left: 20px;
`

const MapBox = Styled.div`
  background-color: #17181c;
  padding: 10px;
  position: relative;
  border-radius: 6px;
  width: 100%;
  margin-right: 20px;
  img{
    width: 100%;
  }
`

const MapFlexBox = Styled.div`
  display: flex;
  margin-top: 21px;
`

export default ClutchMaintenanceContainer;
