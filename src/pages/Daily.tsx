import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postDailyData } from "../features/api";
import ReportGuide from "../components/ReportGuide";

function Daily() {
  interface OptionState {
    optionReducer: {
      value: any;
    };
  }

  const { id1, id2 } = useParams();

  console.log("Daily id : ", id1, id2);

  const option = useSelector((state: OptionState) => state.optionReducer.value);
  const [value, onChange] = useState(new Date());

  const handleDatePicker = async () => {
    const ret = await postDailyData(
      value.getFullYear(),
      value.getMonth(),
      value.getDate()
    );
  };

  const handleDaily = async () => {};

  const handleWeekly = async () => {};

  const handlePrint = async () => {
    const isConfirmed = window.confirm("인쇄하시겠습니까??");

    if (isConfirmed) {
      window.confirm("Print");
    }
  };

  return (
    <Flat>
      <Controls>
        <DatePicker
          selected={value}
          onChange={(date: Date) => onChange(date)}
        />
        <ApplyButton onClick={handleDatePicker}>Apply</ApplyButton>
        <ApplyButton onClick={handleDaily}>Daily</ApplyButton>
        <ApplyButton onClick={handleWeekly}>Weekly</ApplyButton>
        <ApplyButton onClick={handlePrint}>Print</ApplyButton>
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
  flex: 1;
  display: flex;
  flex-direction: column;

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
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;

  margin: 20px;
  border: 1px solid #555;
`;

const ApplyButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 21px;
  width: 100px;
`;

export default Daily;
