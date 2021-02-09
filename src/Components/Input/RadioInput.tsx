import React, {useEffect} from 'react'
import InputContainer from '../../Containers/InputContainer'

//레디오
interface IProps {
  title: string,
  contents: { title: string, value: string | number }[],
  target: number,
  onChangeEvent: any,
  opacity?: boolean
  width?: number
  line?: boolean
  isPadding?: number
  index?: number
  center?: any
  noStringPadding?: boolean
}

const RadioInput = ({title, target, contents, onChangeEvent, opacity, width, line, isPadding, index, center, noStringPadding}: IProps) => {

  return (

    <InputContainer title={title} width={width} line={line} isPadding={isPadding}>
      <div style={{display: 'flex', alignItems: 'center', ...center}}>
        {
          contents.map((v, i) => (
            <>
              {
                opacity ?
                <div key={`${i}${index}`} style={{opacity: target === v.value ? 1 : 0.3}}>
                  <input type="radio" id={`rd${index}${v.title}${i}`} name={`radio-${index}`}
                        checked={target === v.value ? true : false}
                        onClick={(e) => onChangeEvent === null ? null : onChangeEvent(v.value)}/>
                  <label htmlFor={`rd${i}${v.title}${index}`}></label>
                  <span style={{paddingLeft: 4, fontSize: 14, marginRight: 20,}}>{v.title}</span>
                </div>
                :
                <div key={`${i}${index}`} style={{display: 'flex', justifyContent: 'center', ...center}}>
                  <input type="radio" id={`rd${index}${v.title}${i}`} name={`radio-${index}`}
                        checked={target === v.value ? true : false}
                        onClick={() => {
                          if (onChangeEvent === null) {
                            return null
                          } else {
                            onChangeEvent(v.value)
                          }
                        }}/>
                  <label htmlFor={`rd${index}${v.title}${i}`}></label>
                  <span style={{
                    paddingLeft: 4,
                    fontSize: 14,
                    marginRight: 20,
                    paddingTop: width ? noStringPadding ? 0 : 5 : 0
                  }}>{v.title}</span>
                </div>
              }
            </>
          ))
        }
      </div>
    </InputContainer>
  )
}


export default RadioInput
