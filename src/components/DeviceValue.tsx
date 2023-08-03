import React from "react";
import styled from "styled-components";

interface DeviceValueProps {
  row: number;
  col: number;
}

const DeviceValue: React.FC<DeviceValueProps> = ({ row, col }) => {
  return (
    <Container3>
      {[...Array(row)].map((_, rowIndex) => (
        <Row3 key={rowIndex}>
          {[...Array(col)].map((_, colIndex) => (
            <ValueColumn3 key={colIndex}>{colIndex}</ValueColumn3>
          ))}
        </Row3>
      ))}
    </Container3>
  );
};

const Container3 = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Row3 = styled.div`
  display: flex;
  flex-direction: row;
`;

const ValueColumn3 = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 3px;
  border: 1px solid #ccc;

  min-width: 20px;
`;

export default DeviceValue;
