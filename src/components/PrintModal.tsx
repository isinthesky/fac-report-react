import { forwardRef } from 'react';
import { useSelector } from "react-redux";
import styled from "styled-components";
import ViewDeviceType from './viewer/UnitType';
import { ApprovalsType } from '../static/types';
import { RootStore } from '../store/congifureStore';
import { BaseFlexCenterDiv, BaseFlexColumn, BaseFlexDiv, BaseFlexRow } from '../static/componentSet';
import { STRING_DAILY_MAIN_VIEW_SORTATION, STRING_DAILY_MAIN_VIEW_TIME } from '../static/langSet';

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
      <UnitCountainerLine key={rowIndex} gap="5px">
        <TimeContainer gap="1px">
          {times.map((time: string, index: number) => (
            <TimeDiv key={index}>{time}</TimeDiv>
          ))} 
        </TimeContainer>
                
        {Array.from({ length: column }).map((_, colIndex) => {
          const index = rowIndex * column + colIndex;

          const TypeComp = tabPageInfo.unitList[index].type === 1 ? 'V' : 'W';

          return (
            <UnitCountainerRow key={colIndex} gap="0px">
              <DeviceContainer>
                <ViewDeviceType mode="print" key={index} tabPage={currentTab} index={index} type={TypeComp} />
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

  padding: 5px;
  
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
  width: 500px;
  
  color: #000;
  font-size: 42px;

  background-color: #FFF;
  border: 1px solid #333;
`;

const ApproveTable = styled(BaseFlexRow)`
  position: relative;
  justify-content: flex-end;

  height: 80px;
  width: 250px;
  gap: 0px;

  background-color: #333;
`;

const ApproveDiv = styled(BaseFlexColumn)`
  flex:1;
  display: flex;
  align-items: stretch;
  justify-items: stretch;
  gap: 1px;
  padding: 1px;

  min-width: 70px;
  // border: 1px solid #555;
`;

const NameDiv = styled(BaseFlexCenterDiv)`
  height : 22px;
  background-color: #FFF;
  // border: 1px solid #555;
`;

const SignDiv = styled(BaseFlexDiv)`
  align-self: stretch;
  justify-self: stretch;
  
  height : 80px;
  background-color: #FFF;
  // border: 1px solid #555;
`;

const UnitCountainerLine = styled(BaseFlexRow)`
  align-items: start;
  justify-items: stretch;
  
  // border: 1px solid #f55;
`;

const UnitCountainerRow = styled(BaseFlexRow)`
  width: 100%;
  background-color: #333;
`;

const DeviceContainer = styled(BaseFlexRow)`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #FFF;
`;


const TimeContainer = styled(BaseFlexColumn)`
  width: 50px;

  background-color: #333;
  gap: 1px;
  padding: 1px;
`;

const TimeDiv = styled(BaseFlexCenterDiv)`
  // width: calc(100%);

  padding: 5px 0px;
  background-color: #FFF;
`;

const HideDiv = styled.div`
  display: flex;
  width: 200px;

  background-color: #FFF;
`;

export default PrintModal;
