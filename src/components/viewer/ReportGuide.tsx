import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ViewDeviceTypeV from "./ViewDeviceTypeV";
import ViewDeviceTypeW from "./ViewDeviceTypeW";
import { RootStore } from "../../store/congifureStore";
import { TabPageInfotype } from "../../static/types";

type ReportGuideProps = {
  row: number;
  column: number;
  mainTab: string;
  subTab: string;
};

const ReportGuide: React.FC<ReportGuideProps> = ({ row, column, mainTab, subTab }) => {
  const tabPageSet = useSelector((state : RootStore) => state.tabPageReducer);

  const renderDevice = () => {
    const tabKey = process.env.REACT_APP_CONST_TABINFO_NAME + `${mainTab}${subTab}`;
    const tabPageInfo = tabPageSet[tabKey] as TabPageInfotype;

    if (tabPageInfo.unitList[0] === undefined) {
      return <></>
    }

    const times = ["구 분", "/", "시 간"];
    times.push(...tabPageInfo.times.map((time:string) => time));
    
    return Array.from({ length: row }).map((_, rowIndex) => (
      <RowContainer key={rowIndex}>
        {Array.from({ length: column }).map((_, colIndex) => {
          const index = rowIndex * column + colIndex;

          const TypeComp = 
          tabPageInfo.unitList[index].type === 1 ? ViewDeviceTypeV : ViewDeviceTypeW;

          return (
            <Container key={colIndex}>
              <ColumnContainer>
                {times.map((time, index) => (
                  <StyledColumn key={index}>{time}</StyledColumn>
                ))}
              </ColumnContainer>
              <DeviceContainer>
                <TypeComp key={index} tabKey={tabKey} device={tabPageInfo.unitList[index]} />
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
