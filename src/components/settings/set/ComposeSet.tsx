import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import SetDeviceTypeW from "./SetDeviceTypeW";
import SetDeviceTypeV from "./SetDeviceTypeV";
import TimeDropdowns from "./TimeDropdowns";
import { updateSettingsTabPage } from "../../../features/api/device";
import { setCurrentUnit, setUnitPostion, updateCurrentUnit, updateTabPage } from "../../../features/reducers/tabPageSlice";
import { ComposeProps, TabPageInfotype } from "../../../static/types";
import { MAIN_TAB_ENV_NAME } from "../../../static/constSet";
import { RootStore } from "../../../store/congifureStore";
import DeviceHeaderSet from "./DeviceHeaderSet";
import { setUnitSelectPosition } from "../../../features/reducers/settingSlice";
import { ActiveButton, BaseButton, BaseFlexCenterDiv } from "../../../static/componentSet";
import UnitGroupListControl from "../group/UnitGroupListControl";
import { STRING_DEFAULT_CANCEL, STRING_DEFAULT_SAVE } from "../../../static/langSet";
import { COLORSET_SIGNITURE_COLOR } from "../../../static/colorSet";

interface GridContainerProps {
  column: number;
}

const ComposeSet: React.FC<ComposeProps> = ({ row, column}) => {
  const dispatch = useDispatch();
  const [deviceRow, setDeviceRow] = useState(1);
  const [deviceColumn, setDeviceColumn] = useState(1);
  const [deviceType, setDeviceType] = useState(0);
  const [unitPosition, setUnitPosition] = useState(0);
  
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const tabPageSlice = useSelector((state : RootStore) => state.tabPageReducer);

  const position = deviceColumn + (deviceRow - 1) * column - 1;
  const key = process.env.REACT_APP_CONST_TABINFO_NAME + `${settingSet.selectedTab.main}${settingSet.selectedTab.sub}`; 

  const tabPageInfo = tabPageSlice[key] as TabPageInfotype;

  const handleSave = () => {
    dispatch(updateTabPage({name:key, object:tabPageSlice.currentTabPage}));

    let count = 1;

    [1, 2, 3, 4, 5].forEach( async (mainId)=>{
      [1, 2, 3, 4, 5].forEach( async (subId)=>{
        const TabKey = `${MAIN_TAB_ENV_NAME}${mainId}_SUB${subId}`
        if (process.env[TabKey]) {
          if (settingSet.selectedTab.main === mainId && settingSet.selectedTab.sub === subId ) {
            const keyNumber = process.env.REACT_APP_CONST_TABINFO_NAME + `${count}`; 
            if (false !== await updateSettingsTabPage(keyNumber, tabPageSlice.currentTabPage)){
              alert('저장 되었습니다.');
              return;
            }
          }
          count += 1;
        }
      })
    })
  };

  console.log("tabcurrent", tabPageSlice.currentTabPage)

  const handleCancel = () => {
    console.log("unit", key, position, tabPageInfo.unitList[position])
    if (deviceColumn !== 0 && deviceRow !== 0) {
      dispatch(setCurrentUnit({position: position, unit: tabPageInfo.unitList[position]}));
    }
  }

  useEffect(() => {
      if (deviceColumn !== 0 && deviceRow !== 0) {
        if (position >= 0) {
          setDeviceType(tabPageSlice.currentTabPage.unitList[position].type);
          setUnitPosition(position);
        }
      }
  }, [deviceRow, deviceColumn]);

  useEffect(() => {
    const postion = deviceColumn + (deviceRow - 1) * column - 1;

    if (postion >= 0) {
      dispatch(updateCurrentUnit({arrPos: postion,
                                arrKey: "type",
                                deviceId: deviceType})
      );
    }
  }, [deviceType]);

  const handleButtonClick = (rowIndex: number, columnIndex: number) => {
    console.log(`Button clicked at row ${rowIndex}, column ${columnIndex}`);

    setDeviceRow(rowIndex)
    setDeviceColumn(columnIndex)

    const position = columnIndex + (rowIndex - 1) * column - 1;

    dispatch(setUnitSelectPosition({row:rowIndex, column:columnIndex}));
    dispatch(setUnitPostion(position));
  };

  // Create grid buttons
  const renderGridButtons = () => {
    let gridButtons = [];
    for (let r = 0; r < row; r++) {
      for (let c = 0; c < column; c++) {
        gridButtons.push(
          <GridButton
            key={`${r}-${c}`}
            onClick={() => handleButtonClick(r + 1, c + 1)}
            data-row={r + 1}
            data-column={c + 1}
            mode = {(deviceRow - 1 === r && deviceColumn - 1 === c) ? "true" : "false"}
          >
            {`${ (c+1)+ (r * column) }`}
          </GridButton>
        );
      }
    }
    return gridButtons;
  };

  return (
    <Wrapper>
      <SettingsContainer>
        <DefalutDiv>
          <DeviceHeaderSet />
          <GridContainer column={column}>
            {renderGridButtons()}
          </GridContainer>
        </DefalutDiv>
      </SettingsContainer>
      <SettingsContainer>
        <ColumnDiv>
          {deviceType === 1 && <SetDeviceTypeV unitPos={unitPosition} />}
          {deviceType === 2 && <SetDeviceTypeW unitPos={unitPosition} />}
          <TimeDropdowns/>
          <UnitGroupListControl viewMode={true}/>
        </ColumnDiv>
      </SettingsContainer>
      <ButtonGroup>
        <BaseButton onClick={handleCancel}>{STRING_DEFAULT_CANCEL}</BaseButton>
        <ActiveButton onClick={handleSave}>{STRING_DEFAULT_SAVE}</ActiveButton>
      </ButtonGroup>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  align-items: center; // Center children horizontally
  justify-content: center; // Center children vertically
  width: 95vw;
`;

const SettingsContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-content: center; // Center children horizontally
  align-items: center; // Center children vertically
  padding: 10px;
  border-radius: 5px;
`;

const ButtonGroup = styled(BaseFlexCenterDiv)`
  flex-wrap: wrap;
  
  padding: 10px;
  margin: 20px;

  gap: 50px;
`;

const DefalutDiv = styled.div`
  display: flex;
  justify-content: start;

  gap: 20px;
  
  border: 1px solid #111;
`;

const ColumnDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const GridButton = styled.button<{ mode: string }>`
  width : 30px;

  padding: 6px;
  color: ${(props) => (props.mode === "true" ? "white" : "black")};
  background-color: ${(props) => (props.mode === "true" ? COLORSET_SIGNITURE_COLOR : "white")};
  
  cursor: pointer;
  border: 1px solid #ccc;
`;

const GridContainer = styled.div<GridContainerProps>`
  display: grid;
  grid-template-columns: repeat(${props => props.column}, 1fr);
  grid-gap: 10px;
`;

export default ComposeSet;
