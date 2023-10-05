import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { updateDeviceList } from "../../features/reducers/deviceSlice";
import SetDeviceTypeW from "./SetDeviceTypeW";
import SetDeviceTypeV from "./SetDeviceTypeV";
import { DeviceListProp } from "../../static/interface";
import { setUpdateSettingsDeviceList } from "../../features/api";
import DeviceValue from "../DeviceValue";

type ComposeSetProps = {
  row: number;
  column: number;
};

interface RootState {
  deviceReducer: {
    value: any;
  };
}

interface optionState {
  optionReducer: {
    value: any;
  };
}

const ComposeSet: React.FC<ComposeSetProps> = ({ row, column }) => {
  const [deviceRow, setDeviceRow] = useState(1);
  const [deviceColumn, setDeviceColumn] = useState(1);
  const [deviceType, setDeviceType] = useState(0);
  const [deviceId, setDeviceId] = useState(0);

  const deviceSet = useSelector(
    (state: RootState) => state.deviceReducer.value
  );

  const optionlist = useSelector(
    (state: optionState) => state.optionReducer.value
  );

  const handleSelectChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setter(Number(e.target.value));
    };

  const handleSave = () => {
    const id = deviceColumn + (deviceRow - 1) * column - 1;

    console.log("id", id, optionlist, optionlist.currentDevice);
    // dispatch(updateDeviceList());

    setUpdateSettingsDeviceList(optionlist.currentDevice);
  };

  useEffect(() => {
    (async () => {
      try {
        if (deviceColumn !== 0 && deviceRow !== 0) {
          const id = deviceColumn + (deviceRow - 1) * column - 1;

          if (id >= 0) {
            setDeviceType(deviceSet.deviceList[id].type);
            setDeviceId(id);
          }
        }

        console.log("devList", deviceSet.deviceList);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [deviceRow, deviceColumn]);

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
        {deviceType === 1 && <SetDeviceTypeV id={deviceId} />}
        {deviceType === 2 && <SetDeviceTypeW id={deviceId} />}
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
      {Array.from({ length: options + 1 }).map((_, idx) => (
        <option key={idx} value={idx}>
          {idx}
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

export default ComposeSet;
