export const machineCodes = [
    {code: 1, name: '프레스'},
    {code: 2, name: '로봇'},
    {code: 3, name: '용접기'},
    {code: 4, name: '밀링'},
    {code: 5, name: '선반'},
    {code: 6, name: '탭핑기'},
    {code: 0, name: '기타(분류없음)'},
]

export const subMachineCodes = [
   
    {code: 51, name: '미스피드'},
    {code: 52, name: '하사점'},
    {code: 53, name: '로드모니터'},
    {code: 54, name: '앵글시퀀서'},
    {code: 55, name: '엔코더'},
    {code: 56, name: '통과센터'},
    {code: 50, name: '기타(분류없음)'},
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
    {code: 1, name: '최종 생산품'},
    {code: 2, name: '중간 자재'},
    {code: 4, name: 'LOT 자재'},
    
]

export const barcodes = [
    {code: 0, name: '바코드'},
    {code: 1, name: 'QR코드'},
    {code: 2, name: '데이터 매트릭스'},
    
]
export const getMachineTypeList = (lang) =>{
    switch(lang) {
        case 'kor':
            return ['(선택없음)', '프레스', '로봇', '용접기', '밀링', '선반', '탭핑기']
        default:
            return ['(선택없음)', '프레스', '로봇', '용접기', '밀링', '선반', '탭핑기']
      }
}

export const getMaterialTypeList = (lang) =>{
    switch(lang) {
        case 'kor':
            return ['원자재', '최종 생산품', '중간 자재', 'LOT 자재']
        default:
            return ['원자재', '최종 생산품', '중간 자재', 'LOT 자재']
      }
}


export const getSubMachineTypeList = (lang) =>{
    switch(lang) {
        case 'kor':
            return ['(선택없음)', '미스피드', '하사점', '로드모니터', '앵글시퀀서', '엔코더', '통과센서']
        default:
            return ['(선택없음)', '미스피드', '하사점', '로드모니터', '앵글시퀀서', '엔코더', '통과센서']
      }
}

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
            return ['바코드 용도 (기본)', 'QR코드 용도', '데이터 매트릭스']
        default:
            return ['바코드 용도 (기본)', 'QR코드 용도', '데이터 매트릭스']
      }
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
            
    }
   
    return num;
}



