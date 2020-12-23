import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {API_URLS as URLS_PRE, getCluchData} from '../../Api/pm/preservation'
import {API_URLS as URLS_MAP} from '../../Api/pm/map'
import MapBoard from '../../Components/Map/MapBoard'
import NoDataCard from '../../Components/Card/NoDataCard'
import {Input} from 'semantic-ui-react'
//@ts-ignore
import Notiflix from 'notiflix'

const ClutchMaintenanceContainer = () => {
  const [selectMachine, setSelectMachine] = useState<string>('0')

  const [selectComponent, setSelectComponent] = useState<string>('')

  const [pk, setPk] = useState<string>('')
  const [data, setData] = useState<IPressClutch>()


  const [postData, setPostData] = useState<({ pk: string, normal_from: string, normal_to: string, change_from: string, change_to: string, danger_from: string, danger_to: string })>({
    pk: '',
    normal_from: '',
    normal_to: '',
    change_from: '',
    change_to: '',
    danger_from: '',
    danger_to: ''
  })

  /**
   * getList()
   * 클러치 정보 불러오기
   */
  const getData = useCallback(async () => {
    const tempUrl = `${URLS_PRE['clutch'].load}`
    const resultData = await getCluchData(tempUrl, postData)
    if (resultData.statement === 3) {
      Notiflix.Report.Warning('범위를 벗어난 데이터입니다.',
        `입력한 범위에서 벗어나는 데이터입니다. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 현재 밀림각 : ` + resultData.slip_angle)
    }
    setData(resultData)

  }, [postData])

  useEffect(() => {
    setPostData({...postData, pk: selectComponent})
  }, [selectComponent])


  useEffect(() => {
    if (postData.normal_from && postData.normal_to && postData.danger_from && postData.danger_to && postData.change_from && postData.change_to !== '') {
      getData()
    }
  }, [postData.pk])


  return (
    <div>
      <div style={{position: 'relative', textAlign: 'left', marginTop: 87, marginBottom: 20}}>

        <div style={{display: 'inline-block', textAlign: 'left'}}>
          <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: 'bold'}}>클러치&브레이크</span>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
          marginTop: 10,
          backgroundColor: '#17181c',
          height: 40,
          paddingTop: 10
        }}>
          <p>정상 범위</p>
          <p>위험 범위</p>
          <p>교체 요망 범위</p>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
          backgroundColor: '#17181c',
          height: 40
        }}>
          <Input placeholder="정상의 최소값을 입력해 주세요."
                 onChange={(e) => setPostData({...postData, normal_from: e.target.value})}/>
          <Input placeholder="정상의 최대값을 입력해 주세요."
                 onChange={(e) => setPostData({...postData, normal_to: e.target.value})}/>
          <Input placeholder="위험의 최소값을 입력해 주세요."
                 onChange={(e) => setPostData({...postData, change_from: e.target.value})}/>
          <Input placeholder="위험의 최대값을 입력해 주세요."
                 onChange={(e) => setPostData({...postData, change_to: e.target.value})}/>
          <Input placeholder="교체 요망의 최소값을 입력해 주세요."
                 onChange={(e) => setPostData({...postData, danger_from: e.target.value})}/>
          <Input placeholder="교체 요망의 최대값을 입력해 주세요."
                 onChange={(e) => setPostData({...postData, danger_to: e.target.value})}/>
        </div>
      </div>
      {(postData.normal_from && postData.normal_to && postData.danger_from && postData.danger_to && postData.change_from && postData.change_to !== '') ?
        <MapBoard
          type={1}//0: 모니터링 1:통계/분석
          url={URLS_MAP.press.statics}
          select={selectComponent} //pk
          onChangeEvent={setSelectComponent}
        /> :
        <MapBoard
          type={1}//0: 모니터링 1:통계/분석
          url={URLS_MAP.press.statics}
          select={selectComponent} //pk
        />
      }
      {
        selectComponent ? data
          ? <DetailBox>
            <div style={{width: 300, height: 30, paddingTop: 14}}>
              <p style={{
                fontSize: 18,
                fontWeight: 'bold'
              }}>{data?.machine_name + ' (' + data?.machine_ton + 'ton)'}</p>
            </div>
            <StatusBox>
              {
                data && data.statement === 0 ?
                  <NormalBox>
                    <div>
                      <p>정상</p>
                    </div>
                  </NormalBox> :
                  <NormalDisableBox>
                    <div style={{marginTop: 63, marginLeft: 20}}>
                      <p>정상</p>
                    </div>
                  </NormalDisableBox>
              }
              {
                data && data.statement === 1 ?
                  <WarningBox>
                    <div style={{marginTop: 63}}>
                      <p>위험</p>
                    </div>
                  </WarningBox> :
                  <WarningDisableBox>
                    <div style={{marginTop: 63}}>
                      <p>위험</p>
                    </div>
                  </WarningDisableBox>
              }
              {
                data && data.statement === 2 ?
                  <ChangeBox>
                    <div style={{marginTop: 63, marginRight: 20}}>
                      <p>교체 요망</p>
                    </div>
                  </ChangeBox> :
                  <ChangeDisableBox>
                    <div style={{marginTop: 63, marginRight: 20}}>
                      <p>교체 요망</p>
                    </div>
                  </ChangeDisableBox>
              }
            </StatusBox>
          </DetailBox> : <NoDataCard contents={'데이터를 불러올 수 없습니다.'} height={300}/>
          : <NoDataCard contents={'기계를 선택해 주세요'} height={300}/>
      }

    </div>
  )
}

