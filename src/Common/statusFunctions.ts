export const changeStatusToString = ((status: number | undefined) => {
  console.log(status)
  if (status === 11) {
    return '진행'
  }/*else if(status === 'done'){
        return '완료'
    }else if(status === 'stop'){
        return '중지'
    }else if(status === 'share'){
        return '공유'
    }*/ else if (status === 10) {
    return '대기'
  }/*else if(status === 'off'){
        return '꺼짐'
    } */ else if (status === 0) {
    return '에러'
  }/*else if(status ==='reservation'){
        return '예약'
    }else if(status ==='ok'){
        return '정상'
    }*/ else if (status === -1) {
    return '꺼짐'
  } else {
    return '에러'
  }

})

export const changeStatusToColor = ((status: number | undefined) => {
  if (status === 11) {
    return '#70ff17'
  } else if (status === 10) {
    return '#ffdd1f'
  }/*else if(status === 'stop'){
        return '#fd6b00'
    }*/ else if (status === 0) {
    return '#ff461a'
  } else if (status === -2) {
    return '#19b9df'
  }/*else if(status === 'ready'){
        return '#717c90'
    }*/ else if (status === -1) {
    return '#b3b3b3'
  } else {
    return '#ff461a'
  }

})

export const changeDashboardStatusToColor = ((status: number | undefined) => {
  if (status === 11) {
    return '#25b4b4'
  } else if (status === 10) {
    return '#2660fd'
  }/*else if(status === 'stop'){
        return '#fd6b00'
    }*/ else if (status === 0) {
    return '#ff461a'
  } else if (status === 16) {
    return '#dd4bbe'
  }/*else if(status === 'ready'){
        return '#717c90'
    }else if(status === 'reservation'){
        return '#f8a506'
    }*/ else {
    return '#b3b3b3'
  }

})
