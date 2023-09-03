import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getSettings, postDailyData } from "../features/api";
import ReportGuide from "../components/ReportGuide";
import { setDailySetting } from "../features/reducers/optionSlice";

function Daily() {
  interface OptionState {
    optionReducer: {
      value: any;
    };
  }

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const response = await getSettings();
        console.log("res", response);
        if (response) {
          dispatch(setDailySetting(response.settings));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const option = useSelector((state: OptionState) => state.optionReducer.value);

  const [value, onChange] = useState(new Date());

  const handleDailyInfo = async () => {
    const ret = await postDailyData(
      value.getFullYear(),
      value.getMonth(),
      value.getDate()
    );
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
        <ApplyButton onClick={handleDailyInfo}>Apply</ApplyButton>
      </Controls>
      <ReportLine>
        <ReportGuide
          row={option.daily.row}
          column={option.daily.column}
        ></ReportGuide>
      </ReportLine>
    </Flat>
  );
}

const Flat = styled.div`
  display: flex;
  flex-direction: column;

  height: calc(100vh - 50px);
  width: calc(100vw - 160px);

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
