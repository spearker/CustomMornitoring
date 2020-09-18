import React, {useState} from "react";
import Chart from "react-apexcharts";
import Header from "../../Components/Text/Header";
import Styled, {css} from "styled-components";
import searchBtnImg from "../../Assets/Images/btn_search.png";

//공장 환경 분석

const FactoryEnvironmentalAnalysis: React.FunctionComponent = () => {
  const [choice, setChoice] = useState("");
  const [series, setSeries] = useState({
    name: "",
    data: [],
  });
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "scatter",
      zoom: {
        enabled: true,
        type: "xy",
      },
    },
    xaxis: {
      title: {
        text: "Ton",
      },
      tickAmount: 10,
      labels: {
        formatter: function (val) {
          return parseInt(val);
        },
      },
    },
    yaxis: {
      title: {
        text: "Temperature",
      },
      tickAmount: 7,
    },
  });
  const [moldList, setMoldList] = useState([
    {
      name: "제품 명 01",
      mold: "금형 명칭",
      data: [
        [100, 5.4],
        [200, 2],
        [300, 3],
        [119, 2],
        [210, 1],
        [113, 3.2],
        [110.9, 7.4],
        [110.9, 0],
        [110.9, 8.2],
        [116.4, 0],
        [116.4, 1.8],
        [113.6, 0.3],
        [213.6, 0],
        [129.9, 0],
        [127.1, 2.3],
        [116.4, 0],
        [113.6, 3.7],
        [110.9, 5.2],
        [116.4, 6.5],
        [110.9, 0],
        [124.5, 7.1],
        [110.9, 0],
        [18.1, 4.7],
        [119, 0],
        [121.7, 1.8],
        [127.1, 0],
        [124.5, 0],
        [127.1, 0],
        [129.9, 1.5],
        [127.1, 0.8],
        [122.1, 2],
      ],
    },
    {
      name: "제품 명 02",
      mold: "금형 명칭",
      data: [
        [36.4, 13.4],
        [1.7, 11],
        [5.4, 8],
        [9, 17],
        [1.9, 4],
        [3.6, 12.2],
        [1.9, 14.4],
        [1.9, 9],
        [1.9, 13.2],
        [1.4, 7],
        [6.4, 8.8],
        [3.6, 4.3],
        [1.6, 10],
        [9.9, 2],
        [7.1, 15],
        [1.4, 0],
        [3.6, 13.7],
        [1.9, 15.2],
        [6.4, 16.5],
        [0.9, 10],
        [4.5, 17.1],
        [10.9, 10],
        [0.1, 14.7],
        [9, 10],
        [12.7, 11.8],
        [2.1, 10],
        [2.5, 10],
        [27.1, 10],
        [2.9, 11.5],
        [7.1, 10.8],
        [2.1, 12],
      ],
    },
    {
      name: "제품 명 03",
      mold: "금형 명칭",
      data: [
        [21.7, 3],
        [23.6, 3.5],
        [24.6, 3],
        [29.9, 3],
        [21.7, 20],
        [23, 2],
        [10.9, 3],
        [28, 4],
        [27.1, 0.3],
        [16.4, 4],
        [13.6, 0],
        [19, 5],
        [22.4, 3],
        [24.5, 3],
        [32.6, 3],
        [27.1, 4],
        [29.6, 6],
        [31.6, 8],
        [21.6, 5],
        [20.9, 4],
        [22.4, 0],
        [32.6, 10.3],
        [29.7, 20.8],
        [24.5, 0.8],
        [21.4, 0],
        [21.7, 6.9],
        [28.6, 7.7],
        [15.4, 0],
        [18.1, 0],
        [33.4, 0],
        [16.4, 0],
      ],
    },
  ]);

  const choiceFunc = (name1, datum) => {
    if (choice === "" || choice === undefined || choice === null) {
      setChoice(name1);
      setSeries({ ...series, name: name1, data: datum });
      return;
    } else {
      if (choice === name1) {
        setChoice("");
        setSeries({ ...series, name: "", data: [] });

        return;
      } else {
        setChoice(name1);
        setSeries({ ...series, name: name1, data: datum });

        return;
      }
    }
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <Header title={"공정 환경 분석"} />

        <HistorySearch>
          <HistorySearchInput placeholder="검색어를 입력해 주세요. " />
          <HistorySearchBtn>
            <HistoryBtnImgDiv>
              <HistoryImg src={searchBtnImg} />
            </HistoryBtnImgDiv>
          </HistorySearchBtn>
        </HistorySearch>
      </div>

      <ListBox>
        <ListTitleDiv>
          <Span1>제품 리스트</Span1>
          <Span2>금형 명칭</Span2>
        </ListTitleDiv>

        {console.log(choice)}
        {moldList.map((mold, index) =>
          moldList.length > 0 ? (
            <div
              style={{
                backgroundColor: choice === mold.name ? "#19b9df" : "#2b2c3b",
                marginTop: 5,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 6,
                fontSize: 18,
              }}
              id={+"" + index + ""}
              onClick={() => choiceFunc(mold.name, mold.data)}
            >
              <Span1>{mold.name}</Span1>
              <Span2>{mold.mold}</Span2>
            </div>
          ) : (
            <></>
          )
        )}
      </ListBox>
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
            생산 제품을 선택해주세요.
          </p>
        )}
      </div>
      {choice === "" ? (
        <div></div>
      ) : (
        <div id="chart">
          <Chart
            options={options}
            series={[series]}
            type="scatter"
            height={350}
          />
        </div>
      )}
    </div>
  );
};

const HistorySearch = Styled.div`
  position: absolute;
  width: 360px;
  top: -4px;
  right: 0;
  display: inline-flex;
  border: solid 0.5px #b3b3b3;
  background-color: #f4f6fa;
`;

const HistorySearchInput = Styled.input`
  width: calc(100% - 36px);
  height: 36px;
  border: 0;
  padding: 0 0 0 20px;
`;

const HistorySearchBtn = Styled.button`
  width: 36px;
  height: 36px;
  border: solid 0.5px #b3b3b3;
  background-color: #19b9df;
`;

const HistoryBtnImgDiv = Styled.div`
    justify-content: center;
    display: flex;
    align-items: center;
    text-align: center;
`;

const HistoryImg = Styled.img`
  width: 18px;
  height: 18px;
`;

const ListBox = Styled.div`
  width: 1100px;
  text-align: left;
`;
const ListTitleDiv = Styled.div`
  display: table;
  width: 100%;
  height: 50px;
  border-radius: 6px;
  background-color: #17181c;
  margin-bottom: 20px;
`;

const Display = css`
  display: table-cell;
  vertical-align: middle;
`;

const Span1 = Styled.p`
  padding-left: 20px;
  width: 347px;
  ${Display}
`;

const Span2 = Styled.p`
  width:753px;
  ${Display}
`;

export default FactoryEnvironmentalAnalysis;
