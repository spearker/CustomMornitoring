import React, { useEffect, useState } from "react";
import KPIBasicBox from "../../Components/Box/KPIBasicBox";
import KPICompareBox from "../../Components/Box/KPICompareBox";
import KPIMenuBox from "../../Components/Box/KPIMenuBox";
import KPIResultBox from "../../Components/Box/KPIResultBox";
import TopHeader from "../../Components/Text/TopHeader";

interface Menu{
    name: string,
    api: string,
    tip: string
}
    
const menuList: {
    name: string,
    api: string,
    tip: string
}[] = [
    { name: '전기에너지 사용률', api: '', tip: '제조 원가를 낮출 수 있습니다.' } // api key이름
]

const EnergyKPI = () => {
    const [selectMenu, setSelectMenu] = useState<Menu>(menuList[0]);
    const [type, setType] = useState<'year' | 'week' | 'day'>('day');
    const [compareView, setCompareView] = useState<boolean>(false);
    const [data, setData] = useState<any>({number: 100, increase: true});

    useEffect(() => {
        setCompareView(false);
    },[selectMenu])

    const onClose = () => {
        setCompareView(false);
        setData({});
    }

    return (
        <div style={{maxWidth: 1100}}>
            <TopHeader title={'에너지지수(E)'} top={5} bottom={19} />
            <KPIMenuBox menuList={menuList} onChangeEvent={(select:Menu) => setSelectMenu(select)} value={selectMenu}>
                <KPICompareBox data={{number: 500, increase: false}} type={type} setType={(type)=>setType(type)} />
                {
                    compareView
                    ? <> 
                        <KPICompareBox data={{number: 100, increase: true}} type={type} />
                        <KPIResultBox onCloseEvent={()=>onClose()} data={data} />
                      </>
                    : <KPIBasicBox style={{justifyContent: 'center', alignItems: 'center'}}>
                        <button onClick={() => setCompareView(true)}>비교하기</button>
                    </KPIBasicBox>
                }
            
            </KPIMenuBox>
        </div>
    )
}

export default EnergyKPI;
