import { forwardRef } from 'react';
import { useSelector } from "react-redux";
import styled from "styled-components";
import ViewDeviceTypeV from "./viewer/ViewDeviceTypeV";
import ViewDeviceTypeW from "./viewer/ViewDeviceTypeW";
import { ApprovalsType } from '../static/types';
import { RootStore } from '../store/congifureStore';

type PrintGuideProps = {
  row: number;
  column: number;
  mainTab: string;
  subTab: string;
};

const PrintModal = forwardRef<HTMLDivElement, PrintGuideProps>(({ row, column, mainTab, subTab }, ref) => {
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const tabPageSet = useSelector((state : RootStore) => state.tabPageReducer);

  const renderDevice = () => {
    const key = process.env.REACT_APP_CONST_TABINFO_NAME + `${mainTab}${subTab}`;

    const times = ["구 분", "/", "시 간"];
    times.push(...tabPageSet[key].times.map((time:string) => time));
    
    return Array.from({ length: row }).map((_, rowIndex) => (
      <RowContainer key={rowIndex}>
        {Array.from({ length: column }).map((_, colIndex) => {
          const index = rowIndex * column + colIndex;

          const TypeComp = 
          tabPageSet[key].unitList[index]?.type === 1 ? ViewDeviceTypeV : ViewDeviceTypeW;

          return (
            <InnerContainer key={colIndex}>
              <ColumnContainer>
                {times.map((time, index) => (
                  <StyledColumn key={index}>{time}</StyledColumn>
                ))}
              </ColumnContainer>
              <DeviceContainer>
                <TypeComp key={index} tabKey={key} device={tabPageSet[key].unitList[index]} />
              </DeviceContainer>
            </InnerContainer>
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
  width: 297mm;
  height: 210mm;
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid #cc2;
`;

const TitleArea =  styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-self: stretch;
  border: 1px solid #cc2;
`;

const TitleBox =  styled.button`
  position: relative;
  width: 500px;
  border: 1px solid #cc2;
`;

const ApproveTable = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-self: end;
  align-items: start;
  height: 100px;
  width: 300px;
  margin : 5px;
  // border: 1px solid #ccc;
`;

const ApproveDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-items: stretch;
  
  // border: 1px solid #ccc;
`;

const NameDiv = styled.button`
  height : 20px;
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
  // flex: 1;
  // display: inline-block;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-items: stretch;
  margin: 5px;
  gap: 5px;
  border: 1px solid #C33;
`;

const InnerContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: start;
  justify-items: stretch;
  flex-direction: row;
`;

const ColumnContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 20px;
`;

const DeviceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const StyledColumn = styled.div`
  // flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 14px;
  
  padding: 3px;
  border: 1px solid #c3c;
  min-width: 30px;
`;

const HideDiv = styled.div`
  display: flex;
  width: 200px;
  // border: 1px solid #ccc;
`;

export default PrintModal;
