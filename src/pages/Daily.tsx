import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postDailyData } from "../features/api";
import ReportGuide from "../components/ReportGuide";

function Daily() {
  const [value, onChange] = useState(new Date());

  const handleGetDaily = async () => {
    const ret = await postDailyData(value.valueOf());
    if (ret) {
      console.info("post daily ok", ret);
    } else {
      console.info("post daily fail", ret);
    }
  };

  return (
    <Flat>
      <Controls>
        <Picker>
          <DatePicker
            selected={value}
            onChange={(date: Date) => onChange(date)}
          />
        </Picker>
        <ApplyButton onClick={handleGetDaily}>Apply</ApplyButton>
      </Controls>
      <ReportLine>
        <ReportGuide />
        <ReportGuide />
        <ReportGuide />
      </ReportLine>
    </Flat>
  );
}

const Flat = styled.div`
  display: flex;
  flex-direction: column;

  height: calc(100vh - 50px);
  width: calc(100vw - 200px);

  background-color: #fcf0cf;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  margin: 20px;
  padding: 10px;
  border: 1px solid #555;
`;

const ReportLine = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;

  margin: 20px;
  border: 1px solid #555;
`;

const Picker = styled.div`
  width: 40vw;
`;

const ApplyButton = styled.button`
  height: 21px;
  width: 100px;

  border: 1px solid #555;
`;

export default Daily;
