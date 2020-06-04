import CMS from "../../Assets/Images/image_cms.png";
import setting from "../../Assets/Images/ic_setting.png";
import React, {useState} from "react";

const CmsPower: React.FunctionComponent = () => {
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(false);

    const [series, setSeries] = useState<object[]>([])
    return (

            <div style={{position:'relative'}}>
                <img src={CMS} style={{marginTop:15}}/>
                <p style={{position:"absolute",left:34,top:50,fontSize:20}}>1공장</p>

                <p style={{position:"absolute",left:73,top:250,fontSize:12}}>배전함</p>
                <p style={{position:"absolute",left:60,top:380,fontSize:12,color:'#000'}}>1,000,000 A</p>

                <p style={{position:"absolute",left:238,top:73,fontSize:12}}>프레스01</p>
                <img src={setting} style={{position:"absolute",left:295,top:75}}/>
                <p style={{position:"absolute",left:242,top:89,fontSize:10}}>1000ton</p>
                <p style={{position:"absolute",left:271,top:193,fontSize:12, color:'#000'}}>100%</p>
                <p style={{position:"absolute",left:265,top:214,fontSize:12,color:'#000'}}>3,000A</p>

                <p style={{position:"absolute",left:230,top:285,fontSize:12}}>브레이커 01</p>
                <img src={setting} style={{position:"absolute",left:295,top:285}}/>
                <p style={{position:"absolute",left:280,top:312,fontSize:12}}>30%</p>
                <p style={{position:"absolute",left:267,top:332,fontSize:12}}>3,000A</p>

                <p style={{position:"absolute",left:386,top:73,fontSize:12}}>프레스02</p>
                <img src={setting} style={{position:"absolute",left:443,top:75}}/>
                <p style={{position:"absolute",left:392,top:89,fontSize:10}}>800ton</p>
                <p style={{position:"absolute",left:425,top:193,fontSize:12, color:'#000'}}>80%</p>
                <p style={{position:"absolute",left:422,top:214,fontSize:12, color:'#000'}}>800A</p>

                <p style={{position:"absolute",left:378,top:285,fontSize:12}}>브레이커 02</p>
                <img src={setting} style={{position:"absolute",left:444,top:285}}/>
                <p style={{position:"absolute",left:428,top:312,fontSize:12}}>10%</p>
                <p style={{position:"absolute",left:415,top:332,fontSize:12}}>1,000A</p>

                <p style={{position:"absolute",left:534,top:73,fontSize:12}}>프레스03</p>
                <img src={setting} style={{position:"absolute",left:591,top:75}}/>
                <p style={{position:"absolute",left:540,top:89,fontSize:10}}>800ton</p>
                <p style={{position:"absolute",left:574,top:193,fontSize:12, color:'#000'}}>90%</p>
                <p style={{position:"absolute",left:565,top:214,fontSize:12, color:'#000'}}>1800A</p>

                <p style={{position:"absolute",left:526,top:285,fontSize:12}}>브레이커 03</p>
                <img src={setting} style={{position:"absolute",left:592,top:285}}/>
                <p style={{position:"absolute",left:575,top:312,fontSize:12}}>20%</p>
                <p style={{position:"absolute",left:562,top:332,fontSize:12}}>2,000A</p>

                <p style={{position:"absolute",left:681,top:73,fontSize:12}}>프레스04</p>
                <img src={setting} style={{position:"absolute",left:738,top:75}}/>
                <p style={{position:"absolute",left:687,top:89,fontSize:10}}>800ton</p>
                <p style={{position:"absolute",left:722,top:193,fontSize:12, color:'#000'}}>70%</p>
                <p style={{position:"absolute",left:718,top:214,fontSize:12, color:'#000'}}>700A</p>

                <p style={{position:"absolute",left:675,top:285,fontSize:12}}>브레이커 04</p>
                <img src={setting} style={{position:"absolute",left:739,top:285}}/>
                <p style={{position:"absolute",left:720,top:312,fontSize:12}}>10%</p>
                <p style={{position:"absolute",left:707,top:332,fontSize:12}}>1,000A</p>

                <p style={{position:"absolute",left:976,top:243,fontSize:12}}>프레스05</p>
                <img src={setting} style={{position:"absolute",left:1035,top:245}}/>
                <p style={{position:"absolute",left:980,top:259,fontSize:10}}>1000ton</p>
                <p style={{position:"absolute",left:1017,top:364,fontSize:12, color:'#000'}}>70%</p>
                <p style={{position:"absolute",left:1005,top:383,fontSize:12, color:'#000'}}>2,100A</p>

                <p style={{position:"absolute",left:824,top:285,fontSize:12}}>브레이커 05</p>
                <img src={setting} style={{position:"absolute",left:887,top:285}}/>
                <p style={{position:"absolute",left:870,top:312,fontSize:12}}>30%</p>
                <p style={{position:"absolute",left:859,top:332,fontSize:12}}>3,000A</p>

                <p style={{position:"absolute",left:34,top:485,fontSize:20}}>사무동</p>
            </div>
    )
}

export default CmsPower
