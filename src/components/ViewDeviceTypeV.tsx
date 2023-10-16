import React from "react";
import styled from "styled-components";
import DeviceValue from "./DeviceValue";
import { ViewDeviceProps } from "../static/types";
import { readDeviceLog } from "../features/api";


const ViewDeviceTypeV: React.FC<ViewDeviceProps> = ({ device }) => {
  const sections = [
    { label: "V", values: ["R-S", "S-T", "T-R"] },
    { label: "A", values: ["R", "S", "T"] },
    { label: "/", values: ["PF"] },
    { label: "/", values: ["Hz"] },
    { label: "/", values: ["kW"] },
  ];

  let devIndex = 1;
  
  return (
    <Container>
      <Row>
        <TitleColumn>{device.name}</TitleColumn>
      </Row>
      <Row>
        {sections.map((section, idx) => (
          <div key={idx}>
            <Row>
              <MiddleColumn>{section.label}</MiddleColumn>
            </Row>
            <Row>
              {section.values.map((value, valueIdx) => (
                <Column>
                  <ValueRow key={valueIdx}>{value}</ValueRow>
                  <DeviceValue row={4} devId={(device as any)[`dv${String((devIndex++))}`]}  />
                </Column>
              ))}
            </Row>
          </div>
        ))}
      </Row>
    </Container>
  );
};

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: stretch;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const TitleColumn = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border: 1px solid #ccc;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
`;

const MiddleColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border: 1px solid #ccc;
`;

const ValueRow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3px;
  min-width: 20px;
`;

export default ViewDeviceTypeV;
