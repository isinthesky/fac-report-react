import React from "react";
import styled from "styled-components";

interface DeviceValueProps {
  row: number;
  devId: number[];
}

const DeviceValue: React.FC<DeviceValueProps> = ({ row, devId }) => {
  return (
    <Row3>
      {[...Array(row)].map((_, rowIndex) => (
        <ValueColumn3 key={rowIndex}>{devId}</ValueColumn3>
      ))}
    </Row3>
  );
};

const Container3 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Row3 = styled.div`
  display: flex;
  flex-direction: column;
`;

const ValueColumn3 = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 4px;
  border-top: 1px solid #ccc;

  min-width: 20px;
`;

export default DeviceValue;
