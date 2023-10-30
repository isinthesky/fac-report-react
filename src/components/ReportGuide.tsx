import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ViewDeviceTypeV from "./ViewDeviceTypeV";
import ViewDeviceTypeW from "./ViewDeviceTypeW";
import { optionState } from "../static/interface";

type ReportGuideProps = {
  row: number;
  column: number;
  mainTab: string;
  subTab: string;
};

interface RootState {
  deviceReducer: {
    value: any;
  };
}

const ReportGuide: React.FC<ReportGuideProps> = ({ row, column, mainTab, subTab }) => {
  const deviceSet = useSelector(
    (state: RootState) => state.deviceReducer.value
  );
  const optionlist = useSelector(
    (state: optionState) => state.optionReducer.value
  );

  const renderDevice = () => {
    const key = `deviceList${mainTab}${subTab}`;

    if (!deviceSet[key] || deviceSet[key].length < 1) {
      return;
    }

    const times = ["구 분", "/", "시 간"];
    const tabKey = `tab${mainTab}${subTab}`;

    for (const time of optionlist[tabKey]){
      times.push(time);
    }

    return Array.from({ length: row }).map((_, rowIndex) => (
      <RowContainer key={rowIndex}>
        {Array.from({ length: column }).map((_, colIndex) => {
          const index = rowIndex * column + colIndex;

          const TypeComp =
            deviceSet[key][index]?.type === 1 ? ViewDeviceTypeV : ViewDeviceTypeW;
          return (
            <Container key={colIndex}>
              <ColumnContainer>
                {times.map((time, index) => (
                  <StyledColumn key={index}>{time}</StyledColumn>
                ))}
              </ColumnContainer>
              <DeviceContainer>
                <TypeComp key={index} tabKey={tabKey} device={deviceSet[key][index]} />
              </DeviceContainer>
            </Container>
          );
        })}
      </RowContainer>
    ));
  };

  return <>{renderDevice()}</>;
};

const RowContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  margin: 5px;
  gap: 5px;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const ColumnContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  width: 20px;
`;

const DeviceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const StyledColumn = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  
  padding: 3px;
  border: 1px solid #ccc;
`;

export default ReportGuide;
