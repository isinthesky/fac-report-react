import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { BaseInput, ControlButton, BaseFlexDiv, BaseFlexCenterDiv, BaseButton, ActiveButton } from '../../static/componentSet';
import { setdeviceSearchWord } from "../../features/reducers/settingSlice";
import { BaseFlexColumn, BaseFlexRow, MediumLabel } from '../../static/componentSet';
import { STRING_DEFAULT_CANCEL, STRING_DEFAULT_SAVE } from '../../static/langSet';

const PrintSetting: React.FC = () => {
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

  const handleCancel = () => {
    console.log("handleCancel")
  }

  const handleSave = () => {
    console.log("handleSave")
  }

  return (
    <SettingContainer>
      <BaseFlexColumn>
        <BaseFlexRow>
        <BaseFlexColumn>
        <MediumLabel>title</MediumLabel>
        <BaseInput
        type="text"
        value={searchWord}
        onChange={handleInputChange}
        onKeyDown={handleSearchKeyDown}
        />
        </BaseFlexColumn>
        <BaseFlexColumn>
          <MediumLabel>결제선1</MediumLabel>
          <BaseInput
            type="text"
            value={searchWord}
            onChange={handleInputChange}
            onKeyDown={handleSearchKeyDown}
            />
          <MediumLabel>결제선2</MediumLabel>
          <BaseInput
            type="text"
            value={searchWord}
            onChange={handleInputChange}
            onKeyDown={handleSearchKeyDown}
            />
          <MediumLabel>결제선3</MediumLabel>
          <BaseInput
            type="text"
            value={searchWord}
            onChange={handleInputChange}
            onKeyDown={handleSearchKeyDown}
            />
        </BaseFlexColumn>
      </BaseFlexRow>
      <ButtonsContainer>
        <BaseButton onClick={handleCancel}>{STRING_DEFAULT_CANCEL}</BaseButton>
        <ActiveButton onClick={handleSave}>{STRING_DEFAULT_SAVE}</ActiveButton>
      </ButtonsContainer>
      </BaseFlexColumn>
    </SettingContainer>
  );
};

const SettingContainer = styled(BaseFlexDiv)`
  align-items: center;
  justify-content: center;
  flex-direction: row;  
`;

const ButtonsContainer = styled(BaseFlexCenterDiv)`
  flex-wrap: wrap;
  padding: 10px;
  gap: 50px;
`;

export default PrintSetting;

