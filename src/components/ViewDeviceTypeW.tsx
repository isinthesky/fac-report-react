import React from "react";
import styled from "styled-components";
import DeviceValue from "./DeviceValue";
import { ViewDeviceProps } from "../static/types";
import { useSelector } from "react-redux";
import { optionState } from "../static/interface";


const ViewDeviceTypeW: React.FC<ViewDeviceProps> = ({ device, tabKey }) => {
  const sections = [
    { label: "W", values: ["R-S", "S-T", "T-R"] },
    { label: "A", values: ["R", "S", "T"] },
    { label: "/", values: ["PF"] },
    { label: "/", values: ["Hz"] },
    { label: "/", values: ["kW"] },
  ];

  const optionlist = useSelector(
    (state: optionState) => state.optionReducer.value
  );

  let devIndex = 1;
  let keyIndex = 1;

  return (
    <Container>
      <Row>
        <TitleColumn>{device.name}</TitleColumn>
      </Row>
      <Row>
        {sections.map((section, idx) => (
          <Container >
            <Row>
              <MiddleColumn>{section.label}</MiddleColumn>
            </Row>
            <Row>
              {section.values.map((value) => (
                <Column>
                  <ValueRow key={keyIndex++}>{value}</ValueRow>
                  <DeviceValue key={keyIndex++} times={optionlist[tabKey]} devId={(device as any)[`dv${String((devIndex++))}`]}  />
                </Column>
              ))}
            </Row>
          </Container>
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

export default ViewDeviceTypeW;
