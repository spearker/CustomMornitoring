import React, {useCallback, useReducer} from 'react';
import * as _ from 'lodash';


// state 입력-출력 커스텀 hooks
interface IAction {
    type: string;
    value: any;
    key?: string,
}

function UserReducer(state: any, action: IAction): any {

    switch(action.type) {
        case 'CHANGE':
            if(action.key == 'all'){
                let temp = _.cloneDeep(action.value);
                return temp;
            }else{
                let temp = _.cloneDeep(state);
                temp[action.key!] = action.value;
                return temp;
            }

        case 'RESET':
            let temp2 = _.cloneDeep(state);
            temp2[action.key!] = '';
            return temp2;
        default:
            return state;
    }


}

const useObjectInput = (type: string, initialState: any ) => {

    const [state, dispatch] = useReducer(UserReducer, initialState);

    const onChange = useCallback((key, input) => {
        dispatch({type, value: input, key: key})
    },[state])

    return [state, onChange]
}



export default useObjectInput;
