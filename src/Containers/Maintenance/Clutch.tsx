import React, {useCallback, useEffect, useState} from 'react';
import Styled from "styled-components";

const dummyData:IPressClutch = {
    manufacturer_code:'factory1',
    machine_name: '프레스 01',
    machine_ton: '1000ton',
    statement:0
}

const ClutchMaintenanceContainer = () => {

    const [selectMachine, setSelectMachine] = useState<string>('1')

    const [pk, setPk] = useState<number>(1)
    const [data, setData] = useState<IPressClutch>()

    /**
     * getList()
     * 클러치 정보 불러오기
     */
    const getData = useCallback(async (pageType)=>{

        // const tempUrl = `${API_URLS[pageType].load}?pk=${pk}`
        // const resultData = await getCluchData(tempUrl);
        setData(dummyData);

    },[data, pk])

    useEffect(() => {
        getData('clutch')
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
                                <div style={{marginTop: 63, marginLeft: 20}}>
                                    <StatusText>정상</StatusText>
                                </div>
                            </NormalBox> :
                            <NormalDisableBox>
                                <div style={{marginTop: 63, marginLeft: 20}}>
                                    <StatusDisableText>정상</StatusDisableText>
                                </div>
                            </NormalDisableBox>
                    }
                    {
                        data && data.statement === 1 ?
                            <WarningBox>
                                <div style={{marginTop: 63}}>
                                    <StatusText>위험</StatusText>
                                </div>
                            </WarningBox> :
                            <WarningDisableBox>
                                <div style={{marginTop: 63}}>
                                    <StatusDisableText>위험</StatusDisableText>
                                </div>
                            </WarningDisableBox>
                    }
                    {
                        data && data.statement === 2 ?
                            <ChangeBox>
                                <div style={{marginTop: 63, marginRight: 20}}>
                                    <StatusText>교체 요망</StatusText>
                                </div>
                            </ChangeBox> :
                            <ChangeDisableBox>
                                <div style={{marginTop: 63, marginRight: 20}}>
                                    <StatusDisableText>교체 요망</StatusDisableText>
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
`

const NormalDisableBox = Styled.div`
    width: 352px;
    height: 200px;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
    display: inline-block;
    margin-top: 20px;
    float: left;
    margin-right: 8px;
    background-color: #242933;
`

const WarningBox = Styled.div`
    width: 340px;
    height: 200px;
    margin-top: 20px;
    display: inline-block;
    float: left;
    background-image: linear-gradient(to bottom, #5c55ff, #421ea2);
`

const WarningDisableBox = Styled.div`
    width: 340px;
    height: 200px;
    margin-top: 20px;
    display: inline-block;
    float: left;
    background-color: #242933;
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
`

const ChangeDisableBox = Styled.div`
    width: 352px;
    height: 200px;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    display: inline-block;
    margin-top: 20px;
    float: left;
    margin-left: 8px;
    background-color: #242933;
`

const StatusBox = Styled.div`
    width: 1060px;
    height: 200px;
    background-color: #17181c;
    border-radius: 6px;
    margin-top: 20px;
    margin-left: 20px;
`

const StatusText = Styled.p`
    font-size: 50px;
    text-align: center;
    color: white;
    font-weight: bold;
    font-family: NotoSansCJKkr-Bold;
`

const StatusDisableText = Styled.p`
    font-size: 50px;
    text-align: center;
    color: #42444b;
    font-weight: bold;
    font-family: NotoSansCJKkr-Bold;
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
