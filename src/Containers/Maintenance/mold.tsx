import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  ReactElement,
} from "react";
import Styled from "styled-components";
import DashboardWrapContainer from "../DashboardWrapContainer";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import { ROUTER_MENU_LIST } from "../../Common/routerset";
import InnerBodyContainer from "../InnerBodyContainer";
import Header from "../../Components/Text/Header";
import ReactShadowScroll from "react-shadow-scroll";

//금형 보전 관리

//캘린더 api 는 react-calendar
//사용법 : https://www.npmjs.com/package/react-calendar
const MoldMaintenanceContainer = () => {
  const [choice, setChoice] = useState("");
  const [remainCount, setRemainCount] = useState();
  const [percent, setPercent] = useState();
  const [moldList, setMoldList] = useState([
    {
      name: "금형01",
      manufacturer: "제조사명01",
      number: "1234-123-1349",
      count: "40000",
    },
    {
      name: "금형02",
      manufacturer: "제조사명02",
      number: "1234-123-1350",
      count: "30000",
    },
    {
      name: "금형03",
      manufacturer: "제조사명03",
      number: "1234-123-1351",
      count: "20000",
    },
    {
      name: "금형04",
      manufacturer: "제조사명04",
      number: "1234-123-1352",
      count: "10000",
    },
    {
      name: "금형05",
      manufacturer: "제조사명05",
      number: "1234-123-1353",
      count: "20000",
    },
    {
      name: "금형06",
      manufacturer: "제조사명06",
      number: "1234-123-1355",
      count: "30000",
    },
  ]);
  const [alarmList, setAlarmList] = useState([
    "금형 01",
    "금형 02",
    "금형 04",
    "금형 03",
    "금형 05",
    "금형 06",
  ]);
  useEffect(() => {}, []);
  const choiceFunc = (name, count) => {
    let remain = 50000 - count;
    let tempPercent = (count / 50000) * 100;
    tempPercent = 720 * (tempPercent / 100);
    if (choice === "" || choice === undefined || choice === null) {
      setChoice(name);
      setRemainCount(remain);
      setPercent(tempPercent);
      return;
    } else {
      if (choice === name) {
        setChoice("");
        return;
      } else {
        setChoice(name);
        setRemainCount(remain);
        setPercent(tempPercent);

        return;
      }
    }
  };

  return (
 
          <div style={{ position: "relative" }}>
            <Header title={"금형 보전 관리"} />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                fontFamily: "NotoSansCJKkr-Bold",
              }}
            >
              <div
                style={{
                  width: 752,
                  height: 320,
                  paddingTop: 20,
                  borderRadius: 6,
                  backgroundColor: "#17181c",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <ReactShadowScroll
                  scrollColor="#17181c"
                  scrollColorHover="#2A2D34"
                  shadow="0 2px 4px rgba(23, 24, 28, 0.2) inset, 0 -2px 4px rgba(0, 0, 0, 0.2) inset"
                >
                  <div
                    style={{
                      width: 712,
                      marginLeft: 20,
                      backgroundColor: "#17181C",
                    }}
                  >
                    <div
                      style={{
                        height: 40,
                        display: "flex",
                        alignItems: "space-between",
                        backgroundColor: "#17181c",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 18,
                          color: "#ffffff",
                        }}
                      >
                        금형 리스트
                      </p>
                    </div>
                    {console.log(choice)}
                    {moldList.map((mold, index) =>
                      moldList.length > 0 ? (
                        <div
                          style={{
                            backgroundColor:
                              choice === mold.name ? "#19b9df" : "#2b2c3b",
                            marginTop: 5,
                            paddingLeft: 20,
                            paddingRight: 20,
                            height: 50,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderRadius: 6,
                            fontSize: 18,
                          }}
                          id={+"" + index + ""}
                          onClick={() => choiceFunc(mold.name, mold.count)}
                        >
                          <p>{mold.name}</p>
                          <p>{mold.manufacturer}</p>
                          <p>{mold.number}</p>
                        </div>
                      ) : (
                        <></>
                      )
                    )}
                  </div>
                </ReactShadowScroll>
              </div>

              <div
                style={{
                  width: 328,
                  height: 340,
                  borderRadius: 6,
                  backgroundColor: "#17181c",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <ReactShadowScroll
                  scrollColor="#17181c"
                  scrollColorHover="#2A2D34"
                  shadow="0 2px 4px rgba(23, 24, 28, 0.2) inset, 0 -2px 4px rgba(0, 0, 0, 0.2) inset"
                >
                  <div
                    style={{
                      width: 288,
                      marginLeft: 20,
                      paddingTop: 20,
                    }}
                  >
                    <div
                      style={{
                        height: 40,
                        display: "flex",
                        alignItems: "space-between",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 18,
                          color: "#ffffff",
                        }}
                      >
                        금형 보전 알림
                      </p>
                    </div>
                    {alarmList.map((alarm, index) => (
                      <div
                        style={{
                          height: 50,
                          backgroundColor: "#ff341a",
                          display: "flex",
                          alignItems: "center",
                          fontSize: 18,
                          borderRadius: 6,
                          paddingLeft: 20,
                          paddingRight: 20,
                          marginBottom: 5,
                        }}
                      >
                        <p>{alarm}</p>
                      </div>
                    ))}
                  </div>
                </ReactShadowScroll>
              </div>
            </div>

            <div
              style={{
                width: 1100,
                height: 50,
                borderRadius: 6,
                backgroundColor: "#17181c",
                marginTop: 20,
                fontSize: 18,
              }}
            >
              {choice !== "" ? (
                <p
                  style={{
                    color: "#ffffff",
                    lineHeight: 2.7,
                    fontWeight: "bold",
                    textAlign: "left",
                    marginLeft: 20,
                  }}
                >
                  {choice}
                </p>
              ) : (
                <p
                  style={{
                    color: "#515664",
                    lineHeight: 2.7,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  금형을 선택해주세요.
                </p>
              )}
            </div>
            {choice !== "" ? (
              <div
                style={{
                  width: 1100,
                  height: 106,
                  backgroundColor: "#2b2c3b",
                  marginTop: 10,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <ThermometerComponent
                  left={{
                    title: "타수 카운팅",
                    content: `${remainCount}회 남음`,
                  }}
                  thermometer={{
                    limit: "50,000회",
                    percentage: percent,
                    color: "#fd6b00",
                  }}
                  colorVersion={true}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
    
  );
};
const ThermometerComponent: React.FunctionComponent<ThermometerProps> = ({
  left,
  thermometer,
  colorVersion,
}) => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          flexDirection: "column",
          height: 76,
          paddingLeft: 20,
          width: 125,
          marginTop: 15,
        }}
      >
        <p
          style={{
            color: "#fff",
            fontSize: 15,
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          {left.title}
        </p>
        <p
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          {left.content}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 22,
        }}
      >
        {/* thermometer region */}
        <div
          style={{
            width: 720,
            height: 14,
            borderRadius: 7,
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: thermometer.color,
              borderRadius: 7,
              height: "100%",
              width: thermometer.percentage,
            }}
          />
        </div>
        <div
          style={{
            width: 720,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            paddingTop: 4,
          }}
        >
          <p
            style={{
              fontSize: 15,
              color: "#fff",
              textAlign: "left",
              fontWeight: "bold",
            }}
          >
            0
          </p>
          <p
            style={{
              fontSize: 15,
              color: "#fff",
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            {thermometer.limit}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexDirection: "column",
          height: 76,
          paddingRight: 20,
          marginTop: 15,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 30,
            width: 130,
            backgroundColor: colorVersion ? "#717c90" : "#17181c",
            borderRadius: 6,
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            일정 추가
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 30,
            width: 130,
            backgroundColor: colorVersion ? "#717c90" : "#17181c",
            borderRadius: 6,
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            점검 이력 작성
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};
interface ThermometerProps {
  left: {
    title: string;
    content: string;
  };
  thermometer: {
    limit: string;
    percentage: number;
    color: string;
  };
  colorVersion: boolean;
}

export default MoldMaintenanceContainer;
