export const ROUTER_MANAGE = [
    {url:"/manage/teams", name:'부서 및 조직관리'},
    {url:"/manage/ranks", name:'직급 관리'},
    {url:"/manage/members", name:'직원 관리'},
    {url:"/manage/accept", name:'승인요청 관리'}
]

export const ROUTER_CLIENT = [
    {url:"/client/list", name:'거래처 관리'},
    {url:"/client/buy", name:'매입 관리'},
    {url:"/client/sell", name:'매출 관리'},
]


export const ROUTER_MONITORING = [
    {url:"/monitoring/press", name:'프레스 모니터링'},
    {url:"/monitoring/load", name:'로드톤 모니터링'},
]

export const ROUTER_SUPER_ADMIN = [
    {url:"/super/list", name:'고객사 리스트'},
    {url:"/super/register", name:'고객사 등록'},
]


export const ROUTER_STOCK = [
  
    {url:"/stock/material", name:'자재 수량 정보'},
    {url:"/stock/product", name:'생산제품 수량 정보'},
]

export const ROUTER_REGISTER = [
    {url:"/register/material", name:'자재 정보등록'},
    {url:"/register/design", name:'금형 정보등록'},
    {url:"/register/machine", name:'기계 정보등록'},
    {url:"/register/submachine", name:'주변장치 등록'},
    {url:"/register/process", name:'공정 정보등록'},
]

export const ROUTER_LIST = [
    {url:"/list/machine", name:'기계 정보'},
    {url:"/list/submachine", name:'주변장치 정보'},
    {url:"/list/design", name:'금형 정보'},
    {url:"/list/material", name:'자재 정보'},
    {url:"/list/barcode", name:'바코드 정보'},
    {url:"/list/client", name:'거래처 정보'},
]

export const ROUTER_LIST_OLD = [
    {url:"/list/material", name:'자재 리스트'},
    {url:"/list/design", name:'금형 리스트'},
    {url:"/list/machine", name:'기계 리스트'},
    {url:"/list/submachine", name:'주변장치 리스트'},
    {url:"/list/line", name:'라인 리스트'},
    {url:"/list/product", name:'생산제품 리스트'},
]
export const ROUTER_REGISTER_OLD = [
    {url:"/register/material", name:'자재 정보등록'},
    {url:"/register/design", name:'금형 정보등록'},
    {url:"/register/machine", name:'기계 정보등록'},
    {url:"/register/submachine", name:'주변장치 등록'},
    {url:"/register/line", name:'라인 정보등록'},
    {url:"/register/product", name:'생산제품 정보등록'},
]



export const ROUTER_MENU_LIST = [
    [ //1 기준 정보 관리
      { name : '기준 정보 관리', url : '/list/machine'},
      { name : '기계 기본정보', url : '/list/machine'},
      { name : '주변장치 기본정보', url : '/list/submachine'},
      { name : '금형 기본정보', url : '/list/design'},
      { name : '자재 기본정보', url : '/list/material'},
      { name : '바코드 기본정보', url : '/list/barcode'},
      //{ name : '거래처 기본정보', url : '/list/clients'}
    ],
    [ //2 인사 관리
      { name : '인사 관리', url : '/manage/teams'},
      { name : '부서조직관리', url : '/manage/teams'},
      { name : '직급 관리', url : '/manage/rank'},
      { name : '직원 관리', url : '/manage/members'},
      { name : '가입 승인 관리', url : '/manage/accept'},
    ],
    [ //3 거래처 관리
      { name : '거래처 관리', url : '/client/list'},
      { name : '거래처 관리', url : '/client/list'},
      { name : '매입 관리', url : '/client/buy'},
      { name : '매출 관리', url : '/client/sell'},
    ],
    [ //4 외주 관리
      { name : '외주 관리', url : '/subcontractor/list'},
      { name : '외주처 관리', url : '/subcontractor/list'},
      { name : '발주 관리', url : '/subcontractor/order'},
      { name : '수주 관리', url : '/subcontractor/contract'},
    ],
    [ //5 바코드 관리
      { name : '바코드 관리', url : ''},
      { name : '바코드 등록', url : '/barcode/register'},
      { name : '바코드 리스트', url : '/list/barcode'},
    ],
    [ //6 보전 관리
      { name : '보전관리', url : '/maintenance/list'},
      { name : '기계 보전등록', url : '/maintenance/machine/register'},
      { name : '기계 보전리스트', url : '/maintenance/machine/list'},
      { name : '주변장치 보전등록', url : '/maintenance/submachine/register'},
      { name : '주변장치 보전리스트', url : '/maintenance/submachine/list'},
      { name : '금형 보전등록', url : '/maintenance/design/register'},
      { name : '금형 보전리스트', url : '/maintenance/design/list'},
      { name : '보전 이력관리', url : '/maintenance/list'},
    ],
    [ //7 공정 관리
      { name : '공정 관리', url : '/process/list'},
      { name : '공정 등록', url : '/process/register'},
      { name : '공정 리스트', url : '/process/list'},
      { name : '프레스 공정 추천 분석', url : '/recommend/press'},
    ],
    [ //8 재고 관리
      { name : '재고 관리', url : '/stock/list'},
      { name : '재고 관리', url : '/stock/list'},
      { name : '생산 관리', url : '/stock/product'},
      { name : '입고 관리', url : '/stock/in'},
      { name : '출고 관리', url : '/stock/out'},
    ],
    [ //9 불량 관리
      { name : '품질 관리', url : '/quality/manage'},
      { name : '불량 자재 등록', url : '/defective/register'},
      { name : '불량 자재 리스트', url : '/defective/list'},
    ],
    [ //10 서비스 문의
      { name : '서비스 문의', url : '/service'},
      { name : '문의방법 및 연락처', url : '/service'},
    ],

  ];
  