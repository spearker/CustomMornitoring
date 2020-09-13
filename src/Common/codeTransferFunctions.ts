export const getMachineTypeList = (lang) =>{
    switch(lang) {
        case 'kor':
            return ['(선택없음)', '프레스', '로봇', '용접기', '밀링', '선반', '탭핑기']
        default:
            return ['(선택없음)', '프레스', '로봇', '용접기', '밀링', '선반', '탭핑기']
      }
}

export const getSubMachineTypeList = (lang) =>{
    switch(lang) {
        case 'kor':
            return ['(선택없음)', '미스피드', '하사점 검출장치', '로드모니터', '앵글시퀀서', '엔코더', '통과센서']
        default:
            return ['(선택없음)', '미스피드', '하사점 검출장치', '로드모니터', '앵글시퀀서', '엔코더', '통과센서']
      }
}

export const getMaterialTypeList = (lang) =>{
    switch(lang) {
        case 'kor':
            return ['(선택없음)', '원재료', '최종생산품', '중간자재']
        default:
            return ['(선택없음)', '원재료', '최종생산품', '중간자재']
      }
}




export const subMachineCodes = [

    {code: 51, name: '미스피드'},
    {code: 52, name: '하사점'},
    {code: 53, name: '로드모니터'},
    {code: 54, name: '앵글시퀀서'},
    {code: 55, name: '엔코더'},
    {code: 56, name: '통과센터'},
    {code: 50, name: '기타(분류없음)'},
]

export const stockReasonCodes = [

    {code: 0, name: '정상 출고'},
    {code: 1, name: '생산 소진'},
    {code: 2, name: '불량'},
    {code: 3, name: '정상 입고'},
    {code: 4, name: '생산'},
    {code: 9, name: '오류 정정'},
]


export const moldCodes = [

    {code: 0, name: '기타(분류없음)'},
    {code: 1, name: '프레스 금형'},
    {code: 2, name: '사출 금형'},
    {code: 3, name: '단조 금형'},
    {code: 4, name: '다이캐스팅'},
    {code: 5, name: '고무 금형'},
    {code: 6, name: '유리 금형'},
    {code: 7, name: '분말야금'},
    {code: 8, name: '요업 금형'},
    {code: 9, name: '주조 금형'},
]

export const materialCodes = [

    {code: 0, name: '원자재'},
    {code: 30, name: '최종 생산품'},
    {code: 10, name: '중간 자재'},
    {code: 4, name: 'LOT 자재'},

]

export const barcodes = [

    {code: 0, name: '바코드'},
    {code: 1, name: 'QR코드'},
    {code: 2, name: '데이터 매트릭스'},

]

export const processcodes = [
    {code: 0, name: '단발'},
    {code: 1, name: '라인'},
    {code: 4, name: '조립'},
    {code: 5, name: '검수'},
]

export const keycamcodes = [
    {code: 0, name: 'Off'},
    {code: 1, name: '촌동'},
    {code: 2, name: '안전1행정'},
    {code: 3, name: '연속'},
]

export const getMoldTypeList = (lang) =>{
    switch(lang) {
        case 'kor':
            return ['(선택없음)', '프레스 금형', '사출 금형', '단조 금형', '다이캐스팅', '고무 금형', '유리 금형', '분말야금', '요업 금형', '주조금형']
        default:
            return ['(선택없음)', '프레스 금형', '사출 금형', '단조 금형', '다이캐스팅', '고무 금형', '유리 금형', '분말야금', '요업 금형', '주조금형']
      }
}

export const getBarcodeTypeList = (lang) =>{
    switch(lang) {
        case 'kor':
            return ['바코드 (기본)', 'QR코드 용도', '데이터 매트릭스']
        default:
            return ['바코드 (기본)', 'QR코드 용도', '데이터 매트릭스']
      }
}



export const machineCodes = [
    {code: 1, name: '프레스',},
    {code: 2, name: '로봇'},
    {code: 3, name: '용접기'},
    {code: 4, name: '밀링'},
    {code: 5, name: '선반'},
    {code: 6, name: '탭핑기'},
    {code: 0, name: '기타(분류없음)'},
]


export const unitCodes = [
    {code: 0, name:''},
    {code: 1, name: '개'},
    {code: 2, name: '회'},
    {code: 3, name: '℃'},
    {code: 4, name: '°F'},
    {code: 5, name: 'ton'},
    {code: 6, name: 'A'},
    {code: 7, name: 'kW'},
    {code: 8, name: 'W'},
    {code: 9, name: 'spm'},
]

export const statusCodes = [

    {code: 901, name:'가동시간', unit:0},
    {code: 902, name:'비가동시간', unit:0},
    {code: 903, name:'에러', unit:0},
    {code: 904, name:'온도', unit:3},
    {code: 905, name:'운전준비상태', unit:0},
    {code: 906, name:'운전OK상태', unit:0},
    {code: 101, name:'기계측정값', unit:0},
    {code: 102, name:'spm', unit:0},
    {code: 103, name:'키캠상태', unit:0},
    {code: 104, name:'모터상태', unit:0},
    {code: 105, name:'메인전류', unit:6},
    {code: 106, name:'슬라이스전류', unit:6},
    {code: 107, name:'VS(INVERTER)', unit:0},
    {code: 108, name:'로드톤', unit:5},
    {code: 109, name:'전체카운터', unit:0},
    {code: 110, name:'종합카운터', unit:0},
    {code: 111, name:'프리셋카운터', unit:0},
    {code: 112, name:'Angle', unit:0},
    {code: 113, name:'운전모드', unit:0},
    {code: 114, name:'최고 측정값', unit:0},
    {code: 115, name:'평균 측정값', unit:0},

]

