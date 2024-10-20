import { forwardRef } from 'react';
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ApprovalsType } from '../../static/types';
import TableData from "../viewer/TableData";
import TableUser from "../viewer/TableUser";
import { RootStore } from '../../store/congifureStore';
import { BaseFlexCenterDiv, BaseFlexColumn, BaseFlexDiv, BaseFlexRow } from '../../static/componentSet';
import { STRING_DAILY_MAIN_VIEW_SORTATION, STRING_DAILY_MAIN_VIEW_TIME } from '../../static/langSet';
import { COLORSET_PRINT_BORDER, COLORSET_PRINT_FONT } from '../../static/colorSet';
import { FONTSET_DEFAULT_DIV_SIZE } from '../../static/fontSet';
import { CONST_TYPE_INFO } from "../../env";
import { isDataTableTypeByInt, isUserTableTypeByInt } from "../../static/utils";
import { Unit } from "../../static/types";


type PrintGuideProps = {
  row: number;
  column: number;
};


const PrintModal = forwardRef<HTMLDivElement, PrintGuideProps>(({ row, column }, ref) => {
  const settingSlice = useSelector((state: RootStore) => state.settingReducer);
  const currentTab = useSelector((state: RootStore) => state.tabPageReducer.currentTabPage);

  const renderDevice = () => {
    if (!currentTab) {
      return;
    }

    const tabPageInfo = currentTab;
    const times = [STRING_DAILY_MAIN_VIEW_SORTATION, "/", STRING_DAILY_MAIN_VIEW_TIME];
    times.push(...tabPageInfo.times.map((time: string) => time));
    
    return Array.from({ length: row }).map((_, rowIndex) => (
      <UnitContainerLine key={rowIndex}>
        {Array.from({ length: column }).map((_, colIndex) => {
            const index = rowIndex * column + colIndex;
            const currentTable = currentTab.tables[index];

            if (currentTable.disable) {
              return <></>;
            }

            if (isDataTableTypeByInt(currentTable.type)) {
              return (
                <UnitContainerRow key={colIndex}>
                  <TimeContainer gap="1px">
                    {times.map((time: string, index: number) => (
                      <TimeDiv key={index} fontSize={settingSlice.printFontSize + "px"}>{time.substring(0, 2)}</TimeDiv>
                    ))}
                  </TimeContainer>
                  <DeviceContainer>
                    <TableData 
                      key={`print-table-data-${index}`}
                      currentTable={currentTable} 
                      type={CONST_TYPE_INFO[currentTable.type].keyword as "V" | "W" | "R" | "S"} 
                      times={times}
                    />
                  </DeviceContainer>
                </UnitContainerRow>
              )
            } else {
              return (
                <UnitContainerRow key={colIndex}>
                  <DeviceContainer>
                    <TableUser
                      key={`print-table-user-${index}`}
                      currentTable={currentTab?.tables[index] || {} as Unit} 
                      type={CONST_TYPE_INFO[currentTable.type].keyword as "U1" | "U2" | "TR"} 
                      times={null}
                    />
                  </DeviceContainer>
                </UnitContainerRow>
              );
            }
          })}
      </UnitContainerLine>
    ));
  };

  console.log("settingSlice.approvals", settingSlice.approvals);

  return (
    <PrintArea ref={ref}>
      <TitleArea>
        <HideDiv></HideDiv>
        <TitleBox>{settingSlice.printTitle}</TitleBox>
        <ApproveTable>
          {settingSlice?.approvals.filter(
            (item:ApprovalsType) => item.checked).map(
              (item:ApprovalsType, idx:number) => {
                console.log("item", item);
                return (
                  <ApproveDiv key={idx} gap="1px">
                    <NameDiv> {item.text} </NameDiv>
                    <SignDiv />
                  </ApproveDiv>)
              }
            )
          }
        </ApproveTable>
      </TitleArea>
      {renderDevice()}
    </PrintArea>
  );
});


const PrintArea = styled(BaseFlexColumn)`
  position: relative;
  width: 257mm;
  height: 170mm;

  margin: 5px 0px;
  padding: 0px 5px;
  
  border: 1px solid #333;
  background-color: #FFF;
`;

const TitleArea =  styled(BaseFlexRow)`
  position: relative;
  justify-content: space-between;
  justify-self: stretch;
  background-color: #FFF;
`;

const TitleBox =  styled(BaseFlexCenterDiv)`
  position: relative;
  width: 400px;
  
  color: #000;
  font-size: 42px;

  background-color: #FFF;
  border: 1px solid ${COLORSET_PRINT_BORDER};
`;

const ApproveTable = styled(BaseFlexRow)`
  position: relative;
  justify-content: flex-end;

  height: 60px;
  width: 180px;
  gap: 1px;
  padding: 1px;

  background-color: ${COLORSET_PRINT_BORDER};
`;

const ApproveDiv = styled(BaseFlexColumn)`
  flex:1;
  align-items: stretch;
  justify-items: stretch;
  min-width: 60px;
`;

const NameDiv = styled(BaseFlexCenterDiv)`
  height : 24px;
  color: ${COLORSET_PRINT_FONT};
  background-color: #FFF;
  font-size: 11px;
`;

const SignDiv = styled(BaseFlexDiv)`
  align-self: stretch;
  justify-self: stretch;
  
  height : 80px;
  background-color: #FFF;
`;

const UnitContainerLine = styled(BaseFlexCenterDiv)`
  align-items: center;
  justify-items: stretch;
  gap: 2px;

  background-color: #000;
  border: 1px solid ${COLORSET_PRINT_BORDER};
`;

const UnitContainerRow = styled(BaseFlexRow)`
  width: 100%;
  background-color: ${COLORSET_PRINT_BORDER};
  gap: 1px;
`;

const DeviceContainer = styled(BaseFlexRow)`
  width: 100%;
  background-color: #FFF;
`;

const TimeContainer = styled(BaseFlexColumn)`
  background-color: ${COLORSET_PRINT_BORDER};
  padding: 0px;
  `;

const TimeDiv = styled(BaseFlexCenterDiv)<{ fontSize?: string }>`
  padding: 2px 1px;
  width: 18px;

  font-size: ${(props) => props.fontSize? props.fontSize : FONTSET_DEFAULT_DIV_SIZE};
  color: ${COLORSET_PRINT_FONT};
  background-color: #FFF;
`;

const HideDiv = styled.div`
  width: 200px;
  background-color: transparent;
`;

export default PrintModal;
