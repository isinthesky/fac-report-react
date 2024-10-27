import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { IStation, IDivision } from "../../../static/types";
import { RootStore } from "../../../store/congifureStore";
import { BaseOption, BaseSelect, BaseInput, ControlButton, BigLabel, BaseFlexRow, SmallLabel, BaseFlexColumn } from "../../../static/componentSet";
import { updateCurrentGroupUnit } from "../../../entities/reducers/unitGroupSlice";
import { setdeviceSearchWord } from "../../../entities/reducers/settingSlice";
import { ICON_DAY_CLOSE, ICON_DAY_SEARCH } from "../../../static/constSet";
import { COLORSET_GRID_CONTROL_BG, COLORSET_GRID_CONTROL_BORDER } from "../../../static/colorSet";
import { STRING_SETTING_GROUP_FILTER } from "../../../static/langSet";


const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);
  const unitGroupSlice = useSelector((state: RootStore) => state.unitGroupReducer);
  const deviceSearchWord = useSelector((state: RootStore) => state.settingReducer.deviceSearchWord);
  const [searchWord, setSearchWord] = useState(deviceSearchWord);

  const [selectedStation, setSelectedStation] = useState<number>(unitGroupSlice.currentPresetTable.search_st);
  const [selectedDivision, setSelectedDivision] = useState<number>(unitGroupSlice.currentPresetTable.search_div);

  useEffect(() => {
    setSelectedStation( (unitGroupSlice.currentPresetTable.search_st === 0) 
                        ? deviceSet.stations[0]?.id
                        : unitGroupSlice.currentPresetTable.search_st);     
  
    setSelectedDivision( (unitGroupSlice.currentPresetTable.search_div === 0) 
                        ? deviceSet.divisions.filter((item) => item.station_id === selectedStation)[0]?.id
                        : unitGroupSlice.currentPresetTable.search_div);     
                    
  }, [unitGroupSlice.currentPresetTable]);


  useEffect(() => {
    setSearchWord(deviceSearchWord);
  }, [deviceSearchWord]);


  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stId = Number(e.target.value);
    setSelectedStation(stId);

    dispatch(updateCurrentGroupUnit({arrKey: "search_st", value: stId}))
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const divId = Number(e.target.value);
    setSelectedDivision(divId);

    dispatch(updateCurrentGroupUnit({arrKey: "search_div", value: divId}))
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
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      handleClearInput();
    }
  };

  return (
    <FilterContainer onKeyDown={handleKeyDown} tabIndex={0}>
      <BigLabel>{STRING_SETTING_GROUP_FILTER}</BigLabel>
      <CenterRow>
        <FilterColumn gap="1px">
          <SmallLabel>Station</SmallLabel>
          <BaseSelect onChange={handleStationChange} value={selectedStation}>
            {deviceSet.stations.map((st: IStation) => (
              <BaseOption key={st.id} value={st.id}>
                {st.name}
              </BaseOption>
            ))}
          </BaseSelect>
        </FilterColumn>
        <FilterColumn gap="1px">
          <SmallLabel>Division</SmallLabel>
          <BaseSelect onChange={handleDivisionChange} value={selectedDivision}>
            {deviceSet.divisions
              .filter((item: IDivision) => item.station_id === selectedStation)
              .map((div: IDivision) => (
                <BaseOption key={div.id} value={div.id}>
                  {div.name}
                </BaseOption>
              ))}
          </BaseSelect>
        </FilterColumn>
      </CenterRow>
      <BaseFlexColumn gap="1px">
        <SmallLabel>Search</SmallLabel>
        <BaseFlexRow gap="5px">
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
        </BaseFlexRow>
      </BaseFlexColumn>
    </FilterContainer>
  );
};

const FilterContainer = styled(BaseFlexColumn)`
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 10px 15px 10px;
  background-color: ${COLORSET_GRID_CONTROL_BG};
  border: 1px solid ${COLORSET_GRID_CONTROL_BORDER};
`;

const CenterRow = styled(BaseFlexRow)`
  justify-content: flex-start;
  align-items: stretch;

  width: 100%;
  bottom-margin: 10px;
`;

const FilterColumn = styled(BaseFlexColumn)`
  flex: 1;
`;

export default Filter;
