import React, { useEffect, useRef, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import { getToken } from '../../Common/tokenFunctions';
import NormalTable from '../../Components/Table/NormalTable';
import 'react-dropdown/style.css'
import {dataSet} from '../../Common/dataset'
import moment from 'moment';
import BasicDropdown from '../../Components/Dropdown/BasicDropdown';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_LIST } from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import { getRequest, getParameter } from '../../Common/requestFunctions';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import InputContainer from '../../Containers/InputContainer';
import PlaneInput from '../../Components/Input/PlaneInput';
import AddInput from '../../Components/Input/AddInput';
import TextList from '../../Components/List/TextList';
import SearchModalContainer from '../../Containers/SearchModalContainer';
import SearchInput from '../../Components/Input/SearchInput';
import AddList from '../../Components/List/AddList';
import SearchedList from '../../Components/List/SearchedList';
import NormalInput from '../../Components/Input/NormalInput';
import DateRangeInput from '../../Components/Input/DateRangeInput';
import MemberInput from '../../Components/Input/MemberInput';
import NormalFileInput from '../../Components/Input/NormalFileInput';
import RegisterButton from '../../Components/Button/RegisterButton';
import NormalNumberInput from '../../Components/Input/NormalNumberInput';
import { useUser } from '../../Context/UserContext';
import IC_ADD from '../../Assets/Images/ic_file_add.png'
import IC_IMAGE from '../../Assets/Images/ic_file_img.png'
import FileTumbCard from '../../Components/Card/FileTumbCard';
import BasicToggle from '../../Components/Toggle/BasicToggle';
import ProcessTable from '../../Components/Table/ProcessTable';

