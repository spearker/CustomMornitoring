import * as React from 'react';

//인풋 창 index container

const PartInputContainer = ({title, children,}: any) => {
    return (
        <div style={{ display:'flex', paddingTop:16, verticalAlign: 'top'}}>
            <p style={{fontSize: 14, marginTop:5, fontWeight: 700, width: "13%",textAlign: "left" ,display:'inline-block'}}>{title === "" ? " " : `• ${title}`}</p>
            <div style={{width: "86%"}}>
            {children}
            </div>
        </div>

    );
}


export default PartInputContainer;
