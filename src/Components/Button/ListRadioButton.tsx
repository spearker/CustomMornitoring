import React, {useEffect} from 'react'
import {Radio} from 'semantic-ui-react'

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps {
  nameList: string[],
  data: boolean[],
  onClickEvent?: (i: number) => void,

}

const ListRadioButton = ({nameList, data, onClickEvent}: IProps) => {
  useEffect(() => {

  }, [])

  return (
    <div>
      <div style={{height: 40, minWidth: 200, maxWidth: 300}}>
        {
          nameList.length > 0 && nameList.map((v, i) => {
            return <Radio type={'radio'} label={'1\t' + v} style={{
              height: 40, label: {
                marginLeft: 20
              }
            }}
                          checked={data[i]} onClick={() => {
              onClickEvent && onClickEvent(i)
            }}/>
          })
        }
      </div>
    </div>
  )
}


export default ListRadioButton

