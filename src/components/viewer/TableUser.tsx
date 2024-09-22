import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { ViewUnitProps } from "../../static/types";
import { BaseFlexCenterDiv } from "../../static/componentSet";
import { FONTSET_DEFAULT_DIV_SIZE } from "../../static/fontSet";
import { COLORSET_GRID_HEADER_BG, COLORSET_GRID_CONTROL_BORDER, COLORSET_FONT_BASE, COLORSET_PRINT_BORDER, COLORSET_PRINT_FONT } from "../../static/colorSet";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../../store/congifureStore";
import { renderWithLineBreaks } from "../../static/utils";
import { setCurrentTableValues } from "../../features/reducers/tabPageSlice";

const sections = {
  U1: [
    { label: "MOF 배율", values: ["전일지침", "금일지침", "변화량", "소계"]},
    { label: "유효전력\n(kwh)", values: ["주간4", "저녁5", "심야6"]},
    { label: "무효전력\n(kVarh)", values: ["주간7", "저녁8"]},
    { label: "-", values: ["유효전력 (kWh)", "무효전력 (kVarh)"]},
  ],
  U2: [
    { label: "최대\n전력", values: ["현재", "주간", "저녁"]},
    { label: "태양광", values: []},
    { label: "UPS\n점검", values: ["7시", "11시", "17시", "23시",]},
    { label: "이벤트\n발생\n유/무", values: ["7시", "11시", "17시", "23시",]},
  ]
};

