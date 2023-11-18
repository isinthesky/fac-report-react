import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import SetDeviceType from "./SetDeviceType";
import { ActiveButton, BaseButton, BaseColumn, BaseRow } from "../../../static/styledComps";
import UnitGroupListControl from "./UnitGroupListControl";

const UnitGroupSet: React.FC = () => {
  const dispatch = useDispatch();
  

  const handleSave = () => {
  };


  const handleCancel = () => {

  }

  return (
    <BaseColumn>
      <BaseRow>
        <SetDeviceType />
        <UnitGroupListControl />
      </BaseRow>
      <ButtonsContainer>
        <BaseButton onClick={handleCancel}>Cancel</BaseButton>
        <ActiveButton onClick={handleSave}>Save</ActiveButton>
      </ButtonsContainer>
    </BaseColumn>
  );
};

const ButtonsContainer = styled(BaseRow)`
  padding: 15px;
  margin: 10px;
  gap: 50px;
  justify-content: center; // Center buttons horizontally
  align-items: center; // Center buttons vertically
`;


export default UnitGroupSet;
