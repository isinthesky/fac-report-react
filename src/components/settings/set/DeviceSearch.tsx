import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import { RootStore } from "../../../store/congifureStore";
import { BaseInput, ControlButton, BaseFlexDiv } from '../../../static/componentSet';
import { ICON_DAY_SEARCH, ICON_DAY_REFRESH } from '../../../static/constSet';
import { setdeviceSearchWord } from "../../../features/reducers/settingSlice";
import { COLORSET_NORMAL_CONTROL_BG, COLORSET_NORMAL_CONTROL_BORDER, COLORSET_NORMAL_INPUT_BG } from '../../../static/colorSet';

const DeviceSearch: React.FC = () => {
  const dispatch = useDispatch()
  const deviceSearchWord = useSelector((state: RootStore) => state.settingReducer.deviceSearchWord);
  const [searchWord, setSearchWord] = useState(deviceSearchWord);

  useEffect(() => {
    setSearchWord(deviceSearchWord);
  }, [deviceSearchWord]);


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
    <SearchContainer>
      <SearchInput
        type="text"
        value={searchWord}
        onChange={handleInputChange}
        onKeyDown={handleSearchKeyDown}
      />
      <ControlButton onClick={handleSearchClick}><img src={ICON_DAY_SEARCH} alt="Search" /></ControlButton>
      <ControlButton onClick={handleClearInput}><img src={ICON_DAY_REFRESH} alt="Close" /></ControlButton>
    </SearchContainer>
  );
};

const SearchContainer = styled(BaseFlexDiv)`
  flex-direction: row;  
  background-color: transparent;
`;

const SearchInput = styled(BaseInput)`
  color: white;
  background-color: ${COLORSET_NORMAL_INPUT_BG};
  border: 1px solid ${COLORSET_NORMAL_CONTROL_BORDER};
`;

export default DeviceSearch;