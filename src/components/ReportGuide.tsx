import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DeviceType1 from "./DeviceType1";
import DeviceType2 from "./DeviceType2";

type ReportGuideProps = {
  row: number;
  column: number;
};

interface RootState {
  deviceReducer: {
    value: any;
  };
}

const ReportGuide: React.FC<ReportGuideProps> = ({ row, column }) => {
  const devicelist = useSelector(
    (state: RootState) => state.deviceReducer.value
  );

  const handleDeviceTypeChange = (values: any) => {
    console.log("DeviceType2 values changed:", values);
  };

  const renderDevice = () => {
    if (!devicelist.deviceList || devicelist.deviceList.length < 1) {
      return;
    }

    const times = ["구 분", "/", "시 간", "07:00", "11:00", "17:00", "23:00"];

    return Array.from({ length: row }).map((_, rowIndex) => (
      <RowContainer key={rowIndex}>
        {Array.from({ length: column }).map((_, colIndex) => {
          const index = rowIndex * column + colIndex;
          const deviceName = devicelist.deviceList[index].name;
          const TypeComp =
            devicelist.deviceList[index]?.type === 1
              ? DeviceType1
              : DeviceType2;
          return (
            <Container key={colIndex}>
              <ColumnContainer>
                {times.map((time, index) => (
                  <StyledColumn key={index}>{time}</StyledColumn>
                ))}
              </ColumnContainer>
              <DeviceContainer>
                <TypeComp key={index} divName={deviceName} />
              </DeviceContainer>
            </Container>
          );
        })}
      </RowContainer>
    ));
  };

  return <>{renderDevice()}</>;
};

const RowContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  margin: 5px;
  gap: 5px;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const ColumnContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const DeviceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const StyledColumn = styled.div`
  flex: 1;
  padding: 3px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ReportGuide;
