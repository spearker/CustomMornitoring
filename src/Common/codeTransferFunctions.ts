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