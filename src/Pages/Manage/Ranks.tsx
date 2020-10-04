import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB, TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import {getToken} from '../../Common/tokenFunctions';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import 'react-dropdown/style.css'
import {getRequest, postRequest} from '../../Common/requestFunctions';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import BTN_UP from '../../Assets/Images/btn_up_rank.png';
import BTN_DOWN from '../../Assets/Images/btn_down_rank.png';
import BTN_DELETE from '../../Assets/Images/btn_delete_rank_g.png';
import {ROUTER_MENU_LIST} from '../../Common/routerset';

const Ranks = () => {

  const [list, setList] = useState<string[]>([""]);

  const index = {
    email:'성명',
    name:'이메일',
  }

  /**
   * onChangeListName()
   * 직급직책 리스트의 이름 변경
   * @param {number} index 리스트의 몇번째 순서
   * @param {string} e.target.value 인풋박스 입력값
   * @returns X
   */
  const onChangeListName = useCallback((e, index)=>{
        console.log(e.target.value)
        const tempList = list.slice();
        tempList[index] = e.target.value;
        console.log(tempList)
        setList(tempList);
  },[list])

  /**
   * onClickModify()
   * 직급직책 서열 수정 및 삭제
   * @param {'UP' | 'DOWN' | 'ADD' | 'DELETE'} action 요청 주소
   * @returns X 리턴데이터, 요청실패(false) 이벤트 처리
   */
  const onClickModify = useCallback((action: 'UP' | 'DOWN' | 'ADD' | 'DELETE', index:number)=> {
    let tempList = list.slice();
    console.log('onclick modi - ' + index)
    console.log(tempList)
    switch(action) {
        case 'UP':
            if(index !== 0){
              console.log('onclick up - ' + index)
              console.log(tempList)
                tempList.splice(index-1, 0, tempList[index])
                tempList.splice(index+1, 1)
            }
            setList(tempList);
          // code block
          break;
        case 'DOWN':
            console.log('down')
            if(index !== tempList.length){
                console.log('down')
                tempList.splice(index+2, 0, tempList[index])
                tempList.splice(index, 1)
            }

            setList(tempList);
          // code block
          break;
        case 'ADD':
            console.log('add')
            tempList.push("");
            setList(tempList);
            break;
        case 'DELETE':
            if(tempList.length <= 1){
                return;
            }
            console.log('delete')
            tempList.splice(index, 1)
            setList(tempList);
          // code block
          break;
        default:
          break;
          // code block
      }

  },[list])

  /**
   * getRankList()
   * 직급직책 자료 조회
   * @param {string} url 요청 주소
   * @returns X 리턴데이터, 요청실패(false) 이벤트 처리
   */
  const getRankList = useCallback(async()=> {
    const results = await getRequest('http://112.186.20.155:8299/api/v1/admin/appointment/list', getToken(TOKEN_NAME))

    if(results === false){
        //setList([""])
      //TODO: 에러 처리
    }else{
      if(results.status === 200){
          if(results.results.length > 0){
           setList(results.results)
          }else{
            //setList([""])
          }
      }else if(results.status === 1001 || results.data.status === 1002){
        //TODO:  아이디 존재 확인
      }else{
        //TODO:  기타 오류
      }
    }
  },[list])

  /**
   * onClickSave()
   * 직급직책 저장
   * @param {string[]} list 직급 배열
   * @returns X 리턴데이터, 요청실패(false) 이벤트 처리
   */
  const onClickSave = useCallback(async()=> {
      if(list.indexOf('') !== -1){
          //alert('직급을 빈칸 없이 입력해주세요.')
          return
      }
      const data = {
        appointments: list
      }
    const results = await postRequest('http://112.186.20.155:8299/api/v1/admin/appointment/update', data ,getToken(TOKEN_NAME))

    if(results === false){
      //alert('직급 업데이트에 실패하였습니다. 관리자에게 문의하세요.')
        //setList([""])
      //TODO: 에러 처리
    }else{
      if(results.status === 200){

        //alert('저장되었습니다')
        getRankList()
      }else{
        //alert('직급 업데이트에 실패하였습니다. 관리자에게 문의하세요.')
      }
    }
  },[list])



  useEffect(()=>{

    //setList(dataSet.acceptList); //TODO: 테스트용. 지울것.
    getRankList();

  },[])

  const onClickAccept = useCallback((id)=>{

    console.log('--select id : ' + id)

  },[])

  return (
      <DashboardWrapContainer index={1}>
          <SubNavigation list={ROUTER_MENU_LIST[1]}/>
          <InnerBodyContainer>
            <div style={{position:'relative'}}>
                <Header title={'직급 관리'}/>
                <div style={{position:'absolute',display:'inline-block',top:0, right:0, zIndex:4}}>
                <ButtonBox onClick={()=>onClickModify('ADD', 0)}>직급생성</ButtonBox>
                <ButtonBox onClick={getRankList}>초기화</ButtonBox>
                <ButtonBox onClick={onClickSave}>저장하기</ButtonBox>
                </div>
            </div>
            <WhiteBoxContainer>
                <div>
                    <p className="p-bold">직급</p>
                    {
                        list.map((v,i)=>{
                            return(
                                <div key={i} style={{display:'flex', marginTop:16}}>
                                    <InputBox value={v} onChange={(e)=>{onChangeListName(e, i)}}/>
                                    <div>
                                      <a onClick={()=>onClickModify('UP', i)}><img style={{height:40, marginRight:10}} src={BTN_UP} /></a>
                                      <a onClick={()=>onClickModify('DOWN', i)}><img src={BTN_DOWN} style={{width:40, marginRight:10}}/></a>
                                      <a onClick={()=>onClickModify('DELETE', i)}><img src={BTN_DELETE} style={{width:40}}/></a>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </WhiteBoxContainer>
          </InnerBodyContainer>
      </DashboardWrapContainer>

  );
}

const InputBox = Styled.input`
    width: 276px;
    height: 40px;
    border: solid 1px #b3b3b3;
    padding-left: 11px;
    font-size: 14px;
    margin-right: 20px;
    font-weight: bold;
    background-color: transparent;
`

const ButtonBox = Styled.button`
    padding: 4px 24px 4px 24px;
    color: white;
    border-radius: 5px;
    background-color: ${BG_COLOR_SUB};
    border: 0;
    font-size: 14px;
    margin-left: 9px;
`
export default Ranks;
