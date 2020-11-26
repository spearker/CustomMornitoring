import React, {useEffect} from 'react'
import InputContainer from '../../Containers/InputContainer'

//레디오
interface IProps {
  title: string,
  contents: { title: string, value: number }[],
  target: number,
  onChangeEvent: any,
  width?: number
}

const RadioInput = ({title, target, contents, onChangeEvent, width}: IProps) => {
  useEffect(() => {

  }, [])
  return (

    <InputContainer title={title} width={width}>
      <div style={{display: 'flex', alignItems: 'center', height: 20}}>
        {
          contents.map((v, i) => {
            return (
              <div key={i} style={{display: 'flex', justifyContent: 'center'}}>
                <input type="radio" id={`rd${i}`} name="type" checked={target === v.value ? true : false}
                       onClick={(e) => onChangeEvent(v.value)}/>
                <label htmlFor={`rd${i}`}></label>
                <span style={{paddingLeft: 4, fontSize: 14, marginRight: 20, paddingTop: 5}}>{v.title}</span>
              </div>
            )
          })
        }
      </div>
    </InputContainer>
  ) //253, 170, 83
}


export default RadioInput
