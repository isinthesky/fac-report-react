import { forwardRef } from 'react';
import { useSelector } from "react-redux";
import styled from "styled-components";
import ViewDeviceType from './viewer/ViewDeviceType';
import { ApprovalsType } from '../static/types';
import { RootStore } from '../store/congifureStore';
import { BaseFlexCenterDiv, BaseFlexDiv } from '../static/componentSet';
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
      <RowContainer key={rowIndex}>
        {Array.from({ length: column }).map((_, colIndex) => {
          const index = rowIndex * column + colIndex;

          const TypeComp = tabPageInfo.unitList[index].type === 1 ? 'V' : 'W';

          return (
            <Container key={colIndex}>
              {colIndex === 0 && (<TimeContainer>
                {times.map((time: string, index: number) => (
                  <TimeDiv key={index}>{time}</TimeDiv>
                ))}
              </TimeContainer>)}
              <DeviceContainer>
                <ViewDeviceType key={index} tabPage={currentTab} index={index} type={TypeComp} />
              </DeviceContainer>
            </Container>
          );
        })}
      </RowContainer>
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
                return (<ApproveDiv key={idx}>
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


const PrintArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  
  width: 287mm;
  height: 200mm;

  padding: 5px;
  
  border: 2px solid #777;
`;

const TitleArea =  styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-self: stretch;
`;

const TitleBox =  styled.button`
  position: relative;
  width: 500px;
  font-size: 42px;

  border: 1px solid #cc2;
`;

const ApproveTable = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;

  justify-content: flex-end;

  height: 80px;
  width: 300px;
  margin : 5px;
`;

const ApproveDiv = styled(BaseFlexDiv)`
  flex-direction: column;
  align-items: stretch;
  justify-items: stretch;

  gap: 0px;

  width: 100px;
`;

const NameDiv = styled.button`
  height : 18px;
  border: 1px solid #555;
`;

const SignDiv = styled.div`
  // flex: 1;
  display: flex;
  align-self: stretch;
  justify-self: stretch;
  
  height : 80px;
  border: 1px solid #888;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-items: stretch;
  margin: 5px;
  gap: 5px;
  border: 1px solid #C33;
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

const HideDiv = styled.div`
  display: flex;
  width: 200px;
`;

export default PrintModal;
