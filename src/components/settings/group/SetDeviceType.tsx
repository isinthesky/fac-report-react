import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { IStation, IDivision } from "../../../static/types";
import { RootStore } from "../../../store/congifureStore";
import { BaseFlex1Column, BaseOption, BaseFlex1Row, BaseSelect, BaseInput, ControlButton, BaseFlexDiv } from "../../../static/componentSet";
import UnitGroupAutoSelect from "./UnitGroupAutoSelect";
import { updateCurrentGroup, updateCurrentGroupUnit } from "../../../features/reducers/unitGroupSlice";
import { setdeviceSearchWord } from "../../../features/reducers/settingSlice";
import { ICON_DAY_CLOSE, ICON_DAY_SEARCH } from "../../../static/constSet";


const SetDeviceType: React.FC = () => {
  const dispatch = useDispatch();
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);
  const unitGroupSlice = useSelector((state: RootStore) => state.unitGroupReducer);
  const [searchWord, setSearchWord] = useState("");

  const [selectedStation, setSelectedStation] = useState<number>(unitGroupSlice.currentGroup.st);
  const [selectedDivision, setSelectedDivision] = useState<number>(0);

  useEffect(() => {
    const currentGroup = unitGroupSlice.currentGroup;

    if (currentGroup.st === 0) {
      setSelectedStation(deviceSet.stations[0].id);
      
      dispatch(
        updateCurrentGroupUnit(
          {
            arrKey: "st",
            value: deviceSet.stations[0].id,
          }
        ))
      return;
    }

    setSelectedStation(unitGroupSlice.currentGroup.st);
  }, []);

  useEffect(() => {
    if (selectedStation === 0) 
      return;
    
    const currentGroup = unitGroupSlice.currentGroup;

    if (currentGroup.div === 0) {
      setSelectedDivision(deviceSet.divisions.filter((item) => item.stationId === selectedStation)[0].id);
      dispatch(
        updateCurrentGroupUnit(
          {
            arrKey: "div",
            value: deviceSet.divisions.filter((item) => item.stationId === selectedStation)[0].id,
          }
        ))
    }
  }, [selectedStation]);


  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stId = Number(e.target.value);
    setSelectedStation(stId);

    dispatch(updateCurrentGroupUnit({arrKey: "st", value: stId}))
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const divId = Number(e.target.value);
    setSelectedDivision(divId);

    dispatch(updateCurrentGroupUnit({arrKey: "div", value: divId}))
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const renderSection = (index1: number, values: number[]) => (
    <BaseFlex1Column>
      {values.map((value, idx) => (
        <ValueSection key={idx}>
          <ControlButton>{idx + 1}</ControlButton>
          <UnitGroupAutoSelect
            pos={idx}
            devicelist={deviceSet}
          />
        </ValueSection>
      ))}
    </BaseFlex1Column>
  );

  return (
    <Container>
      <CenterRow>
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
          <ControlButton onClick={handleSearchClick}> 
            <img src={ICON_DAY_SEARCH} alt="Search" />
          </ControlButton>
          <ControlButton onClick={handleClearInput}>
            <img src={ICON_DAY_CLOSE} alt="Close" />
          </ControlButton>
        </SearchContainer>
      </CenterRow>
      { renderSection(0, unitGroupSlice.currentGroup.dvList) }
    </Container>
  );
};

const Container = styled(BaseFlex1Column)`
  justify-content: center;
  align-items: stretch;
  border: 1px solid #ccc;
`;

const CenterRow = styled(BaseFlex1Row)`
  justify-content: center;
  align-items: stretch;

  bottom-margin: 10px;
`;

const ValueSection = styled(BaseFlex1Row)`
  margin: 10px;
`;

const SearchContainer = styled(BaseFlexDiv)`
  flex-direction: row;
  justify-content: center;

  margin: 0px 30px;
`;

export default SetDeviceType;
