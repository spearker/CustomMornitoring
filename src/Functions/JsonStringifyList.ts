
export const JsonStringifyList = (list1: any[] = [], list2: any[] = [])=>{

    const temp1 = list1.map((v, i)=>{
        return {title: v.id, value: v.data}
      });
    const temp2 = list2.filter((v, i) => {
        if(v.data){
            return true
        }else{
            return false
        }
    }).map((v, i)=>{
        return {title: v.id, value: v.data}
    });

    const temp = [...temp1, ...temp2]

      alert(temp)
      if(temp.length === 0){
          return null
      }else{

          return temp
      }

}
