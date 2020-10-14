import CMS from "../../Assets/Images/image_cms.png";
import React from "react";

interface MProps {
    ampere: string,
    name: string,
    option: string,
    percent: number,
    pk: string,
    status: string,
}

const CmsPower: React.FunctionComponent = () => {

    // const [mList, setMList] = useState<MProps[]>([]);
    // const [bList, setBList] = useState<MProps[]>([])
    // const [dBox,setDBox] = useState<MProps[]>([])
    //
    // const DataLoad = async () => {
    //
    //     const results = await getRequest('http://112.168.150.239:8299/api/v1/monitoring/cms/map?factory=&type=', getToken(TOKEN_NAME))
    //
    //     console.log(results)
    //
    //     if(results === false){
    //         //TODO: 에러 처리
    //     }else{
    //         if(results.status === 200){
    //             setMList(results.results.machine_list);
    //             setBList(results.results.breaker_list)
    //             setDBox(results.results.distribution_box)
    //         }else{
    //             //TODO : 지울것
    //             //alert('세션 체크 실패 : 테스트 기간동안은 임시로 비로그인 접속 허용')
    //         }
    //     }
    // }
    //
    // useEffect(()=>{
    //
    //     DataLoad();
    //
    // },[])
    // useEffect(()=>{
    //     DataLoad();
    //     //setList(dataSet.commonMonitoring)
    //
    //     },[])
    //
    //
    //
    //   useEffect(()=>{
    //
    //     const interval = setInterval(() => { DataLoad(); }, 9000);
    //
    //     return () => {
    //         console.log('-- monitoring end -- ' )
    //         clearTimeout(interval);
    //       };
    //   },[])
    //
    return (

            <div style={{position:'relative'}}>
                 <img src={CMS} style={{marginTop:15,width:1100,height:780}}/>
            {/*//*/}
            {/*//     <p style={{position:"absolute",left:148,top:365,fontSize:18}}>{dBox.length > 0 ? dBox[0].name : '-'} </p>*/}
            {/*//     <p style={{position:"absolute",left:173,top:553,fontSize:15,color:'#000'}}>{dBox.length > 0 ? dBox[0].ampere : '-'}A</p>*/}
            {/*//*/}
            {/*//     <p style={{position:"absolute",left:395,top:120,fontSize:15}}>{mList.length > 0 ? mList[0].name : '-'}</p>*/}
            {/*//     /!*<img src={setting} style={{position:"absolute",left:295,top:75}}/>*!/*/}
            {/*//     <p style={{position:"absolute",left:435,top:143,fontSize:13}}>{mList.length > 0 ? mList[0].option : '-'}ton</p>*/}
            {/*//     <p style={{position:"absolute",left:464,top:291,fontSize:15, color:'#000'}}>{mList.length > 0 ? mList[0].percent : '-'}%</p>*/}
            {/*//     <p style={{position:"absolute",left:455,top:319,fontSize:15,color:'#000'}}>{mList.length > 0 ? mList[0].ampere : '-'}A</p>*/}
            {/*//*/}
            {/*//     <p style={{position:"absolute",left:412,top:413,fontSize:18}}>{bList.length > 0 ? bList[0].pk : '-'}</p>*/}
            {/*//     <img src={setting} style={{position:"absolute",left:500,top:415}}/>*/}
            {/*//     <p style={{position:"absolute",left:450,top:457,fontSize:15}}>{bList.length > 0 ? bList[0].percent : '-'}%</p>*/}
            {/*//     <p style={{position:"absolute",left:459,top:484,fontSize:15}}>{bList.length > 0 ? bList[0].ampere : '-'}A</p>*/}
            {/*//*/}
            {/*//     <p style={{position:"absolute",left:872,top:354,fontSize:18}}>{mList.length > 0 ? mList[1].name : '-'}</p>*/}
            {/*//     <img src={setting} style={{position:"absolute",left:961,top:358,width:15,height:15}}/>*/}
            {/*//     <p style={{position:"absolute",left:894,top:382,fontSize:13}}>{mList.length > 0 ? mList[1].option : '-'}ton</p>*/}
            {/*//     <p style={{position:"absolute",left:920,top:528,fontSize:15, color:'#000'}}>{mList.length > 0 ? mList[1].percent : '-'}%</p>*/}
            {/*//     <p style={{position:"absolute",left:919,top:556,fontSize:15, color:'#000'}}>{mList.length > 0 ? mList[1].ampere : '-'}A</p>*/}
            {/*//*/}
            {/*//     <p style={{position:"absolute",left:666,top:413,fontSize:18}}>{bList.length > 0 ? bList[1].pk : '-'}</p>*/}
            {/*//     <img src={setting} style={{position:"absolute",left:762,top:415}}/>*/}
            {/*//     <p style={{position:"absolute",left:712,top:457,fontSize:15}}>{bList.length > 0 ? bList[1].percent : '-'}%</p>*/}
            {/*//     <p style={{position:"absolute",left:723,top:484,fontSize:15}}>{bList.length > 0 ? bList[1].ampere : '-'}A</p>*/}
                <p style={{position:"absolute",left:73,top:248,fontSize:12}}>배전함</p>
                <p style={{position:"absolute",left:60,top:378,fontSize:12,color:'#000'}}>1,000,000 A</p>

                <p style={{position:"absolute",left:238,top:73,fontSize:12}}>프레스01</p>
                <p style={{position:"absolute",left:242,top:89,fontSize:10}}>1000ton</p>
                <p style={{position:"absolute",left:270,top:193,fontSize:12, color:'#000'}}>100%</p>
                <p style={{position:"absolute",left:263,top:213,fontSize:12, color:'#000'}}>3,800A</p>

                <p style={{position:"absolute",left:229,top:283,fontSize:12}}>브레이커 01</p>
                <p style={{position:"absolute",left:275,top:312,fontSize:12}}>30%</p>
                <p style={{position:"absolute",left:260,top:332,fontSize:12}}>3,000A</p>

                <p style={{position:"absolute",left:358,top:73,fontSize:12}}>프레스02</p>
                <p style={{position:"absolute",left:366,top:89,fontSize:10}}>800ton</p>
                <p style={{position:"absolute",left:397,top:193,fontSize:12, color:'#000'}}>80%</p>
                <p style={{position:"absolute",left:392,top:214,fontSize:12, color:'#000'}}>800A</p>

                <p style={{position:"absolute",left:349,top:283,fontSize:12}}>브레이커 02</p>
                <p style={{position:"absolute",left:397,top:312,fontSize:12}}>10%</p>
                <p style={{position:"absolute",left:383,top:332,fontSize:12}}>1,000A</p>

                <p style={{position:"absolute",left:478,top:73,fontSize:12}}>프레스03</p>
                <p style={{position:"absolute",left:487,top:89,fontSize:10}}>800ton</p>
                <p style={{position:"absolute",left:515,top:193,fontSize:12, color:'#000'}}>90%</p>
                <p style={{position:"absolute",left:505,top:214,fontSize:12, color:'#000'}}>1,800A</p>

                <p style={{position:"absolute",left:469,top:283,fontSize:12}}>브레이커 03</p>
                <p style={{position:"absolute",left:517,top:312,fontSize:12}}>20%</p>
                <p style={{position:"absolute",left:504,top:332,fontSize:12}}>2,000A</p>

                <p style={{position:"absolute",left:598,top:73,fontSize:12}}>프레스04</p>
                <p style={{position:"absolute",left:607,top:89,fontSize:10}}>800ton</p>
                <p style={{position:"absolute",left:635,top:193,fontSize:12, color:'#000'}}>70%</p>
                <p style={{position:"absolute",left:632,top:213,fontSize:12, color:'#000'}}>700A</p>

                <p style={{position:"absolute",left:589,top:283,fontSize:12}}>브레이커 04</p>
                <p style={{position:"absolute",left:636,top:312,fontSize:12}}>10%</p>
                <p style={{position:"absolute",left:623,top:332,fontSize:12}}>1,000A</p>

                <p style={{position:"absolute",left:718,top:73,fontSize:12}}>프레스05</p>
                <p style={{position:"absolute",left:724,top:89,fontSize:10}}>1000ton</p>
                <p style={{position:"absolute",left:757,top:193,fontSize:12, color:'#000'}}>70%</p>
                <p style={{position:"absolute",left:742,top:213,fontSize:12, color:'#000'}}>2,100A</p>

                <p style={{position:"absolute",left:710,top:283,fontSize:12}}>브레이커 05</p>
                <p style={{position:"absolute",left:755,top:312,fontSize:12}}>30%</p>
                <p style={{position:"absolute",left:742,top:332,fontSize:12}}>3,000A</p>

                <p style={{position:"absolute",left:838,top:73,fontSize:12}}>프레스06</p>
                <p style={{position:"absolute",left:842,top:89,fontSize:10}}>1000ton</p>
                <p style={{position:"absolute",left:877,top:193,fontSize:12, color:'#000'}}>70%</p>
                <p style={{position:"absolute",left:862,top:213,fontSize:12, color:'#000'}}>2,100A</p>

                <p style={{position:"absolute",left:829,top:283,fontSize:12}}>브레이커 06</p>
                <p style={{position:"absolute",left:875,top:312,fontSize:12}}>30%</p>
                <p style={{position:"absolute",left:862,top:332,fontSize:12}}>3,000A</p>

                <p style={{position:"absolute",left:958,top:73,fontSize:12}}>프레스07</p>
                <p style={{position:"absolute",left:962,top:89,fontSize:10}}>1000ton</p>
                <p style={{position:"absolute",left:997,top:193,fontSize:12, color:'#000'}}>70%</p>
                <p style={{position:"absolute",left:982,top:213,fontSize:12, color:'#000'}}>2,100A</p>

                <p style={{position:"absolute",left:948,top:283,fontSize:12}}>브레이커 07</p>
                <p style={{position:"absolute",left:995,top:312,fontSize:12}}>30%</p>
                <p style={{position:"absolute",left:982,top:332,fontSize:12}}>3,000A</p>

            </div>
    )
}

export default CmsPower
