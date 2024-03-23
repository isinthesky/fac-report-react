import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { BaseInput, ControlButton, BaseFlexDiv } from '../../../static/componentSet';
import { ICON_DAY_CLOSE, ICON_DAY_SEARCH } from '../../../static/constSet';
import { setdeviceSearchWord } from "../../../features/reducers/settingSlice";

const DeviceSearch: React.FC = () => {
  const dispatch = useDispatch()
  const [searchWord, setSearchWord] = useState("");


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
      <BaseInput
        type="text"
        value={searchWord}
        onChange={handleInputChange}
        onKeyDown={handleSearchKeyDown}
      />
      <ControlButton onClick={handleSearchClick}><img src={ICON_DAY_SEARCH} alt="Search" /></ControlButton>
      <ControlButton onClick={handleClearInput}><img src={ICON_DAY_CLOSE} alt="Close" /></ControlButton>
    </SearchContainer>
  );
};

const SearchContainer = styled(BaseFlexDiv)`
  flex-direction: row;  
`;

export default DeviceSearch;