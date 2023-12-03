import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ViewDeviceTypeV from "./ViewDeviceTypeV";
import ViewDeviceTypeW from "./ViewDeviceTypeW";
import { RootStore } from "../../store/congifureStore";
import { TabPageInfotype } from "../../static/types";
import { STRING_DAILY_MAIN_VIEW_SORTATION, STRING_DAILY_MAIN_VIEW_TIME } from "../../static/langSet";
import { BaseFlexCenterDiv, BaseFlexDiv } from "../../static/componentSet";

type ReportGuideProps = {
  row: number;
  column: number;
  mainTab: string;
  subTab: string;
};

const ReportGuide: React.FC<ReportGuideProps> = ({ row, column, mainTab, subTab }) => {
  const tabPageSlice = useSelector((state :RootStore) => state.tabPageReducer);

  const renderDevice = () => {
    const tabKey = process.env.REACT_APP_CONST_TABINFO_NAME + `${mainTab}${subTab}`;
    const tabPageInfo = tabPageSlice[tabKey] as TabPageInfotype;

    if (tabPageInfo.unitList[0] === undefined) {
      return <></>
    }

    const times = [STRING_DAILY_MAIN_VIEW_SORTATION, "/", STRING_DAILY_MAIN_VIEW_TIME];
    times.push(...tabPageInfo.times.map((time: string) => time));
    
    return Array.from({ length: row }).map((_, rowIndex) => (
      <RowContainer key={rowIndex}>
        {Array.from({ length: column }).map((_, colIndex) => {
          const index = rowIndex * column + colIndex;

          const TypeComp = 
          tabPageInfo.unitList[index].type === 1 ? ViewDeviceTypeV : ViewDeviceTypeW;

          return (
            <Container key={colIndex}>
              <TimeContainer>
                {times.map((time: string, index: number) => (
                  <TimeDiv key={index}>{time}</TimeDiv>
                ))}
              </TimeContainer>
              <DeviceContainer>
                <TypeComp key={index} tabKey={tabKey} unit={tabPageInfo.unitList[index]} />
              </DeviceContainer>
            </Container>
          );
        })}
      </RowContainer>
    ));
  };

  return <>{renderDevice()}</>;
};

const RowContainer = styled(BaseFlexDiv)`
  align-items: stretch;

  width: calc(100% - 10px);

  margin: 5px;
  gap: 5px;
`;

const Container = styled(BaseFlexDiv)`
  flex-direction: row;
  
  width: 100%;
  
  gap: 0px;
`;

const TimeContainer = styled(BaseFlexDiv)`
  flex-direction: column;

  width: 50px;

  gap: 0px;
`;

const DeviceContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const TimeDiv = styled(BaseFlexCenterDiv)`
  width: calc(100% - 2px);
  height: 25px;

  padding: 0px;
  border: 1px solid #ccc;
`;

export default ReportGuide;
