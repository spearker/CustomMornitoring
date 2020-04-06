export const machineCodes = [
    {code: 1, name: '프레스'},
    {code: 2, name: '로봇'},
    {code: 3, name: '용접기'},
    {code: 4, name: '밀링'},
    {code: 5, name: '선반'},
    {code: 6, name: '탭핑기'},
    {code: 0, name: '기타(분류없음)'},
]


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
            return ['(선택없음)', '미스피드']
        default:
            return ['(선택없음)', '미스피드']
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

export const machineCodeToName = (value, leng) =>{
    
    let str: string | undefined = '';
    machineCodes.forEach((v: {code: number, name: string},i)=>{
        if (v[i].code === value){
            str = v[i].name
        }
    })
    return str;
}

export const machineStringToCode = (value, leng) =>{
   
    let str: string | undefined = '';

    machineCodes.forEach((v: {code: number, name: string},i)=>{
        if (v[i].name === value){
            str = v[i].code
        }
    })
    return str;
}



