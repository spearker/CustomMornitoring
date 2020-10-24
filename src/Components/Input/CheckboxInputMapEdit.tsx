import React, {useEffect} from "react";
import Styled from "styled-components";
import IMG_CHECK from "../../Assets/Images/check.png";

interface IProps {
  pkKey: string;
  nameKeys: any[];
  onChangeEvent: any;
  checked: boolean;
  contents: any,
}
const CheckboxInput = ({ contents, pkKey, checked, nameKeys, onChangeEvent }: IProps) => {

    useEffect(() => {}, []);

  return (

          <CheckList>
            <input
              type="checkbox"
              id={`cb-${contents[pkKey]}`}
              readOnly
              checked={checked}
              onClick={() => onChangeEvent(contents[pkKey])} //value.pk 전달
            />
            <label htmlFor={`cb-${contents[pkKey]}`}></label>
            <span>
                {contents.pk}
            </span>
          </CheckList>

  );
};

const CheckList = Styled.div`
    display: flex;
    padding: 6px 10px 6px 10px;
    span{
        padding-left: 13px;
    }
    input[type="checkbox"] + label {
        display: inline-block;
        width: 18px;
        height: 18px;
        border: 0/* 1.5px solid #00000040 */;
        cursor: pointer;
      }
    input[type="checkbox"]:checked + label {
        background: url(${IMG_CHECK}) left/18px no-repeat; 
    }
    input[type="checkbox"] {
    display: none;
    }
    form label{
    font-size: 10px;
    font-weight: 700;
    }

`;

export default CheckboxInput;
