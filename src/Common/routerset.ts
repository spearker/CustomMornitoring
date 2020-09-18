

export const ROUTER_SUPER_ADMIN = [
  {url:"/super/list", name:'고객사 리스트'},
  {url:"/super/register", name:'고객사 등록'},
]

export const ROUTER_MENU_LIST = [

  [ // 기준 정보 관리
    { name : '기준 정보 관리', url : '/list/machine'},
    { name : '기계 기본정보', url : '/list/machine'},
    { name : '주변장치 기본정보', url : '/list/submachine'},
    { name : '금형 기본정보', url : '/list/design'},
    { name : '자재 기본정보', url : '/list/material'},
    { name : '바코드 기본정보', url : '/list/barcode'},
    //{ name : '거래처 기본정보', url : '/list/clients'}
  ],
  [ // 인사 관리
    { name : '인사 관리', url : '/manage/teams'},
    { name : '부서조직관리', url : '/manage/teams'},
    { name : '직급 관리', url : '/manage/rank'},
    { name : '직원 관리', url : '/manage/members'},
    { name : '가입 승인 관리', url : '/manage/accept'},
  ],
  [ // 거래처 관리
    { name : '거래처 관리', url : '/client/list'},
    { name : '거래처 관리', url : '/client/list'},
    { name : '매입 관리', url : '/client/buy'},
    { name : '매출 관리', url : '/client/sell'},

  ],
  [ // 외주 관리
    { name : '외주 관리', url : '/subcontractor/list'},
    { name : '외주처 관리', url : '/outsourcing/list'},
    { name : '발주 관리', url : '/outsourcing/order'},
    { name : '수주 관리', url : '/outsourcing/contract'},
  ],
  [ // 바코드 관리
    { name : '바코드 관리', url : ''},
    { name : '상품 바코드 리스트', url : '/list/barcode/product'},
  ],
  [ // 보전 관리

    { name : '보전관리', url : '/maintenance/submachine'},
    { name : '주변장치 보전관리', url : '/maintenance/submachine'},
    { name : '검색 관리', url : '/maintenance/search'},
    { name : '보전 이력관리', url : '/maintenance/history'},
    { name : '보전 리스트', url : '/maintenance/list'},
    { name : '에러코드 로그', url : '/maintenance/errorcode'},
    { name : '모터 역회전 상태 분석', url : '/maintenance/motor'},

  ],
  [ // 공정 관리
    { name : '공정 관리', url : '/process/list'},

    { name : '공정 리스트', url : '/process/list'},
    { name : '프레스 공정 추천 분석', url : '/recommend/press'},
  ],
  [ // 작업지시서
    { name : '작업지시서 관리', url : '/task/list'},
    { name : '작업지시서 관리', url : '/task/list'},
  ],
  [ // 재고 관리
    { name : '재고 관리', url : '/stock/list'},
    { name : '재고 현황', url : '/stock/list'},
    { name : '생산 기록', url : '/stock/product'},
    { name : '입고 기록', url : '/stock/in'},
    { name : '출고 기록', url : '/stock/out'},
  ],
  [ // 품질 관리
    { name : '품질 관리', url : '/quality/manage'},
    { name : '불량 발생 이력', url : '/defective/list'},
  ],
  [ // key-in
    { name : 'Key-in 입력', url : '/keyin/input/press'},
    { name : '프레스 Key-in', url : '/keyin/input/press'},
    { name : '금형 Key-in', url : '/keyin/input/mold'},
    { name : '용접 Key-in', url : '/keyin/input/welding'},
    { name : '밀링 Key-in', url : '/keyin/input/milling'},
    { name : '선반 Key-in', url : '/keyin/input/sunban'},
    { name : 'tab Key-in', url : '/keyin/input/tab'},
    { name : '자재 Key-in', url : '/keyin/input/material'},

  ],
  [ // key-in
    { name : 'Key-in 설정', url : '/keyin/set/press'},
    { name : '프레스 설정', url : '/keyin/set/press'},
    { name : '금형 설정', url : '/keyin/set/mold'},
    { name : '용접 설정', url : '/keyin/set/welding'},
    { name : '밀링 설정', url : '/keyin/set/milling'},
    { name : '선반 설정', url : '/keyin/set/sunban'},
    { name : 'tab 설정', url : '/keyin/set/tab'},
    { name : '자재 설정', url : '/keyin/set/material'},

  ],
  [ // key-in
    { name : 'Key-in 리스트', url : '/keyin/list/press'},
    { name : '프레스 리스트', url : '/keyin/list/press'},
    { name : '금형 리스트', url : '/keyin/list/mold'},
    { name : '용접 리스트', url : '/keyin/list/welding'},
    { name : '밀링 리스트', url : '/keyin/list/milling'},
    { name : '선반 리스트', url : '/keyin/list/sunban'},
    { name : 'tab 리스트', url : '/keyin/list/tab'},
    { name : '자재 리스트', url : '/keyin/list/material'},

  ], // monitoring
  [
    { name : '모니터링', url :  '/monitoring/vibration' },
    { name : '진동량 모니터링', url : '/monitoring/vibration' }

  ],
  [   //Kpi
    { name : 'KPI 생산지수', url : '/kpi/product'},
    { name : 'KPI 생산지수', url : '/kpi/product'},
    { name : 'KPI 품질지수', url : '/kpi/quality'},
    { name : 'KPI 원가지수', url : '/kpi/price'},
    { name : 'KPI 납기지수', url : '/kpi/duedate'},
  ],
  [   //프레스 통계·분석
    { name : '통계·분석', url : '/commingsoon'},

    { name : 'QDC 교환시기 분석', url : '/statistics/qdctime'},
    { name : '비가동시간 분석', url : '/statistics/readytime'},
    { name : '공정별 불량률 분석', url : '/statistics/loss'},
    { name : '공정 환경 분석', url : '/statistics/process'},
    { name : '최적 SPM 분석', url : '/statistics/optimalspm'},
    { name : '제조 리드타임 분석', url : '/statistics/leadtime'},
    { name : '캠 정보 분석', url : '/statistics/cam'},

    { name : 'cms 분석 및 통계', url : '/statistics/cms'},
    { name : '공장 환경 분석', url : '/statistics/environmental' }

  ],
  [ // 서비스 문의
    { name : '서비스 문의', url : '/service'},
    { name : '문의방법 및 연락처', url : '/service'},
  ],

];

