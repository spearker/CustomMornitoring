



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
        return '#21B0AF'
    }else if(status === 'done'){
        return '#327CFF'
    }else if(status === 'stop'){
        return '#FF6666'
    }else if(status === 'error'){
        return '#FF6666'
    }else if(status === 'share'){
        return '#683be5'
    }else if(status === 'ready'){
        return '#3C3C4A'
    }else if(status === 'reservation'){
        return '#f8a506'
    }else{
        return '#3C3C4A'
    }

})