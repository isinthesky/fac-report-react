import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import UnitTypeW from "./UnitTypeW";
import UnitTypeV from "./UnitTypeV";
import TimeDropdowns from "./TimeDropdowns";
import { updateSettingsTabPage } from "../../../features/api/device";
import { setCurrentUnit, setTabUnitPosition, saveTabPage, updateTabPage } from "../../../features/reducers/tabPageSlice";
import { ComposeProps, TabPageInfotype } from "../../../static/types";
import { MAIN_TAB_ENV_NAME } from "../../../static/constSet";
import { RootStore } from "../../../store/congifureStore";
import DeviceHeaderSet from "./DeviceHeaderSet";
import { setUnitSelectPosition } from "../../../features/reducers/settingSlice";
import { ActiveButton, BaseButton, BaseFlexCenterDiv } from "../../../static/componentSet";
import UnitGroupListControl from "../group/UnitGroupListControl";
import { STRING_DEFAULT_CANCEL, STRING_DEFAULT_SAVE, STRING_DEFAULT_SAVEALL } from "../../../static/langSet";
import { COLORSET_SIGNITURE_COLOR } from "../../../static/colorSet";
import { CONST_TYPE_INFO_NAMES, CONST_TABINFO_NAME } from "../../../env";


interface GridContainerProps {
  column: number;
}

const ComposeSet: React.FC<ComposeProps> = ({ row, column}) => {
  const dispatch = useDispatch();
  
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const tabPageSlice = useSelector((state : RootStore) => state.tabPageReducer);
  const deviceRow = settingSet.unitPostion.row;
  const deviceColumn = settingSet.unitPostion.column;

  const position = deviceColumn + (deviceRow - 1) * column - 1;
  const tabPageInfo = tabPageSlice.tabPageInfo[tabPageSlice.settingPosition.main][tabPageSlice.settingPosition.sub];

  const [deviceType, setDeviceType] = useState(() => {
    if (deviceColumn !== 0 && deviceRow !== 0 && position >= 0) {
      return tabPageSlice.currentTabPage.unitList[position]?.type || 0;
    }
    return 0;
  });

  const handleSave = async () => {
    dispatch(saveTabPage())

    let count = 1;

    for (let mainId = 1; mainId <= 5; mainId++) {
      for (let subId = 1; subId <= 5; subId++) {
        const TabKey = `${MAIN_TAB_ENV_NAME}${mainId}_SUB${subId}`;

        if (process.env[TabKey]) {
          if (tabPageSlice.settingPosition.main === mainId && tabPageSlice.settingPosition.sub === subId) {
            try {
              const keyNumber = CONST_TABINFO_NAME + `${count}`; 
              await updateSettingsTabPage(keyNumber, tabPageSlice.tabPageInfo[mainId][subId] as TabPageInfotype);
              return;
            }
            catch (e) {
              console.error("updateSettingsTabPage error:", e);
            }
          }
          count += 1;
        }
      }
    }
  };

  const handleSaveAll = async () => {
    dispatch(saveTabPage())

    let count = 1;

    for (let mainId = 1; mainId <= 5; mainId++) {
      for (let subId = 1; subId <= 5; subId++) {
        const TabKey = `${MAIN_TAB_ENV_NAME}${mainId}_SUB${subId}`;
        if (process.env[TabKey]) {
          try {
            const keyNumber = CONST_TABINFO_NAME + `${count}`; 
            await updateSettingsTabPage(keyNumber, tabPageSlice.tabPageInfo[mainId][subId] as TabPageInfotype);
            return;
          }
          catch (e) {
            console.error("updateSettingsTabPage error:", e);
          }
        }
        count += 1;
      }
    }
  };

  const handleCancel = () => {
    if (deviceColumn !== 0 && deviceRow !== 0) {
      dispatch(setCurrentUnit({position: position, unit: tabPageInfo.unitList[position]}));
    }
  }

  useEffect(() => {
    if (deviceColumn !== 0 && deviceRow !== 0 && position >= 0) {
      setDeviceType(tabPageSlice.currentTabPage.unitList[position]?.type || 0);
    }
  }, [tabPageSlice, deviceColumn, deviceRow, position]);

  const handleButtonClick = (rowIndex: number, columnIndex: number) => {
    const position = columnIndex + (rowIndex - 1) * column - 1;

    dispatch(setUnitSelectPosition({row: rowIndex, column: columnIndex}));
    dispatch(setTabUnitPosition({index: position}));
  };

  console.log("ComposeSet type", deviceType);

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
          {deviceType === 1 && <UnitTypeV name={CONST_TYPE_INFO_NAMES[deviceType - 1]} />}
          {deviceType === 2 && <UnitTypeW name={CONST_TYPE_INFO_NAMES[deviceType - 1]} />}
          <TimeDropdowns/>
          <UnitGroupListControl viewMode={true}/>
        </ColumnDiv>
      </SettingsContainer>
      <ButtonGroup>
        <BaseButton onClick={handleCancel}>{STRING_DEFAULT_CANCEL}</BaseButton>
        <ActiveButton onClick={handleSave}>{STRING_DEFAULT_SAVE}</ActiveButton>
        <ActiveButton onClick={handleSaveAll}>{STRING_DEFAULT_SAVEALL}</ActiveButton>
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
