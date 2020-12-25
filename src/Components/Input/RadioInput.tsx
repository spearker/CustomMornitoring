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
}

const RadioInput = ({title, target, contents, onChangeEvent, opacity, width}: IProps) => {
    useEffect(() => {

    }, [])
    return (

        <InputContainer title={title} width={width}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                {
                    contents.map((v, i) => {
                        return (
                            opacity ?
                                <div key={i} style={{opacity: target === v.value ? 1 : 0.3}}>
                                    <input type="radio" id={`rd${i}`} name="type"
                                           checked={target === v.value ? true : false}
                                           onClick={(e) => onChangeEvent === null ? null : onChangeEvent(v.value)}/>
                                    <label htmlFor={`rd${i}`}></label>
                                    <span style={{paddingLeft: 4, fontSize: 14, marginRight: 20,}}>{v.title}</span>
                                </div>
                                :
                                <div key={i} style={{display: 'flex', justifyContent: 'center'}}>
                                    <input type="radio" id={`rd${i}`} name="type"
                                           checked={target === v.value ? true : false}
                                           onClick={(e) => onChangeEvent === null ? null : onChangeEvent(v.value)}/>
                                    <label htmlFor={`rd${i}`}></label>
                                    <span style={{
                                        paddingLeft: 4,
                                        fontSize: 14,
                                        marginRight: 20,
                                        paddingTop: width ? 5 : 0
                                    }}>{v.title}</span>
                                </div>
                        )
                    })
                }
            </div>
        </InputContainer>
    );
}


export default RadioInput;
