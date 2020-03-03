// 기계 타입
interface IMachine{
    machine_name: string,
    machine_label?: string,
    machine_code: string,
    manufacturer?: string,
    manufacturer_code?: string,
    manufacturer_detail?: string,
    is_registered?: boolean
}
// 직원 프로필 정보
interface IMmember{
  pk: string;
  email: string;
  name: string;
  profile_img: string;
  appointment: string;
  year: number;
  join_date: string;
  join_type: string;
  status: string;
}
// 팝업 
interface IPopupTypes{
    type: 'normal' | 'warning' | 'error' | 'notice',
    contents: string,
    is_popup?: boolean,
}

//Axios 요청/응답 관련 타입
interface IServerResponse  {
    data: IServerData
  }
  interface IServerData {
    status: number,
    results?: any
  
  }