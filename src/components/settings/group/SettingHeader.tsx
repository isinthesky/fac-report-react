import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { IStation, IDivision } from "../../../static/types";
import { RootStore } from "../../../store/congifureStore";
import { BaseFlex1Column, BaseOption, BaseFlex1Row, BaseSelect, BaseInput, ControlButton, BaseFlexDiv, BigLabel, BaseFlexRow, SmallLabel, BaseFlexColumn } from "../../../static/componentSet";
import UnitGroupAutoSelect from "./UnitGroupSelector";
import { updateCurrentGroup, updateCurrentGroupUnit } from "../../../features/reducers/unitGroupSlice";
import { setdeviceSearchWord } from "../../../features/reducers/settingSlice";
import { ICON_DAY_CLOSE, ICON_DAY_SEARCH } from "../../../static/constSet";
import { COLORSET_GRID_CONTROL_BG, COLORSET_GRID_CONTROL_BORDER } from "../../../static/colorSet";


const SettingHeader: React.FC = () => {
  const dispatch = useDispatch();
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);
  const unitGroupSlice = useSelector((state: RootStore) => state.unitGroupReducer);
  const [searchWord, setSearchWord] = useState("");

  const [selectedStation, setSelectedStation] = useState<number>(unitGroupSlice.currentGroup.st);
  const [selectedDivision, setSelectedDivision] = useState<number>(unitGroupSlice.currentGroup.div);

  useEffect(() => {
    console.log("group init station", unitGroupSlice.currentGroup)
    setSelectedStation( (unitGroupSlice.currentGroup.st === 0) 
                        ? deviceSet.stations[0]?.id
                        : unitGroupSlice.currentGroup.st);     
  
    setSelectedDivision( (unitGroupSlice.currentGroup.div === 0) 
                        ? deviceSet.divisions.filter((item) => item.stationId === selectedStation)[0]?.id
                        : unitGroupSlice.currentGroup.div);     
                    
  }, [unitGroupSlice.currentGroup]);

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

  // <FilterContainer>
  //       <MediumLabel>Filter</MediumLabel>
  //       <BaseFlexRow>
  //         <BaseSelect onChange={handleStationChange} value={selectedStation}>
  //           {deviceSet.stations.map((st: IStation) => (
  //             <BaseOption key={st.id} value={st.id}>
  //               {st.name}
  //             </BaseOption>
  //           ))}
  //         </BaseSelect>
  //         <BaseSelect onChange={handleDivisionChange} value={selectedDivision}>
  //           {deviceSet.divisions.filter((item) => item.stationId === selectedStation).map(
  //             (div: IDivision) => (
  //               <BaseOption key={div.id} value={div.id}>
  //                 {div.name}
  //               </BaseOption>
  //             )
  //           )}
  //         </BaseSelect>
  //       </BaseFlexRow>
  //       <DeviceSearch />
  //     </FilterContainer>

  return (
    <FilterContainer>
      <BigLabel>Filter</BigLabel>
      <CenterRow>
      <BaseFlexColumn gap="1px">
        <SmallLabel>Station</SmallLabel>
        <BaseSelect onChange={handleStationChange} value={selectedStation}>
          {deviceSet.stations.map((st: IStation) => (
            <BaseOption key={st.id} value={st.id}>
              {st.name}
            </BaseOption>
          ))}
        </BaseSelect>
      </BaseFlexColumn>
      <BaseFlexColumn gap="1px">
        <SmallLabel>Division</SmallLabel>
        <BaseSelect onChange={handleDivisionChange} value={selectedDivision}>
          {deviceSet.divisions
            .filter((item: IDivision) => item.stationId === selectedStation)
            .map((div: IDivision) => (
              <BaseOption key={div.id} value={div.id}>
                {div.name}
              </BaseOption>
            ))}
        </BaseSelect>
      </BaseFlexColumn>
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

  bottom-margin: 10px;
`;

// const SearchContainer = styled(BaseFlexD)`
// `;

export default SettingHeader;
