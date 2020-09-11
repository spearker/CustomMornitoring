import React, { useContext, useEffect, useState, useCallback } from "react";
import Styled, { withTheme, DefaultTheme } from "styled-components";
import { useHistory, Link } from "react-router-dom";
import CommonDropdown from "../../Components/Dropdown/CommonDropdown";
import useObjectInput from "../../hooks/UseInput";
import ArrayDataDropdown from "../../Components/Dropdown/ArrayDataDropdown";
import CheckboxInput from "../../Components/Input/CheckboxInputMapEdit";
import _ from "lodash";
import ComponentMarker from "../../Components/MapEdit/ComponentMarker";
import MapBoard from "../../Components/MapEdit/MapBoard";
import { API_URLS, getCommonList, saveCommonData, getCommonData } from "../../Api/map";
import { uploadTempFile } from "../../Api/file";
import { Slider } from '@material-ui/core';

interface Props {
  match: any;
  // chilren: string;
}


const MapEditorContiner = ({ match }: Props) => {
  console.log(match)
  const companyPk = match.params.company;
  const factoryPk = match.params.factory;
  const mapType = match.params.type;
  const history = useHistory();

  const [inputData, setInputData] = useObjectInput("CHANGE", initialInputValue);

  const [machineList, setMachineList] = useState<any[]>([]);

  const [factoryList, setFactoryList] = useState<any[]>([]);

  const [componentList, setComponentList] = useState<any[]>([]);
  //const history = useHistory();
  const [tempMapUrl, setTempMapUrl] = useState<string>('');

  const [a, setA] = useState<any>()

  /**
   * getFactoryList()
   * 공장 목록 불러오기
   */
  const getFactoryList = useCallback(async ()=>{

    const resultList = await getCommonList(API_URLS[`factory`].list + `?pk=${companyPk}`);
    console.log(resultList);
    setFactoryList(resultList);

  },[factoryList, companyPk])

  /**
   * getMachineList()
   * 머신 목록 불러오기
   */
  const getMachineList = useCallback(async ()=>{

    const resultList = await getCommonList(API_URLS[`machine`].list + `?pk=${companyPk}&type=1`);
    setMachineList(resultList);

  },[machineList, companyPk])

  /**
   * getMapData()
   * 업데이트 위한 기존 도면 데이터 가져오기
   */
  const getMapData = useCallback(async ()=>{

    const resultObj = await getCommonData(API_URLS[`map`].load + `?factory=${factoryPk}&type=${mapType}`);

    setInputData('pk', resultObj.pk);
    setInputData('type', resultObj.type);
    setInputData('factory', {pk: resultObj.factory_pk, name: resultObj.factory_name});
    setInputData('component_size', resultObj.component_size);
    setTempMapUrl(resultObj.map_img);
    setInputData('factory_pk', resultObj.factory_pk);
    setComponentList(resultObj.components);

  },[inputData, componentList, factoryPk, mapType, tempMapUrl])



  /**
   * loadImage()
   * 서버에 이미지 임시 저장
   */
  const loadImage = useCallback(async (data: Blob)=>{

    const resultUrl = await uploadTempFile(data);
    setInputData(`map_img`, resultUrl)

  },[tempMapUrl, inputData])



  /**
   * addFile()
   * 지도 업로드
   * @param {string} e.target.file 파일
   * @returns X
   */
  const addFile = useCallback(async (event: any): Promise<void> => {

    console.log(event.target.files[0]);
    const tempFile = event.target.files[0];
    if(tempFile === undefined){
      return;
    }

    if(tempFile.type.includes('image')){ //이미지인지 판별
      const previewFile = URL.createObjectURL(tempFile)
      setTempMapUrl(previewFile);
      loadImage(tempFile)

    }else{

      alert('이미지 형식만 업로드 가능합니다.')
    }

  },[inputData,tempMapUrl])

  useEffect(()=>{
    getFactoryList();
  },[])

  useEffect(()=>{
    getMachineList();

  },[inputData.factory_pk])

  useEffect(()=>{
    if(machineList.length > 0 && factoryPk !== undefined){
      getMapData();

    }
  },[machineList])

  const validataion = () => {
    if(componentList.length == 0){
      alert('컴포넌트를 추가해주세요.');
      return false;
    }
    // if(inputData.map_img == null || inputData.map_img == '' ){
    //   if(factoryPk == undefined){
    //     alert('최초 도면 생성시에는, 배경 이미지를 추가해주세요.');
    //     return false
    //   }
    // }
    if(inputData.map_width > 4096 || inputData.map_width < 280){
      alert('도면의 크기는 280px 이상, 4096px 미만 입니다.');
      return false
    }
    return true
  }

  const createMap = useCallback( async()=>{
    //console.log(inputData)
    if(!validataion()){
      return;
    }
    const data = {
      pk: companyPk,
      type: Number(inputData.type),
      factory_pk: inputData.factory_pk,
      component_size: inputData.component_size,
      map_width: Number(inputData.map_width),
      map_img: inputData.map_img,
      components: componentList
    }
    //console.log(data);

    //factoryPk == undefined : 맵생성
    //factoryPk !== undefined : 맵수정
    if(factoryPk !== undefined ){
      const result = await saveCommonData(API_URLS[`map`].update , data);
      if(result){
        alert('성공적으로 수정되었습니다.');
        history.push(`/company/maps/${companyPk}`);
      }

    }else{
      const result = await saveCommonData(API_URLS[`map`].create , data);
      if(result){
        alert('성공적으로 저장되었습니다.');
        history.push(`/company/maps/${companyPk}`);
      }

    }


  },[inputData, componentList, companyPk, factoryPk])


  return (
    <MapEditorWrapper>
      <Link to={'/'}> ← 뒤로가기 </Link>
      <h2>지도 이미지 에디터</h2>
      <div style={{flexDirection: 'row', display: 'flex'}}>
        <div>
          {
             inputData.factory !== null &&
             <MapBoard
                  xyList={componentList}
                  bg={tempMapUrl}
                  statusList={machineList}
                  width={inputData.map_width}
                  size={inputData.component_size} />
          }
        </div>
        <div>
          {
            componentList.map((v, i)=>
                      <Slider value={v.bottom}
                              orientation="vertical"
                        onChange={(e: any, v: any) => {
                          console.log(v)
                          const temp = [...componentList];
                          temp[i].bottom = v;
                          setComponentList(temp)
                        }}/>)
          }
        </div>
      </div>
      <>
        {
          componentList.map((v, i)=>{
            return(
                <div key={`compo-${i}`} style={{width: inputData.map_width, marginLeft: 18}}>
                  <p>{v.pk}</p>
                  <Slider value={v.left}
                         onChange={(e: any, v: any) => {
                           console.log(v)
                           const temp = [...componentList];
                           temp[i].left = v;
                           setComponentList(temp)
                         }}></Slider>
                </div>
            )
          })
        }
        <button onClick={()=>createMap()}>도면 저장</button>
      </>
      <MapEditInputWrapper>
        <div>
          <p>지도 타입 선택 (사용처)</p>
          <CommonDropdown
            contents={MAP_TYPES}
            select={inputData.type}
            onClickEvent={(input: any) => setInputData("type", input)}
          />
          <p>공장 선택</p>
          <ArrayDataDropdown
            contents={factoryList}
            textKey={"name"}
            select={inputData.factory}
            onClickEvent={(input: any) => {
              setInputData("factory", input);
              setInputData("factory_pk", input.pk);
            }}
          />
          <p>컴포넌트 사이즈 설정</p>
          <CommonDropdown
            contents={COMPONENT_TYPES}
            select={inputData.component_size}
            onClickEvent={(input: any) => setInputData("component_size", input)}
          />
          <p>도면 등록</p>
          <label htmlFor={"map"}>[ 업로드 ]</label>
          <input type="file" name={'TEMP NAME'} id={"map"} style={{display:'none'}} onChange={addFile}/>

          <p>도면 너비 설정</p>
          <input type="number"
            value={inputData.map_width}
            onChange={(e) => setInputData(`map_width`, e.target.value)}
          />
        </div>
        {
          inputData.factory !== null && (
          <>
            <div>
              <p>공장 내 기계 목록</p>
              {
                machineList
                .map((v, i) => {
                  return (
                    <CheckboxInput
                      key={`chech-${i}`}
                      nameKeys={[`name`, `code`]}
                      pkKey={'pk'}
                      checked={componentList.find(f => f.pk == v.pk) ? true : false  }
                      contents={v}
                      onChangeEvent={(id: any) => { //@param : machine info
                        console.log(id)
                        if(componentList.find(f => f.pk == id)){
                            const tempObj = componentList.find(f => f.pk == id);
                            let temp = [...componentList].filter(f => f.pk !== tempObj.pk);
                            setComponentList(temp);
                        }else{
                            const tempObj =  {pk:id, bottom: 0, left: 0}
                            console.log(tempObj)
                            let temp = [...componentList, tempObj];
                            setComponentList(temp);
                        }

                      }}
                    />
                  );
                })}
            </div>
            <div>
              <p>선택 기계 좌표 설정</p>
              <>
              {
                componentList.map((v, i)=>{
                    return(
                        <div key={`compo-${i}`}>
                        <p>{v.pk}</p>
                          <span>X</span>
                         <input type="number"
                          value={v.left}
                          onChange={(e) => {
                            const temp = [...componentList];
                            temp[i].left = e.target.value;
                            setComponentList(temp)
                          }}/>
                         <span>Y</span>
                         <input type="number"
                          value={v.bottom}
                          onChange={(e) => {
                            const temp = [...componentList];
                            temp[i].bottom = e.target.value;
                            setComponentList(temp)
                          }}/>
                        </div>
                    )
                })
              }
              <button onClick={()=>createMap()}>도면 저장</button>
              </>
            </div>
          </>
        )}
      </MapEditInputWrapper>
    </MapEditorWrapper>
  );
};

