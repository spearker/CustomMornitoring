// 기계 타입
interface IMachine{
    machine_name: string,
    machine_label?: string,
    machine_code: string,
    manufacturer?: string,
    manufacturer_code?: string,
    manufacturer_detail?: string,
    pk: string,
    is_registered?: boolean,
    machine_photo?: string,
}
// 주변장치 타입
interface ISubMachine{
  device_name: string,
  device_label?: string,
  device_code: string,
  manufacturer?: string,
  manufacturer_code?: string,
  manufacturer_detail?: string,
  pk: string,
  is_registered?: boolean,
  device_photo?: string,
}

// 자재 타입
interface IMaterial{
  pk: string,
  material_name: string,
  material_code: string,
  material_spec: string,
  distributor?: string,
  stock?: string | number,
  info_list?: IInfo[]
}

interface IInfo{
  title: string,
  value: string,
}
// 금형 타입
interface IMold{
  manufacturer?: string,
  product_code?: string,
  product_spec?: string,
  mold_name: string,
  mold_label: string,
  mold_code: string,
  pk: string,
}
// 작업지시서
interface ITask{
    pk: string,
   title:string,
   profile_img: string,
   status: string,
   registered: string,
   machines: any,
   products: string,
   amount: number,
   worker: string,
   comments: number,

}

//장비 현황
interface IStatus{
  pk: string,
  name: string,
  label?: string,
  status: string,
  attached_to: string,
  photo :string,
  is_connect: boolean,
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

// 검색된 유저
interface IMemberSearched{
  pk: string,
  name: string,
  appointment: string,
  profile_img: string,
} 

// 생산품목
interface IProduct{
  pk: string,
  product_name: string,
  product_code: string,
  product_spec?: string,
  info_list?: IInfo[]
  molds: string | array,
  stock?: number | string
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

  //라인 머신 검색
  interface IMachineLine {
    pk: string,
    name: string,
    group: string,
    status: string,
    operation: boolean,
    end_date: string
  }