import React, {useEffect} from 'react';
import Styled from 'styled-components'
import IMG_BG from '../Assets/Images/img_welcome_bg.png'
import WelcomeNavigation from '../Components/Navigation/WelcomNavigation'

const WelcomeContainer = ({children}: any) => {

  useEffect(()=>{

  },[])

  return (


    <div style={{ backgroundImage:`url(${IMG_BG})`, backgroundSize:'cover'}}>
      <WelcomeNavigation />
      <FullBodyDiv>
          {children}
      </FullBodyDiv>
    </div>

  );
}


const FullBodyDiv = Styled.div`
    height: 100vh;
    min-height: 768px;
    width: 100vw;
    color: white;
    position:relative;
    text-align: center;
    display: flex;
    display: -webkit-flex;
    align-items: center; 
    justify-content: center;
    -webkit-justify-content: center;
    -webkit-align-items: center;
`

export default WelcomeContainer;
