import React from "react";
import styled from "styled-components";
import DeviceValue from "./DeviceValue";

type DeviceType2Props = {
  key: number;
  divName: string;
};

const DeviceType2: React.FC<DeviceType2Props> = ({ divName }) => {
  const sections = [
    { label: "V", values: ["R-S", "S-T", "T-R"] },
    { label: "A", values: ["R", "S", "T"] },
    { label: "/", values: ["PF"] },
    { label: "/", values: ["Hz"] },
    { label: "/", values: ["kW"] },
  ];

  return (
    <Container>
      <Row>
        <TitleColumn>{divName}</TitleColumn>
      </Row>
      <Row>
        {sections.map((section, idx) => (
          <div key={idx}>
            <Row>
              <MiddleColumn>{section.label}</MiddleColumn>
            </Row>
            <Row>
              {section.values.map((value, valueIdx) => (
                <ValueColumn key={valueIdx}>{value}</ValueColumn>
              ))}
            </Row>
            <Row>
              <DeviceValue row={4} col={section.values.length} />
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
  align-items: center;
  justify-content: center;
  padding: 3px;
  border: 1px solid #ccc;
`;

const MiddleColumn = styled(Column)``;

const ValueColumn = styled(Column)`
  min-width: 20px;
`;

export default DeviceType2;
