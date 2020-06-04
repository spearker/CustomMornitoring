export const dataSet = {
    cmsSeries: [
        {
            name: '프레스 1',
            data: [
                ['2020-01-01', 140],
                ['2020-01-02', 210],
                ['2020-01-03', 120],
                ['2020-01-04', 230],
                ['2020-01-05', 100],
                ['2020-01-06', 120],
                ['2020-01-07', 200],
                ['2020-01-08', 90],
                ['2020-01-09', 50],
                ['2020-01-10', 90],
                ['2020-01-11', 100],
            ],
            percent: 100,
            ampere: 3000,
        },
        {
            name: '프레스 2',
            data: [
                ['2020-01-01', 1],
                ['2020-01-02', 22],
                ['2020-01-03', 12],
                ['2020-01-04', 34],
                ['2020-01-05', 12],
                ['2020-01-06', 2],
                ['2020-01-07', 27],
                ['2020-01-08', 18],
                ['2020-01-09', 39],
                ['2020-01-10', 10],
                ['2020-01-11', 21],
            ],
            percent: 20,
            ampere: 200,
        },
        {
            name: '프레스 3',
            data: [
                ['2020-01-01', 104],
                ['2020-01-02', 160],
                ['2020-01-03', 190],
                ['2020-01-04', 200],
                ['2020-01-05', 210],
                ['2020-01-06', 160],
                ['2020-01-07', 160],
                ['2020-01-08', 100],
                ['2020-01-09', 90],
                ['2020-01-10', 40],
                ['2020-01-11', 10],
            ],
            percent: 200,
            ampere: 4000,
        },
        {
            name: '프레스 4',
            data: [
                ['2020-01-01', 190],
                ['2020-01-02', 123],
                ['2020-01-03', 111],
                ['2020-01-04', 223],
                ['2020-01-05', 212],
                ['2020-01-06', 177],
                ['2020-01-07', 182],
                ['2020-01-08', 112],
                ['2020-01-09', 60],
                ['2020-01-10', 78],
                ['2020-01-11', 12],
            ],
            percent: 200,
            ampere: 4000,
        }
    ],
    cmsPower: {
        today: {
            percent: 80,
            ampere: 800000
        },
        yesterday: {
            percent: 60,
            ampere: 600000
        },
        average: 90
    },
    processList:[
        {
            pk: 'deqwqdwqwd',
            name: '공정 01',
            material: {pk:'q312r3f', material_name:'알루미늄 판', stock:2390},
            output:{pk:'q312r3f', material_name:'케이스 하판', stock:127},
            machine: {
                pk: 'deqwqdwqwd',
                machine_code:'0002-30-234',
                machine_name:'심팩 프레스',
                is_connect: true,
                status: 'active',
                photo:'',
            },
            mold_name:"케이스 금형",
         
        },
        {
            pk: 'd32f23f332wd',
            name: '공정 03',
            material: {pk:'wqf241w', material_name:'케이스 하판', stock:127},
            output:{pk:'qfw3124', material_name:'오픈형 케이스', stock:24},
            machine: {
                pk: 'deqwqdwqwd',
                machine_code:'0002-30-234',
                machine_name:'심팩 레이저',
                is_connect: false,
                status: 'ready',
                photo:'',
            },
            mold_name:"케이스 금형",
       
        },
        {
            pk: 'qwnjklefklw',
            name: '공정 03',
            material: {pk:'q31124', material_name:'오픈형 케이스', stock:24},
            output:{pk:'q3121140r3f', material_name:'오픈형 케이스 완제품', stock:12},
            machine: {
                pk: 'deqwqdwqwd',
                machine_code:'0002-30-234',
                machine_name:'심팩 인쇄기',
                is_connect: true,
                status: 'done',
                photo:'',
            },
            mold_name:"로고 각인",
           
        },
        {
            pk: 'qwnjklefefklw',
            name: '공정 03',
            material: {pk:'q31124', material_name:'오픈형 케이스', stock:24},
            output:{pk:'q3121140r3f', material_name:'오픈형 케이스 완제품', stock:12},
            machine: {
                pk: 'deqwqdwqwd',
                machine_code:'0002-30-234',
                machine_name:'심팩 인쇄기',
                is_connect: true,
                status: 'active',
                photo:'',
            },
            mold_name:"로고 각인",
     
        },
        {
            pk: 'qb342gt24',
            name: '공정 03',
            material: {pk:'q31124', material_name:'오픈형 케이스', stock:24},
            output:{pk:'q3121140r3f', material_name:'오픈형 케이스 완제품', stock:12},
            machine: {
                pk: 'deqwqdwqwd',
                machine_code:'0002-30-234',
                machine_name:'심팩 인쇄기',
                is_connect: true,
                status: 'active',
                photo:'',
            },
            mold_name:"로고 각인",
    
        },
        {
            pk: '64266e4h6362',
            name: '공정 03',
            material: {pk:'q31124', material_name:'오픈형 케이스', stock:24},
            output:{pk:'q3121140r3f', material_name:'오픈형 케이스 완제품', stock:12},
            machine: {
                pk: 'deqwqdwqwd',
                machine_code:'0002-30-234',
                machine_name:'심팩 인쇄기',
                is_connect: true,
                status: 'active',
                photo:'',
            },
            mold_name:"로고 각인",
           
        },
        {
            pk: 'qwefqew9899',
            name: '공정 03',
            material: {pk:'q31124', material_name:'오픈형 케이스', stock:24},
            output:{pk:'q3121140r3f', material_name:'오픈형 케이스 완제품', stock:12},
            machine: {
                pk: 'deqwqdwqwd',
                machine_code:'0002-30-234',
                machine_name:'심팩 인쇄기',
                is_connect: true,
                status: 'active',
                photo:'',
            },
            mold_name:"로고 각인",
     
        },

    ],
    recommendList:[
        [
            {
                pk: 'qwefqew9899',
                name: '공정 03',
                material: {pk:'q31124', material_name:'오픈형 케이스', stock:24},
                output:{pk:'q3121140r3f', material_name:'오픈형 케이스 완제품', stock:12},
                machine: {
                    pk: 'deqwqdwqwd',
                    machine_code:'0002-30-234',
                    machine_name:'심팩 인쇄기',
                    is_connect: true,
                    status: 'active',
                    photo:'',
                },
                mold_name:"로고 각인",
         
            },
            {
                pk: 'qwefqew9899',
                name: '공정 03',
                material: {pk:'q31124', material_name:'오픈형 케이스', stock:24},
                output:{pk:'q3121140r3f', material_name:'오픈형 케이스 완제품', stock:12},
                machine: {
                    pk: 'deqwqdwqwd',
                    machine_code:'0002-30-234',
                    machine_name:'심팩 인쇄기',
                    is_connect: true,
                    status: 'active',
                    photo:'',
                },
                mold_name:"로고 각인",
         
            },

            {
                pk: 'qwefqew9899',
                name: '공정 03',
                material: {pk:'q31124', material_name:'오픈형 케이스', stock:24},
                output:{pk:'q3121140r3f', material_name:'오픈형 케이스 완제품', stock:12},
                machine: {
                    pk: 'deqwqdwqwd',
                    machine_code:'0002-30-234',
                    machine_name:'심팩 인쇄기',
                    is_connect: true,
                    status: 'active',
                    photo:'',
                },
                mold_name:"로고 각인",
         
            },

            {
                pk: 'qwefqew9899',
                name: '공정 03',
                material: {pk:'q31124', material_name:'오픈형 케이스', stock:24},
                output:{pk:'q3121140r3f', material_name:'오픈형 케이스 완제품', stock:12},
                machine: {
                    pk: 'deqwqdwqwd',
                    machine_code:'0002-30-234',
                    machine_name:'심팩 인쇄기',
                    is_connect: true,
                    status: 'active',
                    photo:'',
                },
                mold_name:"로고 각인",
         
            },
    
    
        ],
        [
            {
                pk: 'qwefqew9899',
                name: '공정 03',
                material: {pk:'q31124', material_name:'오픈형 케이스', stock:24},
                output:{pk:'q3121140r3f', material_name:'오픈형 케이스 완제품', stock:12},
                machine: {
                    pk: 'deqwqdwqwd',
                    machine_code:'0002-30-234',
                    machine_name:'심팩 인쇄기',
                    is_connect: true,
                    status: 'active',
                    photo:'',
                },
                mold_name:"로고 각인",
         
            },
            {
                pk: 'qwefqew9899',
                name: '공정 03',
                material: {pk:'q31124', material_name:'오픈형 케이스', stock:24},
                output:{pk:'q3121140r3f', material_name:'오픈형 케이스 완제품', stock:12},
                machine: {
                    pk: 'deqwqdwqwd',
                    machine_code:'0002-30-234',
                    machine_name:'심팩 인쇄기',
                    is_connect: true,
                    status: 'active',
                    photo:'',
                },
                mold_name:"로고 각인",
         
            },

            {
                pk: 'qwefqew9899',
                name: '공정 03',
                material: {pk:'q31124', material_name:'오픈형 케이스', stock:24},
                output:{pk:'q3121140r3f', material_name:'오픈형 케이스 완제품', stock:12},
                machine: {
                    pk: 'deqwqdwqwd',
                    machine_code:'0002-30-234',
                    machine_name:'심팩 인쇄기',
                    is_connect: true,
                    status: 'active',
                    photo:'',
                },
                mold_name:"로고 각인",
         
            },

            {
                pk: 'qwefqew9899',
                name: '공정 03',
                material: {pk:'q31124', material_name:'오픈형 케이스', stock:24},
                output:{pk:'q3121140r3f', material_name:'오픈형 케이스 완제품', stock:12},
                machine: {
                    pk: 'deqwqdwqwd',
                    machine_code:'0002-30-234',
                    machine_name:'심팩 인쇄기',
                    is_connect: true,
                    status: 'active',
                    photo:'',
                },
                mold_name:"로고 각인",
         
            },
    
    
        ],

    ],
    commentList:[
        {
            pk: "1wdwqf123e",
            name: "홍길동 대리",
            profile: "",
            detail : "내용 내용 내용..",
            file_url: "http://다운주소",
        },
        {
            pk: "dhkkhkh1kh2d",
            name: "김둘리 과장",
            profile: "",
            detail : "내용 내용 내용 내용..",
            file_url: "",
        },
    ],
    status:[
        {
            pk: "1wdqqwcewvvwe",
            status: "active",
            group: "개별",
            name : "장치 장치..",
            code: "314128498",
            manufacturer : "(주)제조사",
            manufacturer_code : "21441214",
            is_connect : true
        },
        {
            pk: "1wdqqwcewvvwe",
            status: "active",
            group: "개별",
            name : "장치 장치..",
            code: "314128498",
            manufacturer : "(주)제조사",
            manufacturer_code : "21441214",
            is_connect : false
        },
        {
            pk: "1wdqqwcewvvwe",
            status: "error",
            group: "개별",
            name : "장치 장치..",
            code: "314128498",
            manufacturer : "(주)제조사",
            manufacturer_code : "21441214",
            is_connect : true
        },
        {
            pk: "1wdqqwcewvvwe",
            status: "ready",
            group: "라인 01",
            name : "장치 장치..",
            code: "314128498",
            manufacturer : "(주)제조사",
            manufacturer_code : "21441214",
            is_connect : false
        },
        {
            pk: "1wdqqwcewvvwe",
            status: "reservation",
            group: "라인 02",
            name : "장치 장치..",
            code: "314128498",
            manufacturer : "(주)제조사",
            manufacturer_code : "21441214",
            is_connect : true
        },
        {
            pk: "1wdqqwcewvvwe",
            status: "active",
            group: "개별",
            name : "장치 장치..",
            code: "314128498",
            manufacturer : "(주)제조사",
            manufacturer_code : "21441214",
            is_connect : true
        }
        
    ],
    moldList:[
        {
        pk:'2cq2321',
        manufacturer:'(주)제조사',
        product_code:'0004123',
        mold_name:'금형.. 금형...',
        mold_label:'사출',
        mold_code:'20412942',

        },
        {
            pk:'cal32921',
            manufacturer:'(주)제조사',
            product_code:'00002234',
            mold_name:'금형.. 금형...',
            mold_label:'사출',
            mold_code:'6992310',
    
            },
        
    ],
    productList:[
        {
        pk:'2cq2321',
        product_name:'자재 0001',
        product_code:'12043242',
        molds:['금형1','금형2'],
        product_spec:'스펙...스펙...스펙...',
       
        stock:21421
        },
        {
        pk:'2cqqef2321',
        product_name:'자재 0002',
        product_code:'12043242',
        molds:['금형1','금형3','금형5','금형12'],
        product_spec:'스펙...스펙...스펙...',
 
        stock:600
        }
    ],
  
    materialList:[
        {
        pk:'2cq2321',
        material_name:'자재 0001',
        material_code:'12043242',
        material_spec:'스펙...스펙...스펙...',
        distributor:'(주)유통',
        stock:21421
        },
        {
        pk:'2cqqef2321',
        material_name:'자재 0002',
        material_code:'12043242',
        material_spec:'스펙...스펙...스펙...',
        distributor:'(주)유통',
        stock:600
        }
    ],
    loadMonitoring:[
        {
            pk:"32w23f2fq",
            status: "active",
            is_connect: true,
            group:"라인1",
            name:"cs-2000",
            value:300,
            max_value:600,
            average_value:320,
        },
        {
            pk:"32w23qewfd312fq",
            status: "active",
            is_connect: false,
            group:"개별",
            name:"cs-2000",
            value:220,
            max_value:540,
            average_value:532,
        },

        
    ],

    pressMonitoring:[
        {
            pk:"32f4212csdf32fq",
            status: "active",
            group:"라인1",
            name:"cs-2000",
            spm:3,
            angle:0,
            current:0.0,
            loadtone:0,
            temperature:0,
            keycam_status:"off",
            motor_status:"off",
            error:true,
            live_time: "00:00:00",
            rest_time: "00:00:00"
        },
        {
            pk:"1424f370002fq",
            status: "active",
            group:"라인1",
            name:"cs-2000",
            spm:3,
            angle:0,
            current:0.0,
            loadtone:0,
            temperature:0,
            keycam_status:"off",
            motor_status:"off",
            error:true,
            live_time: "00:00:00",
            rest_time: "00:00:00"
        },
        {
            pk:"32f4f3wwd1q2fq",
            status: "done",
            group:"개별",
            name:"cs-2000",
            spm:3,
            angle:0,
            current:0.0,
            loadtone:0,
            temperature:0,
            keycam_status:"off",
            motor_status:"off",
            error:true,
            live_time: "00:00:00",
            rest_time: "00:00:00"
        },
        {
            pk:"f23f3",
            status: "error",
            group:"라인1",
            name:"cs-2000",
            spm:3,
            angle:0,
            current:0.0,
            loadtone:0,
            temperature:0,
            keycam_status:"off",
            motor_status:"off",
            error:true,
            live_time: "00:00:00",
            rest_time: "00:00:00"
        },
        {
            pk:"32bterbsew2fq",
            status: "ready",
            group:"라인1",
            name:"cs-2000",
            spm:3,
            angle:0,
            current:0.0,
            loadtone:0,
            temperature:0,
            keycam_status:"off",
            motor_status:"off",
            error:true,
            live_time: "00:00:00",
            rest_time: "00:00:00"
        },
        {
            pk:"wqdwqfge232",
            status: "stop",
            group:"라인1",
            name:"cs-2000",
            spm:3,
            angle:0,
            current:0.0,
            loadtone:0,
            temperature:0,
            keycam_status:"off",
            motor_status:"off",
            error:true,
            live_time: "00:00:00",
            rest_time: "00:00:00"
        },
        {
            pk:"32f4f24tg2w2v32fq",
            status: "active",
            group:"라인1",
            name:"cs-2000",
            spm:3,
            angle:0,
            current:0.0,
            loadtone:0,
            temperature:0,
            keycam_status:"off",
            motor_status:"off",
            error:true,
            live_time: "00:00:00",
            rest_time: "00:00:00"
        }
    ],
    
    searchedMemmber:[
        {
            pk:'w36464mlfqw',
            name:'홍길동',
            appointment:'대리',
            profile_img:'',
        },
        {
            pk:'5235fqw',
            name:'김둘리',
            appointment:'과장',
            profile_img:'',
        },{
            pk:'235sdkqmlfqw',
            name:'고길동',
            appointment:'사원',
            profile_img:'',
        }

    ],
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
            status: 'active',
            attached_to: '라인 31',
            photo : "",
            is_connect: false,
        },
        {
            pk: 'qjdku1294103902',
            name: '심팩 프레스',
            status: 'active',
            attached_to: '라인 9',
            photo : "",
            is_connect: true,
        },
        {
            pk: 'vmrlmeijrqjr314',
            name: '심팩 프레스',
            status: 'active',
            attached_to: "",
            photo : "",
            is_connect: false,
        },
        {
            pk: 'de23r33928ud912',
            name: '시즐 피더',
            status: 'done',
            attached_to: '라인 1',
            photo : "",
            is_connect: true,
        },
        {
            pk: 'de23r33928ud912',
            name: '시즐 피더',
            status: 'error',
            attached_to: "",
            photo : "",
            is_connect: true,
        },
        {
            pk: 'de23r33928ud912',
            name: '시즐 피더',
            status: 'done',
            attached_to: "",
            photo : "",
            is_connect: true,
        },

        
    ],
    subMachineList : [
    {
        pk:'wdqdwdwqdqw',
        device_name: "장비 장비...",
        device_label: "종류 종류..",
        device_code: "K934219",
        manufacturer: "심팩",
        manufacturer_code: "S02424",
        is_registerd: true,

        
    },
    {
        pk:'wdqdwdwewdwqqdqw',
        device_name:  "장비 장비...",
        device_label: "종류 종류..",
        device_code: "K7231859",
        manufacturer: "심팩",
        manufacturer_code: "S02424",
        is_registerd: false,
        
    },
    {
        pk:'wdqd23ff32qw',
        device_name:  "장비 장비...",
        device_label: "종류 종류..",
        device_code: "K9123019",
        manufacturer: "심팩",
        manufacturer_code: "S02424",

        is_registerd: false,
    },
    {
        pk:'w32ff2',
        device_name:  "장비 장비...",
        device_label: "종류 종류..",
        device_code: "K032193",
        manufacturer: "심팩",
        manufacturer_code: "S02424",
        is_registerd: false,
        
    },

],
machineList : [
    {
        pk:'142u41ou24o21',
        machine_name: "기계 기계 기계 ",
        machine_label: "종류..",
        manufacturer: "심팩",
        manufacturer_code: "S02424",
        is_registered : false
        
    },
    {
        pk:'01n29xo21',
        machine_name: "기계 기계...",
        machine_label: "종류 종류..",
        machine_code: "K7231859",
        manufacturer: "심팩",
        is_registered : false
        
    },
    {
        pk:'756hgbt3421',
        machine_name: "기계 기계...",
        machine_label: "종류 종류..",
        manufacturer: "심팩",
        manufacturer_code: "S02424",
        is_registered : true
        
    },
    {
        pk:'142uf2334o21',
        machine_name: "기계 기계...",
        machine_label: "종류 종류..",
        manufacturer: "심팩",
        manufacturer_code: "S02424",
        is_registered : false
        
    },

],
lineList : [
   {
       pk:'2121ee212e1',
        line_code: 'L124414',
        line_detail: '라인 정보 라인 정보...',
        item_list: [
            {
                pk: 'ny564n4n334n',
                name: '시즐 피더',
                status: 'done',
                attached_to: "",
                photo : "",
                is_connect: true,
            },
            {
                pk: 'de23r3397674d912',
                name: '시즐 피더',
                status: 'done',
                attached_to: "",
                photo : "",
                is_connect: true,
            },
            {
                pk: 'de23r33928ud912',
                name: '시즐 피더',
                status: 'done',
                attached_to: "",
                photo : "",
                is_connect: true,
            },
            {
                pk: '12grsg33928ud912',
                name: '시즐 피더',
                status: 'done',
                attached_to: "",
                photo : "",
                is_connect: true,
            },
            {
                pk: 'de22353912',
                name: '시즐 피더',
                status: 'done',
                attached_to: "",
                photo : "",
                is_connect: true,
            },
            {
                pk: 'de28gvresgd912',
                name: '시즐 피더',
                status: 'done',
                attached_to: "",
                photo : "",
                is_connect: true,
            },
            {
                pk: 'de2wqqdwwdqqwd12',
                name: '시즐 피더',
                status: 'done',
                attached_to: "",
                photo : "",
                is_connect: true,
            },
        ]
    },
    {
        pk:'35g53g42g4221',
        line_code: 'L8898214',
        line_detail: '라인 정보 라인 정보...',
        item_list: [
            {
                pk: 'de23r33928ud912',
                name: '시즐 피더',
                status: 'done',
                attached_to: "",
                photo : "",
                is_connect: true,
            },
            {
                pk: 'de275684512',
                name: '시즐 피더',
                status: 'done',
                attached_to: "",
                photo : "",
                is_connect: true,
            },
            {
                pk: 'rgdqw2',
                name: '시즐 피더',
                status: 'done',
                attached_to: "",
                photo : "",
                is_connect: true,
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
maintenanceList:[
    {
        pk:'123252332',
        type:'mold',
        name:'A 보전 정책',
        term:15,
    },
    {
        pk:'123f32f322',
        type:'mold',
        name:'B 보전 정책',
        term:180,
    },
    {
        pk:'123223f232',
        type:'mold',
        name:'C 보전 정책',
        term:30,
    },
],
taskList:[
{
        
    pk: '21e1d2f33f13',
    title: '작업 001304',
    status: 'share',
    process: ['공정1', '공정3', '공정10', '공정21'],
    output_name: '플라스틱 케이스',
    amount: 1000,
    worker:{
        name:"김둘리",
        photo:"",
        appointment:"사원",
    },
    comments: 3
}, 
{
        
    pk: 'rwbsy6wrg32g2',
    title: '작업 001304',
    status: 'active',
    process: ['공정1', '공정3',],
    output_name: '플라스틱 케이스',
    amount: 300,
    worker:{
        name:"홍길동",
        photo:"",
        appointment:"사원",
    },
    comments: 2
}, 
{
        
    pk: 'weg34ty2gg32w',
    title: '작업 001304',
    status: 'done',
    process: ['공정19'],
    output_name: '플라스틱 케이스',
    amount: 29,
    worker:{
        name:"홍길동",
        photo:"",
        appointment:"대리",
    },
    comments: 0
}, 
{
        
    pk: '21e1653g3',
    title: '작업 001304',
    status: 'ready',
    process: ['공정18', '공정2', '공정3', '공정4'],
    output_name: '플라스틱 케이스',
    amount: 3100,
    worker:{
        name:"홍길동",
        photo:"",
        appointment:"과장",
    },
    comments: 2
}, 
{
        
    pk: '21e1d42333f13',
    title: '작업 001304',
    status: 'error',
    process: [' 공정7, 공정10, 공정11'],
    output_name: '플라스틱 케이스',
    amount: 760,
    worker:{
        name:"고길동",
        photo:"",
        appointment:"대리",
    },
    comments: 8
}, 
]

}