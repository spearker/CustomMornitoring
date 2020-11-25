import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Styled from 'styled-components'

// 수정하기/ 리스트보기 버튼

interface IProps{
    nameList: string[]
    colorList: ColorList[] 
    width?: string[] 
    onClickEventList: any[]
}

interface ColorList{
    text: string,
    bg: string
}

const ManyButton = ({ nameList, colorList, onClickEventList, width }: IProps) => {
  const history = useHistory();

  return (
    <ButtonBox style={{maxWidth: `${width ? width : '468px'}`}}>
        {
            nameList.map((v,i) => (
                <div key={`buttons${i}`}
                    style={{width: `calc(100%/${nameList.length} - 19.5px*${nameList.length-1}/${nameList.length})` , color: `${colorList[i].text ? colorList[i].text : '#0d0d0d'}`, backgroundColor: `${colorList[i].bg ? colorList[i].bg : '#19b9df'}`}} 
                    onClick={() => {
                        if(onClickEventList[i]){
                            onClickEventList[i]()
                        } else {
                            history.goBack()
                        }
                    }}
                >
                    <p>{v}</p>
                </div>
            ))
        }
    </ButtonBox>
  );
}

const ButtonBox = Styled.div`
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    *{
        box-sizing: border-box;
    }
    &>div{
        cursor: pointer;
        display: inline-block;
        padding: 10px 0;
        border-radius: 6px;
        border: 0;
        font-size: 18px;
        font-weight: bold;
        &:not(:last-child){
            margin-right: 19.5px;
        }
        &>p{
            text-align: center;
        }

    }
`


export default ManyButton;