export const transferCodeToName = (type, value) =>{

    let str: string | undefined = '';

    if(type === 'machine'){
        machineCodes.forEach((v: {code: number, name: string},i)=>{
            if (v.code === value){
                str = v.name
            }
        })
    }else if(type==='submachine'){
        subMachineCodes.forEach((v: {code: number, name: string},i)=>{
            if (v.code === value){
                str = v.name
            }
        })
    }else if(type==='mold'){
        moldCodes.forEach((v: {code: number, name: string},i)=>{
            if (v.code === value){
                str = v.name
            }
        })
    }else if(type === 'material'){
        materialCodes.forEach((v: {code: number, name: string},i)=>{
            if (v.code === value){
                str = v.name
            }
        })
    }else if(type === 'unit'){
        statusCodes.forEach((v: {code: number, name: string, unit: number},i)=>{
            if (v.code === value){
                const num = v.unit
                unitCodes.forEach((v2: {code: number, name: string},i)=>{
                    if (v2.code === num){
                        str = v2.name
                    }
                })
            }
        })
    }else if(type === 'title'){
        statusCodes.forEach((v: {code: number, name: string},i)=>{
            if (v.code === value){
                str = v.name
            }
        })
    }else if(type === 'barcode'){
        barcodes.forEach((v: {code: number, name: string},i)=>{
            if (v.code === value){
                str = v.name
            }
        })
    }else if(type === 'stock'){
        stockReasonCodes.forEach((v: {code: number, name: string},i)=>{
            if (v.code === value){
                str = v.name
            }
        })
    }else if(type === 'process'){
        processcodes.forEach((v: {code: number, name: string},i)=>{
            if (v.code === value){
                str = v.name
            }
        })
    }else if(type === 'keycam'){
        keycamcodes.forEach((v: {code: number, name: string},i)=>{
            if (v.code === value){
                str = v.name
            }
        })
    }

    return str;
}



export const transferStringToCode = (type, value) =>{

    let num: number | undefined = 0;

    if(type === 'machine'){
        machineCodes.forEach((v: {code: number, name: string},i)=>{
            if (v.name === value){
                num = v.code
            }
        })
    }else if(type === 'submachine'){
        subMachineCodes.forEach((v: {code: number, name: string},i)=>{
            if (v.name === value){
                num = v.code
            }
        })
    }else if(type === 'mold'){
        moldCodes.forEach((v: {code: number, name: string},i)=>{
            if (v.name === value){
                num = v.code
            }
        })
    }else if(type === 'material'){

        materialCodes.forEach((v: {code: number, name: string},i)=>{
            if (v.name === value){
                num = v.code
            }
        })
    }else if(type === 'barcode'){
        barcodes.forEach((v: {code: number, name: string},i)=>{
            if (v.name === value){
                num = v.code
            }})

    }else if(type === 'stock') {
        stockReasonCodes.forEach((v: { code: number, name: string }, i) => {
            if (v.name === value) {
                num = v.code
            }
        })
    }else if(type === 'process'){
        processcodes.forEach((v: { code: number, name: string }, i) => {
            if (v.name === value) {
                num = v.code
            }
        })
    }

    return num;
}


export const machineCodeToName = (type, value, leng) =>{
    let str: string | undefined = '';
    if(type === 'machine'){
        machineCodes.forEach((v: {code: number, name: string},i)=>{
            if (v.code === value){
                str = v.name
            }
        })
    }else if(type==='submachine'){
        subMachineCodes.forEach((v: {code: number, name: string},i)=>{
            if (v.code === value){
                str = v.name
            }
        })
    }else if(type==='mould'){
        moldCodes.forEach((v: {code: number, name: string},i)=>{
            if (v.code === value){
                str = v.name
            }
        })
    }else if(type === 'material'){
        materialCodes.forEach((v: {code: number, name: string},i)=>{
            if (v.code === value){
                str = v.name
            }
        })
    }else if(type === 'barcode'){
        barcodes.forEach((v: {code: number, name: string},i)=>{
            if (v.code === value){
                str = v.name
            }
        })
    }else if(type === 'stock'){
        stockReasonCodes.forEach((v: {code: number, name: string},i)=>{
            if (v.code === value){
                str = v.name
            }
        })
    }else if(type === ''){
        stockReasonCodes.forEach((v: {code: number, name: string},i)=>{
            if (v.code === value){
                str = v.name
            }
        })
    }

    return str;
}



export const machineStringToCode = (type, value, leng) =>{

    let num: number | undefined = 0;

    if(type === 'machine'){
        machineCodes.forEach((v: {code: number, name: string},i)=>{
            if (v.name === value){
                num = v.code
            }
        })
    }else if(type === 'submachine'){
        subMachineCodes.forEach((v: {code: number, name: string},i)=>{
            if (v.name === value){
                num = v.code
            }
        })
    }else if(type === 'mould'){
        moldCodes.forEach((v: {code: number, name: string},i)=>{
            if (v.name === value){
                num = v.code
            }
        })
    }else if(type === 'material'){

        materialCodes.forEach((v: {code: number, name: string},i)=>{
            if (v.name === value){
                num = v.code
            }
        })
    }else if(type === 'barcode'){
        barcodes.forEach((v: {code: number, name: string},i)=>{
            if (v.name === value){
                num = v.code
            }})

    }else if(type === 'stock'){
        stockReasonCodes.forEach((v: {code: number, name: string},i)=>{
            if (v.name === value){
                num = v.code
            }})

    }

    return num;
}



