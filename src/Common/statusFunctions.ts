export const changeStatusToString = ((status: string | undefined)=>{
    if(status === 'active'){
        return '진행'
    }else if(status === 'done'){
        return '완료'
    }else if(status === 'stop'){
        return '중지'
    }else if(status === 'share'){
        return '공유'
    }else if(status === 'ready' ||status === 'normal'  ){
        return '대기'
    }else if(status === 'off'){
        return '꺼짐'
    } else if(status === 'error'){
        return '에러'
    }else if(status ==='reservation'){
        return '예약'
    }else{
        return '없음'
    }

})

export const changeStatusToColor = ((status: string | undefined)=>{
    if(status === 'active'){
        return '#25b4b4'
    }else if(status === 'done'){
        return '#2760ff'
    }else if(status === 'stop'){
        return '#fd6b00'
    }else if(status === 'error'){
        return '#ff461a'
    }else if(status === 'share'){
        return '#683be5'
    }else if(status === 'ready'){
        return '#717c90'
    }else if(status === 'reservation'){
        return '#f8a506'
    }else{
        return '#b3b3b3'
    }

})