const DetailBox = Styled.div`
    width: 1100px;
    height: auto;
    background-color: #17181c;
    border-radius: 6px;
    margin-top: 20px;
    
`

const NormalBox = Styled.div`
    width: 352px;
    height: 200px;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
    display: inline-block;
    margin-top: 20px;
    float: left;
    margin-right: 8px;
    background-image: linear-gradient(to bottom, #19b9df, #0f75bf);
    div{
        margin-top: 63px;
        margin-left: 20px;
        p{
            font-size: 50px;
            text-align: center;
            color: white;
            font-weight: bold;
            font-family: NotoSansCJKkr-Bold;
        }
    }
`

const NormalDisableBox = Styled(NormalBox)`
    background-image: None;
    background-color: #242933;
    p{
        font-size: 50px;
        text-align: center;
        color: #42444b;
        font-weight: bold;
        font-family: NotoSansCJKkr-Bold;
    }
    
`

const WarningBox = Styled.div`
    width: 340px;
    height: 200px;
    margin-top: 20px;
    display: inline-block;
    float: left;
    background-image: linear-gradient(to bottom, #5c55ff, #421ea2);
    div {
        margin-top: 63px;
        margin-left: 20px;
        p{
            font-size: 50px;
            text-align: center;
            color: white;
            font-weight: bold;
            font-family: NotoSansCJKkr-Bold;
        }
    }
`

const WarningDisableBox = Styled(WarningBox)`
    background-image: None;
    background-color: #242933;
    p{
        font-size: 50px;
        text-align: center;
        color: #42444b;
        font-weight: bold;
        font-family: NotoSansCJKkr-Bold;
    }
`

const ChangeBox = Styled.div`
    width: 352px;
    height: 200px;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    display: inline-block;
    margin-top: 20px;
    float: left;
    margin-left: 8px;
    background-image: linear-gradient(to bottom, #f73251, #8e0505);
    div{
        margin-top: 63px;
        margin-left: 20px;
        p{
            font-size: 50px;
            text-align: center;
            color: white;
            font-weight: bold;
            font-family: NotoSansCJKkr-Bold;
        }
    }
`

const ChangeDisableBox = Styled(ChangeBox)`
    background-image: None;
    background-color: #242933;
    p{
        font-size: 50px;
        text-align: center;
        color: #42444b;
        font-weight: bold;
        font-family: NotoSansCJKkr-Bold;
    }
`

const StatusBox = Styled.div`
    width: 1060px;
    height: 230px;
    background-color: #17181c;
    border-radius: 6px;
    margin-top: 10px;
    margin-left: 20px;
`

export default ClutchMaintenanceContainer
