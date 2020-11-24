import React, {useCallback, useEffect, useState} from 'react'
import {TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import Header from '../../Components/Text/Header'
import {getToken} from '../../Common/tokenFunctions'
import 'react-dropdown/style.css'
import {getRequest, postRequest} from '../../Common/requestFunctions'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import {SF_ENDPOINT} from '../../Api/SF_endpoint'
import {Input} from 'antd'
import BasicButton from '../../Components/Button/BasicButton'
import ColorButton from '../../Components/Button/ColorButton'
import BasicColorButton from '../../Components/Button/BasicColorButton'

// 멤버 승인
const CreateMember = () => {

  const [list, setList] = useState<[]>([])
  const [userInfo, setUserInfo] = useState<{ email: string, password: string, name: string }[]>([{
    email: '',
    password: '',
    name: ''
  }])

  const index = {
    email: '성명',
    name: '이메일',
  }

  const onClickAdd = () => {
    let tmpUserInfo = userInfo
    setUserInfo([...tmpUserInfo, {
      email: '',
      password: '',
      name: ''
    }])
  }

  useEffect(() => {

  }, [])

  const onClickCreateMemeber = useCallback(async () => {
    let errorState: boolean = false
    userInfo.map((v, i) => {
      if (v.name === '' || v.email === '' || v.password === '') {
        errorState = true
      }
    })

    if (!errorState) {
      const results = await postRequest(`${SF_ENDPOINT}/api/v1/member/create`, {members: userInfo}, getToken(TOKEN_NAME))

      if (results === false) {
        //alert('승인 실패하였습니다. 관리자에게 문의하세요.')
        //setList([""])
        //TODO: 에러 처리
      } else {
        if (results.status === 200) {
          alert('정상적으로 등록 되었습니다.')
          window.location.href = '/'
        } else {
          //alert('승인 실패하였습니다. 관리자에게 문의하세요.')
        }
      }
    } else {
      alert('모든 칸을 입력해주세요.')
    }

  }, [userInfo])

  return (
    <DashboardWrapContainer index={1}>
      <InnerBodyContainer>
        <div style={{position: 'relative'}}>
          <Header title={'사용자 정보 등록'}/>
        </div>
        <div style={{width: 450}}>
          <table style={{alignSelf: 'center'}}>
            <tr>
              <th></th>
              <th>아이디</th>
              <th>비밀번호</th>
              <th>유저명</th>
            </tr>
            {
              userInfo.map((v, i) => {
                return (
                  <tr>
                    <td>
                      <p>{i + 1}</p>
                    </td>
                    <td>
                      <Input key={`id-${i}`} value={userInfo[i].email} onChange={(e) => {
                        let tmpUserInfo = userInfo

                        tmpUserInfo[i].email = e.target.value

                        setUserInfo([...tmpUserInfo])
                      }}></Input>
                    </td>
                    <td>
                      <Input key={`password-${i}`} type={'password'} value={userInfo[i].password} onChange={(e) => {
                        let tmpUserInfo = userInfo

                        tmpUserInfo[i].password = e.target.value

                        setUserInfo([...tmpUserInfo])
                      }}></Input>
                    </td>
                    <td>
                      <Input key={`name-${i}`} value={userInfo[i].name} onChange={(e) => {
                        let tmpUserInfo = userInfo

                        tmpUserInfo[i].name = e.target.value

                        setUserInfo([...tmpUserInfo])
                      }}></Input>
                    </td>
                  </tr>
                )
              })
            }
          </table>
        </div>
        <div style={{width: 450, display: 'flex', justifyContent: 'space-around', marginTop: 50}}>
          <BasicColorButton name={'추가'} onClickEvent={() => onClickAdd()}/>
          <BasicColorButton name={'등록'} onClickEvent={() => onClickCreateMemeber()}/>
        </div>
      </InnerBodyContainer>
    </DashboardWrapContainer>
  )
}

export default CreateMember
