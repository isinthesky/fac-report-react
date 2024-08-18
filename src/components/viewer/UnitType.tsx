import React, { useMemo } from "react";
import styled from "styled-components";
import DeviceValue from "./DeviceValue";
import { ViewUnitProps } from "../../static/types";
import { BaseFlexCenterDiv } from "../../static/componentSet";
import { FONTSET_DEFAULT_DIV_SIZE } from "../../static/fontSet";
import { COLORSET_GRID_HEADER_BG, COLORSET_GRID_CONTROL_BORDER, COLORSET_FONT_BASE, COLORSET_PRINT_BORDER, COLORSET_PRINT_FONT } from "../../static/colorSet";
import { useSelector } from "react-redux";
import { RootStore } from "../../store/congifureStore";

const UnitType: React.FC<ViewUnitProps & { type: 'V' | 'W' }> = ({ index, tabPage, type }) => {
  const settingSlice = useSelector((state: RootStore) => state.settingReducer);
  const sections = useMemo(() => ({
    V: [
      { label: "V", values: ["R-S", "S-T", "T-R"] },
      { label: "A", values: ["R", "S", "T"] },
      { label: "/", values: ["PF"] },
      { label: "/", values: ["Hz"] },
      { label: "/", values: ["kW"] },
    ],
    W: [
      { label: "W", values: ["R-S", "S-T", "T-R"] },
      { label: "A", values: ["R", "S", "T"] },
      { label: "/", values: ["PF"] },
      { label: "/", values: ["Hz"] },
      { label: "/", values: ["kW"] },
    ],
    Rectifier: [
      { label: "AC(V)", values: ["R-S", "S-T", "T-R"] },
      { label: "/", values: ["Hz"] },
      { label: "/", values: ["DC(V)"] },
      { label: "/", values: ["DC(A)"] },
      { label: "/", values: ["알람(유/무)"] },
    ]
  }[type]), [type]);

  let pos = 0;

  return (
    <Container>
      <Row>
        <TitleColumn mode={settingSlice.viewMode} fontSize={settingSlice.printFontSize + "px"}>
          {tabPage.tab_table_infos[index].name}
        </TitleColumn>
      </Row>
      <UnitGrid>
        {sections.map((section, sectionIdx) => (
          <Column key={`section-${sectionIdx}`} >
            <Row>
              <SectionDiv mode={settingSlice.viewMode} fontSize={settingSlice.printFontSize + "px"}>
                {section.label}
              </SectionDiv>
            </Row>
            <Row>
              {section.values.map((value, valueIdx) => (
                <DeviceTypeValueDiv key={`value-${sectionIdx}-${valueIdx}`}>
                  <DevTypeDiv mode={settingSlice.viewMode} fontSize={settingSlice.printFontSize + "px"}>
                    {value}
                  </DevTypeDiv>
                  <DeviceValue times={tabPage.times} devId={tabPage.tab_table_infos[index].devices[pos++].path_id} />
                </DeviceTypeValueDiv>
              ))}
            </Row>
          </Column>
        ))}
      </UnitGrid>
    </Container>
  );
};

const Container = styled(BaseFlexCenterDiv) <{ mode?: string }>`
  flex-direction: column;
  width: 100%;
  // padding: 0px 1px;
  gap: 1px;
  background-color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_BORDER : COLORSET_GRID_CONTROL_BORDER};
`;

const Row = styled(BaseFlexCenterDiv) <{ mode?: string }>`
  flex-direction: row;
  width: 100%;
  gap: 1px;
  background-color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_BORDER : COLORSET_GRID_CONTROL_BORDER};
`;

const UnitGrid = styled.div<{ mode?: string }>`
  display: grid;
  grid-template-columns: 3fr 3fr 1fr 1fr 1fr;

  width: 100%;
  gap: 1px;

  background-color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_BORDER : COLORSET_GRID_CONTROL_BORDER};
`;

const TitleColumn = styled(BaseFlexCenterDiv) <{ fontSize?: string, mode?: string }>`
  width: 100%;
  padding: 3px 0px;

  font-size: ${(props) => props.mode === 'print' ? props.fontSize : FONTSET_DEFAULT_DIV_SIZE};
  color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_FONT : COLORSET_FONT_BASE};
  background-color: ${(props) => props.mode === 'print' ? 'white' : COLORSET_GRID_HEADER_BG};
  // border: 1px solid ${COLORSET_GRID_CONTROL_BORDER};
`;

const Column = styled(BaseFlexCenterDiv) <{ mode?: string }>`
  flex-direction: column;
  width: 100%;
  gap: 1px;
  background-color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_BORDER : COLORSET_GRID_CONTROL_BORDER};
`;

const DeviceTypeValueDiv = styled(BaseFlexCenterDiv) <{ mode?: string }>`
  flex-direction: column;
  width: 100%;
  min-width: 25px;
  gap: 1px;
  background-color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_BORDER : COLORSET_GRID_CONTROL_BORDER};
`;

const SectionDiv = styled(BaseFlexCenterDiv) <{ mode?: string, fontSize?: string }>`
  width: 100%;

  padding: 3px 0px;
  gap: 1px;

  font-size: ${(props) => props.mode === 'print' ? props.fontSize : FONTSET_DEFAULT_DIV_SIZE};
  color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_FONT : COLORSET_FONT_BASE};
  background-color: ${(props) => props.mode === 'print' ? 'white' : COLORSET_GRID_HEADER_BG};
  // border: 1px solid ${COLORSET_GRID_CONTROL_BORDER};
`;

const DevTypeDiv = styled(BaseFlexCenterDiv) <{ mode?: string, fontSize?: string }>`
  flex-direction: column;
  width: 100%;
  // min-width: 25px;

  padding: 3px 0px;
  font-size: ${(props) => props.mode === 'print' ? props.fontSize : FONTSET_DEFAULT_DIV_SIZE};
  color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_FONT : COLORSET_FONT_BASE};
  background-color: ${(props) => props.mode === 'print' ? 'white' : COLORSET_GRID_HEADER_BG};
  // border: 1px solid ${COLORSET_GRID_CONTROL_BORDER};
`;

export default UnitType;
