import React from "react";
import styled from "styled-components";
import DeviceValue from "./DeviceValue";
import { TabPageInfotype, ViewUnitProps } from "../../static/types";
import { useSelector } from "react-redux";
import { RootStore } from "../../store/congifureStore";
import { BaseFlexCenterDiv } from "../../static/componentSet";
import { FONTSET_DEFAULT_DIV_SIZE } from "../../static/fontSet";

const ViewDeviceTypeW: React.FC<ViewUnitProps> = ({ unit, tabKey }) => {
  const sections = [
    { label: "W", values: ["R-S", "S-T", "T-R"] },
    { label: "A", values: ["R", "S", "T"] },
    { label: "/", values: ["PF"] },
    { label: "/", values: ["Hz"] },
    { label: "/", values: ["kW"] },
  ];

  const tabPageSlice = useSelector((state: RootStore) => state.tabPageReducer);
  const tabPageInfo = tabPageSlice[tabKey] as TabPageInfotype;

  let pos = 0;

  return (
    <Container>
      <Row>
        <TitleColumn>{unit.name}</TitleColumn>
      </Row>
      <Row>
        {sections.map((section, sectionIdx) => (
          <Column key={`section-${sectionIdx}`} >
            <Row>
              <SectionDiv>{section.label}</SectionDiv>
            </Row>
            <Row>
              {section.values.map((value, valueIdx) => (
                <DeviceTypeValueDiv  key={`value-${sectionIdx}-${valueIdx}`}>
                  <DevTypeDiv>{value}</DevTypeDiv>
                  <DeviceValue times={tabPageInfo.times} devId={unit.dvList[pos++]}  />
                </DeviceTypeValueDiv>
              ))}
            </Row>
          </Column>
        ))}
      </Row>
    </Container>
  );
};

const Container = styled(BaseFlexCenterDiv)`
  flex-direction: column;

  width: 100%;
`;

const Row = styled(BaseFlexCenterDiv)`
  flex-direction: row;

  width: 100%;
`;

const TitleColumn = styled(BaseFlexCenterDiv)<{ fontsize?: string }>`
  height: 25px;
  width: calc(100% - 2px);

  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_DIV_SIZE};
  border: 1px solid #aaa;
`;

const Column = styled(BaseFlexCenterDiv)`
  flex-direction: column;

  width: 100%;
`;

const DeviceTypeValueDiv = styled(BaseFlexCenterDiv)`
  flex-direction: column;
  
  width: 100%;
  min-width: 25px;
`;

const SectionDiv = styled(BaseFlexCenterDiv)`
  height: 25px;
  width: calc(100% - 2px);

  border: 1px solid #ccc;
`;

const DevTypeDiv = styled(BaseFlexCenterDiv)`
  flex-direction: column;

  height: 25px;
  width: calc(100% - 2px);
  min-width: 27px;

  border: 1px solid #ccc;
`;

export default ViewDeviceTypeW;
