import React from 'react'
import Styled from 'styled-components'

// KPI용 겉 메뉴박스

interface IProps {
  menuList: Menu[];
  onChangeEvent: (select: Menu) => void;
  value: Menu;
  children?: any;
}

interface Menu {
  name: string,
  api: string,
  tip: string
}

const KPIMenuBox = ({menuList, onChangeEvent, value, children}: IProps) => {

  const selectStyle = {backgroundColor: '#19b9df50', borderBottom: '2px solid #19b9df', height: '51px'}

  return (
    <div>
      <MenuHeaderList>
        <div>
          {
            menuList.map((v, i) => (
              <MenuItem style={
                value.name === v.name ? selectStyle : {}
              } key={`menuItem${i}`} onClick={() => onChangeEvent(v)}>
                <p style={{fontWeight: value.name === v.name ? 'bold' : 500}}>{v.name}</p>
              </MenuItem>
            ))
          }
        </div>
        <div style={{height: 'auto'}}>
          <pre>
          {
            value.api === 'amount_of_on_process_material'
              ? <p style={{fontSize: 16.5}}>{value.tip}</p>
              : <p>{value.tip}</p>
          }
          </pre>
        </div>
      </MenuHeaderList>
      <div>
        {children}
      </div>
    </div>
  )
}

const MenuHeaderList = Styled.div`
    width: 100%;
    height: auto;
    background-color: #353b48;
    border-radius: 6px 6px 0px 0px;
    padding: 0 16px;
    box-sizing: border-box;
    *{box-sizing: border-box;}
    &>div{
        height: 50%;
        &:first-child{
            display: flex;
        }
        &:nth-child(2){
            text-align: left;
            pre{
              padding: 10px;
              &>p{
                  font-size: 20px;
                  font-family: Noto Sans Kr;
                  color: #19b9df;
                  font-weight: bold;
                  margin: 0;
                  padding: 0;
              }
            }
        }
    }
`
const MenuItem = Styled.div`
    cursor: pointer;
    height: 50px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    &>p{
        font-size: 18px;
        font-weight: 500;
    }
    transition: background-color 0.5s ease-in-out;
`

export default KPIMenuBox