// 작업 지시서 등록
const TaskRegister = () => {

  const User = useUser();
  const [pk, setPk] = useState<string>('');
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [option, setOption] = useState(0);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount]= useState<number | string>(0);
  const [end, setEnd] = useState<string>(moment().format('YYYY-MM-DD HH:mm'));
  const [start, setStart] = useState<string>(moment().format('YYYY-MM-DD HH:mm'));
  const [fileList, setFileList] = useState<any[]>([])
  const [oldFileList, setOldFileList] = useState<any[]>([])
  const [removefileList, setRemoveFileList] = useState<any[]>([])
  const [isRecommend, setIsRecommend] = useState<boolean>(false);
  const [select, setSelect] = useState<IProcess[]>();
  const [selectIndex, setSelectIndex] = useState<number>(999);

 //검색관련
 //생산품 검색
 const [isPoupup, setIsPoupup] = useState<boolean>(false);
 const [isSearched, setIsSearched] = useState<boolean>(false);
 const [keyword, setKeyword] = useState<string>('');
 const [checkList, setCheckList] = useState<IMaterial[]>([]);
 const [list, setList] = useState<IMaterial[]>([]);
 const [searchList, setSearchList] = useState<IMaterial[]>([]);

 //프로세스 검색
 const [isPoupup2, setIsPoupup2] = useState<boolean>(false);
 const [searchList2, setSearchList2] = useState<IProcess[]>([]);
 const [checkList2, setCheckList2] = useState<IProcess[]>([]);
 const [list2, setList2] = useState<IProcess[]>([]);

 //추천 관련
 const [recommend, setRecommend] = useState<IProcess[][]>([[]]);

  //사람 관련
  const [worker, setWorker] = useState<IMemberSearched | null>(null);
  const [referencerList, setReferencerList] = useState<IMemberSearched[]>([]);
  const [searchList4, setSearchList4] = useState<IMemberSearched[]>([]);
  const [check, setCheck] = useState<IMemberSearched | null>(null);
  const [searchList3, setSearchList3] = useState<IMemberSearched[]>([]);
  const [checkList4, setCheckList4] = useState<IMemberSearched[]>([]);
  const [isPoupup3, setIsPoupup3] = useState<boolean>(false);
  const [isPoupup4, setIsPoupup4] = useState<boolean>(false);

 const tabList = [
   "기계", "라인"
 ]
 const [tab, setTab] = useState<string>(tabList[0]);

  const optionList = [
    "등록순", "기계이름 순", "기계종류 순", "기계번호 순", "제조사 순", "제조사 번호 순", "제조사 상세정보 순"
  ]
  const index = {
    machine_name:'기계 이름',
    machine_label:'기계 종류',
    machine_code:'기계 번호',
    manufacturer:'제조사', 
    manufacturer_code:'제조사 번호', 
    manufacturer_detail:'제조사 상세정보'
  }

  useEffect(()=>{

    setSearchList(dataSet.materialList)
    setIsSearched(true)
    setSearchList2(dataSet.processList)
    setList2(dataSet.processList)
    setRecommend(dataSet.recommendList)
    setSearchList3(dataSet.searchedMemmber)
    setSearchList4(dataSet.searchedMemmber)
    const param = getParameter('pk');
      if(param !== ""){
          setPk(param)
          alert(`수정 페이지 진입 - pk :` + param)
          setIsUpdate(true)
      }

  },[])



  /**
   * onClickFilter()
   * 리스트 필터 변경
   * @param {string} filter 필터 값
   * @returns X
   */
  const onClickFilter = useCallback(async(filter:number)=>{
    setOption(filter)
    alert(`선택 테스트 : 필터선택 - filter : ${filter}` )
    return;
    const results = await getRequest(BASE_URL + '',getToken(TOKEN_NAME))

    if(results === false){
      //TODO: 에러 처리
    }else{
      if(results.status === 200){
       
      }else if(results.status === 1001 || results.data.status === 1002){
        //TODO:  아이디 존재 확인
      }else{
        //TODO:  기타 오류
      }
    }
  },[option])

  

 
 
  /**
   * onClickSearch()
   * 금형 키워드 검색
   * @param {string} url 요청 주소
   * @param {string} keyword 검색 키워드
   * @returns X 
   */
  const onClickSearch = useCallback(async()=>{
  
   
    alert('테스트 : keyword - ' + keyword);
    return;
    if(keyword  === '' || keyword.length < 2){
      alert('2글자 이상의 키워드를 입력해주세요')

      return;
    } 
    setIsSearched(true)

    const res = await getRequest(BASE_URL + '/api/v1/mold/search/' + keyword, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         const results = res.results;
         setKeyword('')
         setSearchList(results);
      }else if(res.status === 1001){
        //TODO:  오류 처리 
      }else{
        //TODO:  기타 오류
      }
    }
  },[keyword])

   /**
   * onClickWhere()
   * 프로세스 위치 수정
   * @param {'UP' | 'DOWN' | 'ADD' | 'DELETE'} action 요청 주소
   * @returns X 리턴데이터, 요청실패(false) 이벤트 처리
   */
  const onClickWhere = useCallback((action: 'UP' | 'DOWN' | 'DELETE', index:number)=> {
    let tempList = list2.slice();
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
            setList2(tempList);
          // code block
          break;
        case 'DOWN':
            console.log('down')
            if(index !== tempList.length){
                console.log('down')
                tempList.splice(index+2, 0, tempList[index])
                tempList.splice(index, 1)
            }

            setList2(tempList);
          // code block
          break;
        case 'DELETE':
            if(tempList.length <= 1){
                return;
            }
            console.log('delete')
            tempList.splice(index, 1)
            setList2(tempList);
          // code block
          break;
        default:
          break;
          // code block
      }

  },[list2])

 
  /**
   * addFile()
   * 파일 등록
   * @param {object(file)} event.target.files[0] 파일
   * @returns X 
   */
  const addFile = (event: any): void => {
    console.log(event.target.files[0]);

    if(fileList.length + oldFileList.length > 7){
      alert('파일 업로드는 8개 이하로 제한되어있습니다.')
      return;
    }

    if(event.target.files[0] === undefined){
      return;
    }
    console.log(event.target.files[0].type);
    if(event.target.files[0].size < 10485760){ //이미지인지 판별
      let tempFileLsit = fileList.slice();
      tempFileLsit.push(event.target.files[0])
      setFileList(tempFileLsit)
    }else{
      alert('10MB 이하의 파일만 업로드 가능합니다.')
      return;
    }
    
  }
  return (
      <DashboardWrapContainer>
        <InnerBodyContainer>
          <div style={{position:'relative'}}>
            <Header title={ isUpdate ? '작업지시서 수정' :'작업지시서 등록'}/>
          </div>
          <WhiteBoxContainer>
            <div style={{borderBottom:'solid 0.5px #d3d3d3'}}>
              <PlaneInput value={title} description={'작업지시서 제목 입력'} onChangeEvent={setTitle} fontSize={'26px'}/>
              <PlaneInput value={description} description={'상세 업무내용 작성 (200자 미만)'} onChangeEvent={setDescription} fontSize={'14px'}/>
            </div>
            <div style={{display:'flex',borderBottom:'solid 0.5px #d3d3d3', alignItems: 'center', justifyContent: 'center' }}>
                {/* 팝업 여는 버튼 + 재료 추가 */}
                <div style={{width:'55%'}}>

                <AddInput line={false} title={'생산제품 (*필수)'} icType="solo" onlyOne={list.length > 0 ? true: false} onChangeEvent={()=>{
                  setIsPoupup(true);  
                  setCheckList(list); 
                  setKeyword('')}
                  }>
                {
                  list.map((v: IMaterial, i)=>{ 
                    return ( 
                        <TextList key={i} 
                        onClickSearch={()=>{
                          setIsPoupup(true);
                          setKeyword(''); 
                          setIsSearched(false);
                        }}
                        onClickEvent={()=>{
                          setList([])
                        }} 
                        title={v.material_code !== undefined ? v.material_code : ""} name={v.material_name}/>                    
                    )
                  })
                }
                </AddInput>

                </div>

                <div style={{width:'45%', textAlign:'left'}}>
                <span style={{borderRight:'dotted 1px #d3d3d3', height:30, marginRight:12}}></span>
                <p style={{fontSize: 14,textAlign:'left', marginTop:5, fontWeight: 700, display:'inline-block', marginRight:20}}>·  생산목표량</p>
                  <InputBox type="number" value={amount} onChange={ (e: React.ChangeEvent<HTMLInputElement>): void =>{setAmount(e.target.value)}} placeholder={'수량을 입력하세요(필수)'}/>
                </div>
           
            </div>

          
                {/* 공정 선택 */}
                <div style={{marginTop:16, marginBottom:24}}>
                  <BasicToggle contents={['추천공정선택', '수동공정선택']} select={option} onClickEvent={setOption}/>
                    {
                      option === 0 ?
                      list.length < 0 ?
                      <p style={{padding:60, textAlign:'center', color:"#aaaaaa"}}>생산할 제품(자재) 먼저 선택 후, 추천 공정을 선택 할 수 있습니다</p>
                      :
                      recommend === undefined || recommend === [] ?
                      <p style={{padding:60, textAlign:'center', color:"#aaaaaa"}}>해당 제품을 생산하기 위한 추천공정이 없습니다 <br/> </p>
                      :
                      <div>
                        {
                          recommend.map((v,i)=>{
                            return(
                              <ProcessTable pk={String(i)} select={selectIndex} contents={v} indexList={['','명칭','기계 정보','금형정보', '자재정보']} widthList={['1%','14%','30%','15%','40%']} 
                              onClickSelect={
                                (value: number)=>{
                                  setSelectIndex(value);
                                  setSelect(v)
                                }
                              }
                              />
                            )
                          })
                        }
                          
                      </div>
                      :
                      list2.length < 1 ?
                      <p style={{padding:60, textAlign:'center', color:"#aaaaaa"}}>공정을 추가해주세요</p>
                      :
                      <div>
                       <ProcessTable pk={''} contents={list2} indexList={['명칭','','기계 정보','금형정보', '자재정보']} widthList={['12%','10%','25%','15%','38%']} 
                       onClickSearch={()=>{setIsPoupup2(true);setCheckList2(list2);}}
                       onClickModify={onClickWhere}
                       />
                      </div>
                    }

                </div>

                {/*
                 <DateRangeInput title={'작업 목표 기간'} end={end} start={start} onChangeEventEnd={setEnd} onChangeEventStart={setStart}/>
                */}
                  <hr style={{border:'solid 0.5px #d3d3d3', marginTop:14}}/>
                <div style={{display:'flex', width:'100%', alignItems: 'center', justifyContent: 'center' }}>
                <MemberInput
                    title={'등록자'}
                    isMultiRegistered={false}
                    target={{
                      pk: 'me',
                      name: User.name,
                      image: ""
                    }}
                />
                
                <p style={{borderRight:'dotted 1px #d3d3d3',  height:27, width:'1%',  marginRight:6}}></p>
 
               
                  <MemberInput
                    title={'작업자'}
                    onChangeEvent={()=>{
                      setIsPoupup3(true);  
                      setWorker(check); 
                      setKeyword('')
                    }}
                    isMultiRegistered={false}
                    target={worker!== null ? {
                      pk: worker.pk,
                      name: worker.name + ' ' + worker.appointment,
                      image: worker.profile_img
                    } : undefined}

                />
                </div>
                <hr style={{border:'solid 0.5px #d3d3d3', marginBottom:10}}/>
                <MemberInput
                    title={'공유자'}
                    onRemoveEvent={(idx: number)=>{
                        const tempList = referencerList.slice()
                        tempList.splice(idx, 1)
                        setReferencerList(tempList)
                    }}
                    onChangeEvent={()=>{
                      setIsPoupup4(true);  
                      setCheckList4(referencerList); 
                      setKeyword('')
                    }}
                    isMultiRegistered={true}
                    type={''}
                    contents={referencerList.map((v, i)=>{
                      return(
                        {
                          pk: v.pk,
                          name: v.name + ' ' + v.appointment,
                          image: ""
                        }
                      )
                    })}

                />


                {/* 파일 리스트 */}
                <div style={{width:'100%'}}>
                        <hr style={{border:'solid 0.5px #d3d3d3', marginBottom:18, marginTop:18,}}/>
                        <span className="p-bold" style={{width: 98, float:'left', display:'inline-block'}}>·  첨부 파일</span>
                        <input type="file" name="file" id={'machinePhoto'} style={{display:'none'}} onChange={addFile}/>
                        <div style={{ marginLeft:108, color:'black'}}> 
                       
                        {
                          fileList.map((v, i)=>{ 
                            return ( 
                                <FileTumbCard key={i} 
                                  name={v.name}
                                  type={v.type}
                                  url={URL.createObjectURL(v)}
                                  data={v}
                                  onClickEvent={()=>{
                                  const tempList = fileList.slice()
                                  const idx = fileList.indexOf(v)
                                  tempList.splice(idx, 1)
                                  setFileList(tempList)
                                }} 
                                />                    
                            )
                          })
                        }
                        {
                          oldFileList.map((v, i)=>{ 
                            return ( 
                                <FileTumbCard key={i} 
                                  name={v.name}
                                  type={v.type}
                                  url={v}
                                  data={v}
                                  onClickEvent={()=>{
                                    const tempList = fileList.slice()
                                    const tempRemoveList = removefileList.slice()
                                    const idx = fileList.indexOf(v)
                                    tempList.splice(idx, 1)
                                    tempRemoveList.push(v.pk)
                                    setRemoveFileList(tempRemoveList)
                                    setOldFileList(tempList)
                                }} 
                                />                    
                            )
                          })
                        }
                         {
                          fileList.length + oldFileList.length < 8 ?
                          <label htmlFor="machinePhoto" style={{textAlign:'center', cursor:'pointer', display:'inline-block ', marginRight:12}} >
                            <img src={IC_ADD} style={{width:100, height:70, objectFit: 'cover'}}/>
                            <p className="p-limit" style={{width:95, fontSize:13}}>&nbsp;</p>
                          </label>
                          :null
                        }
                      
                    
                        </div>
                     
                </div>
                <hr style={{border:'solid 0.5px #d3d3d3', marginBottom:18, marginTop:18,}}/>
                <RegisterButton name={isUpdate ? '수정하기' : '등록하기'} />   
          </WhiteBoxContainer>

           
            {/* 재료 검색창 */}
            <SearchModalContainer 
              onClickEvent={ //닫혔을 때 이벤트 
                ()=>{
                setIsPoupup(false); 
                setList(checkList); 
                setKeyword('')}
            }
            isVisible={isPoupup} onClickClose={()=>{setIsPoupup(false); setKeyword(''); setSearchList([]); setIsSearched(false)}} title={'생산제품'} >
              <SearchInput description={'키워드를 검색해주세요'} value={keyword} onChangeEvent={(e)=>setKeyword(e.target.value)} onClickEvent={onClickSearch}/>
                <div style={{width: '100%', marginTop:20}}>
                  {
                    isSearched ?
                    searchList.map((v: IMaterial, i)=>{ 
                      return ( 
                    
                          <SearchedList key={i} pk={v.pk} widths={['40%', '45%', '15%']} contents={[v.material_name, v.material_code !== undefined ? v.material_code : "", String(v.stock)]} isIconDimmed={false} isSelected={checkList.find((k)=> k.pk === v.pk)? true : false } 
                             onClickEvent={()=>{
                              const tempList = checkList.slice()
                              tempList.splice(0, 1, v)
                              setCheckList(tempList)
                            }} 
                          />
                         
                        )
                    })
                    :
                    null
                  }
                </div>
            </SearchModalContainer>
            {/* 프로세스 검색창 */}
           <SearchModalContainer 
              onClickEvent={ //닫혔을 때 이벤트 
                ()=>{
                setIsPoupup2(false); 
                setList2(checkList2); 
                setIsSearched(false);
                setKeyword('')}
            }
            isVisible={isPoupup2} onClickClose={()=>{setIsPoupup2(false)}} title={'생산제품 선택'} >
              <>
              <SearchInput description={'생산제품을 검색해주세요'} value={keyword} onChangeEvent={(e)=>setKeyword(e.target.value)} onClickEvent={()=>onClickSearch()}/>
                <div style={{width: '100%', marginTop:20}}>
                  {
                    isSearched ?
                    searchList2.map((v: IProcess, i)=>{ 
                      return ( 
                        
                          <SearchedList key={i} pk={(v.pk !== undefined ? v.pk : '')} widths={['18%', '20%', '20%', '20%','21%']} contents={[v.name !== undefined ? v.name: '', v.material !== undefined ?  v.material.material_name : '', v.machine.machine_name, v.mold_name !== undefined ? v.mold_name : '' ,v.output.material_name]} isIconDimmed={false} isSelected={checkList2.find((k)=> k.pk === v.pk)? true : false } 
                            onClickEvent={()=>{
                              const tempList = checkList2.slice()
                              if(checkList2.find((k, index)=> k.pk === v.pk) ){
                                  const idx = checkList2.indexOf(v)
                                  tempList.splice(idx, 1)
                                  setCheckList2(tempList)
                              }else{
                                  tempList.splice(0, 0, v)
                                  setCheckList2(tempList)
                              }
                            }} 
       
                          />
                        )
                    })
                    :
                    null
                  }
                </div>
                </>
            </SearchModalContainer>


            {/* 작업자 검색창 */}
           <SearchModalContainer 
              onClickEvent={ //닫혔을 때 이벤트 
                ()=>{
                setIsPoupup3(false); 
                setWorker(check); 
                setIsSearched(false);
                setKeyword('')}
            }
            isVisible={isPoupup3} onClickClose={()=>{setIsPoupup3(false)}} title={'작업자 선택'} >
              <>
              <SearchInput description={'작업자를 검색해주세요'} value={keyword} onChangeEvent={(e)=>setKeyword(e.target.value)} onClickEvent={()=>onClickSearch()}/>
                <div style={{width: '100%', marginTop:20}}>
                  {
                    isSearched ?
                    searchList3.map((v: IMemberSearched, i)=>{ 
                      return ( 
                        
                          <SearchedList key={i} pk={v.pk} widths={['100%']} contents={[v.name + ' ' + v.appointment]} isIconDimmed={false} isSelected={check === v ? true : false } 
                            onClickEvent={()=>{
                              check === v ?
                              setCheck(null)
                              :
                              setCheck(v)
                            }} 
       
                          />
                        )
                    })
                    :
                    null
                  }
                </div>
                </>
            </SearchModalContainer>

            {/* 참조자 검색창 */}
           <SearchModalContainer 
              onClickEvent={ //닫혔을 때 이벤트 
                ()=>{
                setIsPoupup4(false); 
                setReferencerList(checkList4);
                setIsSearched(false);
                setKeyword('')}
            }
            isVisible={isPoupup4} onClickClose={()=>{setIsPoupup4(false)}} title={'공유자 선택'} >
              <>
              <SearchInput description={'공유자를 검색해주세요'} value={keyword} onChangeEvent={(e)=>setKeyword(e.target.value)} onClickEvent={()=>onClickSearch()}/>
                <div style={{width: '100%', marginTop:20}}>
                  {
                    isSearched ?
                    searchList4.filter((f)=>worker == null  || f.pk !== worker.pk).map((v: IMemberSearched, i)=>{ 
                      return ( 
                        
                          <SearchedList key={i} pk={v.pk} widths={['100%']} contents={[v.name + ' ' + v.appointment]} isIconDimmed={false}  isSelected={checkList4.find((k)=> k.pk === v.pk)? true : false } 
                           onClickEvent={()=>{
                              const tempList = checkList4.slice()
                              if(checkList4.find((k, index)=> k.pk === v.pk) ){
                                  const idx = checkList4.indexOf(v)
                                  tempList.splice(idx, 1)
                                  setCheckList4(tempList)
                              }else{
                                  tempList.splice(0, 0, v)
                                  setCheckList4(tempList)
                              }
                            }} 
       
                          />
                        )
                    })
                    :
                    null
                  }
                </div>
                </>
            </SearchModalContainer>


        </InnerBodyContainer>
      </DashboardWrapContainer>
      
  );
}

const InputBox = Styled.input`
    border: solid 0.5px #d3d3d3;
    display: inline-block;
    font-size: 14px;
    padding: 6px;
    padding-left: 10px;
    width: 280px;
    background-color: #f4f6fa;
`


export default TaskRegister;