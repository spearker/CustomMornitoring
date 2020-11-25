import React, {useEffect} from 'react';
import InputContainer from '../../Containers/InputContainer';

//레디오
interface IProps {
    title: string,
    contents: { title: string, value: number }[],
    target: number,
    onChangeEvent: any,
    opacity?: boolean
}

const RadioInput = ({title, target, contents, onChangeEvent, opacity}: IProps) => {
    useEffect(() => {

    }, [])
    return (

        <InputContainer title={title}>
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
                                <div key={i}>
                                    <input type="radio" id={`rd${i}`} name="type"
                                           checked={target === v.value ? true : false}
                                           onClick={(e) => onChangeEvent === null ? null : onChangeEvent(v.value)}/>
                                    <label htmlFor={`rd${i}`}></label>
                                    <span style={{paddingLeft: 4, fontSize: 14, marginRight: 20,}}>{v.title}</span>
                                </div>
                        )
                    })
                }
            </div>
        </InputContainer>
    );
}


export default RadioInput;
