import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ViewDeviceType from "./UnitType";
import { RootStore } from "../../store/congifureStore";
import { STRING_DAILY_MAIN_VIEW_SORTATION, STRING_DAILY_MAIN_VIEW_TIME, STRING_ERR_SERVER_CONNECT } from "../../static/langSet";
import { BaseFlexCenterDiv, BaseFlexDiv } from "../../static/componentSet";
import { COLORSET_GRID_HEADER_BG, COLORSET_GRID_CONTROL_BORDER, COLORSET_PRINT_BORDER } from "../../static/colorSet";
import { CONST_TYPE_INFO_INDEX } from "../../env";

type ReportGuideProps = {
  row: number;
  column: number;
};

const ReportGuide: React.FC<ReportGuideProps> = ({ row, column }) => {
  const currentTab = useSelector((state : RootStore) => state.tabPageReducer.currentTabPage);

  useEffect(() => {
    console.log("currentTab", currentTab.tables)
  }, [currentTab])

  const renderDevice = useMemo(() => {
    return () => {
      if (currentTab.tables.length === 0) {
        return <>{STRING_ERR_SERVER_CONNECT}</>;
      }

      console.log("currentTab", currentTab, currentTab.tables[0].device_values)

      const times = [STRING_DAILY_MAIN_VIEW_SORTATION, "/", STRING_DAILY_MAIN_VIEW_TIME];
      times.push(...currentTab.times.map((time: string) => time));

      return Array.from({ length: row }).map((_, rowIndex) => (
        <RowContainer key={rowIndex}>
          {Array.from({ length: column }).map((_, colIndex) => {
            const index = rowIndex * column + colIndex;
            
            if (currentTab.tables.length <= index) {
              return <></>;
            }
            if (currentTab.tables[index].type === CONST_TYPE_INFO_INDEX[2]) {
              return <></>;
            }
            
            const TypeComp = currentTab.tables[index].type === 1 ? 'V' : 'W';

            return (
              <Container key={colIndex} mode="view" >
                <TimeContainer mode="view">
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
    };
  }, [currentTab, row, column]); // Add dependencies here

  return <>{renderDevice()}</>;
};

const RowContainer = styled(BaseFlexDiv)`
  align-items: stretch;

  width: calc(100%);
  gap: 10px;
`;

const Container = styled(BaseFlexCenterDiv)<{ mode?: string }>`
  flex-direction: row;
  
  width: 100%;
  gap: 1px;
  padding: 1px;
  
  background-color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_BORDER : COLORSET_GRID_CONTROL_BORDER};
`;

const TimeContainer = styled(BaseFlexDiv)<{ mode?: string }>`
  flex-direction: column;

  width: 50px;

  gap: 1px;

  background-color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_BORDER : COLORSET_GRID_CONTROL_BORDER};
`;

const DeviceContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const TimeDiv = styled(BaseFlexCenterDiv)`
  width: 100%;

  padding: 3px 0px;
  background-color: ${COLORSET_GRID_HEADER_BG};
`;

export default ReportGuide;
