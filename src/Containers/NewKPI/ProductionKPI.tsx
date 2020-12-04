import React, { useCallback, useEffect, useState } from "react";
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
    { name: '설비가동률', api: '', tip: '제조 원가를 낮출 수 있습니다.' }, // api key이름
    { name: '제조 리드타임', api: '', tip: '제조 원가를 낮출 수 있습니다.' },
    { name: '생산 품목', api: '', tip: '제조 원가를 낮출 수 있습니다.' },
    { name: '생산 목표 달성률', api: '', tip: '제조 원가를 낮출 수 있습니다.' }
]

const ProductionKPIContainer = () => {
    const [selectMenu, setSelectMenu] = useState<Menu>(menuList[0]);
    const [type, setType] = useState<'year' | 'week' | 'day'>('day');
    const [compareView, setCompareView] = useState<boolean>(false);
    const [data, setData] = useState<any>({number: 100, increase: true});

    useEffect(() => {
        // getData();
    },[selectMenu])

    const getData = useCallback(async () => {
        // const tempUrl = `${API_URLS['kpi'].selectMenu.api}` 
        // const resultData = await postMoldRegister(tempUrl, requestData);
        // if (resultData.status === 200) {
            
        // }
    }, [])

    useEffect(() => {
        setCompareView(false);
    },[selectMenu])

    const onClose = () => {
        setCompareView(false);
        setData({});
    }

    return (
        <div style={{maxWidth: 1100}}>
            <TopHeader title={'생산지수(P)'} top={5} bottom={19} />
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

export default ProductionKPIContainer;
