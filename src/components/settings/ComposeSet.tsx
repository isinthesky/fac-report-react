import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { initDeviceList, updateTabInfo } from "../../features/reducers/deviceSlice";
import SetDeviceTypeW from "./SetDeviceTypeW";
import SetDeviceTypeV from "./SetDeviceTypeV";
import TimeDropdowns from "./TimeDropdowns";
import { setUpdateSettingsDeviceList } from "../../features/api";
import { updateCurrentDevice } from "../../features/reducers/optionSlice";
import { RootState, optionState } from "../../static/interface";
import { ComposeProps } from "../../static/types";

const ComposeSet: React.FC<ComposeProps> = ({ row, column, mainTab, subTab }) => {
  const dispatch = useDispatch();
  const [deviceRow, setDeviceRow] = useState(1);
  const [deviceColumn, setDeviceColumn] = useState(1);
  const [deviceType, setDeviceType] = useState(0);
  const [deviceId, setDeviceId] = useState(0);
  const [deviceNumber, setDeviceNumber] = useState(0);

  const optionlist = useSelector(
    (state: optionState) => state.optionReducer.value
  );

  const handleSelectChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setter(Number(e.target.value));
    };

  const handleSave = () => {
    const key = `deviceList${mainTab}${subTab}`;

    dispatch(updateTabInfo({tab:key, device:optionlist.currentDevice}));
    setUpdateSettingsDeviceList(key, optionlist.currentDevice);
  };

  useEffect(() => {
    try {
      if (deviceColumn !== 0 && deviceRow !== 0) {
        const position = deviceColumn + (deviceRow - 1) * column - 1;
        console.log("position", optionlist, deviceColumn, position)

        if (position >= 0) {
          setDeviceType(optionlist.currentDevice[position].type);
          setDeviceId(position);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [deviceRow, deviceColumn]);

  useEffect(() => {
    try {
      const postion = deviceColumn + (deviceRow - 1) * column - 1;

      if (postion >= 0) {
        dispatch(
          updateCurrentDevice({
            arrPos: postion,
            arrKey: "type",
            deviceId: deviceType,
          })
        );
      }
    } catch (error) {
      console.error(error);
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
          <Setting
            label="number"
            options={2}
            onChange={handleSelectChange(setDeviceNumber)}
            value={deviceNumber}
          />
        </DefalutDiv>
      </SettingsContainer>
      <SettingsContainer>
        <ColumnDiv>
          {deviceType === 1 && <SetDeviceTypeV id={deviceId} device={optionlist.currentDevice[deviceId]} />}
          {deviceType === 2 && <SetDeviceTypeW id={deviceId} device={optionlist.currentDevice[deviceId]} />}

          <TimeDropdowns mainTab = {mainTab} subTab={subTab}  />
        </ColumnDiv>
      </SettingsContainer>
      <ButtonGroup>
        <Button onClick={handleSave}>Save</Button>
        <Button>Cancel</Button>
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
    <label>{label} : </label>
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
  border: 1px solid #00e0e0;
  border-radius: 5px;
`;

const SettingsContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-content: center; // Center children horizontally
  align-items: center; // Center children vertically
  gap: 10px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;

const Select = styled.select`
  min-width: 70px;
`;

const ButtonGroup = styled.div`
  border: 1px solid #e000e0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
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
const DefalutDiv = styled.div`
  flex: 1;
  display: flex;
`;

const ColumnDiv = styled.div`
  flex: 1;
  display: flex;

  flex-direction: row;
`;

export default ComposeSet;
