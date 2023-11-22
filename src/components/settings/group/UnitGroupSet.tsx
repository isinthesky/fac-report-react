import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import SetDeviceType from "./SetDeviceType";
import { ActiveButton, BaseButton, BaseFlexColumn, BaseFlexRow } from "../../../static/styledComps";
import UnitGroupListControl from "./UnitGroupListControl";
import { STRING_DEFAULT_CANCEL, STRING_DEFAULT_SAVE } from "../../../static/consts";

const UnitGroupSet: React.FC = () => {
  

  const handleSave = () => {
    
  };


  const handleCancel = () => {

  }

  return (
    <BaseFlexColumn>
      <BaseFlexRow>
        <SetDeviceType />
        <UnitGroupListControl viewMode={false} />
      </BaseFlexRow>
      <ButtonsContainer>
        <BaseButton onClick={handleCancel}>{STRING_DEFAULT_CANCEL}</BaseButton>
        <ActiveButton onClick={handleSave}>{STRING_DEFAULT_SAVE}</ActiveButton>
      </ButtonsContainer>
    </BaseFlexColumn>
  );
};

const ButtonsContainer = styled(BaseFlexRow)`
  padding: 15px;
  margin: 10px;
  gap: 50px;
  justify-content: center; // Center buttons horizontally
  align-items: center; // Center buttons vertically
`;


export default UnitGroupSet;