export const MES_MENU_LIST = {
  marketing: [
    { name : '영업 관리', url: '/marketing/order/list'}, //상위메뉴
    // { name : '수주 리스트', url: '/marketing/order/list'},
    // { name : '출하 리스트', url: '/marketing/shipment/list'},
      { name : '수주 리스트', url: '/commingsoon'},
      { name : '출하 리스트', url: '/commingsoon'},
  ],
  customer: [
    { name: '거래처 관리', url: '/customer/current/list'}, //상위메뉴
    { name: '거래처 리스트', url: '/customer/current/list'}
  ],
  outsourcing: [ // 기준정보 관리
    // { name: '외주처 관리', url: '/outsourcing/current/list' }, //상위메뉴
    // { name: '외주처 발주 리스트', url: '/outsourcing/order/list' },
    // { name: '외주처 수주 리스트', url: '/outsourcing/contract/list' },
    // { name: '외주처 현황', url: '/outsourcing/current/list' },
      { name: '외주처 관리', url: '/commingsoon' }, //상위메뉴
      { name: '외주처 발주 리스트', url: '/commingsoon' },
      { name: '외주처 수주 리스트', url: '/commingsoon' },
      { name: '외주처 현황', url: '/commingsoon' },

  ],
  project: [ //생산관리
    { name : '생산 관리' , url: '/project/schedule/list'}, //상위메뉴
    { name : '생산 계획 리스트', url: '/project/schedule/list'},
    { name : '생산 계획 관리 리스트', url: '/project/schedulemanage/list'},
    { name : '작업 이력', url: '/project/work/history'},
    { name : '전표 리스트', url: '/project/voucher/list'},
  ],
  stock: [
    // { name: '재고 관리', url: '/stock/status/list'},
    // { name: '재고 현황', url: '/stock/status/list'},
    // { name : '재공재고 관리', url:'/stock/wip/list'},
    // { name : '외주 재고 관리', url:'/stock/outsource/list'},
    // { name : '원자재 관리', url: '/stock/rawmaterial/list'},
    // { name : '완제품 관리', url: '/stock/finishmaterial/list'},

      { name: '재고 관리', url: '/commingsoon'},
      { name: '재고 현황', url: '/commingsoon'},
      { name : '재공재고 관리', url:'/commingsoon'},
      { name : '외주 재고 관리', url:'/commingsoon'},
      { name : '원자재 관리', url: '/commingsoon'},
      { name : '완제품 관리', url: '/commingsoon'},
  ],
  barcode: [
    // { name : '바코드 관리', url: '/barcode/current/list'},
    // { name : '바코드 현황', url: '/barcode/current/list'}
      { name : '바코드 관리', url: '/commingsoon'},
      { name : '바코드 현황', url: '/commingsoon'}
  ],
  process: [
    { name: '공정 관리', url: '/process/process/list'},
    { name: '공정 리스트', url: '/process/process/list'},
    { name : '공정별 세분화 리스트', url: '/process/segment/list'}
  ],
  // mold: [
  //   { name : '금형 관리', url: '/mold/current/list'},
  //   { name : '금형 등록', url: '/mold/register'},
  //   { name : '금형 수리 현황', url: '/mold/current/list'},
  //   { name : '금형 수리 완료', url: '/mold/repair/list'}
  // ],
  // kpi: [
  //   { name: 'KPI' }
  // ],
  // quality: [
  //   { name : '품질 관리', url: '/quality/quality/list'},
  //   { name : '제품 품질 현황', url: '/quality/current/list'}
  // ],
  mold: [
    // { name : '금형 관리', url: '/mold/current/list'},
    // { name : '금형 등록', url: '/mold/register'},
    // { name : '금형 수리 현황', url: '/mold/current/list'},
    // { name : '금형 수리 완료', url: '/mold/repair/list'}
    { name : '금형 관리', url: '/commingsoon'},
    { name : '금형 등록', url: '/commingsoon'},
    { name : '금형 수리 현황', url: '/commingsoon'},
    { name : '금형 수리 완료', url: '/commingsoon'}
  ],
  kpi: [
    { name: 'KPI', url: '/commingsoon' }
  ],
  quality: [
    // { name : '품질 관리', url: '/quality/quality/list'},
    // { name : '제품 품질 현황', url: '/quality/current/list'}
    { name : '품질 관리', url: '/commingsoon'},
    { name : '제품 품질 현황', url: '/commingsoon'}
  ],
  basic: [ // 기준정보 관리
    { name : '기준 정보 관리', url : '/basic/list/machine/'}, //상위메뉴
    { name : '기계 기본정보', url : '/basic/list/machine'},
    { name : '주변장치 기본정보', url : '/basic/list/device'},
    { name : '금형 기본정보', url : '/basic/list/mold'},
    { name : '품목 기본정보', url : '/basic/list/material'},
    { name : '공장 기본정보', url : '/basic/list/factory'},
    { name : '공장 세분화 관리', url : '/basic/list/subdivided'},
    // { name : '바코드 표준 관리', url : '/basic/list/barcode'},
    // { name : '표준 항목 관리', url : '/basic/list/item'},
    // { name : '표준 문서 관리', url : '/basic/list/document'},
      { name : '바코드 표준 관리', url : '/commingsoon'},
      { name : '표준 항목 관리', url : '/commingsoon'},
      { name : '표준 문서 관리', url : '/commingsoon'},
  ],
}

