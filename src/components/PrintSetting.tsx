import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setApproves, setPrintTitle } from '../features/reducers/settingSlice';
import { setUpdateSettingsApprove } from '../features/api';
import { RootStore } from '../store/congifureStore';
import styled from "styled-components";
import { BaseButton, BaseInput, BaseColumn, BaseRow } from '../static/styledComps';

const ApproveSetModal = () => {
  const dispatch = useDispatch();

  const settingSet = useSelector((state: RootStore) => state.settingReducer);

  const [groups, setGroups] = useState([
    { checked: false, text: '' },
    { checked: false, text: '' },
    { checked: false, text: '' }
  ]);

  const [print, setTitle] = useState(settingSet.printTitle); // printTitle을 로컬 state로 관리합니다.


  useEffect(() => {
    if (settingSet.savedApprovals.length > 0) {
      setGroups(settingSet.savedApprovals);
    }
  }, [settingSet.savedApprovals]);

  const handleCheckboxChange = (index: number) => {
    const newGroups = groups.map((group, idx) => {
      if (idx === index) {
        return { ...group, checked: !group.checked };
      }
      return group;
    });
    setGroups(newGroups);
  };


  const handlePrintTitleChange = (title: string) => {
    setTitle(title); // printTitle 값을 업데이트합니다.
  };


  const handleInputChange = (index: number, value: string) => {
    const newGroups = groups.map((group, idx) => {
      if (idx === index) {
        return { ...group, text: value };
      }
      return group;
    });
    setGroups(newGroups);
  };

  const handleSave = async () => {
    dispatch(setApproves(groups));
    dispatch(setPrintTitle(print));
    try {
      await setUpdateSettingsApprove(groups);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
  };

  return (
    <CenterContainer>
      <BaseInput
        type="text"
        value={print}
        onChange={(e) => handlePrintTitleChange(e.target.value)}
      />
      <ControlContainer>
        {groups.map((group, index) => (
          <BaseRow key={index}>
            <BaseInput
              type="checkbox"
              checked={group.checked}
              onChange={() => handleCheckboxChange(index)}
            />
            <InputJobTitle
              type="text"
              value={group.text}
              disabled={!group.checked}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </BaseRow>
        ))}
      </ControlContainer>
      <ButtonsContainer>
        <BaseButton onClick={handleSave}>Save</BaseButton>
        <BaseButton onClick={handleCancel}>Cancel</BaseButton>
      </ButtonsContainer>
    </CenterContainer>
  );
};

const CenterContainer = styled(BaseColumn)`
  // align-content: center;

  border: 1px solid #f11;
  margin-bottom: 40px;
`

const ButtonsContainer =  styled(BaseRow)`
  gap: 20px;
  align-content: center;
  justify-content: center; // Add this line to center-align the buttons
  width: 100%; // Add
  
  border: 1px solid #11f;
`

const InputJobTitle = styled(BaseInput)`
  width: 100px;
`

const ControlContainer = styled(BaseRow)`
  gap: 20px;
  `

export default ApproveSetModal;