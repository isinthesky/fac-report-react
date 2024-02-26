import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SetDeviceType from "./SetDeviceType";
import { ActiveButton, BaseButton, BaseFlex1Column, BaseFlex1Row } from "../../../static/componentSet";
import UnitGroupListControl from "./UnitGroupListControl";
import { STRING_DEFAULT_CANCEL, STRING_DEFAULT_SAVE } from "../../../static/langSet";
import { updateUnitGroupList } from "../../../features/api/device";
import { RootStore } from "../../../store/congifureStore";

const UnitGroupSet: React.FC = () => {
  const navigate = useNavigate();
  const unitGroupSlice = useSelector((state: RootStore) => state.unitGroupReducer);
  const handleSave = async  () => {
    try {
      await updateUnitGroupList(unitGroupSlice.groups)
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate("/settings");
  }

  return (
    <BaseFlex1Column>
      <BaseFlex1Row>
        <SetDeviceType />
        <UnitGroupListControl viewMode={false} />
      </BaseFlex1Row>
      <ButtonsContainer>
        <BaseButton onClick={handleCancel}>{STRING_DEFAULT_CANCEL}</BaseButton>
        <ActiveButton onClick={handleSave}>{STRING_DEFAULT_SAVE}</ActiveButton>
      </ButtonsContainer>
    </BaseFlex1Column>
  );
};

const ButtonsContainer = styled(BaseFlex1Row)`
  padding: 15px;
  margin: 10px;
  gap: 50px;
  justify-content: center; // Center buttons horizontally
  align-items: center; // Center buttons vertically
`;


export default UnitGroupSet;
