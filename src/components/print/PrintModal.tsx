import { forwardRef } from 'react';
import { useSelector } from "react-redux";
import styled from "styled-components";
import ViewDeviceType from '../viewer/UnitType';
import { ApprovalsType } from '../../static/types';
import { RootStore } from '../../store/congifureStore';
import { BaseFlexCenterDiv, BaseFlexColumn, BaseFlexDiv, BaseFlexRow } from '../../static/componentSet';
import { STRING_DAILY_MAIN_VIEW_SORTATION, STRING_DAILY_MAIN_VIEW_TIME } from '../../static/langSet';
import { COLORSET_PRINT_BORDER, COLORSET_PRINT_FONT } from '../../static/colorSet';
import { FONTSET_DEFAULT_DIV_SIZE } from '../../static/fontSet';

type PrintGuideProps = {
  row: number;
  column: number;
};

const PrintModal = forwardRef <HTMLDivElement, PrintGuideProps>(({ row, column }, ref) => {
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const currentTab = useSelector((state : RootStore) => state.tabPageReducer.currentTabPage);

  const renderDevice = () => {
    const tabPageInfo = currentTab;
    const times = [STRING_DAILY_MAIN_VIEW_SORTATION, "/", STRING_DAILY_MAIN_VIEW_TIME];
      times.push(...tabPageInfo.times.map((time: string) => time));
    
    return Array.from({ length: row }).map((_, rowIndex) => (
      <UnitCountainerLine key={rowIndex}>
        <TimeContainer gap="1px">
          {times.map((time: string, index: number) => (
            <TimeDiv key={index} fontSize={settingSet.printFontSize + "px"}>{time}</TimeDiv>
          ))} 
        </TimeContainer>
                
        {Array.from({ length: column }).map((_, colIndex) => {
          const index = rowIndex * column + colIndex;

          const TypeComp = tabPageInfo.tab_table_infos[index].type === 1 ? 'V' : 'W';

          return (
            <UnitCountainerRow key={colIndex} gap="0px">
              <DeviceContainer>
                <ViewDeviceType key={index} tabPage={currentTab} index={index} type={TypeComp} />
              </DeviceContainer>
            </UnitCountainerRow>
          );
        })}
      </UnitCountainerLine>
    ));
  };

  return (
    <PrintArea ref={ref}>
      <TitleArea>
        <HideDiv></HideDiv>
        <TitleBox>{settingSet.printTitle}</TitleBox>
        <ApproveTable>
          {settingSet?.approvals.filter(
            (item:ApprovalsType) => item.checked).map(
              (item:ApprovalsType, idx:number) => {
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

  margin: 20px 0px;
  padding: 10px 20px;
  
  border: 2px solid #333;
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

const UnitCountainerLine = styled(BaseFlexCenterDiv)`
  align-items: center;
  justify-items: stretch;
  gap: 2px;

  background-color: #000;
  border: 1px solid ${COLORSET_PRINT_BORDER};
`;

const UnitCountainerRow = styled(BaseFlexRow)`
  width: 100%;
  background-color: ${COLORSET_PRINT_BORDER};
`;

const DeviceContainer = styled(BaseFlexRow)`
  width: 100%;
  background-color: #FFF;
`;

const TimeContainer = styled(BaseFlexColumn)`
  width: 50px;

  background-color: ${COLORSET_PRINT_BORDER};
`;

const TimeDiv = styled(BaseFlexCenterDiv)<{ fontSize?: string }>`
  padding: 3px 2px;
  font-size: ${(props) => props.fontSize? props.fontSize : FONTSET_DEFAULT_DIV_SIZE};
  color: ${COLORSET_PRINT_FONT};
  background-color: #FFF;
`;

const HideDiv = styled.div`
  width: 200px;
  background-color: transparent;
`;

export default PrintModal;
