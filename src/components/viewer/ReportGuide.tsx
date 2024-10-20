import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import TableData from "./TableData";
import TableUser from "./TableUser";
import { RootStore } from "../../store/congifureStore";
import { STRING_DAILY_MAIN_VIEW_SORTATION, STRING_DAILY_MAIN_VIEW_TIME, STRING_ERR_SERVER_CONNECT } from "../../static/langSet";
import { BaseFlex1Row, BaseFlexCenterDiv, BaseFlexDiv } from "../../static/componentSet";
import { COLORSET_GRID_HEADER_BG, COLORSET_GRID_CONTROL_BORDER, COLORSET_PRINT_BORDER } from "../../static/colorSet";
import { CONST_TYPE_INFO, isValidTableUserType, isValidTableDataType } from "../../env";
import { isDataTableTypeByInt } from "../../static/utils";

type ReportGuideProps = {
  row: number;
  column: number;
};

const ReportGuide: React.FC<ReportGuideProps> = ({ row, column }) => {
  const currentTab = useSelector((state : RootStore) => state.tabPageReducer.currentTabPage);

  const renderDevice = useMemo(() => {
    return () => {
      if (!currentTab) {
        return <></>;
      }

      if (!currentTab.tables || currentTab.tables.length === 0) {
        return <>{STRING_ERR_SERVER_CONNECT}</>;
      }

      const times = [STRING_DAILY_MAIN_VIEW_SORTATION, "/", STRING_DAILY_MAIN_VIEW_TIME];
      times.push(...currentTab.times.map((time: string) => time));

      return Array.from({ length: row }).map((_, rowIndex) => (
        <RowContainer key={`report-guide-row-${rowIndex}`}>
          {Array.from({ length: column }).map((_, colIndex) => {
            const index = rowIndex * column + colIndex;
            const currentTable = currentTab.tables[index];

            if (currentTable.disable) {
              return <></>;
            }

            if (isDataTableTypeByInt(currentTable.type)) {
              const typeInfo = CONST_TYPE_INFO.find(info => info.index === currentTable.type);
              const tableType = typeInfo?.keyword;
              
              if (tableType && isValidTableDataType(tableType)) {
                return (
                  <Container key={`report-guide-container-${colIndex}`} mode="view">
                    <TimeContainer mode="view">
                      {times.map((time: string, index: number) => (
                        <TimeDiv key={`report-guide-time-${index}`}>{time}</TimeDiv>
                      ))}
                    </TimeContainer>
                    <BaseFlex1Row>
                      <TableData 
                        key={`report-guide-table-data-${index}`}
                        currentTable={currentTable} 
                        times={times}
                      />
                    </BaseFlex1Row>
                  </Container>
                )
              }
            } else {

              const typeInfo = CONST_TYPE_INFO.find(info => info.index === currentTable.type);
              const tableType = typeInfo?.keyword;

              if (tableType && isValidTableUserType(tableType)) {
                return (
                <Container key={`report-guide-container-${colIndex}`} mode="view">
                  <TableUser 
                    key={`report-guide-table-user-${index}`}
                    currentTable={currentTable} 
                    times={null}
                  />
                </Container>
                );
              }
            }
          })}
        </RowContainer>
      ));
    };
  }, [currentTab, row, column]); // Add dependencies here

  return <>{renderDevice()}</>;
};

const RowContainer = styled(BaseFlexDiv)`
  align-items: stretch;
  width: 100%;
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

  gap: 1px;

  background-color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_BORDER : COLORSET_GRID_CONTROL_BORDER};
`;

const TimeDiv = styled(BaseFlexCenterDiv)`
  padding: 3px 2px;
  background-color: ${COLORSET_GRID_HEADER_BG};
`;

export default ReportGuide;
