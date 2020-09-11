import React, { useEffect , useRef, useState} from 'react';
import Styled from 'styled-components'
import useOnclickOutside from 'react-cool-onclickoutside';

/*
다음과 같은 형태의 배열이 들어올때 사용
[
    {
        pk: value...
        name: 공장....
    },
    {...},...
]
*/
interface IProps{
    select: any,
    textKey: string,
    onClickEvent: any
    contents: any,
}
const ArrayDataDropdown = ({select, contents, textKey, onClickEvent}: IProps) => {
    
    //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
    
    const [isOpen, setIsOpen] = useState(false);
    
    const ref = useOnclickOutside(() => {
        setIsOpen(false);
      });
   
    const handleClickBtn = () => {
        setIsOpen(!isOpen);
    };
    useEffect(()=>{
    
    },[])

  return ( 
        <div style={{position:'relative', display:'inline-block', width: 124, zIndex:3 }} ref={ref}>
            {
                isOpen ?       
                <BoxWrap>
                    <p style={{paddingBottom:8, paddingRight:10, color:'black', fontWeight:'bold'}} onClick={()=>{
                                setIsOpen(false)
                                }}>{select !== null ? select[textKey] : '(선택)'}</p>
                    {
                        contents.map((v: { [x: string]: React.ReactNode; }, i: string | number | undefined)=>{
                            return(
                            <p style={{paddingBottom:8, paddingRight:10}} key={i} onClick={()=>{
                                onClickEvent(v); 
                                setIsOpen(false)
                                }}>{v[textKey]}</p>
                            )       
                        })
                    }
                </BoxWrap>
                :
                <>
                <BoxWrap>
                    <p onClick={()=>{setIsOpen(true)}} style={{marginRight:10}}>{select !== null ? select[textKey] : '(선택)'}</p>
                </BoxWrap>
                </>
            }
             <a style={{position:'absolute', top:4, right:6, cursor:'pointer'}} onClick={handleClickBtn}>
                 
            </a>
        </div> 
  );
}

const BoxWrap = Styled.div`
    padding: 4px 12px 4px 12px;
    font-size: 13px;
    top: 0;
    cursor: pointer;
    left: 0;
`


export default ArrayDataDropdown;
