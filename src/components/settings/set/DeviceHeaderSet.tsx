
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { updateCurrentUnit } from "../../../features/reducers/tabPageSlice";
import { RootStore } from "../../../store/congifureStore";
import { BaseInput, BaseSelect, BaseOption, BaseFlex1Column, BaseFlex1Row, BaseLabel, BaseButton, ControlButton, MiniButton, BaseFlexDiv } from "../../../static/componentSet";
import { IDivision, IStation } from "../../../static/types";
import { CONST_TYPE_INFO_NAMES } from "../../../env";
import { ICON_DAY_CLOSE, ICON_DAY_SEARCH } from "../../../static/constSet";
import { setdeviceSearchWord } from "../../../features/reducers/settingSlice";

const DeviceHeaderSet = () => {
  const dispatch = useDispatch();
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);
  const tabPageSlice = useSelector((state: RootStore) => state.tabPageReducer);
  const [deviceType, setDeviceType] = useState(tabPageSlice.currentTabPage.unitList[tabPageSlice.unitPosition.index].type);
  const [selectedStation, setSelectedStation] = useState<number>(tabPageSlice.currentTabPage.unitList[tabPageSlice.unitPosition.index].st);
  const [selectedDivision, setSelectedDivision] = useState<number>(0);
  const [deviceName, setDeviceName] = useState<string>("");
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {

    const currentUnit = tabPageSlice.currentTabPage.unitList[tabPageSlice.unitPosition.index]

    if (currentUnit.type === 0) {
      setDeviceType(1);
      dispatch(updateCurrentUnit({arrPos:tabPageSlice.unitPosition.index,
          arrKey:"type",
          deviceId: 1
      }));
    }

    if (currentUnit.st === 0) {
      setSelectedStation(deviceSet.stations[0].id);
      dispatch(
        updateCurrentUnit({
          arrPos: tabPageSlice.unitPosition.index,
          arrKey: "st",
          deviceId: deviceSet.stations[0].id,
        })
      );
    }

    setDeviceName(currentUnit.name);

  }, [tabPageSlice.currentTabPage, tabPageSlice.unitPosition]);

  useEffect(() => {
    if (selectedStation === 0) 
      return;

    setSelectedDivision(deviceSet.divisions.filter((item) => item.stationId === selectedStation)[0].id);

    dispatch(
      updateCurrentUnit({
        arrPos: tabPageSlice.unitPosition.index,
        arrKey: "div",
        deviceId: deviceSet.divisions.filter((item) => item.stationId === selectedStation)[0].id,
      })
    );

  }, [selectedStation]);


  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = Number(e.target.value);
    setDeviceType(newType);
    dispatch(updateCurrentUnit({arrPos:tabPageSlice.unitPosition.index,
        arrKey:"type",
        deviceId: newType
    }));
  };

  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStation(Number(e.target.value));
    dispatch(
      updateCurrentUnit({
        arrPos: tabPageSlice.unitPosition.index,
        arrKey: "st",
        deviceId: Number(e.target.value),
      })
    );
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(Number(e.target.value));

    dispatch(
      updateCurrentUnit({
        arrPos: tabPageSlice.unitPosition.index,
        arrKey: "div",
        deviceId: Number(e.target.value),
      })
    );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeviceName(e.target.value);

    console.log("index", tabPageSlice.unitPosition.index, e.target.value)

    dispatch(
      updateCurrentUnit({
        arrPos: tabPageSlice.unitPosition.index,
        arrKey: "name",
        deviceId: e.target.value,
      })
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("input searchWord", searchWord)
    setSearchWord(e.target.value);
  };

  const handleSearchClick = () => {
    dispatch(setdeviceSearchWord(searchWord))
  };

  const handleClearInput = () => {
    setSearchWord("");
    dispatch(setdeviceSearchWord(""))
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    } else if (e.key === 'Escape') {
      handleClearInput();
    }
  };

  return (
    <Container>
      <BaseFlex1Column>
        <BaseFlex1Row>
          <NameButton>Name</NameButton>
          <BaseInput type="text" onChange={handleNameChange} value={deviceName} />
          <NameButton>Type</NameButton>
          <BaseSelect onChange={handleTypeChange} value={deviceType}>
            { CONST_TYPE_INFO_NAMES.map((item, index) => (
              <BaseOption key={index} value={index+1}>
                {item}
              </BaseOption>
            ))}
          </BaseSelect>
          <BaseSelect onChange={handleStationChange} value={selectedStation}>
            {deviceSet.stations.map((st: IStation) => (
              <BaseOption key={st.id} value={st.id}>
                {st.name}
              </BaseOption>
            ))}
          </BaseSelect>
          <BaseSelect onChange={handleDivisionChange} value={selectedDivision}>
            {deviceSet.divisions.filter((item) => item.stationId === selectedStation).map(
              (div: IDivision) => (
                <BaseOption key={div.id} value={div.id}>
                  {div.name}
                </BaseOption>
              )
            )}
          </BaseSelect>

          <SearchContainer> 
            <BaseInput 
              type="text" 
              value={searchWord} 
              onChange={handleInputChange} 
              onKeyDown={handleSearchKeyDown} />
            <ControlButton onClick={handleSearchClick}> <img src={ICON_DAY_SEARCH} alt="Search" />
            </ControlButton>
              <ControlButton onClick={handleClearInput}><img src={ICON_DAY_CLOSE} alt="Close" />
            </ControlButton>
          </SearchContainer>

        </BaseFlex1Row>
      </BaseFlex1Column>
    </Container>
  );
};

const Container = styled(BaseFlex1Column)`
  justify-content : end;
  gap: 10px;

  border: 1px solid #ccc;
`;

const SearchContainer = styled(BaseFlexDiv)`
  flex-direction: row;
  justify-content: center;

  margin: 0px 30px;
`;

const NameButton = styled(MiniButton)`

  border: 0px solid #ccc;
`

export default DeviceHeaderSet;