import React, {useState} from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {ROUTER_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import Header from "../../Components/Text/Header";
import {BG_COLOR_SUB2} from "../../Common/configset";

const dummyList = [
    {pk:'1231dd',name: '프레스 01',manufacturing_number: '000-000-00', average_vibration_value: '0000'},
    {pk:'1121dd',name: '프레스 02',manufacturing_number: '000-000-00', average_vibration_value: '0000'},
    {pk:'11231dd',name: '프레스 03',manufacturing_number: '000-000-00', average_vibration_value: '0000'},
    {pk:'1231432dd',name: '프레스 04',manufacturing_number: '000-000-00', average_vibration_value: '0000'},
    {pk:'1231234234dd',name: '프레스 05',manufacturing_number: '000-000-00', average_vibration_value: '0000'},
    {pk:'123123121dd',name: '프레스 06',manufacturing_number: '000-000-00', average_vibration_value: '0000'},
    {pk:'1212331dd',name: '프레스 07',manufacturing_number: '000-000-00', average_vibration_value: '0000'},
]

const indexList = {
    name:'기계명',
    manufacturing_number:'제품명',
    average_vibration_value: '평균 진동값',
}

interface IOrder{
    pk: string,
    name: string,
    manufacturing_number: string,
    average_vibration_value: string,
}


const VibrationMonitoring: React.FunctionComponent = () => {
    const [choice, setChoice] = useState("");

    const choiceFunc = (name, count) => {
        if (choice === "" || choice === undefined || choice === null) {
            setChoice(name);
            return;
        } else {
            if (choice === name) {
                setChoice("");
                return;
            } else {
                setChoice(name);

                return;
            }
        }
    };


    return(
        <DashboardWrapContainer index={13}>
            <SubNavigation list={ROUTER_MENU_LIST[13]}/>
            <InnerBodyContainer>
                <div style={{position:'relative'}}>
                    <Header title={`진동량 모니터링`}/>

                    <div style={{width:'100%',backgroundColor:'red',borderRadius:6,height:'10%'}}>
                        <tr className="p-bold" style={{borderBottom:`10px solid ${BG_COLOR_SUB2}`}}>
                        {
                            Object.keys(indexList).map((v, i)=>{
                                return(
                                    <th key={v} >{indexList[v]}</th>
                                )
                            })
                        }
                        </tr>
                    </div>

                    {dummyList.map((dummy, index) =>
                        dummyList.length > 0 ? (
                            <div
                                style={{
                                    backgroundColor:
                                        choice === dummy.name ? "#19b9df" : "#353b48",
                                    marginTop: 5,
                                    paddingLeft: 20,
                                    paddingRight: '40%',
                                    height: 50,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    borderRadius: 6,
                                    fontSize: 18,
                                }}
                                id={+"" + index + ""}
                                onClick={() => choiceFunc(dummy.name, dummy.average_vibration_value)}
                            >
                                <p>{dummy.name}</p>
                                <p>{dummy.manufacturing_number}</p>
                                <p>{dummy.average_vibration_value}</p>
                            </div>
                        ) : (
                            <></>
                        )
                    )}
                </div>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default VibrationMonitoring
