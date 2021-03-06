import React, {useState} from 'react';
import Styled from 'styled-components'
import MapBoard from '../../Components/Map/MapBoard';
import {API_URLS} from '../../Api/pm/map';


interface Factory{
    pk: string | number,
    name: string,
}

//지도 컴포넌트 사용 예제


const FactoryPressStatus = () => {

    const [selectComponent, setSelectComponent] = useState<string>('');

    return(
        <FactoryPressStatusWrapper>
            <p>선택 컴포 : {selectComponent}</p>
            <MapBoard
                type={1}//0: 모니터링 1:통계/분석
                url={API_URLS.press.statics}
                select={selectComponent} //pk
                onChangeEvent={setSelectComponent}
            />
        </FactoryPressStatusWrapper>
    )
}

const FactoryPressStatusWrapper = Styled.div`

`
export default FactoryPressStatus;
