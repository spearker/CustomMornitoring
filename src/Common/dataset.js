export const dataSet = {
    
    products:[
        {
            pk: 'asdjlijdlwqi',
            product_name : '플라스틱 케이스1',
            product_code:'21p4p1294i',
            molds:'금형08, 금형02, 금형24'
        },
        {
            pk: 'jel2jr3l2',
            product_name : '배터리 팩 케이스',
            product_code:'412323f2qf',
            molds:'금형01'
        },
        {
            pk: '23r2rji2',
            product_name : '금속 케이스',
            product_code:'32424gf4g',
            molds:'금형04, 금형05'
        }
    ],
    searchedItem: {
        lines:[
            {
                pk: 'wqd310j29jd90j2',
                group: 'LINE01',
                name : '프래스01, 프래스02, 프래스04, 프래스09, 프래스12',
                status : 'active',
                operation: true,
                end_date: ''
            },
            {
                pk: '1932jf2j8',
                group: 'LINE02',
                name : '프래스01, 프래스02, 프래스03,',
                status : 'active',
                operation: true,
                end_date: ''
            },
            {
                pk: '42j3il2jrl239jd90j2',
                group: 'LINE03',
                name : '프래스05, 프래스07',
                status : 'active',
                operation: false,
                end_date: '2020-03-01 14:49'
            }
            
        ],
        machines:[
            {
                pk: '42j3il2jrl239jd90j2',
                group: '개별',
                name : '프래스01',
                status : 'active',
                operation: true,
                end_date: ''
            },
            {
                pk: '42j3il2jrl239jd90j2',
                group: '개별',
                name : '프래스02',
                status : 'active',
                operation: false,
                end_date: '2020-03-01 09:23'
            },
        ]
    },
    statusList:[
        {
            pk: 'wqdlj32du3928ud912',
            name: '제스텍 프레스',
            label: '프레스',
            status: 'active',
            attached_to: '라인 31',
            photo : "",
            is_registerd: false,
        },
        {
            pk: 'qjdku1294103902',
            name: '심팩 프레스',
            label: '프레스',
            status: 'active',
            attached_to: '라인 9',
            photo : "",
            is_registerd: true,
        },
        {
            pk: 'vmrlmeijrqjr314',
            name: '심팩 프레스',
            label: '프레스',
            status: 'active',
            attached_to: "",
            photo : "",
            is_registerd: false,
        },
        {
            pk: 'de23r33928ud912',
            name: '시즐 피더',
            label: '피더',
            status: 'done',
            attached_to: '라인 1',
            photo : "",
            is_registerd: true,
        },
        {
            pk: 'de23r33928ud912',
            name: '시즐 피더',
            label: '피더',
            status: 'error',
            attached_to: "",
            photo : "",
            is_registerd: true,
        },
        {
            pk: 'de23r33928ud912',
            name: '시즐 피더',
            label: '피더',
            status: 'done',
            attached_to: "",
            photo : "",
            is_registerd: true,
        }
        
    ],
    subMachineList : [
    {
        device_name: "장비 장비...",
        device_label: "종류 종류..",
        device_code: "K934219",
        manufacturer: "심팩",
        manufacturer_code: "S02424",
        manufacturer_detail: "제조사 정보, 정보..."
        
    },
    {
        device_name:  "장비 장비...",
        device_label: "종류 종류..",
        device_code: "K7231859",
        manufacturer: "심팩",
        manufacturer_code: "S02424",
        manufacturer_detail: "제조사 정보, 정보..."
        
    },
    {
        device_name:  "장비 장비...",
        device_label: "종류 종류..",
        device_code: "K9123019",
        manufacturer: "심팩",
        manufacturer_code: "S02424",
        manufacturer_detail: "제조사 정보, 정보..."
        
    },
    {
        device_name:  "장비 장비...",
        device_label: "종류 종류..",
        device_code: "K032193",
        manufacturer: "심팩",
        manufacturer_code: "S02424",
        manufacturer_detail: "제조사 정보, 정보..."
        
    },

],
machineList : [
    {
        pk:'142u41ou24o21',
        machine_name: "기계 기계...",
        machine_label: "종류 종류..",
        machine_code: "K934219",
        manufacturer: "심팩",
        manufacturer_code: "S02424",
        manufacturer_detail: "제조사 정보, 정보...",
        is_registered : false
        
    },
    {
        pk:'01n29xo21',
        machine_name: "기계 기계...",
        machine_label: "종류 종류..",
        machine_code: "K7231859",
        manufacturer: "심팩",
        manufacturer_code: "S02424",
        manufacturer_detail: "제조사 정보, 정보...",
        is_registered : false
        
    },
    {
        pk:'756hgbt3421',
        machine_name: "기계 기계...",
        machine_label: "종류 종류..",
        machine_code: "K9123019",
        manufacturer: "심팩",
        manufacturer_code: "S02424",
        manufacturer_detail: "제조사 정보, 정보...",
        is_registered : true
        
    },
    {
        pk:'142uf2334o21',
        machine_name: "기계 기계...",
        machine_label: "종류 종류..",
        machine_code: "K032193",
        manufacturer: "심팩",
        manufacturer_code: "S02424",
        manufacturer_detail: "제조사 정보, 정보...",
        is_registered : false
        
    },

],
listList : [
   {
        line_code: 'L124414',
        line_detail: '라인 정보 라인 정보...',
        line_machines: [
       {
          machine_name: '기계 1',
          machine_photo: "",
          is_connected: true,
          machine_code: '2131244',
       }, 
       {
        machine_name: '기계 13',
        machine_photo: ""
        },
        {
            machine_name: '기계 0',
            machine_photo: "",
            is_connected: false,
            machine_code: '2131244',
        },
        ]
    },
    {
        line_code: 'L8898214',
        line_detail: '라인 정보 라인 정보...',
        line_machines: [
       {
          machine_name: '기계 2',
          machine_photo: "",
          is_connected: true,
          machine_code: '2131244',
       }, 
        ]
    },
    {
        line_code: 'L1920028',
        line_detail: '라인 정보 라인 정보...',
        line_machines: [
       {
          machine_name: '기계 8',
          machine_photo: "",
          is_connected: true,
          machine_code: '2131244',
       }, 
       {
        machine_name: '기계 9',
        machine_photo: ""
        },
        {
            pk:'d3d1qw',
            machine_name: '기계 7',
            machine_photo: "",
            is_connected: true,
            machine_code: '2131244',
        },
        {
            pk:'d3d1qw',
            machine_name: '기계 16',
            machine_photo: "",
            is_connected: false,
            machine_code: '2131244',
        },
        {
            pk:'d3d1qw',
            machine_name: '기계 5',
            machine_photo: "",
            is_connected: true,
            machine_code: '2131244',
        },
        ]
    },

],
designList : [
    {
        manufacturer: '(주)제조사',
        product_number: 'P124124',
        product_spec: '제품 스펙..스펙...',
        mold_name:'금형 금형..',
        mold_label: '몰드',
        mold_code:'K21344',
    },
    {
        manufacturer: '(주)제조사',
        product_number: 'P128824',
        product_spec: '제품 스펙..스펙...',
        mold_name:'금형 금형..',
        mold_label: '몰드',
        mold_code:'K99774',
    },
    {
        manufacturer: '(주)제조사',
        product_number: 'P708824',
        product_spec: '제품 스펙..스펙...',
        mold_name:'금형 금형..',
        mold_label: '몰드',
        mold_code:'K09334',
    }
],
acceptList : [
    {
        pk: 'PK1213248',
        name: '홍길동',
        email: 'gwddwi@gmail.com'
    },
    {
        pk: 'PK214ou8',
        name: '고길동',
        email: 'df24e@gmail.com'
    },
    {
        pk: 'PK1245125',
        name: '김둘리',
        email: 'dulgi24s@gmail.com'
    },
    
],

targetMember : 
    {
        pk: "wqd1d22d1",
        email: "email@gmail.com",
        name: "김둘리",
        profile_img: "",
        appointment: "",
        year: 0,
        join_date: "",
        join_type: "",
        status: "",
    },



memberList : [

   {
        pk: "wqd1d22d1",
        email: "email@gmail.com",
        name: "홍길동",
        profile_img: "",
        appointment: "",
        year: 0,
        join_date: "",
        join_type: "",
        status: "",
   },
   {
        pk: "wqd1d22d1",
        email: "email@gmail.com",
        name: "김둘리",
        profile_img: "",
        appointment: "대리",
        year: 3,
        join_date: "2016-11-13 09:28:00",
        join_type: "특채",
        status: "휴직 ",
    },
    {
        pk: "wqd1d22d1",
        email: "email@gmail.com",
        name: "김철수",
        profile_img: "",
        appointment: "과장",
        year: 0,
        join_date: "2019-03-19 16:34:00",
        join_type: "공채",
        status: "재직",
    }
],

taskList:[
    {
        
    pk: '21e1d2f33f13',
    title: '작업 001304',
    status: 'done',
    registered: '2020-03-03 09:23',
    machines: ['프래스 01, 프래스 02'],
    products: '플라스틱 케이스',
    amount: 100000,
    profile_img: "",
    worker: "홍길동 대리",
    comments: 2
    }, 
    {
        pk: 'edfm1d2f33f13',
        title: '작업 0201',
        status: 'active',
        registered: '2020-03-03 09:23',
        machines: ['프래스 01'],
        products: '박스',
        amount: 100000,
        profile_img: "",
        worker: "홍길동 대리",
        comments: 2
        }, 
        {
            pk: '21e1wqlqw13',
            title: '작업 021',
            status: 'stop',
            registered: '2020-03-03 09:23',
            machines: ['프래스 01, 프래스 02'],
            products: '알루미늄 나사',
            amount: 100000,
            profile_img: "",
            worker: "홍길동 대리",
            comments: 2
            }, 
            {
                pk: '1d2f3314213',
                title: '작업 099',
                status: 'share',
                registered: '2020-03-03 09:23',
                machines: ['프래스 01, 프래스 02, 프래스 02'],
                products: '플라스틱 케이스',
                amount: 100000,
                profile_img: "",
                worker: "홍길동 대리",
                comments: 2
                }, 
                
                {
                    pk: '4124213f13',
                    title: '작업 001347',
                    status: 'ready',
                    registered: '2020-03-03 09:23',
                    machines: ['프래스 01, 프래스 02'],
                    products: '플라스틱 케이스',
                    amount: 100000,
                    profile_img: "",
                    worker: "홍길동 대리",
                    comments: 2
                    }, 

]

}