export const PM_MENU_LIST = {
  monitoring: [ //
    { name : '프레스 모니터링', url :  '/pm/monitoring/press'},
    { name : '프레스 상태 모니터링', url :  '/pm/monitoring/press'},
    { name : '로드모니터 모니터링', url :  '/pm/monitoring/loadton'},
    { name : '전력 모니터링', url : '/pm/monitoring/cms'},
  ],
  maintenance:[ //
    { name : '프레스 보전관리', url : '/pm/maintenance/press'},
    { name : '금형 수명 주기', url : '/pm/maintenance/mold'},
    { name : '클러치&브레이크', url : '/pm/maintenance/clutch'},
    { name : '오일 교환 및 보충', url : '/pm/maintenance/oil'},
    { name : '오버톤', url : '/pm/maintenance/overton'},
  ],
  analysis: [ //
    { name : '프레스 데이터 분석', url : '/pm/analysis/press'},
    { name : '생산량', url : '/pm/analysis/capacity'},
    { name : '능력', url : '/pm/analysis/ability'},
    { name : '비가동시간', url : '/pm/analysis/readytime'},
    { name : '불량 공정', url : '/pm/analysis/defective'}
  ],
  statistics : [ //
    { name : '프레스 데이터 통계', url : '/pm/statistics/press'},
    { name : '오일 공급', url : '/pm/statistics/oil'},
    { name : '비 가동시간', url : '/pm/statistics/readytime'},
    { name : '전력', url : '/pm/statistics/power'},
    { name : '로드톤 ', url : '/pm/statistics/loadton'},
    { name : '능력', url : '/pm/statistics/ability'},
    { name : '에러', url : '/pm/statistics/error'},
    { name : '불량률', url : '/pm/statistics/defective'},
    { name : '제품 별 톤', url : '/pm/statistics/product'},
    { name : '금형 타발 수', url : '/pm/statistics/mold'},
  ],

};
