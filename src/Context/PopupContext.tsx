import React, {createContext, Dispatch, useContext, useReducer} from 'react';

// 팝업 컨텍스트

type Action =
  | { type: 'OPEN_POPUP', data:IPopupTypes}
  | { type: 'CHANGE_MODE', data:IPopupTypes}
  | { type: 'CLOSE_POPUP' }


type PopupDispatch = Dispatch<Action>;

const PopupContext = createContext<IPopupTypes | undefined>(undefined);

const PopupDispatchContext = createContext<PopupDispatch | undefined>(
  undefined
);

function PopupReducer(state: IPopupTypes, action: Action): IPopupTypes {
    switch (action.type) {
      case 'OPEN_POPUP':
        //console.log(`OPEN_POPUP : ${action.data.contents}`)
        return {
            ...state,
            contents: action.data.contents,
            type: action.data.type,
            is_popup: true,
        }
        case 'CHANGE_MODE':
        //console.log(`OPEN_POPUP : ${action.data.contents}`)
        return {
            ...state,
            mode: action.data.mode,
        }
      case 'CLOSE_POPUP':
          console.log(`CLOSE_POPUP`)
          return {
              ...state,
              is_popup: false,
          }

      default:
        throw new Error('-- Unhandled action : PopupContext.tsx --');
    }
  }

// 팝업 데이터 프로바이더
export function PopupContextProvider({ children }: { children: React.ReactNode }) {
    const [ Popup, dispatch ] = useReducer(PopupReducer, {
      contents: '',
      type: 'normal',
      is_popup: false,
      mode: 'home',
    });

    return (
      <PopupDispatchContext.Provider value={dispatch}>
        <PopupContext.Provider value={Popup}>
          {children}
        </PopupContext.Provider>
      </PopupDispatchContext.Provider>
    );
  }


  export function usePopup() {
    const state = useContext(PopupContext);
    if (!state) throw new Error('-- TodosProvider not found : UserContext.tsx --');
    return state;
  }

  export function usePopupDispatch() {
    const dispatch = useContext(PopupDispatchContext);
    if (!dispatch) throw new Error('-- TodosProvider not found : UserContext.tsx --');
    return dispatch;
  }
