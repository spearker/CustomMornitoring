import React, {useEffect} from 'react'
import {POINT_COLOR} from '../../Common/configset'

//페이지 헤더
interface IProps {
  title: string,
}

const ListHeader = ({title}: IProps) => {
  useEffect(() => {

  }, [])

  return (

    <div style={{textAlign: 'left',}}>
      <p className="p-bold"
         style={{fontSize: 18, color: POINT_COLOR, paddingLeft: 3, marginBottom: 6, marginTop: 12}}> {title}
      </p>
    </div>

  )
}


export default ListHeader
