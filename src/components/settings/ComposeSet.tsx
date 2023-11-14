import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import SetDeviceTypeW from "./SetDeviceTypeW";
import SetDeviceTypeV from "./SetDeviceTypeV";
import TimeDropdowns from "./TimeDropdowns";
import { setUpdateSettingsTabPage } from "../../features/api";
import { setCurrentUnit, updateCurrentTab, updateTabPage } from "../../features/reducers/tabPageSlice";
import { ComposeProps } from "../../static/types";
import { MAIN_TAB_ENV_NAME } from "../../static/consts";
import { RootStore } from "../../store/congifureStore";

const ComposeSet: React.FC<ComposeProps> = ({ row, column}) => {
  const dispatch = useDispatch();
  const [deviceRow, setDeviceRow] = useState(1);
  const [deviceColumn, setDeviceColumn] = useState(1);
  const [deviceType, setDeviceType] = useState(0);
  const [deviceId, setDeviceId] = useState(0);
  
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const tabPageSet = useSelector((state : RootStore) => state.tabPageReducer);


  const position = deviceColumn + (deviceRow - 1) * column - 1;
  const key = process.env.REACT_APP_CONST_TABINFO_NAME + `${settingSet.selectedTab.main}${settingSet.selectedTab.sub}`; 

  const handleSelectChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setter(Number(e.target.value));
    };
      
  const handleSave = () => {
    dispatch(updateTabPage({name:key, object:tabPageSet.currentTabPage}));

    let count = 1;

    [1, 2, 3, 4, 5].forEach( async (mainId)=>{
      [1, 2, 3, 4, 5].forEach( async (subId)=>{
        const TabKey = `${MAIN_TAB_ENV_NAME}${mainId}_SUB${subId}`
        if (process.env[TabKey]) {
          if (settingSet.selectedTab.main === mainId && settingSet.selectedTab.sub === subId ) {
            const keyNumber = process.env.REACT_APP_CONST_TABINFO_NAME + `${count}`; 
            if (false !== await setUpdateSettingsTabPage(keyNumber, tabPageSet.currentTabPage)){
              alert('저장 되었습니다.');
              return;
            }
          }
          count += 1;
        }
      })
    })
  };

  const handleCancel = () => {
    if (deviceColumn !== 0 && deviceRow !== 0) {
      dispatch(setCurrentUnit({position: position, unit: tabPageSet[key].unitList[position]}));
    }
  }

  useEffect(() => {
      if (deviceColumn !== 0 && deviceRow !== 0) {
        if (position >= 0) {
          setDeviceType(tabPageSet.currentTabPage.unitList[position].type);
          setDeviceId(position);
        }
      }
  }, [deviceRow, deviceColumn]);

  useEffect(() => {
    const postion = deviceColumn + (deviceRow - 1) * column - 1;

    if (postion >= 0) {
      dispatch(updateCurrentTab({arrPos: postion,
                                arrKey: "type",
                                deviceId: deviceType})
      );
    }
  }, [deviceType]);

  return (
    <Wrapper>
      <SettingsContainer>
        <DefalutDiv>
          <Setting
            label="row"
            options={row}
            onChange={handleSelectChange(setDeviceRow)}
            value={deviceRow}
          />
          <Setting
            label="column"
            options={column}
            onChange={handleSelectChange(setDeviceColumn)}
            value={deviceColumn}
          />
          <Setting
            label="type"
            options={2}
            onChange={handleSelectChange(setDeviceType)}
            value={deviceType}
          />
        </DefalutDiv>
      </SettingsContainer>
      <SettingsContainer>
        <ColumnDiv>
          {deviceType === 1 && <SetDeviceTypeV id={deviceId} device={tabPageSet.currentTabPage.unitList[deviceId]} />}
          {deviceType === 2 && <SetDeviceTypeW id={deviceId} device={tabPageSet.currentTabPage.unitList[deviceId]} />}

          <TimeDropdowns/>
        </ColumnDiv>
      </SettingsContainer>
      <ButtonGroup>
        <Button onClick={handleCancel}>Cancel</Button>
        <SaveButton onClick={handleSave}>Save</SaveButton>
      </ButtonGroup>
    </Wrapper>
  );
};

const Setting: React.FC<{
  label: string;
  options: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: number;
}> = ({ label, options, onChange, value }) => (
  <DefalutDiv>
    <Label>{label}</Label>
    <Select onChange={onChange} value={value}>
      {Array.from({ length: options }).map((_, idx) => (
        <option key={idx} value={idx+1}>
          {idx+1}
        </option>
      ))}
    </Select>
  </DefalutDiv>
);

const Wrapper = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  align-items: center; // Center children horizontally
  justify-content: center; // Center children vertically
  gap: 10px;
  // width: calc(100vw-20px); // Fill the viewport height
  width: 95vw;
  margin: 0 auto; // Remove the margin to fill the width
`;

const SettingsContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-content: center; // Center children horizontally
  align-items: center; // Center children vertically
  gap: 10px;
  padding: 20px;
  border-radius: 5px;
`;

const Label = styled.label`
  font-size: 1em;
  font-weight: bold;
`;

const Select = styled.select`
  min-width: 70px;
  padding: 5px 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  margin: 20px;
  gap: 50px;
  justify-content: center; // Center buttons horizontally
  align-items: center; // Center buttons vertically
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: #e0e0e0;
  }
`;

const SaveButton = styled(Button)`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: #344054;
`;

const DefalutDiv = styled.div`
  display: flex;
  justify-content: start;
  margin: 1px 30px;
  gap: 20px;
`;

const ColumnDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

export default ComposeSet;
