import React, {createContext, Dispatch, useReducer, useContext} from 'react';

// 유저 프로필 데이터 관련 컨텍스트 

// 유저 info, 컨텍스트, 액션, 리듀서 타입정의 

export interface User {
    email: string,
    name: string,
    is_admin?: boolean,
    is_login?: boolean,
    pk: string,
    appointment: number | null | string,
    profile_img: string
}


type Action =
  | { type: 'SET_USER'; data: User }
  | { type: 'LOGOUT_USER' }

  
type UserDispatch = Dispatch<Action>;


// 유저 컨텍스트 정의
const UserContext = createContext<User | undefined>(undefined);

// 유저 디스패치 컨텍스트 정의
const UserDispatchContext = createContext<UserDispatch | undefined>(
  undefined
);

// 유저 리듀서 
function UserReducer(state: User, action: Action): User {
    switch (action.type) {
      case 'SET_USER':
        console.log(`SET_USER : ${action.data.name}`)
        return {
            ...state,
            email: action.data.email,
            name: action.data.name,
            is_admin: action.data.is_admin,
            is_login: true,
            pk: action.data.pk,
            appointment: action.data.appointment,
            profile_img: action.data.profile_img,
        }
    case 'LOGOUT_USER':
        console.log(`LOGOUT_USER`)
        return {
            ...state,
            email: '',
            name: '',
            is_admin: false,
            pk: '',
            appointment: null,
            profile_img: '',
            is_login: false,
        }

      default:
        throw new Error('-- Unhandled action : UserContext.tsx --');
    }
  }

// 유저 프로필 데이터 프로바이더
export function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [ User, dispatch ] = useReducer(UserReducer, {
        email: '',
        name: '',
        is_admin: false,
        pk: '',
        appointment: null,
        profile_img: '',
        is_login: false,
    });
  
    return (
      <UserDispatchContext.Provider value={dispatch}>
        <UserContext.Provider value={User}>
          {children}
        </UserContext.Provider>
      </UserDispatchContext.Provider>
    );
  }

  // 디스패처 , 유저 인포 타입 체크
  export function useUser() {
    const state = useContext(UserContext);
    if (!state) throw new Error('-- TodosProvider not found : UserContext.tsx --');
    return state;
  }
  
  export function useUserDispatch() {
    const dispatch = useContext(UserDispatchContext);
    if (!dispatch) throw new Error('-- TodosProvider not found : UserContext.tsx --');
    return dispatch;
  }