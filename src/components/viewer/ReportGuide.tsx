import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ViewDeviceType from "./UnitType";
import { RootStore } from "../../store/congifureStore";
import { STRING_DAILY_MAIN_VIEW_SORTATION, STRING_DAILY_MAIN_VIEW_TIME, STRING_ERR_SERVER_CONNECT } from "../../static/langSet";
import { BaseFlexCenterDiv, BaseFlexDiv } from "../../static/componentSet";
import { COLORSET_GRID_HEADER_BG, COLORSET_GRID_CONTROL_BORDER } from "../../static/colorSet";
import { time } from "console";

type ReportGuideProps = {
  row: number;
  column: number;
};

const ReportGuide: React.FC<ReportGuideProps> = ({ row, column }) => {
  const currentTab = useSelector((state : RootStore) => state.tabPageReducer.currentTabPage);

  console.log("currentTab", currentTab)

  const renderDevice = (() => {
    if (!currentTab.unitList[0]) {
      return <>{STRING_ERR_SERVER_CONNECT}</>;
    }

    const times = [STRING_DAILY_MAIN_VIEW_SORTATION, "/", STRING_DAILY_MAIN_VIEW_TIME];
    times.push(...currentTab.times.map((time: string) => time));

    console.log("times", times, row, column)

    return Array.from({ length: row }).map((_, rowIndex) => (
      <RowContainer key={rowIndex}>
        {Array.from({ length: column }).map((_, colIndex) => {
          const index = rowIndex * column + colIndex;
          const TypeComp = currentTab.unitList[index].type === 1 ? 'V' : 'W';

          return (
            <Container key={colIndex}>
              <TimeContainer>
                {times.map((time: string, index: number) => (
                  <TimeDiv key={index}>{time}</TimeDiv>
                ))}
              </TimeContainer>
              <DeviceContainer>
                <ViewDeviceType key={index} tabPage={currentTab} index={index} type={TypeComp} />
              </DeviceContainer>
            </Container>
          );
        })}
      </RowContainer>
    ));
  });

  return <>{renderDevice()}</>;
};

const RowContainer = styled(BaseFlexDiv)`
  align-items: stretch;

  width: calc(100%);

  // margin: 5px;
  gap: 10px;
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
  background-color: ${COLORSET_GRID_HEADER_BG};
  border: 1px solid ${COLORSET_GRID_CONTROL_BORDER};
`;

export default ReportGuide;
