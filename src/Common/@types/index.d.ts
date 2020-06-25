// 기계 타입
interface IMachine{
    machine_name: string,
    machine_label?: number,
    machine_code?: string,
    manufacturer?: string,
    manufacturer_code?: string,
    manufacturer_detail?: string,
    pk: string,
    status?: string,
    is_registered?: boolean,
    is_connect?: boolean,
    machine_photo?: string,
}

// 공정 타입
interface IProcess{
  pk?: string,
  name?: string,
  material?: IMaterial,
  output: IMaterial,
  machine: IMachine,
  mold?: IMold,
  mold_name?: string,
}
// 공정 타입
interface IBarcode{
  pk?: string,
  name?: string,
  code?: string,
  description?: string,
  photo?: string,

}
// 주변장치 타입
interface ISubMachine{
  device_name: string,
  device_label?: number,
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
  material_code?: string,
  material_spec?: string,
  distributor?: string,
  stock?: string | number,
  info_list?: IInfo[],

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
  mold_label?: string,
  mold_code?: string,
  pk: string,
}

//댓글
interface IReply{
  pk: string,
  name: string,
  writer_pk: string,
  photo: string,
  detail: string,
  file_url: string,
}

// 작업지시서
interface ITask{
    pk: string,
   title:string,
   status: string,
   process: string[],
   amount: number,
   output_name: string,
   worker: {
     name: string,
     appointment: string,
     photo: string,
   },
   comments: number,

}

//장비 현황
interface IStatus{
  pk: string,
  group?: string,
  name: string,
  code?: string,
  label?: string,
  type?: string,
  status: string,
  group?: string,
  attached_to?: string,
  photo?:string,
  is_connect: boolean,
}

//장비 현황
interface IStatus2{
  pk: string,
  status: string,
  type: press,
  name: string,
  photo:string,
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
  photo: string,
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
  interface IMonitoringList {
    pk: string,
    file?: string,
    running_time?: string,
    error?: string,
    line?:string | number,
    ready_time?: string,
    name: string,
    code: string,
    info_list: IInfoM[],
    is_connect: boolean,
    status: string,
    percent: string | number
  }
  // 부서
interface ITeam{
  pk: string,
  name: string,
  mother_pk?: string,

}

interface IMaintenance{
  pk: string,
  name?: string,
  type: string,
  info_list?: IInfo[],
  target?:IMaintenance
}

interface ISearchedList{
  pk: string,
  name: string,
  type: string,
  code: string,
}

// 리드타임
interface LeadTimeAnalysis{
  name: string,
  factoryInfo: string,
  material: string,
  goal: string,
  date: {
    start: string,
    finish: string
  },
  timeLine: string[],
  time: string[]
}
