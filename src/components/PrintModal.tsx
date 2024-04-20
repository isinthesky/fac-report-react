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
  mainTab: number;
  subTab: number;
};

const PrintModal = forwardRef<HTMLDivElement, PrintGuideProps>(({ row, column, mainTab, subTab }, ref) => {
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const currentTab = useSelector((state : RootStore) => state.tabPageReducer.currentTabPage);

  const renderDevice = () => {
    const tabPageInfo = currentTab;

    const times = [STRING_DAILY_MAIN_VIEW_SORTATION, "/", STRING_DAILY_MAIN_VIEW_TIME];
      times.push(...tabPageInfo.times.map((time: string) => time));
    
    return Array.from({ length: row }).map((_, rowIndex) => (
      <UnitCountainerLine key={rowIndex} gap="5px">
        {Array.from({ length: column }).map((_, colIndex) => {
          const index = rowIndex * column + colIndex;

          const TypeComp = tabPageInfo.unitList[index].type === 1 ? 'V' : 'W';

          return (
            <UnitCountainerRow key={colIndex} gap="0px">
              {colIndex === 0 && (<TimeContainer gap="0px">
                {times.map((time: string, index: number) => (
                  <TimeDiv key={index}>{time}</TimeDiv>
                ))}
              </TimeContainer>)}
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
          {settingSet?.savedApprovals.filter(
            (item:ApprovalsType) => item.checked).map(
              (item:ApprovalsType, idx:number) => {
                return (<ApproveDiv key={idx} gap="0px">
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
  
  width: 287mm;
  height: 200mm;

  padding: 5px;
  
  border: 2px solid #777;
  background-color: #FFF;
`;

const TitleArea =  styled(BaseFlexRow)`
  position: relative;
  justify-content: space-between;
  justify-self: stretch;
  background-color: #FFF;
`;

const TitleBox =  styled.button`
  position: relative;
  width: 500px;
  font-size: 42px;

  border: 1px solid #cc2;
`;

const ApproveTable = styled(BaseFlexRow)`
  position: relative;
  justify-content: flex-end;

  height: 80px;
  width: 300px;
  margin : 5px;
  background-color: #FFF;
`;

const ApproveDiv = styled(BaseFlexColumn)`
  align-items: stretch;
  justify-items: stretch;

  width: 100px;
`;

const NameDiv = styled.button`
  height : 18px;
  border: 1px solid #555;
`;

const SignDiv = styled(BaseFlexDiv)`
  align-self: stretch;
  justify-self: stretch;
  
  height : 80px;
  border: 1px solid #888;
`;

const UnitCountainerLine = styled(BaseFlexRow)`
  align-items: start;
  justify-items: stretch;
  margin: 5px;
  border: 1px solid #C33;
`;

const UnitCountainerRow = styled(BaseFlexRow)`
  width: 100%;
`;

const TimeContainer = styled(BaseFlexColumn)`
  width: 50px;
`;

const DeviceContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #FFF;
`;

const TimeDiv = styled(BaseFlexCenterDiv)`
  width: calc(100% - 2px);
  height: 25px;

  padding: 0px;
  border: 1px solid #ccc;
  background-color: #FFF;
`;

const HideDiv = styled.div`
  display: flex;
  width: 200px;
`;

export default PrintModal;