const TableUser: React.FC<ViewUnitProps & { type: "U1" | "U2" }> = ({ currentTable, type }) => {
  const dispatch = useDispatch();
  const settingSlice = useSelector((state: RootStore) => state.settingReducer);
  const initialValues = currentTable.device_values || {}
  const [inputValues, setInputValues] = useState<{ [key: string]: string[] }>(initialValues);

  useEffect(() => {
    setInputValues(currentTable.device_values || {});
  }, [currentTable.device_values]);

  // Handle input changes and update local state
  const handleInputChange = (key: string, index: number, newValue: string) => {
    setInputValues((prevValues) => {
      const newValues = { ...prevValues };
      if (!newValues[key]) {
        newValues[key] = [];
      }
      newValues[key] = [...newValues[key]];  // 새 배열 생성
      newValues[key][index] = newValue;

      dispatch(setCurrentTableValues({
        unitPosition: currentTable.idx - 1,
        key: key,
        value: newValues
      }));
      
      return newValues;
    });
  };

  const U1Table_Key6 = "6"

  const U1Table = (valuesObj: { [key: string]: string[] }) => {
    return (
      <Column key={`section-${currentTable.idx}`}>
        <Row> 
          <Column>
            <SectionHeaderRow mode={settingSlice.viewMode} fontSize={settingSlice.printFontSize + "px"} multi={1}>
              {renderWithLineBreaks(sections[type][0].label)}
            </SectionHeaderRow>
            <Row>
              <SectionHeaderRow mode={settingSlice.viewMode} fontSize={settingSlice.printFontSize + "px"} multi={3}>
                {renderWithLineBreaks(sections[type][1].label)}
              </SectionHeaderRow>
              <Column>
                {sections[type][1].values.map((value, valueIdx) => (
                  <SectionRow key={`u1table1-${valueIdx}`} mode={settingSlice.viewMode} className="flexible-width" fontSize={settingSlice.printFontSize + "px"} >
                    {value}
                  </SectionRow>
                ))}
              </Column>
            </Row> 
            <Column>  
              <Row>
                <SectionHeaderRow mode={settingSlice.viewMode} fontSize={settingSlice.printFontSize + "px"} multi={2}>
                  {renderWithLineBreaks(sections[type][2].label)}
                </SectionHeaderRow>
                <Column>
                  {sections[type][2].values.map((value, valueIdx) => (
                    <SectionRow key={`u1table2-${valueIdx}`} mode={settingSlice.viewMode} className="flexible-width" fontSize={settingSlice.printFontSize + "px"} >
                      {value}
                    </SectionRow>
                  ))}
                </Column>
              </Row> 
            </Column> 
          </Column> 
          <Column style={{alignSelf: "stretch"}}>
            <Row>
              {sections[type][0].values.map((value, valueIdx) => (
                <SectionColumn key={`u1table3-${valueIdx}`} mode={settingSlice.viewMode}  fontSize={settingSlice.printFontSize + "px"} style={{width: "100%"}}>
                  {value}
                </SectionColumn>
              ))}
            </Row>

            {Object.entries(valuesObj).slice(0, -1).map(([k, values]) => (
              <Row key={`u1table4-${k}`} >
                 {Array.isArray(values) && values.map((value, colIdx) => (
                  <UserInputColumn
                    key={`u1table5-${k}-${colIdx}`}
                    type="text"
                    fontSize={settingSlice.printFontSize + "px"} 
                    value={value}
                    mode={settingSlice.viewMode}
                    onChange={(el: React.ChangeEvent<HTMLInputElement>) => handleInputChange(k, colIdx, el.target.value)}
                  />
                ))}
              </Row>
            ))}

          </Column>
        </Row>
        <Row key={`u1table-value-3`}>
          {
            sections[type][3].values.map((value, valueIdx) => (
              <Row key={`u1table6-${valueIdx}`} gap="1px">
                <SectionColumn key={`u1table7-${valueIdx}`} mode={settingSlice.viewMode} className="flexible-width" style={{width: "100%"}} fontSize={settingSlice.printFontSize + "px"} >
                  {value}
                </SectionColumn>
                {valuesObj[U1Table_Key6][valueIdx] && (
                  <UserInputColumn
                    key={`u1table8-${U1Table_Key6}-${valueIdx}`}
                    type="text"
                    fontSize={settingSlice.printFontSize + "px"} 
                    mode={settingSlice.viewMode}
                    value={valuesObj[U1Table_Key6][valueIdx]}
                    onChange={(el: React.ChangeEvent<HTMLInputElement>) => handleInputChange(U1Table_Key6, valueIdx, el.target.value)}
                  />
                )}
              </Row>
            ))
          }
        </Row>
      </Column>
    )
  }


  const U2Table_Key4 = "4"
  const U2Table_Key5 = 5

  const U2Table = (valuesObj: { [key: string]: string[] }) => {
    return (
      <Column key={`section-u2`} style={{gap: "1px"}}>
        <Row key={`u2table-1`} style={{alignItems: "center"}} gap="1px">
          <SectionHeaderColumn mode={settingSlice.viewMode} fontSize={settingSlice.printFontSize + "px"} multi={3}>
            {renderWithLineBreaks(sections[type][0].label)}
          </SectionHeaderColumn>
          <Column style={{justifyContent: "space-between"}}>
            {sections[type][0].values.map((value, valueIdx) => (
              <Row key={`u2table2-${valueIdx}`}>
                <SectionColumn key={`u2table3-${valueIdx}`} mode={settingSlice.viewMode} fontSize={settingSlice.printFontSize + "px"} >
                  {value}
                </SectionColumn>
                {valuesObj[String(valueIdx + 1)] && 
                  valuesObj[String(valueIdx + 1)].map((val, valIdx) => (
                    <UserInputColumn
                      key={`u2table-input-${valueIdx + 1}-${valIdx}`}
                      type="text"
                      fontSize={settingSlice.printFontSize + "px"} 
                      mode={settingSlice.viewMode}
                      value={val}
                      onChange={(el: React.ChangeEvent<HTMLInputElement>) => handleInputChange(String(valueIdx + 1), valIdx, el.target.value)}
                    />
                ))}
              </Row>
            ))}
          </Column>
            <Column style={{justifyContent: "space-between"}}>
              <SectionHeaderRow mode={settingSlice.viewMode} fontSize={settingSlice.printFontSize + "px"}>
                {renderWithLineBreaks(sections[type][1].label)}
              </SectionHeaderRow>
              <UserInputColumn
                  key={`input-${U2Table_Key4}-${0}`}
                  type="text"
                  style={{height: settingSlice.viewMode === "print" ? `calc(2 * 11px)` : `calc(2 * 17px)`}}
                  fontSize={settingSlice.printFontSize + "px"} 
                  mode={settingSlice.viewMode}
                  value={valuesObj[String(U2Table_Key4)]}
                  onChange={(el: React.ChangeEvent<HTMLInputElement>) => handleInputChange(U2Table_Key4, 0, el.target.value)}
                />
            </Column>
        </Row>
        <Row gap="1px">
          <SectionHeaderColumn mode={settingSlice.viewMode} fontSize={settingSlice.printFontSize + "px"} multi={4}>
            {renderWithLineBreaks(sections[type][2].label)}
          </SectionHeaderColumn>
          <Column style={{justifyContent: "space-between"}}>
            {sections[type][2].values.map((value, valueIdx) => (
              <Row key={`u2table4-${valueIdx}`}>
                <SectionColumn key={`u2table5-${valueIdx}`} mode={settingSlice.viewMode} fontSize={settingSlice.printFontSize + "px"}>
                  {value}
                </SectionColumn>
                <UserInputColumn
                  key={`u2table6-input-${String(U2Table_Key5 + valueIdx)}-${0}`}
                  type="text"
                  fontSize={settingSlice.printFontSize + "px"} 
                  mode={settingSlice.viewMode}
                  value={valuesObj[String(U2Table_Key5 + valueIdx)]?.at(0)}
                  onChange={(el: React.ChangeEvent<HTMLInputElement>) => handleInputChange(String(U2Table_Key5 + valueIdx), 0, el.target.value)}
                />
              </Row>
            ))}
          </Column>
          <SectionHeaderColumn mode={settingSlice.viewMode} fontSize={settingSlice.printFontSize + "px"} multi={4}>
            {renderWithLineBreaks(sections[type][3].label)}
          </SectionHeaderColumn>
          <Column style={{justifyContent: "space-between"}}>
            {sections[type][3].values.map((value, valueIdx) => (
              <Row key={`u2table7-${valueIdx}`}>
                <SectionColumn key={`u2table8-${valueIdx}`} mode={settingSlice.viewMode} fontSize={settingSlice.printFontSize + "px"} >
                  {value}
                </SectionColumn>
                <UserInputColumn
                  key={`u2table9-input-${valueIdx + 1}-${1}`}
                  type="text"
                  fontSize={settingSlice.printFontSize + "px"} 
                  mode={settingSlice.viewMode}
                  value={valuesObj[String(U2Table_Key5 + valueIdx)]?.at(1)}
                  onChange={(el: React.ChangeEvent<HTMLInputElement>) => handleInputChange(String(U2Table_Key5 + valueIdx), 1, el.target.value)}
                />
              </Row>
            ))}
          </Column>
        </Row>
      </Column>
    )
  }
  
  return (
    <Container>
      <UnitGrid>
        {type === "U1" && inputValues && U1Table(inputValues)}
        {type === "U2" && inputValues && U2Table(inputValues)}
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

const Row = styled(BaseFlexCenterDiv) <{ mode?: string, gap?: string }>`
  flex-direction: row;
  width: 100%;
  height: 100%;
  gap: ${(props) => props.gap || "1px"};
  background-color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_BORDER : COLORSET_GRID_CONTROL_BORDER};
`;

const Column = styled(BaseFlexCenterDiv) <{ mode?: string, gap?: string }>`
  flex-direction: column;
  gap: ${(props) => props.gap || "1px"};
  padding: 0px;
  background-color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_BORDER : COLORSET_GRID_CONTROL_BORDER};
`;

const UnitGrid = styled.div<{ mode?: string }>`
  display: flex;
  width: 100%;
  gap: 1px;

  background-color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_BORDER : COLORSET_GRID_CONTROL_BORDER};
`;

const SectionHeaderRow = styled(BaseFlexCenterDiv) <{ mode?: string, fontSize?: string, multi?: number }>`
  padding: ${(props) => props.mode === 'print' ? "2px 0px" : "3px 1px"};

  font-size: ${(props) => props.mode === 'print' ? props.fontSize : FONTSET_DEFAULT_DIV_SIZE};
  color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_FONT : COLORSET_FONT_BASE};
  background-color: ${(props) => props.mode === 'print' ? 'white' : COLORSET_GRID_HEADER_BG};
  
  text-align: center;
  width: auto;
  min-width: ${(props) => props.mode === 'print' ? 40 : 50}px;
  align-self: stretch;

  &.flexible-width {
    max-width: max-content;
  }
`;

const SectionHeaderColumn = styled(BaseFlexCenterDiv) <{ mode?: string, fontSize?: string, padding?: string, multi?: number }>`
  padding: ${(props) => props.mode === 'print' ? "2px 0px" : "3px 1px"};

  font-size: ${(props) => props.mode === 'print' ? props.fontSize : FONTSET_DEFAULT_DIV_SIZE};
  color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_FONT : COLORSET_FONT_BASE};
  background-color: ${(props) => props.mode === 'print' ? 'white' : COLORSET_GRID_HEADER_BG};
  
  text-align: center;
  min-width: ${(props) => props.mode === 'print' ? 40 : 50}px;
  align-self: stretch;

  &.flexible-width {
    max-width: max-content;
  }
`;

const SectionRow = styled(BaseFlexCenterDiv) <{ mode?: string, fontSize?: string, padding?: string }>`
  padding: ${(props) => props.mode === 'print' ? "2px 0px" : "3px 1px"};

  font-size: ${(props) => props.mode === 'print' ? props.fontSize : FONTSET_DEFAULT_DIV_SIZE};
  color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_FONT : COLORSET_FONT_BASE};
  background-color: ${(props) => props.mode === 'print' ? 'white' : COLORSET_GRID_HEADER_BG};
  
  text-align: center;
  min-width: ${(props) => props.mode === 'print' ? 30 : 40}px;

  &.flexible-width {
    max-width: max-content;
  }
`;


const SectionColumn = styled(BaseFlexCenterDiv) <{ mode?: string, fontSize?: string, padding?: string }>`
  padding: ${(props) => props.mode === 'print' ? "2px 0px" : "3px 1px"};

  font-size: ${(props) => props.mode === 'print' ? props.fontSize : FONTSET_DEFAULT_DIV_SIZE};
  color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_FONT : COLORSET_FONT_BASE};
  background-color: ${(props) => props.mode === 'print' ? 'white' : COLORSET_GRID_HEADER_BG};

  text-align: center;
  min-width: ${(props) => props.mode === 'print' ? 30 : 50}px;
  
`;

const UserInputColumn = styled.input<{ mode?: string, fontSize?: string }>`
  display: flex;
  align-self: stretch;
  text-align: center;

  padding: ${(props) => props.mode === 'print' ? "0px" : "1px 0px"};
  width: calc(100% - 4px);

  font-size: ${(props) => props.mode === 'print' ? props.fontSize : FONTSET_DEFAULT_DIV_SIZE};

  pointer-events: ${(props) => props.mode === 'print' ? 'none' : 'auto'};
`

export default TableUser;
