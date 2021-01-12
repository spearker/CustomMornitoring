import * as React from 'react'

//인풋 창 index container

const InputContainer = ({title, children, line, width, isPadding}: any) => {
  return (
    <div style={{
      borderBottom: line === false ? '0px' : 'solid 0.5px #d3d3d3',
      display: 'flex',
      paddingTop: isPadding ? 7 : 17,
      paddingBottom: isPadding ? 7 : 17,
      verticalAlign: 'top'
    }}>
      <p style={{
        fontSize: 14,
        marginTop: 5,
        fontWeight: 700,
        width: width !== undefined ? width : 180,
        display: 'inline-block',
      }}>{title === '' ? ' ' : `• ${title}`}</p>
      {children}
    </div>

  )
}


export default InputContainer
