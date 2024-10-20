import React, { useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import DeviceValue from "./DeviceValue";
import { Item, ViewUnitProps } from "../../static/types";
import { BaseFlexCenterDiv } from "../../static/componentSet";
import { FONTSET_DEFAULT_DIV_SIZE } from "../../static/fontSet";
import { COLORSET_GRID_HEADER_BG, COLORSET_GRID_CONTROL_BORDER, COLORSET_FONT_BASE, COLORSET_PRINT_BORDER, COLORSET_PRINT_FONT } from "../../static/colorSet";
import { useSelector } from "react-redux";
import { RootStore } from "../../store/congifureStore";
import { TABLE_TYPE_STR_TO_INT } from "../../env";

const TableData: React.FC<ViewUnitProps> = ({ currentTable, times }) => {
  const settingSlice = useSelector((state: RootStore) => state.settingReducer);
  const [deviceValues, setDeviceValues] = useState<{ [key: string]: string[] } | null>(null);
  const [tableDevices, setTableDevices] = useState<Item[] | null>(null);
  const sections = useMemo(() => ({
    [TABLE_TYPE_STR_TO_INT["V"]]: [
      { label: "V", values: ["R-S", "S-T", "T-R"] },
      { label: "A", values: ["R", "S", "T"] },
      { label: "/", values: ["PF","Hz", "KW"] },
    ],
    [TABLE_TYPE_STR_TO_INT["W"]]: [
      { label: "W", values: ["R-S", "S-T", "T-R"] },
      { label: "A", values: ["R", "S", "T"] },
      { label: "/", values: ["PF","Hz", "KW"] },
    ],
    [TABLE_TYPE_STR_TO_INT["R"]]: [
      { label: "AC(V)", values: ["R-S", "S-T", "T-R"] },
      { label: "/", values: ["Hz", "DC(V)", "DC(A)", "Alram"] }
    ],
    [TABLE_TYPE_STR_TO_INT["S"]]: [
      { label: "V", values: ["R-S", "S-T", "T-R"] },
      { label: "A", values: ["R", "S", "T"] },
      { label: "/", values: ["Hz", "kW"]}
    ]
  }), [currentTable.type]);

  const type = currentTable.type as keyof typeof sections;

  useEffect(() => {
    setDeviceValues(currentTable.device_values);
    setTableDevices(currentTable.devices);
  }, [currentTable.device_values, currentTable.devices])

  const makeDeviceValues = (value_obj: { [key: string]: string[] }) => {
    let deviceIndex = 0;
    return (
      <>
        {sections[type].map((section, sectionIdx) => ((
          <Column key={`section-${sectionIdx}`} >
            <Row>
              <SectionDiv mode={settingSlice.viewMode} fontSize={settingSlice.printFontSize + "px"}>
                {section.label}
              </SectionDiv>
            </Row>
            <Row>
              {section.values.map((sectionValue, valueIdx) => {
                const currentDeviceIndex = deviceIndex++;
                return (
                  <DeviceTypeValueDiv 
                    key={`value-${sectionIdx}-${valueIdx}`}
                  >
                    <DevTypeDiv mode={settingSlice.viewMode} fontSize={settingSlice.printFontSize + "px"}>
                      {sectionValue}
                    </DevTypeDiv> 

                    <DeviceValue 
                      arrPosValue={
                        times ? times.flatMap((_, i) => 
                          Object.entries(value_obj)
                            .map(([key, value], index) => 
                              index === i ? value[currentDeviceIndex] || "" : undefined)
                            .filter((v): v is string => v !== undefined)
                        ) : []
                      }   
                      digit={tableDevices?.[currentDeviceIndex]?.decimal_part_digits || 0}
                    />
                  </DeviceTypeValueDiv>
                );
              })}
            </Row>
          </Column>
        )))}
      </>
    )
  }

  return (
    <Container>
      <Row>
        <TitleColumn mode={settingSlice.viewMode} fontSize={settingSlice.printFontSize + "px"}>
          {currentTable.name}
        </TitleColumn>
      </Row>
      <UnitGrid>
        {deviceValues && makeDeviceValues(deviceValues)}
      </UnitGrid>
    </Container>
  );
};

const Container = styled(BaseFlexCenterDiv) <{ mode?: string }>`
  flex-direction: column;
  width: 100%;
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
  display: flex;
  width: 100%;
  gap: 1px;

  background-color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_BORDER : COLORSET_GRID_CONTROL_BORDER};
`;

const TitleColumn = styled(BaseFlexCenterDiv) <{ fontSize?: string, mode?: string }>`
  width: 100%;
  padding: ${(props) => props.mode === 'print' ? "2px 0px" : "3px 0px"};

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

const DeviceTypeValueDiv = styled(BaseFlexCenterDiv)<{ mode?: string }>`
  flex-direction: column;
  width: 100%;
  gap: 1px;
  background-color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_BORDER : COLORSET_GRID_CONTROL_BORDER};
`;

const SectionDiv = styled(BaseFlexCenterDiv) <{ mode?: string, fontSize?: string }>`
  width: 100%;

  gap: 1px;
  padding: ${(props) => props.mode === 'print' ? "2px 0px" : "3px 0px"};

  font-size: ${(props) => props.mode === 'print' ? props.fontSize : FONTSET_DEFAULT_DIV_SIZE};
  color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_FONT : COLORSET_FONT_BASE};
  background-color: ${(props) => props.mode === 'print' ? 'white' : COLORSET_GRID_HEADER_BG};
  // border: 1px solid ${COLORSET_GRID_CONTROL_BORDER};
`;

const DevTypeDiv = styled(BaseFlexCenterDiv) <{ mode?: string, fontSize?: string }>`
  flex-direction: column;
  width: 100%;

  padding:${(props) => props.mode === 'print' ? "2px 0px" : "3px 0px"};
  font-size: ${(props) => props.mode === 'print' ? props.fontSize : FONTSET_DEFAULT_DIV_SIZE};
  color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_FONT : COLORSET_FONT_BASE};
  background-color: ${(props) => props.mode === 'print' ? 'white' : COLORSET_GRID_HEADER_BG};
  // border: 1px solid ${COLORSET_GRID_CONTROL_BORDER};
`;

export default TableData;
