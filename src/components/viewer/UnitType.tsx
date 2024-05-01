import React, {useMemo} from "react";
import styled from "styled-components";
import DeviceValue from "./DeviceValue";
import { ViewUnitProps } from "../../static/types";
import { BaseFlexCenterDiv } from "../../static/componentSet";
import { FONTSET_DEFAULT_DIV_SIZE } from "../../static/fontSet";
import { COLORSET_GRID_HEADER_BG, COLORSET_GRID_CONTROL_BORDER, COLORSET_FONT_BASE } from "../../static/colorSet";

const UnitType: React.FC<ViewUnitProps & { type: 'V' | 'W' }> = ({ mode, index, tabPage, type }) => {
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
      ]
      }[type]), [type]);

  let pos = 0;

  return (
    <Container>
      <Row>
        <TitleColumn mode={mode}>{tabPage.unitList[index].name}</TitleColumn>
      </Row>
      <UnitGrid>
        {sections.map((section, sectionIdx) => (
          <Column key={`section-${sectionIdx}`} >
            <Row>
              <SectionDiv mode={mode}>{section.label}</SectionDiv>
            </Row>
            <Row>
              {section.values.map((value, valueIdx) => (
                <DeviceTypeValueDiv  key={`value-${sectionIdx}-${valueIdx}`}>
                  <DevTypeDiv mode={mode}>{value}</DevTypeDiv>
                  <DeviceValue mode={mode} times={tabPage.times} devId={tabPage.unitList[index].dvList[pos++]}  />
                </DeviceTypeValueDiv>
              ))}
            </Row>
          </Column>
        ))}
      </UnitGrid>
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

const UnitGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 1fr 1fr 1fr;

  width: 100%;
`;

const TitleColumn = styled(BaseFlexCenterDiv)<{ fontsize?: string, mode?: string }>`
  height: 25px;
  width: calc(100% - 2px);

  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_DIV_SIZE};
  color: ${COLORSET_FONT_BASE};
  background-color: ${(props) => props.mode === 'print' ? 'white' : COLORSET_GRID_HEADER_BG};
  border: 1px solid ${COLORSET_GRID_CONTROL_BORDER};
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

const SectionDiv = styled(BaseFlexCenterDiv)<{ mode?: string }>`
  height: 25px;
  width: calc(100% - 2px);

  color: ${COLORSET_FONT_BASE};
  background-color: ${(props) => props.mode === 'print' ? 'white' : COLORSET_GRID_HEADER_BG};
  border: 1px solid ${COLORSET_GRID_CONTROL_BORDER};
`;

const DevTypeDiv = styled(BaseFlexCenterDiv)<{ mode?: string }>`
  flex-direction: column;

  height: 25px;
  width: calc(100% - 2px);
  min-width: 25px;

  color: ${COLORSET_FONT_BASE};
  background-color: ${(props) => props.mode === 'print' ? 'white' : COLORSET_GRID_HEADER_BG};
  border: 1px solid ${COLORSET_GRID_CONTROL_BORDER};
`;

export default UnitType;
