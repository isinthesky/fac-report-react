import React from "react";
import styled from "styled-components";
import DeviceValue from "./DeviceValue";
import { ViewDeviceProps } from "../../static/types";
import { useSelector } from "react-redux";
import { RootStore } from "../../store/congifureStore";


const ViewDeviceTypeW: React.FC<ViewDeviceProps> = ({ device, tabKey }) => {
  const sections = [
    { label: "W", values: ["R-S", "S-T", "T-R"] },
    { label: "A", values: ["R", "S", "T"] },
    { label: "/", values: ["PF"] },
    { label: "/", values: ["Hz"] },
    { label: "/", values: ["kW"] },
  ];

  const tabPageSet = useSelector((state : RootStore) => state.tabPageReducer);


  return (
    <Container>
      <Row>
        <TitleColumn>{device.name}</TitleColumn>
      </Row>
      <Row>
        {sections.map((section, sectionIdx) => (
          <Container key={`section-${sectionIdx}`} >
            <Row>
              <MiddleColumn>{section.label}</MiddleColumn>
            </Row>
            <Row>
              {section.values.map((value, valueIdx) => (
                <Column  key={`value-${sectionIdx}-${valueIdx}`}>
                  <ValueRow>{value}</ValueRow>
                  <DeviceValue times={tabPageSet[tabKey].times} devId={(device as any)[`dv${String((valueIdx + 1))}`]} />
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
  min-width: 25px;
`;

export default ViewDeviceTypeW;
