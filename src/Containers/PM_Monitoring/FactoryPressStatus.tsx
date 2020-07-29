import React, {useContext, useEffect, useState, useCallback} from 'react';
import Styled, { withTheme, DefaultTheme } from 'styled-components'
import { useHistory } from 'react-router-dom';
import MapBoard from '../../Components/Map/MapBoard';
import { API_URLS } from '../../Api/monitoring';


interface Factory{
    pk: string | number,
    name: string,
}


const FactoryPressStatus = () => {

    const [selectComponent, setSelectComponent] = useState<string>('');

    return(
        <FactoryPressStatusWrapper>
            <p>선택 컴포 : {selectComponent}</p>
            <MapBoard 
                type={1}//0: 모니터링 1:통계
                url={API_URLS.press.status}
                select={selectComponent}
                onChangeEvent={setSelectComponent}
       
            />
        </FactoryPressStatusWrapper>
    )
}

const FactoryPressStatusWrapper = Styled.div`

`
export default FactoryPressStatus;