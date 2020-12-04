// 기계 타입
interface IMachine {
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
interface IProcess {
  pk?: string,
  name?: string,
  material?: IMaterial,
  output: IMaterial,
  machine: IMachine,
  mold?: IMold,
  mold_name?: string,
}

// 공정 타입
interface IBarcode {
  pk?: string,
  name?: string,
  code?: string,
  description?: string,
  photo?: string,

}

// 주변장치 타입
interface ISubMachine {
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
interface IMaterial {
  pk: string,
  material_name: string,
  material_code?: string,
  material_spec?: string,
  distributor?: string,
  stock?: string | number,
  info_list?: IInfo[],

}

interface IInfo {
  title: string,
  value: string,
}

// 금형 타입
interface IMold {
  manufacturer?: string,
  product_code?: string,
  product_spec?: string,
  mold_name: string,
  mold_label?: string,
  mold_code?: string,
  pk: string,
}

//댓글
interface IReply {
  pk: string,
  name: string,
  writer_pk: string,
  photo: string,
  detail: string,
  file_url: string,
}

// 작업지시서
interface ITask {
  pk: string,
  title: string,
  status: number,
  process: string[],
  amount: number,
  output_name: string,
  worker: {
    name: string,
    appointment: string,
    photo: string,
  },
  // comments: number,

}

//장비 현황
interface IStatus {
  pk: string,
  group?: string,
  name: string,
  code?: string,
  label?: string,
  type?: string,
  status: string,
  group?: string,
  attached_to?: string,
  photo?: string,
  is_connect: boolean,
}

//장비 현황
interface IStatus2 {
  pk: string,
  status: string,
  type: press,
  name: string,
  photo: string,
  is_connect: boolean,
}


// 직원 프로필 정보
interface IMmember {
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
interface IMemberSearched {
  pk: string,
  name: string,
  appointment: string,
  photo: string,
}

// 생산품목
interface IProduct {
  pk: string,
  product_name: string,
  product_code: string,
  product_spec?: string,
  info_list?: IInfo[]
  molds: string | array,
  stock?: number | string
}

// 팝업
interface IPopupTypes {
  type?: 'normal' | 'warning' | 'error' | 'notice',
  contents?: string,
  is_popup?: boolean,
  mode?: string,
  okFunc?: () => void
}

//Axios 요청/응답 관련 타입
interface IServerResponse {
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
  line?: string | number,
  ready_time?: string,
  name: string,
  code: string,
  info_list: IInfoM[],
  is_connected: boolean,
  operation: number,
  percent: string | number
}

// 부서
interface ITeam {
  pk: string,
  name: string,
  mother_pk?: string,

}

interface IMaintenance {
  pk: string,
  name?: string,
  type: string,
  info_list?: IInfo[],
  target?: IMaintenance
}

interface ISearchedList {
  pk: string,
  name: string,
  type: string,
  code: string,
}

interface IAddress {
  pk: string,
  name: string,
  address: string,
}

// 리드타임
interface LeadTimeAnalysis {
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

interface IPressMachineType {
  machine_img: string
  machine_name: string
  machine_ton: number
  manufacturer_code: string
  pk: string
}

interface IOverTonStatistics {
  pressPk: string,
  maxLoadton: string,
  minLoadton: string,
  x_hour: string[],
  y_average: string[]
}

interface IPressReadyTimeAnalysis {
  manufacturer_code: string
  machine_name: string
  machine_ton: string
  analyze: {
    power_off: number
    power_off_time: string
    runtime: number | string
    runtime_time: string
    downtime: {
      total: number
      total_time: string
      error: number
      error_time: string
      qdc: number
      qdc_time: string
    }
  }
}

interface IPressCapacity {
  manufacturer_code: string
  machine_name: string
  machine_ton: string
  analyze: {
    times: string[],
    productions: number[]
  }
}

interface IPressClutch {
  manufacturer_code: string
  machine_name: string
  machine_ton: string
  statement: number
}

interface IPressLoadTonMachineData {
  machine_name: string
  limited_ton: number
  total_maxTon: number
  ch1_maxTon: number
  ch2_maxTon: number
  total_ton: number[]
  ch1_ton: number[]
  ch2_ton: number[]
  capacity: string[]
}

interface IPressLoadTonMonitoring {
  machines: IPressLoadTonMachineData[]
  degree: number[]
  factories: string[]
  current_factory: number
}

interface IPressAbilityData {
  pressPk: string,
  pressName: string,
  excess_count?: string,
  x_degree: string[],
  y_capacity: string[]
  y_ton: string[]
}

interface ChartData {
  Xaxis: number[],
  Yaxis: number[],
}

interface IPressOilSupplyData {
  pressPk: string,
  pressName: string,
  insert_oil_time: ChartData
}

interface IPressReadyTimeStatisticsData {
  press_pk: string,
  press_name: string,
  press_ton: number | 'NaN',
  runtime: {
    operating_ratio: number | 'NaN',
    diff: number | 'NaN',
    kinds: string
  },
  downtime: {
    time: string,
    diff: number | 'NaN',
    kinds: string
  },
  error_time: string,
  qdc_time: string
}

interface IPressElectricPowerData {
  dates: string[]
  pressLog: {
    press_pk: string,
    press_name: string,
    press_data: number[]
  }[]
}

interface IPressLoadTonSatistics {
  pressPk: string,
  pressName: string,
  pressCode: string,
  max_ton: string,
  day_max_ton: string,
  day_min_ton: string,
  yesterday_max_ton: string,
  yesterday_min_ton: string,
  ton_data: string
}

interface IProductionAdd {
  type: 0 | 1 | 2
  manager: string,
  material: string,
  from: string,
  to: string,
  procedure?: string,
  amount: number,
  supplier: string,
  deadline?: string
  segment?: string
}

interface IProcessRegister {
  type: number
  name: string
  processes: {
    machine_pk: string
    mold_pk?: string | null
  }[]
  description: string
}

interface IProcessDetailData {
  machine?: string
  machine_type?: number
  machine_name?: string
  mold?: string
  mold_name?: string
  input_materials?: IMaterialData[]
  output_materials?: IMaterialData
}

interface IMaterialData {
  material_pk: string
  material_name: string
  material_type: number
  count: number
}

interface OutsourcingName {
  current_page: number
  info_list: {
    name: string
    pk: string
  }[]
  total_number: number
  total_page: number
}

interface ICustomerRegister {
  name: string
  ceo_name: string
  type: 0 | 1
  number: string
  photo: string
  address: { postcode: string, roadAddress: string, detail: string }
  telephone: string
  ceo_email: string
  fax: string
  manager: string
  manager_phone: string
  manager_email: string
}

interface Factory {
  pk: string | number,
  name: string,
}

interface PaginationInfo {
  current: number,
  total?: number,
}
