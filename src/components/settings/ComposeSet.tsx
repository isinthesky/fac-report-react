import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { updateDeviceList } from "../../features/reducers/deviceSlice";
import SetDeviceTypeW from "./SetDeviceTypeW";
import SetDeviceTypeV from "./SetDeviceTypeV";

type ComposeSetProps = {
  row: number;
  column: number;
  mode: boolean;
};

interface RootState {
  deviceReducer: {
    value: any;
  };
}

const ComposeSet: React.FC<ComposeSetProps> = ({ row, column, mode }) => {
  const dispatch = useDispatch();
  const [deviceType, setDeviceType] = useState(0);
  const [deviceRow, setDeviceRow] = useState(0);
  const [deviceColumn, setDeviceColumn] = useState(0);

  const deviceSet = useSelector(
    (state: RootState) => state.deviceReducer.value
  );

  const handleSelectChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setter(Number(e.target.value));
    };

  const handleSave = () => {
    const id = deviceColumn + (deviceRow - 1) * column - 1;

    // dispatch(updateDeviceList());
  };

  useEffect(() => {
    (async () => {
      try {
        if (deviceColumn !== 0 && deviceRow !== 0) {
          const id = deviceColumn + (deviceRow - 1) * column - 1;

          if (id >= 0) {
            setDeviceType(deviceSet.deviceList[id].type);
          }
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [deviceRow, deviceColumn]);

  return (
    <Wrapper>
      <SettingsContainer>
        {mode && (
          <>
            <Setting
              label="row"
              options={row + 1}
              onChange={handleSelectChange(setDeviceRow)}
              value={deviceRow}
            />
            <Setting
              label="column"
              options={column + 1}
              onChange={handleSelectChange(setDeviceColumn)}
              value={deviceColumn}
            />
            <Setting
              label="type"
              options={2}
              onChange={handleSelectChange(setDeviceType)}
              value={deviceType}
            />
          </>
        )}
      </SettingsContainer>
      <SettingsContainer>
        {deviceType === 1 && <SetDeviceTypeV />}
        {deviceType === 2 && <SetDeviceTypeW />}
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
  <>
    <label>{label} : </label>
    <Select onChange={onChange} value={value}>
      {Array.from({ length: options }).map((_, idx) => (
        <option key={idx} value={idx}>
          {idx}
        </option>
      ))}
    </Select>
  </>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin: 10px auto;
`;

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;

const Select = styled.select`
  min-width: 70px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center; // Centers the buttons horizontally
  align-items: center; // Centers the buttons vertically
  gap: 10px;
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

export default ComposeSet;