const MapEditorWrapper = Styled.div`
`;

const MapEditInputWrapper = Styled.div`
    display: flex;
    flex-wrap: nowrap;
    div{
        flex: 1;
    }
    background-color: #111319;
`;



const initialInputValue = {
  type: 0,
  factory: null,
  factory_pk: null,
  component_size: 'PRESS',
  map_img: null,
  map_width: 1100,
};

const initialComponValue = {
  pk: null,
  bottom: 0,
  left: 0,
};
const MAP_TYPES = {
  0: "프레스 모니터링",
  1: "프레스 통계분석(넓음)",
  2: "프레스 통계분석(좁음)",
};
const COMPONENT_TYPES = {
  PRESS: "프레스 모니터링",
  BREAKER: "프레스 모니터링 (브레이커 포함)",
  NAME: "이름만 포함",
};

const dummy_factories = [
  {
    pk: "1",
    name: "공장 1",
  },
  {
    pk: "2",
    name: "공장 2",
  },
];

const dummy_machines = [
  {
    pk: "1",
    name: "기계 1",
    code: "0000-0000-0000",
    factory_pk: "1",
    factory_name: "공장 1",
  },
  {
    pk: "2",
    name: "기계 2",
    code: "0000-0000-0000",
    factory_pk: "1",
    factory_name: "공장 2",
  },
  {
    pk: "3",
    name: "기계 2",
    code: "0000-0000-0000",
    factory_pk: "1",
    factory_name: "공장 2",
  },
];


const dummy_components = [
    {
      pk: "1",
      bottom: 0,
      left:0,

    },

    ];

export default MapEditorContiner;
