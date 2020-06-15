import CMS from "../../Assets/Images/image_cms.png";
import setting from "../../Assets/Images/ic_setting.png";
import React, {useCallback, useEffect, useState} from "react";
import {getRequest, postRequest} from "../../Common/requestFunctions";
import {getToken} from "../../Common/tokenFunctions";
import {TOKEN_NAME} from "../../Common/configset";

interface MProps {
    ampere: string,
    name: string,
    option: string,
    percent: number,
    pk: string,
    status: string,
}

const CmsPower: React.FunctionComponent = () => {

    const [mList, setMList] = useState<MProps[]>([]);
    const [bList, setBList] = useState<MProps[]>([])
    const [dBox,setDBox] = useState<MProps[]>([])

    const DataLoad = async () => {

        const results = await getRequest('http://211.208.115.66:8088/api/v1/cms/load?place=1', getToken(TOKEN_NAME))

        console.log(results)

        if(results === false){
            //TODO: 에러 처리
        }else{
            if(results.status === 200){
                setMList(results.results.machine_list);
                setBList(results.results.breaker_list)
                setDBox(results.results.distribution_box)
            }else{
                //TODO : 지울것
                alert('세션 체크 실패 : 테스트 기간동안은 임시로 비로그인 접속 허용')
            }
        }
    }

    useEffect(()=>{

        DataLoad();

    },[])
    useEffect(()=>{
        DataLoad();
        //setList(dataSet.commonMonitoring)
       
        },[])
  
  
       
      useEffect(()=>{
        
        const interval = setInterval(() => { DataLoad(); }, 9000);
   
        return () => {   
            console.log('-- monitoring end -- ' )
            clearTimeout(interval);
          };
      },[])
     
    return (

            <div style={{position:'relative'}}>
                <img src={CMS} style={{marginTop:15,width:1100,height:780}}/>

                <p style={{position:"absolute",left:148,top:365,fontSize:18}}>{dBox.length > 0 ? dBox[0].name : '-'} </p>
                <p style={{position:"absolute",left:173,top:553,fontSize:15,color:'#000'}}>{dBox.length > 0 ? dBox[0].ampere : '-'}A</p>

                <p style={{position:"absolute",left:395,top:120,fontSize:15}}>{mList.length > 0 ? mList[0].name : '-'}</p>
                {/*<img src={setting} style={{position:"absolute",left:295,top:75}}/>*/}
                <p style={{position:"absolute",left:435,top:143,fontSize:13}}>{mList.length > 0 ? mList[0].option : '-'}ton</p>
                <p style={{position:"absolute",left:464,top:291,fontSize:15, color:'#000'}}>{mList.length > 0 ? mList[0].percent : '-'}%</p>
                <p style={{position:"absolute",left:455,top:319,fontSize:15,color:'#000'}}>{mList.length > 0 ? mList[0].ampere : '-'}A</p>

                <p style={{position:"absolute",left:412,top:413,fontSize:18}}>{bList.length > 0 ? bList[0].pk : '-'}</p>
                <img src={setting} style={{position:"absolute",left:500,top:415}}/>
                <p style={{position:"absolute",left:450,top:457,fontSize:15}}>{bList.length > 0 ? bList[0].percent : '-'}%</p>
                <p style={{position:"absolute",left:459,top:484,fontSize:15}}>{bList.length > 0 ? bList[0].ampere : '-'}A</p>

                <p style={{position:"absolute",left:872,top:354,fontSize:18}}>{mList.length > 0 ? mList[1].name : '-'}</p>
                <img src={setting} style={{position:"absolute",left:961,top:358,width:15,height:15}}/>
                <p style={{position:"absolute",left:894,top:382,fontSize:13}}>{mList.length > 0 ? mList[1].option : '-'}ton</p>
                <p style={{position:"absolute",left:920,top:528,fontSize:15, color:'#000'}}>{mList.length > 0 ? mList[1].percent : '-'}%</p>
                <p style={{position:"absolute",left:919,top:556,fontSize:15, color:'#000'}}>{mList.length > 0 ? mList[1].ampere : '-'}A</p>

                <p style={{position:"absolute",left:666,top:413,fontSize:18}}>{bList.length > 0 ? bList[1].pk : '-'}</p>
                <img src={setting} style={{position:"absolute",left:762,top:415}}/>
                <p style={{position:"absolute",left:712,top:457,fontSize:15}}>{bList.length > 0 ? bList[1].percent : '-'}%</p>
                <p style={{position:"absolute",left:723,top:484,fontSize:15}}>{bList.length > 0 ? bList[1].ampere : '-'}A</p>

                {/*<p style={{position:"absolute",left:534,top:73,fontSize:12}}>프레스03</p>*/}
                {/*<img src={setting} style={{position:"absolute",left:591,top:75}}/>*/}
                {/*<p style={{position:"absolute",left:540,top:89,fontSize:10}}>800ton</p>*/}
                {/*<p style={{position:"absolute",left:574,top:193,fontSize:12, color:'#000'}}>90%</p>*/}
                {/*<p style={{position:"absolute",left:565,top:214,fontSize:12, color:'#000'}}>1800A</p>*/}

                {/*<p style={{position:"absolute",left:526,top:285,fontSize:12}}>브레이커 03</p>*/}
                {/*<img src={setting} style={{position:"absolute",left:592,top:285}}/>*/}
                {/*<p style={{position:"absolute",left:575,top:312,fontSize:12}}>20%</p>*/}
                {/*<p style={{position:"absolute",left:562,top:332,fontSize:12}}>2,000A</p>*/}

                {/*<p style={{position:"absolute",left:681,top:73,fontSize:12}}>프레스04</p>*/}
                {/*<img src={setting} style={{position:"absolute",left:738,top:75}}/>*/}
                {/*<p style={{position:"absolute",left:687,top:89,fontSize:10}}>800ton</p>*/}
                {/*<p style={{position:"absolute",left:722,top:193,fontSize:12, color:'#000'}}>70%</p>*/}
                {/*<p style={{position:"absolute",left:718,top:214,fontSize:12, color:'#000'}}>700A</p>*/}

                {/*<p style={{position:"absolute",left:675,top:285,fontSize:12}}>브레이커 04</p>*/}
                {/*<img src={setting} style={{position:"absolute",left:739,top:285}}/>*/}
                {/*<p style={{position:"absolute",left:720,top:312,fontSize:12}}>10%</p>*/}
                {/*<p style={{position:"absolute",left:707,top:332,fontSize:12}}>1,000A</p>*/}

                {/*<p style={{position:"absolute",left:976,top:243,fontSize:12}}>프레스05</p>*/}
                {/*<img src={setting} style={{position:"absolute",left:1035,top:245}}/>*/}
                {/*<p style={{position:"absolute",left:980,top:259,fontSize:10}}>1000ton</p>*/}
                {/*<p style={{position:"absolute",left:1017,top:364,fontSize:12, color:'#000'}}>70%</p>*/}
                {/*<p style={{position:"absolute",left:1005,top:383,fontSize:12, color:'#000'}}>2,100A</p>*/}

                {/*<p style={{position:"absolute",left:824,top:285,fontSize:12}}>브레이커 05</p>*/}
                {/*<img src={setting} style={{position:"absolute",left:887,top:285}}/>*/}
                {/*<p style={{position:"absolute",left:870,top:312,fontSize:12}}>30%</p>*/}
                {/*<p style={{position:"absolute",left:859,top:332,fontSize:12}}>3,000A</p>*/}

            </div>
    )
}

export default CmsPower